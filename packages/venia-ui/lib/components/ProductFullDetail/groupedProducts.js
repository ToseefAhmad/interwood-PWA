import React, { Fragment, useMemo, useState } from "react";
import GroupProductItem from "./groupProductItem";
import defaultClasses from "./productFullDetail.css";
import CallForPrice from "../CallForPrice/callForPrice";
import WishListControl from '../WishListControl';
import CompareList from "../CompareList";
import Price from "../Price";
import NotifyMe from "../NotifyMe/NotifyMe";

const GroupedProducts = (props) => {
    const [contentState, setContentState] = useState([])
    const { product, handleAddToCart, groupedItems, callForPrice, productId, handleQtyInc, handleQtyDec, subTotal } = props;
    let content
    useMemo(() => {
        if (groupedItems.length) {
            const result = groupedItems.map((item) => {
                return <GroupProductItem
                    key={item.position}
                    item={item}
                    handleQtyInc={handleQtyInc}
                    handleQtyDec={handleQtyDec}
                />
            });
            setContentState(result)
        }
    }, [groupedItems, content, GroupProductItem]);

    // subtotal=subtotal[items.length-1];

    //    const [sum,setSum]=useState(subtotal);

    // const updateSum=()=>{
    //     updatedTotal=0;
    //     updatedTotal=items.map(item=>{
    //         return  updatedTotal=updatedTotal+(item.product.price.regularPrice.amount.value * groupedItems[item.position].quantity);
    //     })
    //     updatedTotal=updatedTotal[items.length-1];
    //     setSum(updatedTotal);
    // }

    // let content;
    // if (items) {
    //     content = <Fragment>
    //         <ul className="list-pdGrouped">
    //             {items.map(items => <GroupProductItem key={items.position} items={items} groupedItems={groupedItems} updateSum={updateSum}/>)}
    //         </ul>
    //     </Fragment>
    // }

    let addToCart = null;
    if (callForPrice) {
        addToCart = <CallForPrice productId={productId} />;
    }
    else {
        addToCart = subTotal > 0 ? <button
            className={[defaultClasses["btn"], defaultClasses["btn-dark"], defaultClasses["add-cart"], defaultClasses["icon-shopping-cart"], "addToCart-group"].join(' ')}
            priority="high"
            type="submit"
            disabled={subTotal != 0 ? false : true}
            onClick={handleAddToCart}
        >
            Add to Cart
        </button> : null;
    }

    return (
        <Fragment>
            <ul className="list-pdGrouped">
                {contentState}
            </ul>
            {subTotal > 0 ? <>
                <div className="price-box subtotal">
                    <strong className="label-price">Subtotal:</strong>
                    <span className="product-price">
                        <Price value={subTotal} currencyCode={"PKR"} />
                    </span>
                </div>
                <div className="product-action-custom">
                    <div className="btn-wrap">
                        {addToCart}
                        <CompareList productId={productId} />
                        <WishListControl id={productId} item={product} />
                    </div>
                </div> </> : (<div className="grouped-product-out-of-stock">
                    <p style={{ color: 'red' }} className="out-of-stock">Out of Stock</p>
                    <NotifyMe product={product}></NotifyMe>
                </div>)
            }

        </Fragment>
    );
}
export default GroupedProducts;
