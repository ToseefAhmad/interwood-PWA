import React, { Fragment } from "react";
import Image from "../Image";
import { resourceUrl } from '@magento/venia-drivers';

import { UNCONSTRAINED_SIZE_KEY } from "@magento/peregrine/lib/talons/Image/useImage";

const IMAGE_WIDTH = 2450;
const IMAGE_HEIGHT = 700;
const IMAGE_WIDTHS = new Map()
  .set(100, IMAGE_WIDTH)
  .set(UNCONSTRAINED_SIZE_KEY, 2400);
import ReactHtmlParser from "react-html-parser";
import RichContent from "../RichContent/richContent";

const Banner = (props) => {

  const { banner } = props;
  const { title, url_banner, image, content } = banner;
  //  const imageLink = resourceUrl(`media/mageplaza/bannerslider/banner/image${image}`);
  let banner_content = <RichContent html={content} />
  return (
    <Fragment>
      <a href={url_banner}>
        {/*<Image*/}
        {/*    alt={title}*/}
        {/*    height={IMAGE_HEIGHT}*/}
        {/*    resource={imageLink}*/}
        {/*    widths={IMAGE_WIDTHS}*/}
        {/*/>*/}
        {banner_content}
      </a>
    </Fragment>
  );
}

export default Banner;
