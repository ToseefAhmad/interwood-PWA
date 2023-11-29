import React, {Fragment} from "react";
import Banner from "./banner";
import classify from '../../classify';
import SlickSlider from 'react-slick';
import defaultClasses from './promotionalBanner.css';

const Sliders=(props)=>{

    const {slider}=props;
    const {name,banner_slider}=slider;

    // Slider Configurations
    var sliderSettings = {
        dots: true,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        verticalSwiping: false
    };

    let content=null;

   if(name==='Promotional Banner')
   {
      content=<div className="homepage-main-banner"><SlickSlider {...sliderSettings}>
          {banner_slider.map(item => <Banner key={item.index} banner={item} />)}
          </SlickSlider></div>
   }
    return(
        <Fragment>
            {content}
        </Fragment>
    )

}

export default classify(defaultClasses)(Sliders);
