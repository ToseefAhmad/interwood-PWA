import { useCallback, useState, useMemo, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useCartContext } from '@magento/peregrine/lib/context/cart';

import { appendOptionsToPayload } from '@magento/peregrine/lib/util/appendOptionsToPayload';
import { findMatchingVariant } from '@magento/peregrine/lib/util/findMatchingProductVariant';
import { isProductConfigurable } from '@magento/peregrine/lib/util/isProductConfigurable';
import { deriveErrorMessage } from '../../util/deriveErrorMessage';
import DEFAULT_OPERATIONS from "../RecentlyViewed/recentlyViewed.gql";
import mergeOperations from "../../util/shallowMerge";
import { useAppContext } from '../../context/app';
import ReactGA from 'react-ga';
import ReactGA4 from "react-ga4";
import ReactPixel from 'react-facebook-pixel';



const INITIAL_OPTION_CODES = new Map();
const INITIAL_OPTION_SELECTIONS = new Map();

const deriveOptionCodesFromProduct = product => {
    // If this is a simple product it has no option codes.
    if (!isProductConfigurable(product)) {
        return INITIAL_OPTION_CODES;
    }

    // Initialize optionCodes based on the options of the product.
    const initialOptionCodes = new Map();
    for (const {
        attribute_id,
        attribute_code
    } of product.configurable_options) {
        initialOptionCodes.set(attribute_id, attribute_code);
    }

    return initialOptionCodes;
};

// Similar to deriving the initial codes for each option.
const deriveOptionSelectionsFromProduct = product => {
    if (!isProductConfigurable(product)) {
        return INITIAL_OPTION_SELECTIONS;
    }

    const initialOptionSelections = new Map();
    for (const { attribute_id } of product.configurable_options) {
        initialOptionSelections.set(attribute_id, undefined);
    }

    return initialOptionSelections;
};

const getIsMissingOptions = (product, optionSelections) => {
    // Non-configurable products can't be missing options.
    if (!isProductConfigurable(product)) {
        return false;
    }

    // Configurable products are missing options if we have fewer
    // option selections than the product has options.
    const { configurable_options } = product;
    const numProductOptions = configurable_options.length;
    const numProductSelections = Array.from(optionSelections.values()).filter(
        value => !!value
    ).length;

    return numProductSelections < numProductOptions;
};

const getMediaGalleryEntries = (product, optionCodes, optionSelections) => {
    let value = [];

    const { media_gallery_entries, variants } = product;
    const isConfigurable = isProductConfigurable(product);

    // Selections are initialized to "code => undefined". Once we select a value, like color, the selections change. This filters out unselected options.
    const optionsSelected =
        Array.from(optionSelections.values()).filter(value => !!value).length >
        0;

    if (!isConfigurable || !optionsSelected) {
        value = media_gallery_entries;
    } else {
        // If any of the possible variants matches the selection add that
        // variant's image to the media gallery. NOTE: This _can_, and does,
        // include variants such as size. If Magento is configured to display
        // an image for a size attribute, it will render that image.
        const item = findMatchingVariant({
            optionCodes,
            optionSelections,
            variants
        });

        value = item
            ? [...item.product.media_gallery_entries, ...media_gallery_entries]
            : media_gallery_entries;
    }

    return value;
};

// We only want to display breadcrumbs for one category on a PDP even if a
// product has multiple related categories. This function filters and selects
// one category id for that purpose.
const getBreadcrumbCategoryId = categories => {
    // Exit if there are no categories for this product.
    if (!categories || !categories.length) {
        return;
    }
    const breadcrumbSet = new Set();
    categories.forEach(({ breadcrumbs }) => {
        // breadcrumbs can be `null`...
        (breadcrumbs || []).forEach(({ category_id }) =>
            breadcrumbSet.add(category_id)
        );
    });

    // Until we can get the single canonical breadcrumb path to a product we
    // will just return the first category id of the potential leaf categories.
    const leafCategory = categories.find(
        category => !breadcrumbSet.has(category.id)
    );

    // If we couldn't find a leaf category then just use the first category
    // in the list for this product.
    return leafCategory.id || categories[0].id;
};

