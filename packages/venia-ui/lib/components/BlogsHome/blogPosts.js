import React from 'react';
import { Link } from 'react-router-dom'
import style from './blogs.css';
// import { resourceUrl } from '@magento/venia-drivers';

const BlogPosts = props => {

    const { item } = props;

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
                    state: { item: item }
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

            <div className='content-container'>
                <h3>
                    <Link to={
                        {
                            pathname: pathName,
                            state: { item: item }
                        }
                    }>{item.name}
                    </Link>
                </h3>
                <time className="date" datatime="20201221"> {publishDate}</time>
                <div className='meta_description'>
                    {item.meta_description}
                </div>
                <div className="btn-area">
                    <Link to={
                        {
                            pathname: pathName,
                            state: { item: item }
                        }
                    } className="btn-read-blog">Read Blog...</Link>
                </div>
            </div>

        </div>);
}

export default BlogPosts;
