import React, { Fragment, Suspense, useEffect, useMemo, useState, useRef } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { arrayOf, bool, number, shape, string } from 'prop-types';
import { Form } from 'informed';
import { useCookies } from "react-cookie";
import ReactGA from 'react-ga';
import ReactGA4 from "react-ga4";
import { Helmet } from 'react-helmet-async';
import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
} from "react-share";

import Price from '@magento/venia-ui/lib/components/Price';
import { useProductFullDetail } from '@magento/peregrine/lib/talons/ProductFullDetail/useProductFullDetail';
import { isProductConfigurable } from '@magento/peregrine/lib/util/isProductConfigurable';

import { mergeClasses } from '../../classify';
import Breadcrumbs from '../Breadcrumbs';
import Button from '../Button';
import Carousel from '../ProductImageCarousel';
import FormError from '../FormError';
import LoadingIndicator, { fullPageLoadingIndicator } from '../LoadingIndicator';
import { QuantityFields } from '../CartPage/ProductListing/quantity';
import RichText from '../RichText';
import WishListControl from '../WishListControl';

import defaultClasses from './productFullDetail.css';
import {
    ADD_CONFIGURABLE_MUTATION,
    ADD_SIMPLE_MUTATION,
    ADD_GROUP_MUTATION,
    ADD_BUNDLE_PRODUCT_MUTATION,
    GET_RELATED_PRODUCTS,
    VIRTUAL_PRODUCT_VIEW_QUERY
} from './productFullDetail.gql';
import { useProductLabels } from '@magento/peregrine/lib/talons/RootComponents/Product/useProductLabels';
import CallForPrice from '../CallForPrice/callForPrice';
import { UseReview } from "@magento/peregrine/lib/talons/Review/useReview";
import ReactStars from "react-rating-stars-component";
import ReviewItems from "./reviewItems";
import GroupedProducts from "./groupedProducts";
import BundleProducts from './budleProductsDP';
import CompareList from "../CompareList";
import EMI from "../EMI";
import Popup from "reactjs-popup";
import { Link, resourceUrl } from '@magento/venia-drivers';
import { GET_CART_DETAILS } from '../CartPage/cartPage.gql'
import { useGetLowest } from "@magento/peregrine/lib/talons/EMI/useGetLowest";
import RelatesProducts from './relatedProducts';
import UpSellProducts from './upSellProducts';
import { Meta } from '../Head';
import Tridi from 'react-tridi';
import 'react-tridi/dist/index.css';

const Options = React.lazy(() => import('../ProductOptions'));

// Correlate a GQL error message to a field. GQL could return a longer error
// string but it may contain contextual info such as product id. We can use
// parts of the string to check for which field to apply the error.
const ERROR_MESSAGE_TO_FIELD_MAPPING = {
    'The requested qty is not available': 'quantity',
    'Product that you are trying to add is not available.': 'quantity',
    "The product that was requested doesn't exist.": 'quantity'
};

// Field level error messages for rendering.
const ERROR_FIELD_TO_MESSAGE_MAPPING = {
    quantity: 'The requested quantity is not available.'
};
import { useYotpoRefresh } from '@nacelle/react-yotpo';
import NotifyMe from '../NotifyMe/NotifyMe';