const getConfigPrice = (product, optionCodes, optionSelections) => {
    let value;

    const { variants } = product;
    const isConfigurable = isProductConfigurable(product);

    const optionsSelected =
        Array.from(optionSelections.values()).filter(value => !!value).length >
        0;

    if (!isConfigurable || !optionsSelected) {
        value = product.price.regularPrice.amount;
    } else {
        const item = findMatchingVariant({
            optionCodes,
            optionSelections,
            variants
        });

        value = item
            ? item.product.price.regularPrice.amount
            : product.price.regularPrice.amount;
    }

    return value;
};

const SUPPORTED_PRODUCT_TYPES = ['SimpleProduct', 'ConfigurableProduct', 'GroupedProduct'];

/**
 * @param {GraphQLQuery} props.addConfigurableProductToCartMutation - configurable product mutation
 * @param {GraphQLQuery} props.addSimpleProductToCartMutation - configurable product mutation
 * @param {Object} props.product - the product, see RootComponents/Product
 *
 * @returns {{
 *  breadcrumbCategoryId: string|undefined,
 *  errorMessage: string|undefined,
 *  handleAddToCart: func,
 *  handleSelectionChange: func,
 *  handleSetQuantity: func,
 *  isAddToCartDisabled: boolean,
 *  mediaGalleryEntries: array,
 *  productDetails: object,
 *  quantity: number
 * }}
 */
