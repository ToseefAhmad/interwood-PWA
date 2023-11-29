import React from 'react';

import Image from "../Image";
import {Price} from "@magento/peregrine";
import {Link, resourceUrl} from "../../drivers";
import {UNCONSTRAINED_SIZE_KEY} from "@magento/peregrine/lib/talons/Image/useImage";

import defaultClass from './bestSeller.css';
import OtherLabels from "../Gallery/otherLabels";
import CompareList from '../CompareList/compareList';
import WishListControl from '../WishListControl/wishListControl';

const productUrlSuffix = '.html';
const IMAGE_WIDTH = 50;
const IMAGE_HEIGHT = 200;

const IMAGE_WIDTHS = new Map()
    .set(50, IMAGE_WIDTH)
    .set(UNCONSTRAINED_SIZE_KEY, 200);

const ShowBestSeller = props => {
    const {item} = props;

    const {name, price, small_image, url_key,other_labels,redirect} = item;

    let productLink;
    if(!redirect)
    {
        productLink = resourceUrl(`/${url_key}${productUrlSuffix}`);
    }
    else {
        productLink= resourceUrl(`/${redirect}${productUrlSuffix}`);
    }

    const imageLink = small_image.url;

    let labels=null;
    if(other_labels)
    {
        labels= <>
            <span className="product-availability">Available In</span>
            <div className={[defaultClass["product-attributes"], " "].join(' ')}>
                <ul>
                    {other_labels.map(label => <OtherLabels key={item.index} label={label} product_link={productLink}/>)}
                </ul>
            </div>
        </>
    }
    let priceDiv=null;
    if(item.__typename==="GroupedProduct")
    {
        let price;
        price=item.group_product_sum;
        priceDiv=<div className="price-box">
            <Price value={price} currencyCode={"PKR"}/>
        </div>
    }
    else {
        priceDiv=  <div className="price-box">
            <Price
                value={price.regularPrice.amount.value}
                currencyCode={price.regularPrice.amount.currency}
            />
        </div>

    }
    return (
            <div className="item column-3 item-best-seller">
                <div className="info-product">
                    <figure>
                        <Link to={productLink}>
                            <Image
                                alt={small_image.label}
                                resource={imageLink}
                            />
                        </Link>
                        <div className="label-group">
                            <span className="product-label label-sale">-30%</span>
                        </div>
                        <div className="btn-icon-group product-carousel-actions">
                            <button className="btn-icon btn-add-cart">
                                <Link to={productLink}>
                                <img src={require("../../assets/img/shopping-cart.svg")} alt="Cart" />
                                </Link>
                            </button>
                            <a className="btn-recycle">
                                <CompareList productId={item.id}/>
                            </a>
                            <a className="btn-icon-wish">
                                <WishListControl id={item.id} item={item} />
                            </a>
                        </div>
                    </figure>
                    <div className="product-details">
                        <h3 className="product-title">
                            <Link to={productLink}>
                                {name}
                            </Link>
                        </h3>
                        {priceDiv}
                        {labels}
                    </div>
                </div>
            </div>

            );
};

export default ShowBestSeller;
