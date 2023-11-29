import React, { useEffect, useMemo, useState} from 'react';
import {arrayOf, bool, number, shape, string} from 'prop-types';
import {
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon
} from 'react-feather';

import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { useWindowSize } from '@magento/peregrine';

import { transparentPlaceholder } from '@magento/peregrine/lib/util/images';
import { useProductImageCarousel } from '@magento/peregrine/lib/talons/ProductImageCarousel/useProductImageCarousel';

import { mergeClasses } from '../../classify';
import Icon from '../Icon';
import Image from '../Image';
import defaultClasses from './carousel.css';
import Thumbnail from './thumbnail';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css';
import InnerImageZoom from 'react-inner-image-zoom';
import ReactImageZoom from 'react-image-zoom';
import {Fragment} from 'react';
import ReactPlayer from "react-player";
import Tridi from 'react-tridi';
import 'react-tridi/dist/index.css';

const IMAGE_WIDTH = 540;

/**
 * Carousel component for product images
 * Carousel - Component that holds number of images
 * where typically one image visible, and other
 * images can be navigated through previous and next buttons
 *
 * @typedef ProductImageCarousel
 * @kind functional component
 *
 * @param {props} props
 *
 * @returns {React.Element} React carousel component that displays a product image
 */
const ProductImageCarousel = props => {
    const { images, isNewProduct } = props;

    const talonProps = useProductImageCarousel({
        images,
        imageWidth: IMAGE_WIDTH
    });
    const [playing, setPlaying] = useState(false)
    const {
        currentImage,
        activeItemIndex,
        altText,
        handleNext,
        handlePrevious,
        handleThumbnailClick,
        sortedImages
    } = talonProps;

    const windowSize = useWindowSize();
    const isDesktop = windowSize.innerWidth >= 1024;
    const [isVirtaul, setIsVirtual] = useState( false );

    // create thumbnail image component for every images in sorted order
    const sliderThumbnails = useMemo(
        () =>
            sortedImages.map((item, index) => (
                <Slide index={index} onClick={ () => setIsVirtual(false)}>
                <Thumbnail
                    key={`${item.file}--${item.label}`}
                    item={item}
                    itemIndex={index}
                    isActive={activeItemIndex === index}    
                    onClickHandler={handleThumbnailClick}
                />
                </Slide>
            )),
        [activeItemIndex, handleThumbnailClick, sortedImages]
    );

    const thumbnails = useMemo(
        () =>
            sortedImages.map((item, index) => (
                index < 13 ? <div onClick={ () => setIsVirtual(false)}>    <Thumbnail
                key={`${item.file}--${item.label}`}
                item={item}
                itemIndex={index}
                isActive={activeItemIndex === index}
                onClickHandler={handleThumbnailClick}
            /> </div>: null
            )),
        [activeItemIndex, handleThumbnailClick, sortedImages]
    );

    useEffect(() => {
        document.body.className = "pdp-class";
    }, []);

    const classes = mergeClasses(defaultClasses, props.classes);
    let image;
    if (currentImage.file) {
        if(currentImage.video_content)
        {
          image= <div className="videoplayer-container"><ReactPlayer
              classes={{
                  image: classes.currentImage,
                  root: classes.imageContainer
              }}
              url={currentImage.video_content.video_url}
              playing={playing}
              width='100%'
              height='100%'
              controls
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
          /></div>
        }
        else if (isDesktop) {
            const props = {
                width: IMAGE_WIDTH,
                height: 412,
                zoomWidth: 500,
                img: `https://interwood.pk/media/catalog/product${currentImage.file}`
            };
            image =
                // <InnerImageZoom
                //     width={IMAGE_WIDTH}
                //     zoomType='hover'
                //     src={`https:/interwood.pk/media/catalog/product${currentImage.file}`}
                //     zoomSrc={`https:/interwood.pk/media/catalog/product${currentImage.file}`}
                //     alt={altText}
                //     className={{
                //         image: classes.currentImage,
                //         root: classes.imageContainer
                //     }}
                //     hideHint={true}
                //     zoomPreload={true}
                // />
                <ReactImageZoom {...props}/>
        } else {
            image = <Image
                alt={altText}
                classes={{
                image: classes.currentImage,
                root: classes.imageContainer
                }}
                resource={currentImage.file}
                width={IMAGE_WIDTH}
            />
        }
    } else {
        image = (
            <Image
                alt={altText}
                classes={{
                    image: classes.currentImage_placeholder,
                    root: classes.imageContainer
                }}
                src={transparentPlaceholder}
            />
        );
    }

    const chevronClasses = { root: classes.chevron };
    return (
        <div className={classes.root}>
            <div className={classes.carouselContainer}>
                {
                    props?.isVirtualStatus && !isVirtaul
                    ?    <a
                    className={classes.previousButton}
                    onClick={handlePrevious}
                >
                    <Icon
                        classes={chevronClasses}
                        src={ChevronLeftIcon}
                        size={40}
                    />
                </a> : null
                }
                {!isVirtaul
                ?  image 
                : <div>
                <Tridi 
                        // ref={tridiRef}
                        location={ props.virtualLocation }
                        format="jpg"
                        count={ props.virtualCount }
                        showControlBar
                        inverse
                        pins={[]}
                        dragInterval={4}
                        autoplaySpeed={100}
                        setPins={()=> console.log('nothing')}
                    />  
                    {/* <button onClick={() => tridiRef.current.prev()}>Prev</button>
                    <button onClick={() => tridiRef.current.next()}>Next</button>  */}
                </div>}
                {
                    isNewProduct
                    ? <div className={[defaultClasses["label-group-new-product"], " "].join(' ')}>
                        <span className={[defaultClasses["new-product-label"], defaultClasses["label-sale"]," "].join(' ')}> New Arrival </span>
                    </div> : null
                }
                {
                    props.isVirtualStatus && !isVirtaul
                    ?  <a
                    className={classes.nextButton}
                    onClick={handleNext}
                >
                    <Icon
                        classes={chevronClasses}
                        src={ChevronRightIcon}
                        size={40}
                    />
                </a> :  null
                }
            </div>
            <div className={classes.thumbnailList}>
                {
                    sortedImages.length > 4  && isDesktop ?
                    <Fragment>
                    <CarouselProvider
                        naturalSlideWidth={100}
                        naturalSlideHeight={85}
                        totalSlides={sortedImages.length+1}
                        orientation={"vertical"}
                        visibleSlides={4}
                        step={1}
                    >
                        <ButtonBack className="thumb-slide-prev">
                            <i className="icon-angle-up"></i>
                        </ButtonBack>

                        <Slider>
                            { 
                                props?.isVirtualStatus === "1"
                                ? (
                                    <Slide>
                                    <div className='threesixty-button' onClick={ () => setIsVirtual(true)}>
                                        <img src={require("../../assets/img/360_view.png")} className="threesixty-view-logo" alt=""/>
                                    </div>
                                    </Slide>
                                ) : null}
                            {sliderThumbnails}
                        </Slider>
                        <ButtonNext className="thumb-slide-next">
                            <i className="icon-angle-down"></i>
                        </ButtonNext>
                    </CarouselProvider></Fragment> : <>
                    {
                        props?.isVirtualStatus === "1"
                        ? (
                            <div className='threesixty-button' onClick={ () => setIsVirtual(true)}>
                            <img src={require("../../assets/img/360_view.png")} className="threesixty-view-logo" alt=""/>
                        </div>
                        ) :  null
                    }
                    {thumbnails}
                    </>
                }
        </div>
    </div>
    );
};

/**
 * Props for {@link ProductImageCarousel}
 *
 * @typedef props
 *
 * @property {Object} classes An object containing the class names for the
 * ProductImageCarousel component
 * @property {string} classes.currentImage classes for visible image
 * @property {string} classes.imageContainer classes for image container
 * @property {string} classes.nextButton classes for next button
 * @property {string} classes.previousButton classes for previous button
 * @property {string} classes.root classes for root container
 * @property {Object[]} images Product images input for Carousel
 * @property {string} images.label label for image
 * @property {string} image.position Position of image in Carousel
 * @property {bool} image.disabled Is image disabled
 * @property {string} image.file filePath of image
 */
ProductImageCarousel.propTypes = {
    classes: shape({
        carouselContainer: string,
        currentImage: string,
        currentImage_placeholder: string,
        imageContainer: string,
        nextButton: string,
        previousButton: string,
        root: string
    }),
    images: arrayOf(
        shape({
            label: string,
            position: number,
            disabled: bool,
            file: string.isRequired
        })
    ).isRequired
};

export default ProductImageCarousel;
