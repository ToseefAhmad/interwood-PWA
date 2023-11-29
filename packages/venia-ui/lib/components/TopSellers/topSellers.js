import React, { Component } from 'react';
import { shape, string } from 'prop-types';
import classify from '../../classify';
import Slider from 'react-slick';
import defaultClasses from './topSellers.css';

export class topSellers extends Component {
    static propTypes = {
        classes: shape({
            root: string,
            slides: string
        })
    };
    render() {
        const { classes } = this.props;

        var bestSellersSettings = {
            dots: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            verticalSwiping: false
        };

        return(

            <div className="fourcols">
                <Slider {...bestSellersSettings}>
                    <div className="item column-3">
                        <div className="info-product">
                            <figure>
                                <a href="product.html">
                                    <img src={require("../../assets/img/products/product-1.jpg")} />
                                </a>
                                <div className="label-group">
                                    <span className="product-label label-sale">-30%</span>
                                </div>
                                <div className="btn-icon-group">
                                    <button className="btn-icon btn-add-cart" data-toggle="modal"
                                            data-target="#addCartModal"><img src={require("../../assets/img/shopping-cart.svg")} alt="Crat" />
                                    </button>
                                    <a href="#" className="btn-recycle"><img src={require("../../assets/img/compare.svg")} alt="Compare" /></a>
                                    <a href="#" className="btn-icon-wish"><img src={require("../../assets/img/heart.svg")} alt="Heart" /></a>
                                </div>
                            </figure>
                            <div className="product-details">
                                <div className="category-wrap">
                                    <div className="category-list">
                                        <a href="category.html" className="product-category">category</a>
                                    </div>
                                </div>
                                <h3 className="product-title">
                                    <a href="product.html">Product Short Name Product Short Name Product Short Name Product
                                        Short Name</a>
                                </h3>
                                <div className="ratings-container">
                                    <div className="product-ratings">
                                        <span className="ratings" style="width:100%"></span>
                                        <span className="tooltiptext tooltip-top"></span>
                                    </div>
                                </div>
                                <div className="price-box">
                                    <span className="product-price">PKR 49.00</span>
                                    <span className="old-price">PKR <span>59.00</span></span>
                                </div>
                                <div className="product-attributes">
                                    <ul>
                                        <li><a href="#">Bedside Table</a></li>
                                        <li><a href="#">Dresser</a></li>
                                        <li><a href="#">Mirror</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="item column-3">
                        <div className="info-product">
                            <figure>
                                <a href="product.html">
                                    <img src={require("../../assets/img/products/product-2.jpg")} />
                                </a>
                                <div className="label-group">
                                    <span className="product-label label-hot">HOT</span>
                                </div>
                                <div className="btn-icon-group">
                                    <button className="btn-icon btn-add-cart" data-toggle="modal"
                                            data-target="#addCartModal"><img src={require("../../assets/img/shopping-cart.svg")} alt="Crat" />
                                    </button>
                                    <a href="#" className="btn-recycle"><img src={require("../../assets/img/compare.svg")} alt="Compare" /></a>
                                    <a href="#" className="btn-icon-wish"><img src={require("../../assets/img/heart.svg")} alt="Heart" /></a>
                                </div>
                            </figure>
                            <div className="product-details">
                                <div className="category-wrap">
                                    <div className="category-list">
                                        <a href="category.html" className="product-category">category</a>
                                    </div>
                                </div>
                                <h3 className="product-title">
                                    <a href="product.html">Product Short Name</a>
                                </h3>
                                <div className="ratings-container">
                                    <div className="product-ratings">
                                        <span className="ratings" style="width:100%"></span>
                                        <span className="tooltiptext tooltip-top"></span>
                                    </div>
                                </div>
                                <div className="price-box">
                                    <span className="product-price">PKR 49.00</span>
                                    <span className="old-price">PKR <span>59.00</span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="item column-3">
                        <div className="info-product">
                            <figure>
                                <a href="product.html">
                                    <img src={require("../../assets/img/products/product-3.jpg")} alt="" />
                                </a>
                                <div className="label-group">
                                    <span className="product-label label-sale">-20% OFF</span>
                                </div>
                                <div className="btn-icon-group">
                                    <button className="btn-icon btn-add-cart" data-toggle="modal"
                                            data-target="#addCartModal"><img src={require("../../assets/img/shopping-cart.svg")} alt="Crat" />
                                    </button>
                                    <a href="#" className="btn-recycle"><img src={require("../../assets/img/compare.svg")} alt="Compare" /></a>
                                    <a href="#" className="btn-icon-wish"><img src={require("../../assets/img/heart.svg")} alt="Heart" /></a>
                                </div>
                            </figure>
                            <div className="product-details">
                                <div className="category-wrap">
                                    <div className="category-list">
                                        <a href="category.html" className="product-category">category</a>
                                    </div>
                                </div>
                                <h3 className="product-title">
                                    <a href="product.html">Product Short Name</a>
                                </h3>
                                <div className="ratings-container">
                                    <div className="product-ratings">
                                        <span className="ratings" style="width:100%"></span>
                                        <span className="tooltiptext tooltip-top">5.00</span>
                                    </div>
                                </div>
                                <div className="price-box">
                                    <span className="product-price">PKR 49.00</span>
                                    <span className="old-price">PKR <span>59.00</span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="item column-3">
                        <div className="info-product">
                            <figure>
                                <a href="product.html">
                                    <img src={require("../../assets/img/products/product-4.jpg")} alt="" />
                                </a>
                                <div className="label-group">
                                    <span className="product-label label-sale">30% Off</span>
                                </div>
                                <div className="btn-icon-group">
                                    <button className="btn-icon btn-add-cart" data-toggle="modal"
                                            data-target="#addCartModal"><img src={require("../../assets/img/shopping-cart.svg")} alt="Crat" />
                                    </button>
                                    <a href="#" className="btn-recycle"><img src={require("../../assets/img/compare.svg")} alt="Compare" /></a>
                                    <a href="#" className="btn-icon-wish"><img src={require("../../assets/img/heart.svg")} alt="Heart" /></a>
                                </div>
                            </figure>
                            <div className="product-details">
                                <div className="category-wrap">
                                    <div className="category-list">
                                        <a href="category.html" className="product-category">category</a>
                                    </div>
                                </div>
                                <h3 className="product-title">
                                    <a href="product.html">Product Short Name Product Short Name Product Short Name Product
                                        Short Name</a>
                                </h3>
                                <div className="ratings-container">
                                    <div className="product-ratings">
                                        <span className="ratings" style="width:100%"></span>
                                        <span className="tooltiptext tooltip-top"></span>
                                    </div>
                                </div>
                                <div className="price-box">
                                    <span className="product-price">PKR 49.00</span>
                                    <span className="old-price">PKR <span>59.00</span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="item column-3">
                        <div className="info-product">
                            <figure>
                                <a href="product.html">
                                    <img src={require("../../assets/img/products/product-5.jpg")} alt="" />
                                </a>
                                <div className="label-group">
                                    <span className="product-label label-hot">HOT</span>
                                </div>
                                <div className="btn-icon-group">
                                    <button className="btn-icon btn-add-cart" data-toggle="modal"
                                            data-target="#addCartModal"><img src={require("../../assets/img/shopping-cart.svg")} alt="Crat" />
                                    </button>
                                    <a href="#" className="btn-recycle"><img src={require("../../assets/img/compare.svg")} alt="Compare" /></a>
                                    <a href="#" className="btn-icon-wish"><img src={require("../../assets/img/heart.svg")} alt="Heart" /></a>
                                </div>
                            </figure>
                            <div className="product-details">
                                <div className="category-wrap">
                                    <div className="category-list">
                                        <a href="category.html" className="product-category">category</a>
                                    </div>
                                </div>
                                <h3 className="product-title">
                                    <a href="product.html">Product Short Name</a>
                                </h3>
                                <div className="ratings-container">
                                    <div className="product-ratings">
                                        <span className="ratings" style="width:100%"></span>
                                        <span className="tooltiptext tooltip-top"></span>
                                    </div>
                                </div>
                                <div className="price-box">
                                    <span className="product-price">PKR 49.00</span>
                                    <span className="old-price">PKR <span>59.00</span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="item column-3">
                        <div className="info-product">
                            <figure>
                                <a href="product.html">
                                    <img src={require("../../assets/img/products/product-6.jpg")} alt="" />
                                </a>
                                <div className="label-group">
                                    <span className="product-label label-sale">-20%</span>
                                </div>
                                <div className="btn-icon-group">
                                    <button className="btn-icon btn-add-cart" data-toggle="modal"
                                            data-target="#addCartModal"><img src={require("../../assets/img/shopping-cart.svg")} alt="Crat" />
                                    </button>
                                    <a href="#" className="btn-recycle"><img src={require("../../assets/img/compare.svg")} alt="Compare" /></a>
                                    <a href="#" className="btn-icon-wish"><img src={require("../../assets/img/heart.svg")} alt="Heart" /></a>
                                </div>
                            </figure>
                            <div className="product-details">
                                <div className="category-wrap">
                                    <div className="category-list">
                                        <a href="category.html" className="product-category">category</a>
                                    </div>
                                </div>
                                <h3 className="product-title">
                                    <a href="product.html">Product Short Name</a>
                                </h3>
                                <div className="ratings-container">
                                    <div className="product-ratings">
                                        <span className="ratings" style="width:100%"></span>
                                        <span className="tooltiptext tooltip-top">5.00</span>
                                    </div>
                                </div>
                                <div className="price-box">
                                    <span className="product-price">PKR 49.00</span>
                                    <span className="old-price">PKR <span>59.00</span></span>
                                </div>
                            </div>
                        </div>
                    </div>

                </Slider>
            </div>
        )
    }

}

export default classify(defaultClasses)(topSellers);
