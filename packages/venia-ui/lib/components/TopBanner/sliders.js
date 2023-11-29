import React, {Fragment} from "react";
import Banner from "./banner";
import classify from '../../classify';
import SlickSlider from 'react-slick';
import defaultClasses from './topBanner.css';

const Sliders=(props)=>{

    const {slider}=props;
    const {name,banner_slider}=slider;

    // Slider Configurations
    var sliderSettings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        verticalSwiping: false,
        autoplay: true,
        autoplaySpeed: 3000
    };

    let content=null;

   if(name==='Top Banner')
   {
       const sorted =[...banner_slider].sort((a, b) => a.position - b.position);
      content=<div className="homepage-main-banner"><SlickSlider {...sliderSettings}>
          {sorted.map(item => <Banner key={item.index} banner={item} />)}
          </SlickSlider></div>
   }
    return(
        <Fragment>
            {content}
        </Fragment>
    )

}

export default classify(defaultClasses)(Sliders);
