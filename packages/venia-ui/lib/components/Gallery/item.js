import React from 'react';
import { string, number, shape } from 'prop-types';
import { Link, resourceUrl } from '@magento/venia-drivers';
import Price from '@magento/venia-ui/lib/components/Price';
import { transparentPlaceholder } from '@magento/peregrine/lib/util/images';
import { UNCONSTRAINED_SIZE_KEY } from '@magento/peregrine/lib/talons/Image/useImage';

import { mergeClasses } from '../../classify';
import Image from '../Image';
import defaultClasses from './item.css';
import WishListControl from '../WishListControl';
import { useProductLabels } from '@magento/peregrine/lib/talons/RootComponents/Product/useProductLabels';
import CompareList from '../CompareList/compareList';
import OtherLabels from "./otherLabels";
import CallForPrice from '../CallForPrice/callForPrice';
import ReactGA from 'react-ga';
import ReactGA4 from "react-ga4";


// The placeholder image is 4:5, so we should make sure to size our product
// images appropriately.
const IMAGE_WIDTH = 300;
const IMAGE_HEIGHT = 375;

// Gallery switches from two columns to three at 640px.
const IMAGE_WIDTHS = new Map()
    .set(640, IMAGE_WIDTH)
    .set(UNCONSTRAINED_SIZE_KEY, 840);

const ItemPlaceholder = ({ classes }) => (
    <div className={classes.root_pending}>
        <div className={classes.images_pending}>
            <Image
                alt="Placeholder for gallery item image"
                classes={{
                    image: classes.image_pending,
                    root: classes.imageContainer
                }}
                src={transparentPlaceholder}
            />
        </div>
        <div className={classes.name_pending} />
        <div className={classes.price_pending} />
    </div>
);