export const useProductFullDetail = props => {
    const {
        addConfigurableProductToCartMutation,
        addSimpleProductToCartMutation,
        addBundleProductMutation,
        addGroupProductToCartMutation,
        groupedItems,
        product,
        visitor_id,
        getCartDetailsQuery,
        getRelatedProductsQuery,
        getVirtualProductView
    } = props;

    const [
        { cartTrigerFlag: miniCartIsOpen },
        {
            actions: { setCartTrigerFlag: setMiniCartIsOpen },

        }
    ] = useAppContext();

    const {
        id,
        sku,
        name
    } = product;
    const [bundleOptions, setBundleOptions] = useState([]);
    const [bundleIndex, setBundleIndex] = useState([]);
    const [parentQuanity, setParetntQuanity] = useState(1);
    const [bundleOptionQuanity, setBundleOptionQuanity] = useState(1);
    const [flag, setFlag] = useState(false);
    const [groupItems, setGroupItems] = useState([]);
    const [groupProductSubTotal, setGroupProductSubTotal] = useState(0);
    const [gpTotalDiscount, setGpTotalDiscount] = useState(0);


    const { data, error } = useQuery(getRelatedProductsQuery, { variables: { productSku: sku } })

    useMemo(() => {
        if (product.__typename == 'BundleProduct') {
            const options = product.items;
            setBundleOptions(options);
        }
    }, [product]);

    useMemo(() => {
        if (product.__typename == "GroupedProduct") {
            const tempItems = product.items;
            setGroupItems(tempItems);
        }
    }, [setGroupItems, product]);

    useMemo(() => {
        if (product.__typename == "GroupedProduct" && product.items.length != groupItems.length) {
            let tempValue = 0;
            let tempGpTotal = 0;
            product.items.map((item) => {
                if (item.product.stock_status === 'IN_STOCK') {
                    tempValue = (item.product.price_range.maximum_price.final_price.value * item.qty) + tempValue;
                    tempGpTotal = (item.product.price_range.maximum_price.discount.amount_off && item.product.price_range.maximum_price.discount.percent_off > tempGpTotal ?
                        item.product.price_range.maximum_price.discount.percent_off : tempGpTotal);

                }
            })
            setGroupProductSubTotal(tempValue)
            setGpTotalDiscount(tempGpTotal)

        }
    }, [product, groupItems, groupProductSubTotal, setGroupProductSubTotal, setGpTotalDiscount, gpTotalDiscount])

    const operations = mergeOperations(DEFAULT_OPERATIONS);

    const {
        callObserver,
        getVisitorId
    } = operations;

    const { data: response } = useQuery(callObserver, {
        fetchPolicy: 'no-cache',
        variables: {
            product_id: id,
            visitor_id: visitor_id
        }
    });

    const { data: visitorId } = useQuery(getVisitorId, {
        fetchPolicy: 'no-cache'
    });

    const productType = product.__typename;

    const isSupportedProductType = SUPPORTED_PRODUCT_TYPES.includes(
        productType
    );

    const [{ cartId }] = useCartContext();

    const [
        addConfigurableProductToCart,
        {
            error: errorAddingConfigurableProduct,
            loading: isAddConfigurableLoading
        }
    ] = useMutation(addConfigurableProductToCartMutation);

    const [
        addSimpleProductToCart,
        { error: errorAddingSimpleProduct, loading: isAddSimpleLoading }
    ] = useMutation(addSimpleProductToCartMutation, {
        onCompleted: () => setMiniCartIsOpen(true),
        refetchQueries: [{ query: getCartDetailsQuery, variables: { cartId: cartId } }]
    });

    const [
        addBundleProductToCart,
        {
            error: errorBundleProduct, loading: isBundleProductLoading, data: dataAddToBundle
        }
    ] = useMutation(addBundleProductMutation, {
        onCompleted: () => setMiniCartIsOpen(true),
        refetchQueries: [{ query: getCartDetailsQuery, variables: { cartId: cartId } }]
    });

    const [
        addGroupProductToCart,
        { error: errorAddingGroupProduct, loading: isAddGroupLoading }
    ] = useMutation(addGroupProductToCartMutation, {
        onCompleted: () => setMiniCartIsOpen(true),
        refetchQueries: [{ query: getCartDetailsQuery, variables: { cartId: cartId } }]
    });

    const { data: cartDetail } = useQuery(getCartDetailsQuery, { variables: { cartId: cartId } });

    // useMemo(() => {
    //     if(cartDetail){
    //         const cartTotal = cartDetail.cart;
    //         cartTotal.items.length ?
    //         cartTotal.items.forEach((item) => {
    //             ReactGA.plugin.execute('ecommerce', 'addProduct', {
    //                 id: cartTotal.id,
    //                 sku : item.product.sku,
    //                 price :  item.prices.price.value,
    //                 quantity : item.quantity,
    //                 name : item.product.name,
    //                 currency : item.prices.price.currency
    //               });
    //         }) : null
    //         ReactGA.plugin.execute('ecommerce', 'send');
    //         ReactGA.plugin.execute('ecommerce', 'clear');
    //     }
    // }, [cartDetail]);

    const breadcrumbCategoryId = useMemo(
        () => getBreadcrumbCategoryId(product.categories),
        [product.categories]
    );

    const derivedOptionSelections = useMemo(
        () => deriveOptionSelectionsFromProduct(product),
        [product]
    );

    const [optionSelections, setOptionSelections] = useState(
        derivedOptionSelections
    );

    const derivedOptionCodes = useMemo(
        () => deriveOptionCodesFromProduct(product),
        [product]
    );
    const [optionCodes] = useState(derivedOptionCodes);

    const isMissingOptions = useMemo(
        () => getIsMissingOptions(product, optionSelections),
        [product, optionSelections]
    );
    const mediaGalleryEntries = useMemo(
        () => getMediaGalleryEntries(product, optionCodes, optionSelections),
        [product, optionCodes, optionSelections]
    );

    const handleCheckBox = useCallback((value, tempProduct) => {
        let tempState = bundleIndex;
        let tempObject = {
            value: value,
            product: tempProduct
        };

        if (tempState.length) {
            let tempArray = tempState.findIndex(x => x.value === value);
            const valueIndex = tempArray

            if (valueIndex != -1) {
                tempState.splice(valueIndex, 1)
                setBundleIndex(tempState)

            } else if (valueIndex == -1) {
                const test = tempState.push(tempObject);
                setBundleIndex(tempState)

            }
        } else {
            tempState.push(tempObject);
            setBundleIndex(tempState)

        }
        setFlag(!flag);
    }, [bundleIndex, setBundleIndex, flag, setFlag]);

    const handleBundleProductToCart = () => {
        // let valueList = [];
        // bundleIndex.forEach(el => {
        //     let val = el.value + 1;
        //     val = val.toString();
        //     valueList.push(val)
        // })
        // addBundleProductToCart({
        //     variables: {
        //         cartId: cartId,
        //         sku: product.sku,
        //         quantity: parentQuanity,
        //         options: [
        //             {
        //                 id: 1,
        //                 quantity: bundleOptionQuanity,
        //                 value: valueList
        //             }
        //         ]

        //     }
        // });
        // ReactPixel.trackCustom("AddToCart", {'sku' : product.sku, 'quantity' : parentQuanity});
        // ReactGA.plugin.execute('ecommerce', 'addItem', {
        //     id: cartId,
        //     sku : product.sku,
        //     quantity : parentQuanity
        //   });

        //   ReactGA.plugin.execute('ec', 'addProduct', {
        //     id: id,
        //     name: name,
        //     sku : product.sku,
        //     quantity : parentQuanity
        //   });
        //   ReactGA.plugin.execute('ec:setAction', 'add');
        //   ReactGA.plugin.execute('send', 'event', 'enhanced ecommerce', ' button click', 'add to cart' );
        //   ReactGA.send('pageview');
        // ReactGA.plugin.execute('ecommerce', 'send');
        // ReactGA.plugin.execute('ecommerce', 'clear');
        // ReactGA.plugin.execute('ec', 'clear');

    }


    const handleAddToCart = useCallback(
        async formValues => {
            const { quantity } = formValues;
            const payload = {
                item: product,
                productType,
                quantity
            };

            if (isProductConfigurable(product)) {
                appendOptionsToPayload(payload, optionSelections, optionCodes);
            }

            if (isSupportedProductType) {
                const variables = {
                    cartId,
                    parentSku: payload.parentSku,
                    product: payload.item,
                    quantity: payload.quantity,
                    sku: payload.item.sku
                };
                // Use the proper mutation for the type.
                if (productType === 'SimpleProduct') {
                    try {
                        await addSimpleProductToCart({
                            variables
                        });
                        const { item, quantity } = payload;
                        const newItem = {
                            item_id: item.id,
                            item_name: item.name,
                            sku: item.sku,
                            currency: item.price.regularPrice.amount.currency,
                            price: item.price.regularPrice.amount.value ,
                            quantity:quantity
                        }
                        const len = variables.product.categories.length;
                        ReactPixel.trackCustom("AddToCart",
                            {
                                'sku': variables.sku,
                                'quantity': variables.quantity,
                                'category': len > 0 ? variables.product.categories[len - 1].name : ' ',
                                'list': len > 0 ? variables.product.categories[len - 1].name : ' ',
                                'name': variables.product.name,
                                'price': variables.product.price_range.maximum_price.final_price.value,
                                'revenue': variables.product.price_range.maximum_price.final_price.value,
                                'position': len > 0 ? variables.product.categories[len - 1].id : 1


                            });
                        // ReactGA.plugin.execute('ecommerce', 'addItem', {
                        //     id: cartId,
                        //     sku : variables.sku,
                        //     quantity : variables.quantity,
                        //     name : variables.product.name,
                        //     price : variables.product.price_range.maximum_price.final_price.value,
                        //     revenue : variables.product.price_range.maximum_price.final_price.value,
                        //     category:len>0 ? variables.product.categories[len-1].name :' ',
                        //     list:len>0 ? variables.product.categories[len-1].name :' ',
                        //     position:len>0 ? variables.product.categories[len-1].id :1
                        //
                        //
                        // });
                        ReactGA.plugin.execute('ec', 'addProduct', {
                            id: variables.sku,
                            quantity: variables.quantity,
                            sku: variables.sku,
                            name: variables.product.name,
                            price: variables.product.price_range.maximum_price.final_price.value,
                            revenue: variables.product.price_range.maximum_price.final_price.value,
                            category: len > 0 ? variables.product.categories[len - 1].name : ' ',
                            list: len > 0 ? variables.product.categories[len - 1].name : ' ',
                            position: len > 0 ? variables.product.categories[len - 1].id : 1,
                        });

                        ReactGA4.event('add_to_cart', {
                            currency: "PKR",
                            // id: variables.sku,
                            // quantity: variables.quantity,
                            // sku: variables.sku,
                            // name: variables.product.name,
                            // price: variables.product.price_range.maximum_price.final_price.value,
                            value: item.price.regularPrice.amount.value,
                            // category: len > 0 ? variables.product.categories[len - 1].name : ' ',
                            // list: len > 0 ? variables.product.categories[len - 1].name : ' ',
                            // position: len > 0 ? variables.product.categories[len - 1].id : 1,
                            items: [newItem]
                        });

                        ReactGA.ga('ec:setAction', 'add');
                        ReactGA4.ga('ec:setAction', 'add');
                        ReactGA.ga('send', 'event', 'enhanced ecommerce', ' button click', 'add to cart');
                        ReactGA4.ga('send', 'event', 'enhanced ecommerce', ' button click', 'add to cart');
                        ReactGA.send('pageview');
                        ReactGA4.send('pageview');
                        ReactGA.plugin.execute('ec', 'send');
                        ReactGA4.event('ec', 'send');

                        // ReactGA.plugin.execute('ecommerce', 'send');
                        // ReactGA.plugin.execute('ecommerce', 'clear');
                        ReactGA.plugin.execute('ec', 'clear')
                        ReactGA4.event('ec', 'clear')
                    } catch {
                        return;
                    }
                } else if (productType === 'ConfigurableProduct') {
                    try {
                        await addConfigurableProductToCart({
                            variables
                        });
                    } catch {
                        return;
                    }
                } else if (productType === 'GroupedProduct') {
                    const { item } = payload;
                    const group_product_sum = item?.group_product_sum;
                    const items = item?.items;
                    const newItems = [];
                    items.forEach((item) => {
                        const { product, qty } = item;
                        newItems.push({
                            item_id: product?.id,
                            item_name: product?.name,
                            quantity: qty,
                            price: product?.price?.regularPrice?.amount?.value,
                            currency: product?.price?.regularPrice?.amount?.currency,
                            sku: product?.sku
                        })
                    })
                    try {
                        const len = product.categories.length;
                        let tempValue = groupItems.map((item) => {

                            ReactPixel.trackCustom("AddToCart", {
                                id: item.product.sku,
                                name: item.product.name,
                                sku: item.product.sku,
                                price: item.product.price_range.maximum_price.final_price.value,
                                revenue: item.product.price_range.maximum_price.final_price.value,
                                quantity: item.qty,
                                category: len > 0 ? product.categories[len - 1].name : ' ',
                                list: len > 0 ? product.categories[len - 1].name : ' ',
                                position: len > 0 ? product.categories[len - 1].id : 1
                            });
                            // ReactGA.plugin.execute('ecommerce', 'addItem', {
                            //     id: cartId,
                            //     name : item.product.name,
                            //     sku : item.product.sku,
                            //     price : item.product.price_range.maximum_price.final_price.value,
                            //     revenue : item.product.price_range.maximum_price.final_price.value,
                            //     quantity : item.qty,
                            //     category:len>0 ? product.categories[len-1].name:' ',
                            //     list:len>0 ? product.categories[len-1].name:' ',
                            //     position:len>0 ? product.product.categories[len-1].id :1
                            //
                            //
                            // });
                            ReactGA.plugin.execute('ec', 'addProduct', {
                                id: item.product.sku,
                                name: item.product.name,
                                sku: item.product.sku,
                                price: item.product.price_range.maximum_price.final_price.value,
                                revenue: item.product.price_range.maximum_price.final_price.value,
                                quantity: item.qty,
                                category: len > 0 ? product.categories[len - 1].name : ' ',
                                list: len > 0 ? product.categories[len - 1].name : ' ',
                                position: len > 0 ? product.categories[len - 1].id : 1
                            });
                            ReactGA4.event('add_to_cart', {
                                currency: "PKR",
                                // id: item.product.sku,
                                // name: item.product.name,
                                // sku: item.product.sku,
                                // price: item.product.price_range.maximum_price.final_price.value,
                                // revenue: item.product.price_range.maximum_price.final_price.value,
                                value: group_product_sum,
                                // quantity: item.qty,
                                // category: len > 0 ? product.categories[len - 1].name : ' ',
                                // list: len > 0 ? product.categories[len - 1].name : ' ',
                                // position: len > 0 ? product.categories[len - 1].id : 1,
                                items: newItems
                            });

                            ReactGA.ga('ec:setAction', 'add');
                            ReactGA4.ga('ec:setAction', 'add');
                            ReactGA.ga('send', 'event', 'enhanced ecommerce', ' button click', 'add to cart');
                            ReactGA4.ga('send', 'event', 'enhanced ecommerce', ' button click', 'add to cart');
                            ReactGA.send('pageview');
                            ReactGA4.send('pageview');
                            //   ReactGA.plugin.execute('ecommerce', 'send');
                            ReactGA.plugin.execute('ec', 'send');
                            ReactGA4.event('ec', 'send');
                            ReactGA.plugin.execute('ec', 'clear');
                            ReactGA4.event('ec', 'clear');

                            return {
                                'sku': item.product.sku,
                                'quantity': item.qty,
                            }


                        })
                        await addGroupProductToCart({
                            variables: {
                                cartId: cartId,
                                cartItems: tempValue
                            }
                        });
                        ReactGA.plugin.execute('ecommerce', 'send');
                        ReactGA4.event('ecommerce', 'send');
                        ReactGA.plugin.execute('ecommerce', 'clear');
                        ReactGA4.event('ecommerce', 'clear');

                    } catch {
                        return;
                    }
                }

            } else {
                console.error('Unsupported product type. Cannot add to cart.');
            }
        },
        [
            addConfigurableProductToCart,
            addSimpleProductToCart,
            cartId,
            isSupportedProductType,
            optionCodes,
            optionSelections,
            product,
            productType,
            groupItems,
        ]
    );

    const handleSelectionChange = useCallback(
        (optionId, selection) => {
            // We must create a new Map here so that React knows that the value
            // of optionSelections has changed.
            const nextOptionSelections = new Map([...optionSelections]);
            nextOptionSelections.set(optionId, selection);
            setOptionSelections(nextOptionSelections);
        },
        [optionSelections]
    );

    const productPrice = useMemo(
        () => getConfigPrice(product, optionCodes, optionSelections),
        [product, optionCodes, optionSelections]
    );

    // Normalization object for product details we need for rendering.
    const productDetails = {
        description: product.description,
        name: product.name,
        price: productPrice,
        sku: product.sku,
        priceRange: product.price_range,
        specialPrice: product.special_price,
        size: product.size_attribute,
        design: product.design_attribute,
        groupProductUrl: product.group_product_url
    };

    const derivedErrorMessage = useMemo(
        () =>
            deriveErrorMessage([
                errorAddingSimpleProduct,
                errorAddingConfigurableProduct,
                errorBundleProduct,
                errorAddingGroupProduct
            ]),
        [errorAddingConfigurableProduct, errorAddingSimpleProduct, errorBundleProduct, errorAddingGroupProduct]
    );

    const handleQtyInc = useCallback((productSku) => {
        let tempValue = groupItems.map((item) => {
            if (item.product.sku == productSku) {
                setGroupProductSubTotal(groupProductSubTotal + item.product.price_range.maximum_price.final_price.value)
                return {
                    'product': item.product,
                    'qty': item.qty + 1,
                    'position': item.position
                }
            } else return item
        });
        setGroupItems(tempValue);
    }, [groupItems, setGroupItems, setGroupProductSubTotal, groupProductSubTotal]);

    const handleQtyDec = useCallback((productSku) => {
        let tempValue = groupItems.map((item) => {
            if (item.product.sku == productSku) {
                let tempTotal = item.qty === 0 ? 0 : item.product.price_range.maximum_price.final_price.value;
                if (tempTotal <= groupProductSubTotal) {
                    setGroupProductSubTotal(groupProductSubTotal - tempTotal)
                } else {
                    setGroupProductSubTotal(tempTotal - groupProductSubTotal)

                }
                return {
                    'product': item.product,
                    'qty': item.qty <= 0 ? item.qty : item.qty - 1,
                    'position': item.position
                }
            } else return item
        });
        setGroupItems(tempValue);
    }, [groupItems, setGroupItems, setGroupProductSubTotal, groupProductSubTotal]);

    // Get 360 images 
    const { data: virtualImages } = useQuery(getVirtualProductView, {
        variables: { productId: id },
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
    });


    return {
        response,
        visitorId,
        breadcrumbCategoryId,
        errorMessage: derivedErrorMessage,
        handleAddToCart,
        handleSelectionChange,
        isAddToCartDisabled:
            !isSupportedProductType ||
            isMissingOptions ||
            isAddConfigurableLoading ||
            isAddSimpleLoading ||
            isBundleProductLoading ||
            isAddGroupLoading,
        isAddToCartLoading: isAddSimpleLoading ||
            isBundleProductLoading ||
            isAddGroupLoading,
        mediaGalleryEntries,
        productDetails,
        bundleOptions,
        handleCheckBox,
        parentQuanity,
        setParetntQuanity,
        bundleOptionQuanity,
        setBundleOptionQuanity,
        handleBundleProductToCart,
        bundleIndex,
        groupItems,
        handleQtyInc,
        handleQtyDec,
        groupProductSubTotal,
        gpTotalDiscount,
        relatedProducts: data ? data.products.items[0].related_products : [],
        upSellProducts: data ? data.products.items[0].upsell_products : [],
        virtualImages
    };
}
