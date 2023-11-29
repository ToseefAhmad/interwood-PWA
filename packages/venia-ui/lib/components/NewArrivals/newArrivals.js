import React, { Fragment, useEffect, useState } from "react";

import { useNewArrivals } from "@magento/peregrine/lib/talons/NewArrivals/newArrivals";
import defaultClasses from "./newArrivlas.css";
import classify from '../../classify';
import SlickSlider from 'react-slick';
import GalleryItem from "../Gallery/item";

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

const NewArrivals = () => {

    const [fetchError, setError] = useState("");
    const [dataLoading, setDataLoading] = useState(false);
    const [newArrivalsList, setNewArrivalsList] = useState([]);

    // get  best selling products
    const talonProps = useNewArrivals();
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
            setNewArrivalsList([...data.getNewArrivals].reverse());
        }
    }, [data, error, loading])

    let content = null;
    if (dataLoading) {
    } else if (fetchError) {
        content = <div><h1> Data Fetching Error: {fetchError}</h1></div>
    } else if (newArrivalsList.length) {
        const instockItems = newArrivalsList.filter((item) => {
            return item.stock_status !== 'OUT_OF_STOCK';
        });
        // const out_of_stock = newArrivalsList.filter((item) => {
        //     return item.stock_status === 'OUT_OF_STOCK'
        // });
        content = <section className="section-top-sellers">
            <header className="w-100 title-header text-center mt-3">
                <h2><span>New</span> Arrivals</h2>
            </header>
            <SlickSlider {...Settings}>
                {
                    instockItems.map((item, index) => {
                        return <GalleryItem
                            key={item.id} item={mapGalleryItem(item)}
                            list={{ categoryName: 'New arrivals ', listName: 'New Arrivals' }}
                        />

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

export default classify(defaultClasses)(NewArrivals);
