import React, {Fragment, useEffect, useState} from "react";

import {useBannerSlider} from "@magento/peregrine/lib/talons/BannerSliders/useBannerSlider";
import Sliders from './sliders';

const CatalogSlider=(props)=>{
    const { setFlage } = props;
    const [slider,setSlider]=useState([]);

    const talonProps=useBannerSlider();

    const {data}=talonProps;

    useEffect(() => {
        if (data && data.getSliders) {
            setSlider(data.getSliders);
            setFlage(true);
        }
    }, [data])

    return(<Fragment>
        {slider.map(items => <Sliders key={items.index} slider={items} />)}
    </Fragment>);

}
export default CatalogSlider;
