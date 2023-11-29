import React, { Fragment } from 'react'
import SlickSlider from 'react-slick';
import classify from '../../classify';
import { QuantityFields } from '../CartPage/ProductListing/quantity';
import defaultClasses from "./bundleProduct.css";
import Gallery from '../Gallery';
import GalleryItem from '../Gallery/item';
import Price from '../Price';

const mapGalleryItem = item => {
    const { small_image } = item;
    return {
        ...item,
        small_image:
            typeof small_image === 'object' ? small_image.url : small_image
    };
};

const Settings = {
    dots: false,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    verticalSwiping: false,
    responsive: [
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }

    ]
};

const BundleProducts = (props) => {
    const {
        bundleOptiopns,
        handleCheckBox,
        parentQuanity,
        setParetntQuanity,
        bundleOptionQuanity,
        setBundleOptionQuanity,
        handleBundleProductToCart,
        selectedItems
    } = props;
    let tempcount = 0;
    
    const summery = selectedItems.length ? selectedItems.map((item, index) => {
                const product = item.product.product;
                tempcount = tempcount + product.price_range.maximum_price.final_price.value;
                return <>
                    <li key={index + item}>
                        <strong>{product.name}</strong>
                        {/* Amet, consectetur adipiscing */}
                    </li>
                </>
                
    }) :  null;
    const options = bundleOptiopns.length ? bundleOptiopns[0].options : [];

    const items = options ? options.map((item, index) => {
        const product = item.product;
        return <Fragment>

        
            <div className="item column-3">
                <div className="info-product">
                    {/* <figure>
                        <a >
                            <img src={product.small_image.url} />
                        </a>
                    </figure> */}
                        <GalleryItem item={mapGalleryItem(product)} list={{categoryName: 'bundle Product', listName:'bundle product'}}/>

                    <div className="product-details">
                        {/* <div className="category-wrap">
                            <div className="category-list">
                                <a  className="product-category">category</a>
                            </div>
                        </div>
                        <h3 className="product-title">
                            <a >
                                {product.name}
                            </a>
                        </h3>
                        <div className="ratings-container">
                            <div className="product-ratings">
                                <span className="ratings"></span>
                                
                                <span className="tooltiptext tooltip-top"></span>
                            </div>
                        </div>
                        <div className="pr-block">
                            <div className="price-container">
                                <span className="price">
                                    {`${product.price.regularPrice.amount.currency}  ${product.price.regularPrice.amount.value}`}
                                </span>
                            </div>
                        </div> */}
                        {
                            product.stock_status === 'IN_STOCK' ?
                            <div className="chek-area">
                            <form className="check-prod">
                                <div className="form-field">
                                    <label for={`check${index}`}>
                                        <input type='checkbox' className="input-checkbox" id={`check${index}`} defaultValue={item.is_default} onChange={() => handleCheckBox(index, item)}/>
                                        <span className="checkstat"></span> Add to Bundle
                                    </label>
                                </div>
                            </form>
                        </div> : <div className="chek-area">
                            <form className="check-prod">
                                <div className="form-field">
                                    <label for={`check${index}`}>
                                        <span ></span> Out Of Stock
                                    </label>
                                </div>
                            </form>
                        </div> 
                        }
                    </div>
                </div>
            </div>
    
        </Fragment>
    }) : null;
    const mapData = options.map((item) => {
        const product = item.product;
        return <GalleryItem item={mapGalleryItem(product)}/>
    });

    return(
        <div>
        <div className="message-bundle-product">
            <p className="txt-head">The below products can be bought in combination with the</p>
        </div>
        
        <div class="pd-area pdp-area-bundle">
            <h1>{bundleOptiopns.length ? bundleOptiopns[0].options.name : []}</h1>
            <SlickSlider {...Settings}>
                {items}
            </SlickSlider>
        </div>
        {
            selectedItems.length ? 
        <>
        <div className="summary-bundle">
            <div className="summary-wrap">
                <h2 className="head-summary">Summary</h2>
                <ul className="list-summary">
                    {summery}
                </ul>
                <div className="qty-wrapper">
                    <div className="wrap-qty">
                        <button className="input-number-decrement" onClick={ () => bundleOptionQuanity == 1 ?setBundleOptionQuanity(1) : setBundleOptionQuanity(bundleOptionQuanity -1) }>–</button>
                        <input className="input-number" type="text" value={bundleOptionQuanity} min="1" />
                        <button className="input-number-increment" onClick={() => setBundleOptionQuanity(bundleOptionQuanity+1)}>+</button>
                    </div>
                </div>
                <div className="price-box subtotal">  
                <strong className="label-price">Subtotal:</strong>
                <span className="product-price">
                    <Price value={tempcount*bundleOptionQuanity*parentQuanity} currencyCode={'PKR'}/>
                </span>
                </div>
                <div className="product-action">
                    <div className="btn-wrap">
                        <button  className="btn btn-dark add-cart icon-shopping-cart" disabled={tempcount === 0 ? true : false} onClick={handleBundleProductToCart}>Add {selectedItems.length ? selectedItems.length : null }  Items To Cart</button>
                    </div>
                </div>
            </div>
        </div> </> : null  }

            {/* <div>
                <button onClick={() => setBundleOptionQuanity(bundleOptionQuanity+1)}>+</button>
                    <p>{bundleOptionQuanity}</p>
                <button onClick={ () => bundleOptionQuanity == 1 ?setBundleOptionQuanity(1) : setBundleOptionQuanity(bundleOptionQuanity -1) }> -</button>
            </div> */}
            {/* <div>
                <h1>Main </h1>
                <button onClick={() => setParetntQuanity(parentQuanity+1)}>+</button>
                <p>{parentQuanity}</p>
                <button onClick={ () => parentQuanity == 1 ?setParetntQuanity(1) : setParetntQuanity(parentQuanity -1) }> -</button>
            </div> */}
            {/* <div>
                <button onClick={handleBundleProductToCart}>Add to cart</button>
            </div>
            {
                summery
            }
            {
                tempcount*bundleOptionQuanity*parentQuanity
            } */}
        </div>
    )

};

export default classify(defaultClasses)(BundleProducts);
