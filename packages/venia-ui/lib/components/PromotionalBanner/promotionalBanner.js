import React, {Fragment, useEffect, useState} from "react";

import {useBannerSlider} from "@magento/peregrine/lib/talons/BannerSliders/useBannerSlider";
import Sliders from './sliders';
import { fullPageLoadingIndicator } from "../LoadingIndicator";

const promotionalBanner=()=>{

    const [slider,setSlider]=useState([]);

    const talonProps=useBannerSlider();

    const {data,  loading}=talonProps;

    useEffect(() => {
        if (data && data.getSliders) {
            setSlider(data.getSliders);
        }
    }, [data])

    return(<Fragment>
        {
            loading ? fullPageLoadingIndicator : null
        }
        {slider.map(items => <Sliders key={items.index} slider={items} />)}
    </Fragment>);

}
export default promotionalBanner;
