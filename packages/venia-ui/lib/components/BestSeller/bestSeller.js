import React, { Fragment, useEffect, useState } from "react";
import { useBestSeller } from "@magento/peregrine/lib/talons/BestSeller/useBestSeller";
import { useCityLocator } from "@magento/peregrine/lib/talons/CityLocator/useCityLocator";
import LoadingIndicator, { fullPageLoadingIndicator } from "../LoadingIndicator";
import defaultClasses from "./bestSeller.css";
import ShowBestSeller from "./showBestSeller";
import classify from '../../classify';
import SlickSlider from 'react-slick';
import GalleryItem from "../Gallery/item";
import { useHistory } from "react-router-dom";

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

const BestSeller = (props) => {
    const [fetchError, setError] = useState("");
    const [dataLoading, setDataLoading] = useState(false);
    const [bestSellers, setBestSellers] = useState([]);
    const history = useHistory();
    // get  best selling products
    let talonProps = null;

    if (history.location.pathname === `/city/${props.city}`) {
        talonProps = useCityLocator(props.categoryId);
    }
    else {
        talonProps = useBestSeller();
    }


    const { data, error, loading } = talonProps;


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
            setBestSellers([...data.getBestSellers]);
        }
    }, [data, error, loading])

    useEffect(() => {
        if ((history.location.pathname === `/city/${props.city}` && props.categoryId === 26)) {
            dataLoading ? props.productLoaded(dataLoading) : props.productLoaded(dataLoading)
        }
    }, [dataLoading])

    //content
    let content = null;
    if (dataLoading) {
        // content = fullPageLoadingIndicator;
    } else if (fetchError) {
        content = <div><h1> Data Fetching Error: {fetchError}</h1></div>
    } else if (bestSellers.length) {
        // const inStockItems = bestSellers.filter((item) => {
        //     return item.stock_status !== 'OUT_OF_STOCK';
        // });
        // const outOfStockItems = bestSellers.filter((item) => {
        //     return item.stock_status === 'OUT_OF_STOCK'
        // })
        content = <section className="section-top-sellers">
            <header className="w-100 title-header text-center mt-3">
                <h2>{history.location.pathname === `/city/${props.city}` ? props.heading : "Top Sellers"}</h2>
            </header>
            <SlickSlider {...Settings}>
                {/* <div>
                <Gallery items={bestSellers} />
                </div> */}
                {
                    bestSellers.map((item, index) => {
                        if (item.stock_status === 'OUT_OF_STOCK') {
                            return null;
                        }
                        return <GalleryItem key={item.id} item={mapGalleryItem(item)} list={{ categoryName: 'Best Selling ', listName: 'Best Selling ' }} />
                        // <ShowBestSeller
                        //     key={best.id}
                        //     item={best}
                        // />

                    })
                }
            </SlickSlider>
        </section>
    }

    return (
        <Fragment>
            {
                data ? content : null
            }
        </Fragment>
    );
}

export default classify(defaultClasses)(BestSeller);
