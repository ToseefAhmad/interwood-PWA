// DISPLAY INDIVIDUAL DETAILED BLOG PAGE

import React, { Fragment } from "react";
import ReactHtmlParser from 'react-html-parser';
import Blogs from "./blogs";
import { Title } from "../Head";
import { resourceUrl } from '@magento/venia-drivers';
import { Helmet } from 'react-helmet-async';
import { useParams } from "react-router-dom";
import LoadingIndicator from "../LoadingIndicator";
import { useBlogView } from "@magento/peregrine/lib/talons/BlogView/useBlogView";

const BlogView = () => {
    let item = null;
    const params = useParams();
    const { loading, data, error } = useBlogView(params.blog_id);

    if(loading){
        return <LoadingIndicator></LoadingIndicator>
    }

    
    item = data?.blogPostsById[0];
    // if (history.state && history.state.state) {
    //     item = history.state.state.item;
    // }
    const converterDate = (dateStr) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        dateStr = dateStr.replace(/-/g, '/');
        const fullDate = new Date(dateStr);
        return months[fullDate.getMonth()] + ' ' + fullDate.getDate() + ', ' + fullDate.getFullYear();
    }

    // const imageUrl = "https:/interwood.pk/media/mageplaza/blog/post/" + item.image;

    const imageUrl = item && item.image ? `https://interwood.pk/media/mageplaza/blog/post/${item.image}` : null;

    if (item) {

        const publishDate = converterDate(item?.publish_date);
        const content = ReactHtmlParser(item?.post_content);
        return (
            <Fragment>
                <Title>{ item?.meta_title ? item?.meta_title : item?.name}</Title>
                <Helmet>
                    <meta name='tite' content={item?.meta_title} />
                    <meta name='description' content={item?.meta_description} />
                    <meta name='keywords' content={item?.meta_keywords} />
                </Helmet>
                <div className="blog-detail-page">
                    <div className="item-blog-detail">
                        <div className="blog-detail-image">
                            <img src={imageUrl} alt={item?.name} />
                        </div>
                        <div className="blog-info-main">
                            <h3 className="blog-detail-title">{item?.name}</h3>
                            <span className="blog-publisher">By <span className="author-name">{item?.author_name}</span></span>
                            <span className="blog-publish-date">{publishDate}</span>
                        </div>
                        <div className="blog-content">
                            {content}
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }

    return (
        <Fragment>
            <Title>{`Blog View`} - {STORE_NAME}</Title>
            <Blogs />
        </Fragment>
    );
}

export default BlogView;
