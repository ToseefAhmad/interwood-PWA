import React, {Fragment} from "react";
import ReactHtmlParser from 'react-html-parser';
import BlogsHome from "./blogsHome";
import {Title} from "../Head";
import {  resourceUrl } from '@magento/venia-drivers';

const BlogView=()=>{
let item=null;
    if (history.state && history.state.state) {
        item = history.state.state.item;
    }
    const converterDate = (dateStr) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        dateStr = dateStr.replace(/-/g, '/');
        const fullDate = new Date(dateStr);
        return months[fullDate.getMonth()] + ' ' + fullDate.getDate() + ', ' + fullDate.getFullYear();
    }

    // const imageUrl = "https:/interwood.pk/media/mageplaza/blog/post/" + item.image;

    const imageUrl =item && item.image ? `https://interwood.pk/media/mageplaza/blog/post/${item.image}`:null;

    if(item)
    {

        const publishDate=converterDate(item.publish_date);
        const content = ReactHtmlParser(item.post_content);
        return(
            <Fragment>
                <Title>{`Blog View`} - {STORE_NAME}</Title>
                <div className="blog-detail-page">
                    <div className="item-blog-detail">
                        <div className="blog-detail-image">
                            <img src={imageUrl} alt={item.name} />
                        </div>
                        <div className="blog-info-main">
                            <h3 className="blog-detail-title">{item.name}</h3>
                            <span className="blog-publisher">By <span className="author-name">{item.author_name}</span></span>
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

    return(
     <Fragment>
         <Title>{`Blog View`} - {STORE_NAME}</Title>
         <BlogsHome/>
     </Fragment>
    );
}

export default BlogView;
