import React, {Fragment} from "react";
import Image from "../Image";
import {  resourceUrl } from '@magento/venia-drivers';

import {UNCONSTRAINED_SIZE_KEY} from "@magento/peregrine/lib/talons/Image/useImage";
import ReactHtmlParser from "react-html-parser";
import RichContent from "../RichContent/richContent";
const IMAGE_WIDTH = 2450;
const IMAGE_HEIGHT = 700;
const IMAGE_WIDTHS = new Map()
    .set(100, IMAGE_WIDTH)
    .set(UNCONSTRAINED_SIZE_KEY, 2400);

const Banner=(props)=>{

    const {banner}=props;
    const {title,url_banner,image,content}=banner;
    //  const imageLink = resourceUrl(`media/mageplaza/bannerslider/banner/image${image}`);
    // let banner_content = ReactHtmlParser(content)
    let banner_content=<RichContent html={content}/>

    return(
      <Fragment>
        {banner_content}
        {/* <a href={url_banner}></a> */}
      </Fragment>

    );
}

export default Banner;
