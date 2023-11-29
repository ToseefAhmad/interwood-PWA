import React, { Fragment } from "react";
import Banner from "./banner";
import Catalogue from 'react-slick';

const Sliders = (props) => {

    const { slider } = props;
    const { name, banner_slider } = slider;

    var Settings = {
        dots: false,
        infinite: true,
        slidesToShow: 2,
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

    let content = null;

    if (name === 'Catalog') {
        const sorted = [...banner_slider].sort((a, b) => a.position - b.position);
        content = <div className="catalogues-slide"><Catalogue {...Settings}>
            {sorted.map(item => <Banner key={item.index} banner={item} />)}
        </Catalogue></div>
    }
    return (
        <Fragment>
            {content}
        </Fragment>
    )

}

export default Sliders;
