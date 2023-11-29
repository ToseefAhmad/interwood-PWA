import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';

// CUSTOMS COMPONENTS
import GalleryItem from "../Gallery/item";
import LoadingIndicator from '../LoadingIndicator';


// CSS MODULE STYLING
import styles from "./DailyFlashSale.module.css";

// GET BEST SELLET TEMPORARY QUERY
import { useBestSeller } from "@magento/peregrine/lib/talons/BestSeller/useBestSeller";


// GLOBAL FUNCTION
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

const DailyFlashSale = () => {

    // STATE VALUE FOR FOR SCREEN SIZES
    const [width, setWidth] = useState(window.innerWidth);

    const talonProps = useBestSeller();
    const { data, error, loading } = talonProps;

    let slidesToShow = null;

    if (width > 990) {
        slidesToShow = 4;
    }
    else if (width > 700 && width < 990) {
        slidesToShow = 3
    }
    else {
        slidesToShow = 1;
    }
    // REACT SLICK SLIDER SETTING
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: slidesToShow,
        slidesToScroll: slidesToShow
    };

    // USE EFFECT TO SET WIDTH STATE WHENEVER WIDTH CHNAGES
    useEffect(() => {
        window.addEventListener('resize', () => {
            setWidth(window.innerWidth);
        });
    }, [])


    if (loading) {
        return <LoadingIndicator></LoadingIndicator>;
    }

    const { getBestSellers } = data;

    return (
        <section className={styles.DailyFlashSale}>
            <div className={styles.DailyFlashSale__TimerAndTitle}>
                <div className={styles.DailyFlashSale__TitleContainer}>
                    <h1 className={styles.DailyFlashSale__Title}>
                        Daily Flash Sale
                    </h1>
                    <p className={styles.DailyFlashSale__Text}>Instant discount on instant purchases</p>
                </div>
                <div className={styles.DailyFlashSale__TimerContainer}>
                    <div className={styles.DailyFlashSale__Time}>
                        <div className={styles.DailyFlashSale__hour}>
                            <p>0</p>
                            <span className={styles.DailyFlashSale__HourText}>
                                hours
                            </span>
                        </div>
                        <div className={styles.DailyFlashSale__minute}>
                            <p>6</p>
                            <span className={styles.DailyFlashSale__MinsText}>
                                mins
                            </span>
                        </div>
                        <div className={styles.DailyFlashSale__second}>
                            <p>7</p>
                            <span className={styles.DailyFlashSale__SecText}>
                                secs
                            </span>

                        </div>
                    </div>
                </div>
            </div>
            <div data-element="DailyFlashSale__ItemsSlider" className={styles.DailyFlashSale__ItemsSlider}>
                <Slider {...settings}>
                    {
                        getBestSellers.map((item) => {
                            if (item.stock_status === 'OUT_OF_STOCK') {
                                return null;
                            }
                            return <GalleryItem key={item.id} item={mapGalleryItem(item)} list={{ categoryName: 'Best Selling ', listName: 'Best Selling ' }} />
                        })
                    }
                </Slider>
            </div>
        </section>
    )
}

export default DailyFlashSale