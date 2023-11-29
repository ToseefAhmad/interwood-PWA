import React, { Fragment } from 'react';
import GalleryItem from '../Gallery/item';
import SlickSlider from 'react-slick';
import { mergeClasses } from '../../classify';
import defaultClasses from './cartPage.css';

const mapGalleryItem = item => {
    const { small_image, name } = item;
    return {
        ...item,
        small_image:
            typeof small_image === 'object' ? small_image.url : small_image,
        alt_label:
            typeof small_image === 'object' && small_image.label ? small_image.label : name
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

const CrossSellProducts = (props) => {
    const { items } = props;
    const inStockItems = items.filter((filter) => {
        return item.stock_status !== 'OUT_OF_STOCK';
    })
    const classes = mergeClasses(defaultClasses, props.classes);
    const dataSlider = inStockItems ?
        inStockItems.map((item) => {
            return <GalleryItem item={mapGalleryItem(item)} list={{ categoryName: 'Cross sell Products', listName: 'Cross Sell Products' }} />
        }) : null;

    return (
        <Fragment>
            {inStockItems.length ? <div>
                <header className={[defaultClasses["lowerSliderTitle"], "title-header", "title-related-products", "cross-sell-title"].join(' ')}>
                    <h2>Customers Also Bought</h2>
                </header>
                <SlickSlider {...Settings}>
                    {dataSlider}
                </SlickSlider>
            </div> : null}
        </Fragment>
    )
};

export default CrossSellProducts;
