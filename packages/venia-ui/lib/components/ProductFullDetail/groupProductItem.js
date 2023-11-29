import React, { Fragment, useState } from "react";
import Price from '@magento/venia-ui/lib/components/Price';
import defaultClasses from "./groupedProduct.css";
import classify from "../../classify";
import NotifyMe from "../NotifyMe/NotifyMe";

const GroupProductItem = (props) => {

    const { item, handleQtyInc, handleQtyDec } = props;
    const { product, qty, position } = item;
    const { name, sku, small_image } = product;
    const [quantity, setQuantity] = useState(qty);
    const style = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    }

    return (
        <Fragment>
            <li className="product-wrapper">
                <div className="img-wrap">
                    <a >
                        <figure>
                            <img src={small_image.url} alt={small_image.label} />
                        </figure>
                    </a>
                </div>
                <div className="item-details">
                    <strong className="product-item-name">
                        <a >
                            {name}
                        </a>
                    </strong>
                    <div className="pr-block">
                        <div className="price-container">
                            <span className="price">
                                <Price
                                    currencyCode={product.price.regularPrice.amount.currency}
                                    value={product.price_range.maximum_price.final_price.value}
                                />
                            </span>
                        </div>
                        {
                            product.price_range.maximum_price.discount.amount_off ?
                                <div className="price-container">
                                    <span className="price old-price">
                                        <Price
                                            currencyCode={product.price.regularPrice.amount.currency}
                                            value={product.price.regularPrice.amount.value}
                                        />
                                    </span>
                                </div> : null
                        }
                        {
                            product.stock_status === 'OUT_OF_STOCK' ? (<div style={style} className="out-of-stock">
                                <p className="if-out-stock">Out Of Stock</p>
                                <NotifyMe product={product}></NotifyMe>
                            </div>
                            )
                                :
                                <div className="wrap-qty">
                                    <button className="input-number-decrement" onClick={() => handleQtyDec(product.sku)}>–</button>
                                    <input className="input-number" type="text" id={position} min={0} placeholder={qty} value={item.qty} />
                                    <button className="input-number-increment" onClick={() => handleQtyInc(product.sku)}>+</button>
                                </div>
                        }
                    </div>
                </div>
            </li>
        </Fragment>
    );
}

export default classify(defaultClasses)(GroupProductItem);
