import React from 'react';
import { Link } from 'react-router-dom'
import style from './blogs.css';
import { resourceUrl } from '@magento/venia-drivers';
import RichContent from '../RichContent/richContent';

const BlogPosts = props => {

    const { item } = props;
    let post_content = <RichContent html={item.post_content}></RichContent>
    const converterDate = (dateStr) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        dateStr = dateStr.replace(/-/g, '/');
        const fullDate = new Date(dateStr);
        return months[fullDate.getMonth()] + ' ' + fullDate.getDate() + ', ' + fullDate.getFullYear();
    }
    const publishDate = converterDate(item.publish_date);

    const pathName = `/blog/${item.post_id}/${item.url_key}`;
    let imageDiv = null;

    if (item.thumbnail) {
        const imageUrl = `https://interwood.pk/media/mageplaza/blog/post/${item.thumbnail}`;
        //  const imageUrl = "https:/interwood.pk/media/mageplaza/blog/post/" + item.image;
        imageDiv = <div className={style['img']}>
            <Link to={
                {
                    pathname: pathName,
                    state: {item: item}
                }
            }>
                <img src={imageUrl} alt={item.name} />
            </Link>
        </div>;
    }

    return (
        <div className="blog-block">
            <figure>
                {imageDiv}
            </figure>
            <h3>
                <Link to={
                    {
                        pathname: pathName,
                        state: {item: item}
                    }
                }>{item.name}
                </Link>
            </h3>
            <p className='content'>{post_content}</p>
            <div class={"publish-info"}>
                <div className="btn-area">
                    <Link to={
                        {
                            pathname: pathName,
                            state: { item: item }
                        }
                    } className="btn-read-blog">Read Blog</Link>
                </div>
                <time className="date" datatime="20201221"><span><img src={require("../../assets/img/Clock.png")} alt="" /> </span>{publishDate}</time>
                <author className="date"><span><img src={require("../../assets/img/author.png")} alt="" /> </span>Megan Habe</author>
            </div>

        </div>);
}

export default BlogPosts;
