import React, { Fragment, useMemo } from 'react';
import { Link,resourceUrl } from '@magento/venia-drivers';

import classify from '../../classify';
import defaultClasses from './compareProductsPage.css';
import WishListContorl from '../WishListControl';
import { useCompareListBlock } from '@magento/peregrine/lib/talons/CompareList/useCompareListBlock';
import { fullPageLoadingIndicator } from '../LoadingIndicator';
import RichContent from '../RichContent';
import SearchBar from '../SearchBar';
import {Title} from "../Head";

const Compareproducts = () => {
    const {
            removeProductFromListHandler,
            dataList,
            loader,
            closeDrawer
    } = useCompareListBlock();
    useMemo(() => {
        closeDrawer()
    },[])
    const itemsList = dataList.length !== 0 ? dataList.compareList.items : [];

    const tableBody = itemsList.length ? <tbody id="table-compare">
        {
            itemsList.map((item) =>{
                return <Fragment>
                    <div className="compare-list-single">
                    <tr>
                        <th className="product-name">Product Name</th>
                        <td className="grid-link__title">{item.product.name}</td>
                    </tr>
                    <tr>
                        <th className="product-name">Product Image</th>
                        <td className="item-row">
                        <Link to={resourceUrl(`/${item.product.url_key}${item.product.url_suffix}`)}>
                            <img src={item.product.image.url} alt={item.product.image.label} className="featured-image" />
                        </Link>
                            <div className="product-price product_price">
                                <span>{`${item.product.price.regularPrice.amount.currency}  ${item.product.price.regularPrice.amount.value}`}</span>
                            </div>
                            <div className="compare-list-action">
                            <Link to={resourceUrl(`/${item.product.url_key}${item.product.url_suffix}`)}>
                                <button title="Add to Cart" className="add-to-cart btn btn-solid">
                                    Add to Cart
                                </button>
                            </Link>
                                <button className="action-wishlist">
                                    <WishListContorl id={item.uid} />
                                </button>
                            </div>

                        </td>
                    </tr>
                    <tr>
                        <th className="product-name">Product Description</th>
                        <td className="item-row">
                            <p className="description-compare">
                                <RichContent html={item.product.short_description.html} />
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <th className="product-name">Remove</th>
                        <td>
                            <button onClick={() => removeProductFromListHandler(item.uid)}>Remove</button>
                        </td>
                    </tr>
                    </div>
                </Fragment>
            })
        }
    </tbody> : null

    return(
        <Fragment>
            <Title>{`Compare Products`} - {STORE_NAME}</Title>
        <div className="page-compare-product">
            {
                loader ? fullPageLoadingIndicator : null
            }
            <div className="products-search-form">
                <h3 className="search-form-title text-center">
                    Search product using the search bar to compare list
                </h3>
                <div className="compare-search">
                    <SearchBar isOpen={true} isCompare={true} />
                </div>
                {/* <form className="main-form" action="" method="">
                    <div className="search-form-group">
                        <input type="text" name="" className="search-form-control" placeholder="Search Products..." />
                        <span className="search-has-prepend">
                            <i className="icon-search"></i>
                        </span>
                        <div className="dialog-search-results">
                            <div className="item-search-result">
                                <div className="search-item-img">
                                    <figure>
                                        <img src={require("../../assets/img/2.png")} alt="" />
                                    </figure>
                                </div>
                                <div className="search-item-details">
                                    <h3 className="search-item-name">Ocean Grove Abstract Art Wall Painting On Canvas</h3>
                                    <span className="search-item-price">PKR 45,0000</span>
                                </div>
                            </div>
                            <div className="item-search-result">
                                <div className="search-item-img">
                                    <figure>
                                        <img src={require("../../assets/img/2.png")} alt="" />
                                    </figure>
                                </div>
                                <div className="search-item-details">
                                    <h3 className="search-item-name">Ocean Grove Abstract Art Wall Painting On Canvas</h3>
                                    <span className="search-item-price">PKR 45,0000</span>
                                </div>
                            </div>
                            <div className="item-search-result">
                                <div className="search-item-img">
                                    <figure>
                                        <img src={require("../../assets/img/2.png")} alt="" />
                                    </figure>
                                </div>
                                <div className="search-item-details">
                                    <h3 className="search-item-name">Ocean Grove Abstract Art Wall Painting On Canvas</h3>
                                    <span className="search-item-price">PKR 45,0000</span>
                                </div>
                            </div>
                            <div className="item-search-result">
                                <div className="search-item-img">
                                    <figure>
                                        <img src={require("../../assets/img/2.png")} alt="" />
                                    </figure>
                                </div>
                                <div className="search-item-details">
                                    <h3 className="search-item-name">Ocean Grove Abstract Art Wall Painting On Canvas</h3>
                                    <span className="search-item-price">PKR 45,0000</span>
                                </div>
                            </div>
                            <div className="item-search-result">
                                <div className="search-item-img">
                                    <figure>
                                        <img src={require("../../assets/img/2.png")} alt="" />
                                    </figure>
                                </div>
                                <div className="search-item-details">
                                    <h3 className="search-item-name">Ocean Grove Abstract Art Wall Painting On Canvas</h3>
                                    <span className="search-item-price">PKR 45,0000</span>
                                </div>
                            </div>
                            <div className="item-search-result">
                                <div className="search-item-img">
                                    <figure>
                                        <img src={require("../../assets/img/2.png")} alt="" />
                                    </figure>
                                </div>
                                <div className="search-item-details">
                                    <h3 className="search-item-name">Ocean Grove Abstract Art Wall Painting On Canvas</h3>
                                    <span className="search-item-price">PKR 45,0000</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </form> */}
            </div>
            {
                itemsList.length ?
                <div className="compare-page">
                <div className="table-wrapper table-responsive">
                    <table className="table">
                     {/* <thead>
                        <tr className="th-compare">
                            <td>Action</td>
                            <th className="item-row">
                                <button type="button" className="remove-compare">Remove</button>
                            </th>
                            <th className="item-row">
                                <button type="button" className="remove-compare">Remove</button>
                            </th>
                            <th className="item-row">
                                <button type="button" className="remove-compare">Remove</button>
                            </th>
                            <th className="item-row">
                                <button type="button" className="remove-compare">Remove</button>
                            </th>
                        </tr>
                    </thead>  */}
                        {tableBody}
                    </table>
                </div>
            </div> : null
            }
        </div>
        </Fragment>
    );
}

export default classify(defaultClasses)(Compareproducts);