const ProductFullDetail = props => {

    const { product } = props;

    const {
        id,
        sku,
        rating_summary,
        review_count,
        reviews,
        callForPrice,
        emi,
        items,
        seoJson,
        __typename,
        stock_status: StockStatus,
        name,
        delivery,
        warranty,
        newpArrival
    } = product;

    // useEffect(() => {
    //     ReactGA.initialize('UA-43977906-1');
    //     ReactGA.pageview(window.location.pathname + window.location.search);
    // }, []);

    useMemo(() => {
        const len = product.categories.length;
        ReactGA.plugin.execute('ec', 'addImpression', {
            id: sku,
            name: name,
            sku: sku,
            brand: "Interwood",
            category: len > 0 ? product.categories[len - 1].name : ' ',
            list: len > 0 ? product.categories[len - 1].name : ' ',
            revenue: product.__typename === "GroupedProduct" ? product.group_product_sum : product.price_range.maximum_price.final_price.value,
            price: product.__typename === "GroupedProduct" ? product.group_product_sum : product.price_range.maximum_price.final_price.value,
            position: len > 0 ? product.categories[len - 1].id : 1
        });

        ReactGA4.event('addImpression', {
            currency: "PKR",
            id: id,
            name: name,
            sku: sku,
            value: product.__typename === "GroupedProduct" ? product.group_product_sum : product.price_range.maximum_price.final_price.value,
            brand: "Interwood",
            category: len > 0 ? product.categories[len - 1].name : ' ',
            list: len > 0 ? product.categories[len - 1].name : ' ',
            revenue: product.__typename === "GroupedProduct" ? product.group_product_sum : product.price_range.maximum_price.final_price.value,
            price: product.__typename === "GroupedProduct" ? product.group_product_sum : product.price_range.maximum_price.final_price.value,
            position: len > 0 ? product.categories[len - 1].id : 1
        });

        ReactGA.plugin.execute('ec', 'addProduct', {
            id: sku,
            name: name,
            sku: sku,
            brand: "Interwood",
            revenue: product.__typename === "GroupedProduct" ? product.group_product_sum : product.price_range.maximum_price.final_price.value,
            price: product.__typename === "GroupedProduct" ? product.group_product_sum : product.price_range.maximum_price.final_price.value,
            list: len > 0 ? product.categories[len - 1].name : ' ',
            category: len > 0 ? product.categories[len - 1].name : ' ',
            position: len > 0 ? product.categories[len - 1].id : 1

        });

        ReactGA4.event('addProduct', {
            currency: "PKR",
            id: id,
            name: name,
            sku: sku,
            value: product.__typename === "GroupedProduct" ? product.group_product_sum : product.price_range.maximum_price.final_price.value,
            brand: "Interwood",
            revenue: product.__typename === "GroupedProduct" ? product.group_product_sum : product.price_range.maximum_price.final_price.value,
            price: product.__typename === "GroupedProduct" ? product.group_product_sum : product.price_range.maximum_price.final_price.value,
            list: len > 0 ? product.categories[len - 1].name : ' ',
            category: len > 0 ? product.categories[len - 1].name : ' ',
            position: len > 0 ? product.categories[len - 1].id : 1

        });

        if (product.__typename === "SimpleProduct") {
            ReactGA4.event("view-item", {
                currency: product.price_range.maximum_price.final_price.currency,
                value: product.__typename === "GroupedProduct" ? product.group_product_sum : product.price_range.maximum_price.final_price.value,
                items: [
                    {
                        item_id: product.id,
                        item_name: name,
                        price: product.__typename === "GroupedProduct" ? item.group_product_sum : product.price_range.maximum_price.final_price.value,
                        currency: product.price_range.maximum_price.final_price.currency,
                        sku: sku,
                        type: product.__typename
                    }]
            })
        }

        if (product.__typename === "GroupedProduct") {
            const { items, group_product_sum, id, __typename, sku: groupSku, name } = product;
            const newItems = [];
            items.forEach((item) => {
                const { product, qty } = item
                newItems.push({
                    item_id: product.id,
                    item_name: product.name,
                    price: product.price_range.maximum_price.final_price.value,
                    currency: product.price_range.maximum_price.final_price.currency,
                    quantity: qty
                });
            })
            ReactGA4.event("view-item", {
                currency: product.price_range.maximum_price.final_price.currency,
                value: group_product_sum,
                type: __typename,
                sku: groupSku,
                items: newItems
            })

        }



        // ReactGA.plugin.execute('ec:setAction', 'detail' );
        //ReactGA.ga('ec:setAction', 'click');
        ReactGA.ga('ec:setAction', 'detail', { list: len > 0 ? product.categories[len - 1].name : ' ' });
        ReactGA4.ga('ec:setAction', 'detail', { list: len > 0 ? product.categories[len - 1].name : ' ' })

        //  ReactGA.ga('ec:setAction', 'detail');
        ReactGA.send('pageview');
        ReactGA4.send('pageview')
        ReactGA.plugin.execute('ecommerce', 'send');
        ReactGA4.event('ecommerce', 'send')
        ReactGA.plugin.execute('ecommerce', 'clear');
        ReactGA4.event('ecommerce', 'clear')
        ReactGA.plugin.execute('ec', 'clear');
        ReactGA4.event('ec', 'clear')


    }, [])

    useEffect(() => {
        let script = seoJson;
        script = script.replace(/(\\r\\n|\\r|\\n)/g, '');
        // script= script.replace(/(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g, "");
        var script_tag = document.createElement('script');
        script_tag.type = 'application/ld+json';
        script_tag.text = script;
        document.head.append(script_tag);
    }, []);
    const productType = __typename;

    // cookies to store visitor id
    const [cookies, setCookie] = useCookies();
    const [visitor_id, setVisitorId] = useState();

    const [showDescription, setShowDesc] = useState(true);
    const [showReviews, setShowReviews] = useState(false);
    const [nickname, setNickname] = useState('');
    const [summary, setSummary] = useState('');
    const [reviewText, setReviewText] = useState('');
    const [ratingValue, setRatingValue] = useState(0);
    const [ratings, setRatings] = useState('');
    const [msg, setMsg] = useState('');
    const [lowestEmi, setLowestEmi] = useState(0);
    const [toggleConten, setToggleContenet] = useState(false);
    let itemsData = [];

    // set lowest emi value
    const getLowestPrice = useGetLowest(
        {
            product_id: id
        }
    );

    useEffect(() => {
        if (getLowestPrice && getLowestPrice.data && getLowestPrice.data.getLowestEmi) {
            setLowestEmi(getLowestPrice.data.getLowestEmi)
        }
    }, [getLowestPrice]);

    if (product.__typename === "GroupedProduct" && items && items.length > 0) {
        items.map(item => {
            itemsData[item.position] = { "quantity": item.qty, "sku": item.product.sku };
        });
    }
    const [groupedItems, setGroupedItems] = useState(itemsData);


    // review button with count
    let reviewBtn;
    if (!review_count) {
        reviewBtn = 'Reviews';
    } else {
        reviewBtn = 'Reviews(' + review_count + ')';
    }

    // if reviews
    let item = [];
    if (reviews) {
        const { items } = reviews;
        item = items;
    }

    const { data } = useProductLabels({
        id: product.id
    });

    //rating changed , set Value of rating no.
    const ratingChanged = (newRating) => {
        setRatingValue(newRating);
        if (newRating === 1) {
            setRatings("MTY=");
        }
        if (newRating === 2) {
            setRatings("MTc=")
        }
        if (newRating === 3) {
            setRatings("MTg=")
        }
        if (newRating === 4) {
            setRatings("MTk=")
        }
        if (newRating === 5) {
            setRatings("MjA=")
        }
    };

    const outOfStockLsbel = data && data?.product_label[0].show_label ? data.product_label[0].value : null;
    const disscountLabel = data && data?.product_label[1].show_label ? data.product_label[1].value : null;

    const talonProps = useProductFullDetail({
        addConfigurableProductToCartMutation: ADD_CONFIGURABLE_MUTATION,
        addSimpleProductToCartMutation: ADD_SIMPLE_MUTATION,
        addGroupProductToCartMutation: ADD_GROUP_MUTATION,
        addBundleProductMutation: ADD_BUNDLE_PRODUCT_MUTATION,
        product,
        visitor_id,
        groupedItems,
        getCartDetailsQuery: GET_CART_DETAILS,
        getRelatedProductsQuery: GET_RELATED_PRODUCTS,
        getVirtualProductView: VIRTUAL_PRODUCT_VIEW_QUERY
    });

    const {
        breadcrumbCategoryId,
        errorMessage,
        handleAddToCart,
        handleSelectionChange,
        isAddToCartDisabled,
        mediaGalleryEntries,
        productDetails,
        visitorId,
        bundleOptions,
        handleCheckBox,
        parentQuanity,
        setParetntQuanity,
        bundleOptionQuanity,
        setBundleOptionQuanity,
        handleBundleProductToCart,
        bundleIndex,
        isAddToCartLoading,
        groupItems,
        handleQtyInc,
        handleQtyDec,
        groupProductSubTotal,
        relatedProducts,
        upSellProducts,
        gpTotalDiscount,
        virtualImages
    } = talonProps;
    // set visitor id
    useEffect(() => {
        if (visitorId && visitorId.getVisitorId !== -1) {
            if (!cookies['visitor_id']) {
                setCookie('visitor_id', visitorId.getVisitorId + 1, { path: '/' });
                setVisitorId(visitorId.getVisitorId + 1);
            }
            else {
                setVisitorId(cookies['visitor_id']);
            }
        }
    }, [visitorId]);
    const [bundleProductTogle, setBundleProductToggle] = useState(true)

    let grouped = null;
    if (product.__typename === "GroupedProduct" && items) {
        grouped = <div>
            <GroupedProducts
                product={product}
                productId={id}
                callForPrice={callForPrice}
                handleAddToCart={handleAddToCart}
                groupedItems={groupItems}
                handleQtyInc={handleQtyInc}
                handleQtyDec={handleQtyDec}
                subTotal={groupProductSubTotal}
            />
        </div>
    }
    // scroll down to review section
    const goToReview = () => {
        window.scrollTo(800, 900)
        setShowDesc(false);
        setShowReviews(true);
    }
    const baseUrl = window.location.origin;

    const { formatMessage } = useIntl();

    const classes = mergeClasses(defaultClasses, props.classes);

    const options = isProductConfigurable(product) ? (
        <Suspense fallback={fullPageLoadingIndicator}>
            <Options
                onSelectionChange={handleSelectionChange}
                options={product.configurable_options}
            />
        </Suspense>
    ) : null;

    const breadcrumbs = breadcrumbCategoryId ? (
        <Breadcrumbs
            categoryId={breadcrumbCategoryId}
            currentProduct={productDetails.name}
        />
    ) : null;

    // if no reviews , link to review form else show rating summary and link to reviews
    let review_section;
    if (rating_summary === 0) {
        review_section = <div>
            <button onClick={goToReview}><span
                className={defaultClasses['review']}>Be the first to review this product</span></button>
        </div>
    } else {
        review_section =
            <div>
                <ReactStars
                    count={5}
                    value={rating_summary / 20}
                    size={20}
                    activeColor="#ffd700"
                    edit={false} />
                <button onClick={goToReview}>
                    <span className={defaultClasses['review']}> ({review_count})review</span>
                </button>
            </div>
    }
    //map reviews
    let reviewItems = null;
    if (item !== undefined) {
        let heading = '';
        if (item.length > 0) {
            heading = <div> <h2 className="reviews-title">{review_count} reviews for {product.name}</h2>
            </div>
        }
        reviewItems = <div>
            {heading}
            {item.map(items => <ReviewItems key={items.index} items={items} />)}
        </div>
    }
    //use talons
    const reviewTalons = UseReview({
        sku: sku,
        nickname: nickname,
        summary: summary,
        text: reviewText,
        ratings: ratings
    });
    // reload if review submitted successfully
    if (msg) {
        window.location.reload();
    }

    const {
        handleSubmit,
        reviewData
    } = reviewTalons;


    // in case of success add msg
    useEffect(() => {
        if (reviewData) {
            if (reviewData.createProductReview.review) {
                setMsg("You submitted your review for moderation.");
            }
        }
    }, [reviewData])

    let successMsgDiv = null;
    if (msg) {
        successMsgDiv = <div className={defaultClasses['msgDiv']}>
            <h1>{msg}</h1>
        </div>
    }
    // Submit Review handler
    const submitReview = () => {
        handleSubmit();
    }

    let reviewDisable = true;
    // enable submit review button if all fields are filled
    if (sku && summary && ratings && reviewText && nickname) {
        reviewDisable = false;
    }

    // Fill a map with field/section -> error.
    const errors = new Map();
    if (errorMessage) {
        Object.keys(ERROR_MESSAGE_TO_FIELD_MAPPING).forEach(key => {
            if (errorMessage.includes(key)) {
                const target = ERROR_MESSAGE_TO_FIELD_MAPPING[key];
                const message = ERROR_FIELD_TO_MESSAGE_MAPPING[target];
                errors.set(target, message);
            }
        });

        // Handle cases where a user token is invalid or expired. Preferably
        // this would be handled elsewhere with an error code and not a string.
        if (errorMessage.includes('The current user cannot')) {
            errors.set('form', [
                new Error(
                    formatMessage({
                        id: 'productFullDetail.errorToken',
                        defaultMessage:
                            'There was a problem with your cart. Please sign in again and try adding the item once more.'
                    })
                )
            ]);
        }

        // Handle cases where a cart wasn't created properly.
        if (
            errorMessage.includes('Variable "$cartId" got invalid value null')
        ) {
            errors.set('form', [
                new Error(
                    formatMessage({
                        id: 'productFullDetail.errorCart',
                        defaultMessage:
                            'There was a problem with your cart. Please refresh the page and try adding the item once more.'
                    })
                )
            ]);
        }

        // An unknown error should still present a readable message.
        if (!errors.size) {
            errors.set('form', [
                new Error(
                    formatMessage({
                        id: 'productFullDetail.errorUnknown',
                        defaultMessage:
                            'Could not add item to cart. Please check required options and try again.'
                    })
                )
            ]);
        }
    }


    //set bottom section
    let content = null;
    let descActive;
    let reviewActive;
    let tagActive;
    if (showDescription) {
        descActive = defaultClasses['active'];
    } else {
        descActive = null;
    }
    if (showReviews) {
        reviewActive = defaultClasses['active'];
    } else {
        reviewActive = null;
    }

    let productReviews = null
    if (showDescription === true) {
        content =
            <div id="desc" className={[defaultClasses["tab-pane"], defaultClasses["active"], " "].join(' ')}>
                <div className={[defaultClasses["product-desc-content"], " ", , toggleConten ? "toggle-content" : " "].join(' ')}>
                    <RichText content={productDetails.description} />
                    {
                        productDetails.description ?
                            <button className="toggle-button" onClick={() => setToggleContenet(!toggleConten)}>
                                {toggleConten ? 'Read Less' : 'Read More'}
                            </button> : null
                    }
                </div>
            </div>;
    }

    if (showReviews === true) {
        productReviews =
            <div id="review" className={[defaultClasses["tab-pane"], defaultClasses["active"], " "].join(' ')}>
                <div className="product-reviews-content">
                    <div>
                        <ol className="comment-list">
                            {reviewItems}
                        </ol>
                    </div>

                    {successMsgDiv}

                    <div className="add-product-review">
                        <Form onSubmit={submitReview} className="comment-form m-0">
                            <div className="wrap-heading">
                                <h2 className="review-title"><span>Add</span> a Review</h2>
                            </div>
                            <div className="rating-form">
                                <label for="rating">Your rating</label>
                                <div className="rating-stars">
                                    <ReactStars
                                        count={5}
                                        value={ratingValue}
                                        onChange={ratingChanged}
                                        size={35}
                                        activeColor="#ffa500"
                                    />
                                    <input type="text"
                                        hidden={true}
                                        value={ratings}
                                        required={true}
                                        name="rating"
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="nickname_field">
                                    Your Name
                                    <span className={classes['req']}> <superscript>*</superscript></span>
                                </label>
                                <input type="text" name="nickname" id="nickname_field"
                                    className={defaultClasses['input_goober_review']}
                                    required={true}
                                    defaultValue={nickname}
                                    onChange={e => {
                                        setNickname(e.target.value)
                                    }}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="summary_field" className={defaultClasses['label']}>
                                    Summary<span className={classes['req']}> <superscript>*</superscript></span>
                                </label>
                                <input type="text" name="title" id="summary_field"
                                    className="form-control form-control-sm"
                                    required={true}
                                    defaultValue={summary}
                                    onChange={e => {
                                        setSummary(e.target.value)
                                    }}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="review_field" className={defaultClasses['label']}>Your Review
                                    <span className={classes['req']}> <superscript>*</superscript></span>
                                </label>
                                <textarea name="detail" id="review_field" cols="5" rows="6" className="form-control form-control-sm"
                                    required={true}
                                    defaultValue={reviewText}
                                    onChange={e => {
                                        setReviewText(e.target.value)
                                    }}
                                />
                            </div>
                            <div className="action-review-form">
                                <Button
                                    className="btn btn-dark ls-n-15"
                                    disabled={reviewDisable}
                                    priority="high"
                                    type="submit"
                                >
                                    {"Submit Review"}
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
    }

    const info = <div className="box">
        <p>Our delivery officer shall call you to communicate the exact delivery timeliness</p>
    </div>;

    let emiDetails = null;

    if (emi === true) {
        emiDetails = <div>
            <EMI product_id={id} />
        </div>;
    }
    let groupProductType = null;
    if (product.__typename === "GroupedProduct") {
        groupProductType =
            <div className={classes.root}>
                {grouped}
            </div>
    }
    //price div

    let addToCartButton = null;
    if (groupProductType) {
        addToCartButton = groupProductType;
    }
    else {
        addToCartButton =
            <Form className="form-bundle-products" onSubmit={handleAddToCart}>
                <FormError
                    classes={{
                        root: classes.formErrors
                    }}
                    errors={errors.get('form') || []}
                />
                {
                    productType != 'BundleProduct' && StockStatus != "OUT_OF_STOCK" ?
                        <section className={classes.quantity}>
                            <h2 className={classes.quantityTitle}>
                                <FormattedMessage
                                    id={'global.quantity'}
                                    defaultMessage={'Quantity'}
                                />
                            </h2>
                            <QuantityFields
                                classes={{ root: classes.quantityRoot }}
                                min={1}
                            // message={errors.get('quantity')}
                            />
                            <WishListControl id={product.id} item={product} />
                        </section> : null
                }
                {
                    StockStatus != "OUT_OF_STOCK" ?
                        <section className={[defaultClasses["btn-wrap"], "custom-wrapper wrapper-simple-product"].join(' ')}>
                            {
                                productType == 'BundleProduct' ?
                                    <button className={[defaultClasses["btn"], defaultClasses["btn-dark"], defaultClasses["add-cart"], defaultClasses["icon-shopping-cart"], defaultClasses["bundle-cart"], "btn-bundle-group"].join(' ')} onClick={() => setBundleProductToggle(true)}>
                                        Customize And Add To Cart
                                    </button>

                                    : StockStatus != "OUT_OF_STOCK" ?
                                        <><button
                                            className={[defaultClasses["btn"], defaultClasses["btn-dark"], defaultClasses["add-cart"], defaultClasses["icon-shopping-cart"], " "].join(' ')}
                                            disabled={isAddToCartDisabled || data != undefined ? data?.product_label[0].show_label == "true" : false}
                                            priority="high"
                                            type="submit"
                                        >
                                            Add to Cart
                                        </button>
                                            {/* <WishListControl id={product.id} /> */}
                                            <CompareList productId={product.id} />
                                            <span className={[defaultClasses["qty-error-msg"], " "].join(' ')}>
                                                {errors.get('quantity')}
                                            </span>
                                        </> : null


                            }

                        </section> : null
                }
            </Form>
    }


    // if Product have price
    const isProductAddToCart = !callForPrice ?
        addToCartButton : <span className={[defaultClasses["request-qout"], " "].join(' ')}><CallForPrice productId={product.id} /></span>

    // if Product is not call for price
    // const prdouctAttribute = !callForPrice ?  <>
    //     <div className={[defaultClasses["ratings-container"], " "].join(' ')}>
    //         <div className={[defaultClasses["product-ratings"], " "].join(' ')}>
    //             <span
    //                 className={[defaultClasses["ratings-container"], defaultClasses["rating-inner"], " "].join(' ')}></span>
    //         </div>
    //         <a href="#" className={[defaultClasses["rating-link"], " "].join(' ')}>( 6 Reviews )</a>
    //     </div>
    //     {
    //         productType == "SimpleProduct" ?
    //         <>
    //         <div className={[defaultClasses["price-box"], " "].join(' ')}>
    //         <strong className={[defaultClasses["label-price"], " "].join(' ')}>Price:</strong>
    //         <span className={[defaultClasses["product-price"], " "].join(' ')}>
    //             <Price
    //                 currencyCode={productDetails.price.currency}
    //                 value={productDetails.price.value}
    //             />
    //         </span>
    //         <span className={[defaultClasses["old-price"], " "].join(' ')}>{productDetails.price.currency} <span>{productDetails.price.value}</span></span>
    //     </div>
    //         </> : null
    //     }
    //     <div className={[defaultClasses["stock-info"], " "].join(' ')}>
    //         <span>Availability: <span>{outOfStockLsbel}</span></span>
    //     </div>

    //     {/* <div className={[defaultClasses["design-block"], " "].join(' ')}>z
    //         <strong>Design:</strong>
    //         <div className={[defaultClasses["drop-holder"], " "].join(' ')}>
    //             <span className={[defaultClasses["current"], " "].join(' ')}>Select..</span>
    //             <ul className={[defaultClasses["dropdown-design"], " "].join(' ')}>
    //                 <li className={[defaultClasses["item-design"], " "].join(' ')}><a
    //                     href="#">Cresent</a></li>
    //                 <li className={[defaultClasses["item-design"], " "].join(' ')}><a
    //                     href="#">Italian</a></li>
    //                 <li className={[defaultClasses["item-design"], " "].join(' ')}><a
    //                     href="#">Spanish</a></li>
    //                 <li className={[defaultClasses["item-design"], " "].join(' ')}><a
    //                     href="#">Western</a></li>
    //             </ul>
    //         </div>
    //     </div> */}
    //     <div className={[defaultClasses["size-block"], " "].join(' ')}>
    //         <strong>Size:</strong>
    //         {options}
    //     </div>
    //     {
    //         product.__typename==="GroupedProduct" ? null:
    //             <section className={[defaultClasses["btn-wrap"], " "].join(' ')}>
    //             <WishListControl id={product.id} />
    //             {/* <a  className={[defaultClasses["add-compare"], " "].join(' ')}> */}
    //             <CompareList productId={product.id}/>
    //             {/* </a> */}
    //         </section>
    //     }

    // </> : null

    // const qisstAmount= product.__typename==="GroupedProduct" ?
    //     ( product.group_product_sum/4).toFixed() :
    //     (product.price_range.maximum_price.final_price.value/4).toFixed();

    // script to add yotpo reviews
    useEffect(() => {
        const script = document.createElement('script');

        script.src = "https://staticw2.yotpo.com/lOFhDHY022UlML6Xo21e6Veks2iM06MuszeWlJEW/widget.js";
        script.async = true;

        document.head.appendChild(script);

    }, []);
    useYotpoRefresh(400);

    const yotpoReviewClass = showReviews ? defaultClasses['r-active'] : defaultClasses['r-inactive'];
    // discount label
    const discountLabel = product && productType === "SimpleProduct" && product.price_range.maximum_price.discount.amount_off ? product.price_range.maximum_price.discount.percent_off : null;
    const groupProductDiscount = product && productType === "GroupedProduct" && product.price_range.maximum_price.discount.amount_off ? product.price_range.maximum_price.discount.percent_off : null;

    const discount = Math.ceil(discountLabel);
    const tridiRef = useRef(null);

    return (
        <Fragment>
            <Helmet>
                {
                    product.small_image ?
                        <meta property="og:image" content={product.small_image} /> :
                        <meta property="og:image" content={require("../../assets/img/og_image.jpg")} />
                }
                <meta property="og:type" content="product" />
                <meta property="og:title" content={product.name} />
                <meta property="og:description" content={product.meta_description} />
                <meta property="og:url" content={window.location.href} />
                <meta name='description' content={product.meta_description} />
                <meta name='tite' content={product.meta_title} />
            </Helmet>
            {/* <Meta  name='description' content={product.meta_description}/>
        <Meta  name='tite' content={product.meta_title}/> */}
            {
                isAddToCartLoading ? <LoadingIndicator global={true} >{`Adding ${product.name} to Cart...`}</LoadingIndicator> : null
            }
            <div className="breadcrumb-pdp">
                {breadcrumbs}
            </div>
            <div className={classes.root} >
                <div className={[defaultClasses["column-4"], defaultClasses["info-block"], " "].join(' ')}>
                    <div className={[defaultClasses["product-single-details"], " "].join(' ')}>
                        <h1 className={[defaultClasses["product-title"], " "].join(' ')}>{productDetails.name}</h1>
                        {
                            !callForPrice ?
                                productDetails.specialPrice == null ?
                                    productType === "SimpleProduct" ?
                                        <>
                                            <div className={[defaultClasses["price-box"], " "].join(' ')}>
                                                <strong className={[defaultClasses["label-price"], " "].join(' ')}>Price:</strong>
                                                <span className={[defaultClasses["product-price"], " "].join(' ')}>
                                                    <Price
                                                        currencyCode={productDetails.priceRange.maximum_price.final_price.currency}
                                                        value={productDetails.priceRange.maximum_price.final_price.value}
                                                    />
                                                </span>
                                                {
                                                    productDetails.priceRange.maximum_price.discount.amount_off != 0 ?
                                                        <span className={[defaultClasses["old-price"], " "].join(' ')}><span>
                                                            <Price
                                                                currencyCode={productDetails.priceRange.maximum_price.final_price.currency}
                                                                value={productDetails.price.value}
                                                            /> </span>
                                                        </span> : null
                                                }
                                            </div>
                                        </>
                                        :
                                        productType === "GroupedProduct" ?
                                            <>
                                                {/* <div className={[defaultClasses["price-box"], " "].join(' ')}>
                                        <strong className={[defaultClasses["label-price"], " "].join(' ')}>Price:</strong>
                                        <span className={[defaultClasses["product-price"], " "].join(' ')}>
                                            <Price
                                                currencyCode={productDetails.priceRange.maximum_price.final_price.currency}
                                                value={productDetails.priceRange.maximum_price.final_price.value}
                                            />
                                        </span>
                                        {
                                            productDetails.priceRange.maximum_price.discount.amount_off != 0 ?
                                                <span className={[defaultClasses["old-price"], " "].join(' ')}>{productDetails.price.currency} <span>{productDetails.price.value}</span>
                                            </span> : null
                                        }
                                    </div> */}
                                                {/* <div className={[defaultClasses["stock-info"], " "].join(' ')}>
                                        <span>Availability: <span>{outOfStockLsbel}</span></span>
                                    </div> */}
                                            </>
                                            :
                                            productType === "BundleProduct" ?
                                                <>
                                                    <div className={[defaultClasses["price-box"], " "].join(' ')}>
                                                        <strong className={[defaultClasses["label-price"], " "].join(' ')}>Price:</strong>
                                                        <span className={[defaultClasses["product-price"], " "].join(' ')}>
                                                            <span className="price-between">From:</span> <Price
                                                                currencyCode={productDetails.priceRange.maximum_price.final_price.currency}
                                                                value={productDetails.priceRange.maximum_price.final_price.value}
                                                            />
                                                        </span>
                                                        {
                                                            productDetails.priceRange.maximum_price.discount.amount_off != 0 ?
                                                                <span className={[defaultClasses["product-price"], " "].join(' ')}>
                                                                    <span className="price-between">To:</span> <Price
                                                                        currencyCode={productDetails.priceRange.maximum_price.final_price.currency}
                                                                        value={productDetails.price.value}
                                                                    />
                                                                    {/* {productDetails.price.currency} <span>{productDetails.price.value} */}
                                                                    {/* </span> */}
                                                                </span> : null
                                                        }
                                                    </div>
                                                    {/* <div className={[defaultClasses["stock-info"], " "].join(' ')}>
                                        <span>Availability: <span>{outOfStockLsbel}</span></span>
                                    </div> */}
                                                </>
                                                : null

                                    : <>
                                        <div className={[defaultClasses["price-box"], " "].join(' ')}>
                                            <strong className={[defaultClasses["label-price"], " "].join(' ')}>Price:</strong>
                                            <span className={[defaultClasses["product-price"], " "].join(' ')}>
                                                <Price
                                                    currencyCode={productDetails.priceRange.maximum_price.final_price.currency}
                                                    value={productDetails.specialPrice}
                                                />
                                            </span>
                                            <span className={[defaultClasses["old-price"], " "].join(' ')}>
                                                <span>
                                                    <Price
                                                        currencyCode={productDetails.price.currency}
                                                        value={productDetails.price.value}
                                                    />
                                                </span>
                                            </span>
                                        </div>
                                        {/*<div className={[defaultClasses["stock-info"], " "].join(' ')}>*/}
                                        {/*    <span>Availability: <span>{StockStatus != "OUT_OF_STOCK" ? "In Stock" : "Out Of Stock"}</span></span>*/}
                                        {/*</div>*/}
                                    </> : null
                        }
                        {
                            productDetails.design != null && productDetails.design != 'false' ?
                                <div className={[defaultClasses["design-block"], " "].join(' ')}>
                                    <strong>Design:</strong>
                                    <div className={[defaultClasses["drop-holder"], " "].join(' ')}>
                                        <span className={[defaultClasses["current"], " "].join(' ')}>
                                            {
                                                productDetails.groupProductUrl != null ? <>
                                                    <Link to={resourceUrl(`/${productDetails.groupProductUrl}.html`)}>
                                                        <span>{productDetails.design}</span>
                                                    </Link>
                                                    <span className={[defaultClasses["complete-set"], " "].join(' ')}>
                                                        <Link to={resourceUrl(`/${productDetails.groupProductUrl}.html`)}>
                                                            View Complete Set
                                                        </Link>
                                                    </span>
                                                </> : <a>{productDetails.design}</a>
                                            }
                                        </span>
                                        <ul className={[defaultClasses["dropdown-design"], " "].join(' ')}>
                                            <li className={[defaultClasses["item-design"], " "].join(' ')}>
                                                <a >{productDetails.design}</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div> : null
                        }

                        <div className={[defaultClasses["product-code"], " "].join(' ')}>
                            <strong>SKU:</strong>
                            <span
                                className={[defaultClasses["product-code"], " "].join(' ')}> {productDetails.sku}</span>
                        </div>
                        <div className={[defaultClasses["ratings-container"], " "].join(' ')}>
                            <div className={[defaultClasses["product-ratings"], " "].join(' ')}>
                                <span
                                    className={[defaultClasses["ratings-container"], defaultClasses["rating-inner"], " "].join(' ')}></span>
                            </div>
                            <a href="#" className={[defaultClasses["rating-link"], " "].join(' ')}>( 6 Reviews )</a>
                        </div>
                        {
                            productDetails.size != null && productDetails.size != 'false' ?
                                <div className={[defaultClasses["size-block"], " "].join(' ')}>
                                    <strong>Size:</strong>
                                    <span className={[defaultClasses["item-size"], " "].join(' ')}>{productDetails.size}</span>

                                </div> : null
                        }
                        {
                            StockStatus != "OUT_OF_STOCK" && delivery ?

                                <div className={[defaultClasses["product-code"], " "].join(' ')}>
                                    <strong>
                                        Delivered in :
                                    </strong>
                                    <span className={[defaultClasses["product-code"], " "].join(' ')}> {delivery}</span>
                                    <span className="info-icon">
                                        <img className="info" src={require("../../assets/img/info.svg")} alt="Info" />
                                        {info}
                                    </span>
                                </div>
                                :
                                <div className={[defaultClasses["product-code"], " "].join(' ')}>
                                    <strong>
                                        Availability :
                                    </strong>
                                    <span style={{ color: StockStatus === "OUT_OF_STOCK" ? 'red' : 'none' }}> {StockStatus != "OUT_OF_STOCK" ? "In Stock" : "Out Of Stock"}</span>
                                </div>
                        }
                        {warranty ?
                            <div className={[defaultClasses["product-code"], " "].join(' ')}>
                                <strong>
                                    <img className={defaultClasses['warranty']} src={require("../../assets/img/warrantydark.svg")} alt="Warranty" />
                                </strong>
                                <span className={[defaultClasses["product-code"], [defaultClasses['warranty-div']], " "].join(' ')}> {warranty}</span>
                            </div>
                            : null
                        }
                        {
                            productType == 'GroupedProduct' ?
                                <span className="make-set"> Make Your Set</span> : null
                        }
                        {
                            productType === "SimpleProduct" && StockStatus === "OUT_OF_STOCK" ?
                                (
                                    <div className='Single-product-notifyme-container'>
                                        <NotifyMe product={product}></NotifyMe>
                                    </div>
                                ) : null
                        }

                    </div>

                </div>

                {
                    productType == "BundleProduct" || productType == "GroupedProduct" ?
                        <span className={[defaultClasses["qty-error-msg"], " "].join(' ')}>
                            {errorMessage}
                        </span> : null
                }
                <section className={classes.imageCarousel}>
                    <Carousel images={mediaGalleryEntries}
                        isNewProduct={newpArrival}
                        isVirtualStatus={virtualImages?.Product360ImageData?.status_360}
                        virtualLocation={virtualImages?.Product360ImageData?.path_360}
                        virtualCount={virtualImages?.Product360ImageData?.total_images_360}
                    />
                    {
                        productType === "SimpleProduct" && discount ?
                            <div className="pdp-discount-label">
                                <span className="pdp-off">{discount}% OFF</span>
                            </div> : null
                    }
                    {
                        productType === "GroupedProduct" && groupProductDiscount ?
                            <div className="pdp-discount-label">
                                <span className="pdp-off">{Math.ceil(groupProductDiscount)}% OFF</span>
                            </div> : null
                    }
                </section>

                {isProductAddToCart}
                {
                    !callForPrice && emi ?
                        <div className={[defaultClasses["installment-block"], "installment-block-modal"].join(' ')}>
                            <strong>Installment Plans</strong>
                            <div className="installment-partners-list">
                                {/* <span class="">Banks</span> */}
                                <ul class="banks-widget">
                                    <li>
                                        <a href="/installments" target="_blank">
                                            <img src={require("../../assets/img/faysalbank-logo.png")} alt="faysal bank logo" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/installments" target="_blank">
                                            <img src={require("../../assets/img/silkbank-logo.png")} alt="silk bank logo" />
                                        </a>
                                    </li>
                                    {/*<li>*/}
                                    {/*    <a href="/installments" target="_blank">*/}
                                    {/*        <img src={require("../../assets/img/img-ubl.png")} className="ubl-logo" alt=""/>*/}
                                    {/*    </a>*/}
                                    {/*</li>*/}

                                </ul>
                            </div>

                            <div className="modal">
                                <Popup
                                    repositionOnResize={true}
                                    lockScroll={true}
                                    offsetX={900}
                                    offsetY={460}
                                    position={"center center"}
                                    // overlayStyle={overlayStyle}
                                    // contentStyle={contentStyle}
                                    trigger={
                                        <button>
                                            <a className="installment-text">Starting as low as <span>
                                                <Price value={lowestEmi} currencyCode={'PKR'} />
                                            </span></a>
                                            <span className={[defaultClasses["btn-more"], " "].join(' ')}>See More</span></button>}
                                    modal
                                    nested>{
                                        close => (
                                            <div className="modal-content-custom">
                                                <div className="modal-header">
                                                    <h3>Installment Details</h3>
                                                    <div className="modal-btn-close" onClick={close}>
                                                        <img src={require("../../assets/img/close.svg")} alt="Close" />
                                                    </div>
                                                </div>
                                                <div className="modal-body">
                                                    {emiDetails}
                                                </div>
                                                <div className="modal-footer">
                                                    <button className="modal-btn-primary" onClick={close}>OK</button>
                                                </div>
                                            </div>
                                        )
                                    }
                                </Popup>
                            </div>
                        </div> : null
                }

                {/*<div className="qistpay-box-layout">*/}
                {/*    <div className="qispay-brand">*/}
                {/*        <img src={require("../../assets/img/qistpay.png")} alt="Qisstpay logo"/>*/}
                {/*    </div>*/}
                {/*    <div className="qistpay-content">*/}
                {/*        <h3>All Debit &amp; Credit Cards</h3>*/}
                {/*    </div>*/}
                {/*    <div className="content-bottom">*/}
                {/*        <p>*/}
                {/*            04 interest free payments of <Price currencyCode={'PKR'} value={qisstAmount}/>*/}
                {/*        </p>*/}

                {/*        <Popup*/}
                {/*            repositionOnResize={true}*/}
                {/*            lockScroll={true}*/}
                {/*            offsetX={900}*/}
                {/*            offsetY={460}*/}
                {/*            position={"center center"}*/}
                {/*            trigger={*/}
                {/*                <span className="btn-more">See More</span>*/}
                {/*            }*/}
                {/*            modal*/}
                {/*            nested>{*/}
                {/*            close => (*/}
                {/*                <div className="modal-content-custom">*/}
                {/*                    <div className="modal-header">*/}
                {/*                        <h3>Qisst Pay</h3>*/}
                {/*                    </div>*/}
                {/*                    <div className="modal-body">*/}
                {/*                        Details*/}
                {/*                    </div>*/}
                {/*                    <div className="modal-footer">*/}
                {/*                        <button className="modal-btn-primary" onClick={close}>Ok</button>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            )*/}
                {/*        }*/}
                {/*        </Popup>*/}
                {/*    </div>*/}
                {/*</div>*/}

                <div className={[defaultClasses["product-single-share"], " ", outOfStockLsbel == "Out of Stock" ? "product-single-share-out-of-stock" : ""].join(' ')}>

                    <label>
                        {/* <img src={require("../../assets/img/share.svg")} alt=""/> */}
                        Share:
                    </label>
                    <div className={[defaultClasses["social-icons"], defaultClasses["mr-2"], " "].join(' ')}>
                        <FacebookShareButton
                            url={`${baseUrl}/${product.url_key}.html`}
                            quote={product.name}
                            title={product.name}
                        >
                            <a className="icon-facebook" ></a>
                        </FacebookShareButton>
                        <TwitterShareButton
                            url={`${baseUrl}/${product.url_key}.html`}
                            quote={product.name}
                            title={product.name}
                        >
                            <a className="icon-twitter" title="Twitter"></a>

                        </TwitterShareButton>
                        <WhatsappShareButton
                            url={`${baseUrl}/${product.url_key}.html`}
                            quote={product.name}
                            title={product.name}
                        >
                            <a className="icon-whatsapp" target="_blank" title="whatsapp"></a>
                        </WhatsappShareButton>
                    </div>
                </div>
            </div>
            {
                bundleOptions.length && productType == 'BundleProduct' && bundleProductTogle ?
                    <BundleProducts
                        bundleOptiopns={bundleOptions}
                        handleCheckBox={handleCheckBox}
                        parentQuanity={parentQuanity}
                        setParetntQuanity={setParetntQuanity}
                        bundleOptionQuanity={bundleOptionQuanity}
                        setBundleOptionQuanity={setBundleOptionQuanity}
                        handleBundleProductToCart={handleBundleProductToCart}
                        selectedItems={bundleIndex}
                    /> : null
            }

            <div className={[defaultClasses["tabs-section"], " "].join(' ')}>
                <div className={[defaultClasses["main-container"], " "].join(' ')}>
                    <div className={[defaultClasses["holder"], " "].join(' ')}>
                        <div className={[defaultClasses["product-single-tabs"], " "].join(' ')}>
                            <ul role="tablist"
                                className={[defaultClasses["nav"], defaultClasses["nav-tabs"], " "].join(' ')}>
                                <li
                                    onClick={e => {
                                        setShowReviews(false);
                                        setShowDesc(true);
                                    }}
                                    className={[defaultClasses["nav-item"], descActive, " "].join(' ')}>
                                    <a
                                        className={[defaultClasses["tab"], " "].join(' ')}>
                                        <FormattedMessage
                                            id={'productFullDetail.productDescription'}
                                            defaultMessage={'Product Description'}
                                        />
                                    </a>
                                </li>
                                <li
                                    onClick={e => {
                                        setShowReviews(true);
                                        setShowDesc(false);
                                    }}
                                    className={[defaultClasses["nav-item"], reviewActive, " "].join(' ')}>
                                    <a className={[defaultClasses["tab"], " "].join(' ')} >  {reviewBtn} </a>
                                </li>
                            </ul>
                            <div className={[defaultClasses["tab-content"], " "].join(' ')}>
                                <a className="tab active"
                                    onClick={e => {
                                        // setShowReviews(false);
                                        // setShowDesc(true);
                                        showDescription ? setShowDesc(false) : setShowDesc(true);
                                        // showDescription ?  setShowReviews(true) : setShowReviews(false);


                                    }}
                                >Product Description</a>
                                {content}
                                <a className="tab"
                                    onClick={e => {
                                        // setShowReviews(true);
                                        showReviews ? setShowReviews(false) : setShowReviews(true);
                                        // showReviews ?  setShowDesc(true) : setShowDesc(false)
                                    }}
                                >Reviews</a>
                                {/*{productReviews}*/}
                                <div id="review" className={[defaultClasses["tab-pane"], defaultClasses["active"], yotpoReviewClass, " "].join(' ')}>
                                    <div className="yotpo yotpo-main-widget"
                                        data-product-id={product.id}
                                        data-name={product.name}
                                        data-description={product.description}
                                        data-url={resourceUrl(`/${product.url_key}.html`)}
                                        data-image-url={product.image_url}
                                        data-price={product.__typename === "GroupedProduct" ?
                                            product.group_product_sum :
                                            product.price_range.maximum_price.final_price.value}
                                        data-currency={product.__typename === "GroupedProduct" ?
                                            'PKR' :
                                            product.price_range.maximum_price.final_price.currency}
                                    >
                                    </div>
                                </div>


                            </div>
                            {/*<button onClick={() => handleQtyDec('FG020002518')}>test</button>*/}
                        </div>
                    </div>
                </div>
            </div>
            {
                relatedProducts.length ? <RelatesProducts items={relatedProducts} /> : null
            }
            {
                upSellProducts.length ? <UpSellProducts items={upSellProducts} /> : null
            }
        </Fragment>
    );
};

ProductFullDetail.propTypes = {
    classes: shape({
        cartActions: string,
        description: string,
        descriptionTitle: string,
        details: string,
        detailsTitle: string,
        imageCarousel: string,
        options: string,
        productName: string,
        productPrice: string,
        quantity: string,
        quantityTitle: string,
        root: string,
        title: string
    }),
    product: shape({
        __typename: string,
        id: number,
        sku: string.isRequired,
        price: shape({
            regularPrice: shape({
                amount: shape({
                    currency: string.isRequired,
                    value: number.isRequired
                })
            }).isRequired
        }).isRequired,
        media_gallery_entries: arrayOf(
            shape({
                label: string,
                position: number,
                disabled: bool,
                file: string.isRequired
            })
        ),
        description: string
    }).isRequired
};

export default ProductFullDetail;
