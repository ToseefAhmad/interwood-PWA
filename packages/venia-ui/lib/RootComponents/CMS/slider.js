import React, { Component } from 'react';
import { shape, string } from 'prop-types';
import defaultClasses from './slider.css';
import classify from '../../classify';
import SlickSlider from 'react-slick';
import CmsBlock from '../../components/CmsBlock';

export class Slider extends Component {
    static propTypes = {
        classes: shape({
            root: string,
            slides: string
        })
    };
    render() {
        const { classes } = this.props;
        var sliderSettings = {
            dots: true,
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            verticalSwiping: false
        };
        return (
            <div className={classes.root}>
                <div className="homepage-main-banner">
                    <SlickSlider {...sliderSettings}>
                        <div className="slide-item">
                            <picture>
                                <source media="(max-width:767px)" srcset={require("../../assets/img/banners/mobile-banner.jpg")} />
                                <img src={require("../../assets/img/banners/Banner.jpg")} alt="" />
                            </picture>
                            <div className="main-banner-content">
                                <h3 className="banner-title-sm">
                                    New 2021
                                </h3>
                                <h3 className="banner-title-lg">
                                    Livingroom Ideas
                                </h3>
                                <p className="banner-discription">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                </p>
                                <a className="main-banner-btn">Discover More</a>
                            </div>
                        </div>
                        <div className="slide-item">
                            <picture>
                                <source media="(max-width:767px)" srcset={require("../../assets/img/banners/mobile-banner.jpg")} />
                                <img src={require("../../assets/img/banners/Banner.jpg")} alt="" />
                            </picture>
                            <div className="main-banner-content">
                                <h3 className="banner-title-sm">
                                    New 2021
                                </h3>
                                <h3 className="banner-title-lg">
                                    Drawingroom Ideas
                                </h3>
                                <p className="banner-discription">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                </p>
                                <a className="main-banner-btn">Discover More</a>
                            </div>
                        </div>
                        <div className="slide-item">
                            <picture>
                                <source media="(max-width:767px)" srcset={require("../../assets/img/banners/mobile-banner.jpg")} />
                                <img src={require("../../assets/img/banners/Banner.jpg")} alt="" />
                            </picture>
                            <div className="main-banner-content">
                                <h3 className="banner-title-sm">
                                    New 2021
                                </h3>
                                <h3 className="banner-title-lg">
                                    Bedroom Ideas
                                </h3>
                                <p className="banner-discription">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                </p>
                                <a className="main-banner-btn">Discover More</a>
                            </div>
                        </div>
                    </SlickSlider>
                </div>
            </div>
        );
    }
}

export default classify(defaultClasses)(Slider);