const GalleryItem = props => {
    const { item, list, categoryId } = props;
    const url = item?.hover?.url;

    // const {data} = useProductLabels({id : item.id})
    // const outOfStockLabel = data && data.product_label[0].show_label === "true" ? data.product_label[0].value :  null;
    // const disscountLabel = data && data.product_label[1].show_label === "true" ? data.product_label[1].value :  null;

    const outOfStockLabel = item && item.stock_status === "OUT_OF_STOCK" ? "Out Of Stock" : null;
    const disscountLabel = item && item.price_range.maximum_price.discount.amount_off ? item.price_range.maximum_price.discount.percent_off : null;
    const isNewProduct = item && item?.newpArrival ? item.newpArrival : false;

    const discountLabel = Math.ceil(disscountLabel);

    const classes = mergeClasses(defaultClasses, props.classes);

    if (!item) {
        return <ItemPlaceholder classes={classes} />;
    }

    const { alt_label, name, price, small_image, url_key, url_suffix, other_labels, redirect, id, sku, design_attribute } = item;

    let imageLink = small_image;
    // imageLink = imageLink.split('/'); 
    // console.log("Splitted Link-------", imageLink);
    // PREVIOUS splice(5,2);
    // CHANGE splice(6,1);
    // imageLink.splice(5, 2);
    // imageLink = imageLink.join('/');

    let productLink;
    if (redirect) {
        productLink = resourceUrl(`/${redirect}${url_suffix}`);
    }
    else {
        productLink = resourceUrl(`/${url_key}${url_suffix}`);

    }

    let labels = null;
    if (other_labels) {
        labels = <>
            {
                item.__typename === "GroupedProduct" ?
                    <span className="product-availability">Set Includes</span>
                    : <span className="product-availability"><span className="design-attr-label">{item.design_attribute}</span> Also Available In</span>
            }
            <div className={[defaultClasses["product-attributes"], " "].join(' ')}>
                <ul>
                    {other_labels.map(label => <OtherLabels key={item.index} label={label} product_link={productLink} />)}
                </ul>
            </div>
        </>
    }
    let priceDiv = null;
    if (item.__typename === "GroupedProduct") {
        let tempPrice;
        tempPrice = item.group_product_sum;
        priceDiv = tempPrice != null && tempPrice > 0 ? <div className={[defaultClasses["price-box"], " "].join(' ')}>
            <Price value={tempPrice} currencyCode={"PKR"} />
        </div> : null
    }
    else {
        priceDiv = <div className={[defaultClasses["price-box"], " "].join(' ')}>
            {item.price_range.maximum_price.discount.amount_off ?
                <>
                    <Price
                        value={item.price_range.maximum_price.final_price.value}
                        currencyCode={price.regularPrice.amount.currency}
                    />
                    <span className={[defaultClasses["old-price"], " "].join(' ')}>
                        <Price
                            value={price.regularPrice.amount.value}
                            currencyCode={price.regularPrice.amount.currency}
                        />
                    </span>

                </> :
                <Price
                    value={price.regularPrice.amount.value}
                    currencyCode={price.regularPrice.amount.currency}
                />}
        </div>

    };
    const addImprassion = () => {

        ReactGA.plugin.execute('ec', 'addImpression', {
            id: sku,
            name: name,
            sku: sku,
            variant: design_attribute,
            list: list.categoryName,
            category: list.categoryName,
            brand: "Interwood",
            revenue: item.__typename === "GroupedProduct" ? item.group_product_sum : item.price_range.maximum_price.final_price.value,
            price: item.__typename === "GroupedProduct" ? item.group_product_sum : item.price_range.maximum_price.final_price.value,
            position: categoryId ? categoryId : 1

        });

        ReactGA4.event('addImpression', {
            id: item.id,
            currency: item.price_range.maximum_price.final_price.currency,
            name: name,
            sku: sku,
            value: item.__typename === "GroupedProduct" ? item.group_product_sum : item.price_range.maximum_price.final_price.value,
            variant: design_attribute,
            list: list.categoryName,
            category: list.categoryName,
            brand: "Interwood",
            revenue: item.__typename === "GroupedProduct" ? item.group_product_sum : item.price_range.maximum_price.final_price.value,
            price: item.__typename === "GroupedProduct" ? item.group_product_sum : item.price_range.maximum_price.final_price.value,
            position: categoryId ? categoryId : 1

        });

        ReactGA.ga('ec:setAction', 'detail');
        ReactGA4.ga('ec:setAction', 'detail');

        ReactGA.plugin.execute('ec', 'addProduct', {
            id: sku,
            name: name,
            sku: sku,
            variant: design_attribute,
            list: list.categoryName,
            brand: "Interwood",
            category: list.categoryName,
            revenue: item.__typename === "GroupedProduct" ? item.group_product_sum : item.price_range.maximum_price.final_price.value,
            price: item.__typename === "GroupedProduct" ? item.group_product_sum : item.price_range.maximum_price.final_price.value,
            position: categoryId ? categoryId : 1
        });

        ReactGA4.event('addProduct', {
            id: item.id,
            name: name,
            currency: item.price_range.maximum_price.final_price.currency,
            sku: sku,
            value: item.__typename === "GroupedProduct" ? item.group_product_sum : item.price_range.maximum_price.final_price.value,
            variant: design_attribute,
            list: list.categoryName,
            brand: "Interwood",
            category: list.categoryName,
            revenue: item.__typename === "GroupedProduct" ? item.group_product_sum : item.price_range.maximum_price.final_price.value,
            price: item.__typename === "GroupedProduct" ? item.group_product_sum : item.price_range.maximum_price.final_price.value,
            position: categoryId ? categoryId : 1

        });
        ReactGA.ga('ec:setAction', 'click', { list: list.categoryName });
        ReactGA4.ga('ec:setAction', 'click', { list: list.categoryName });
        ReactGA.send('pageview');
        ReactGA4.send('pageview')

        if (item.__typename === "SimpleProduct") {
            ReactGA4.event("view-item", {
                currency: item.price_range.maximum_price.final_price.currency,
                value: item.__typename === "GroupedProduct" ? item.group_product_sum : item.price_range.maximum_price.final_price.value,
                items: [
                    {
                        item_id: item.id,
                        item_name: name,
                        price: item.__typename === "GroupedProduct" ? item.group_product_sum : item.price_range.maximum_price.final_price.value,
                        currency: item.price_range.maximum_price.final_price.currency,
                    }]
            })
        }

        if (item.__typename === "GroupedProduct") {
            //Add Impression For Grouped Product in Item.js    
        }
        ReactGA.plugin.execute('ec', 'clear');
        ReactGA4.event('ec', "clear");

    };
    return (

        <div className={classes.root} onClick={addImprassion}>

            <div className={[defaultClasses["item"], defaultClasses["column-3"], " "].join(' ')}>
                <div className={[defaultClasses["info-product"], " "].join(' ')}>
                    <figure>
                        <Link to={productLink} className={classes.images}>
                            <Image
                                alt={alt_label}
                                classes={{
                                    image: classes.image,
                                    root: classes.imageContainer
                                }}
                                height={IMAGE_HEIGHT}
                                resource={imageLink}
                                widths={IMAGE_WIDTHS}
                                showImage={url ? true : false}
                                hoverImage={url}
                            />
                        </Link>
                        {
                            discountLabel ?
                                <div className={[defaultClasses["label-group"], " "].join(' ')}>
                                    <span className={[defaultClasses["product-label"], defaultClasses["label-sale"], " "].join(' ')}>{discountLabel}% OFF</span>
                                </div> : null
                        }
                        {
                            outOfStockLabel && item.callForPrice === false && isNewProduct !== true ?
                                <div className="out-stock-label">
                                    <span className="secondary-label">{outOfStockLabel}</span>
                                </div> : null
                        }
                        {
                            isNewProduct
                                ? <div className={[defaultClasses["label-group-new-product"], " "].join(' ')}>
                                    <span className={[defaultClasses["new-product-label"], defaultClasses["label-sale"], " "].join(' ')}> New Arrival </span>
                                </div> : null
                        }
                        <div className={[defaultClasses["btn-icon-group"], "product-item-actions"].join(' ')}>
                            {
                                !item.callForPrice ?
                                    <>
                                        {
                                            !outOfStockLabel ?
                                                <button className={[defaultClasses["btn-recycle"], " "].join(' ')}>
                                                    <Link to={productLink}>
                                                        <img src={require("../../assets/img/shopping-cart.svg")} alt="Crat" />
                                                    </Link>
                                                </button> : null
                                        }
                                        <a className={[defaultClasses["btn-recycle"], " "].join(' ')}>
                                            <CompareList productId={item.id} />
                                        </a>
                                    </> : null
                            }
                            <a className={[defaultClasses["btn-icon-wish"], "wishlist-pdp"].join(' ')}>
                                <WishListControl id={item.id} item={item} />
                            </a>
                        </div>
                    </figure>
                    <div className={[defaultClasses["product-details"], " "].join(' ')}>
                        <div className={[defaultClasses["category-wrap"], " "].join(' ')}>
                            <div className={[defaultClasses["category-list"], " "].join(' ')}>
                                <a className={[defaultClasses["product-category"], " "].join(' ')}>category</a>
                            </div>
                        </div>
                        <div className={[defaultClasses["product-has-title"], " "].join(' ')}>
                            <h3 className={[defaultClasses["product-title"], " "].join(' ')}>
                                <Link to={productLink}>
                                    {name}
                                </Link>
                            </h3>
                            <a className={[defaultClasses["product-has-wishlist"], "gallery-item-wishlist"].join(' ')}>
                                <WishListControl id={item.id} item={item} />
                                {/* <img src={require("../../assets/img/heart.svg")} alt=""/> */}
                            </a>
                        </div>
                        {
                            item.callForPrice ?
                                <CallForPrice productId={item.id} />
                                : <>{priceDiv}
                                    {labels}
                                    {
                                        !outOfStockLabel ?
                                            <div className={[defaultClasses["addto-cart-mbl"], " "].join(' ')}>
                                                <Link to={productLink} className={[defaultClasses["cart-btn-mbl"], " "].join(' ')} >Add To Cart</Link>
                                            </div> : null
                                    }
                                </>
                        }
                    </div>
                </div>
            </div>

            {/*<Link to={productLink} className={classes.images}>*/}
            {/*    <Image*/}
            {/*        alt={name}*/}
            {/*        classes={{*/}
            {/*            image: classes.image,*/}
            {/*            root: classes.imageContainer*/}
            {/*        }}*/}
            {/*        height={IMAGE_HEIGHT}*/}
            {/*        resource={small_image}*/}
            {/*        widths={IMAGE_WIDTHS}*/}
            {/*    />*/}
            {/*</Link>*/}
            {/*<Link to={productLink} className={classes.name}>*/}
            {/*    <span>{name}</span>*/}
            {/*</Link>*/}
            {/*<div className={classes.price}>*/}
            {/*    <Price*/}
            {/*        value={price.regularPrice.amount.value}*/}
            {/*        currencyCode={price.regularPrice.amount.currency}*/}
            {/*    />*/}
            {/*</div>*/}

        </div>
    );
};

GalleryItem.propTypes = {
    classes: shape({
        image: string,
        imageContainer: string,
        imagePlaceholder: string,
        image_pending: string,
        images: string,
        images_pending: string,
        name: string,
        name_pending: string,
        price: string,
        price_pending: string,
        root: string,
        root_pending: string
    }),
    item: shape({
        id: number.isRequired,
        name: string.isRequired,
        small_image: string.isRequired,
        url_key: string.isRequired,
        price: shape({
            regularPrice: shape({
                amount: shape({
                    value: number.isRequired,
                    currency: string.isRequired
                }).isRequired
            }).isRequired
        }).isRequired
    })
};

export default GalleryItem;
