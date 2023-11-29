import React, {Fragment, useEffect, useState} from "react";

import {useRecentlyViewed} from "@magento/peregrine/lib/talons/RecentlyViewed/useRecentlyViewed";
import LoadingIndicator from "../LoadingIndicator";
import defaultClasses from "./recentlyViewed.css";
import ShowRecentlyViewed from "./showRecentlyViewed";
import classify from '../../classify';
import SlickSlider from 'react-slick';
import GalleryItem from "../Gallery/item";

const mapGalleryItem = item => {
    const { small_image ,name} = item;
    return {
        ...item,
        small_image:
            typeof small_image === 'object' ? small_image.url : small_image,
        alt_label:
            typeof small_image === 'object' && small_image.label ? small_image.label : name
    };
};

const RecentlyViewed = () => {

    const [fetchError, setError] = useState("");
    const [dataLoading, setDataLoading] = useState(false);
    const [recentlyViewed, setRecentlyViewed] = useState([]);

    // get  recently viewed products
    const talonProps = useRecentlyViewed();
    const {data, error, loading} = talonProps;

    var Settings = {
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

    //set products in state
    useEffect(() => {
        if (loading) {
            setDataLoading(loading)
        } else if (error) {
            setError(error.message)
        } else if (data) {
            setError("");
            setDataLoading(false);
            setRecentlyViewed([...data.getRecentlyViewed]);
        }
    }, [data, error, loading])

    //content
    let content = null;
    if (dataLoading) {
        // content = <LoadingIndicator>{'Loading Recently Viewed Products'}</LoadingIndicator>;
        null
    } else if (fetchError) {
        content = <div><h1> Data Fetching Error: {fetchError}</h1></div>
    } else if (recentlyViewed.length) {
        content = <section className="section-recently-viewed">
            <header className="w-100 title-header text-center">
                <h2><span>Recently</span> Viewed</h2>
            </header>

            <SlickSlider {...Settings}>

            {
                recentlyViewed.map((item, index) =>{
                    return <GalleryItem key={item.id} item={mapGalleryItem(item)} list={{categoryName: 'recently Viewd', listName:'recently Viewd'}} />
                })
            }

            </SlickSlider>

        </section>
    }

    return (
        <Fragment>
               {data ? content : null}
        </Fragment>
    );
}

export default classify(defaultClasses)(RecentlyViewed);
