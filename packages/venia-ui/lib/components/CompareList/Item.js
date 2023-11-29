import React from 'react';

const Item =(props) => {
    const { removeProductFromListHandler, item } = props;
    const product = item.product;

    return(
        <>
        <li className="compare-list">
            <div className="item-details">
                <figure>
                    <img src={product.image.url} alt={product.name} />
                </figure>
                <h3 className="item-name">{product.name}</h3>
                <span className="item-price">{`${product.price.regularPrice.amount.currency}  ${product.price.regularPrice.amount.value}`}</span>
                <button className="remove-item" onClick={() => removeProductFromListHandler(item.uid)}>
                    <img src={require("../../assets/img/trash.svg")} alt="trash" /> Remove
                </button>
            </div>
        </li>
        </>
    )

}
export default Item;
