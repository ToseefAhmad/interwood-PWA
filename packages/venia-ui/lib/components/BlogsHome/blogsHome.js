import React, { Fragment, useEffect, useState } from "react";

import LoadingIndicator from "../LoadingIndicator";
import defaultClasses from "./blogs.css";
import { useBlogs } from "@magento/peregrine/lib/talons/Blogs/useBlogs";
import BlogPosts from "./blogPosts";
import { Title } from "../Head";


const Blogs = () => {

    const [fetchError, setError] = useState("");
    const [dataLoading, setDataLoading] = useState(false);
    const [blogPosts, setBlogPost] = useState([]);

    // get  blog posts
    const talonProps = useBlogs();
    const { data, error, loading } = talonProps;


    //set blogs in state
    useEffect(() => {
        if (loading) {
            setDataLoading(loading)
        } else if (error) {
            setError(error.message)
        } else if (data) {
            setError("");
            setDataLoading(false);
            const copiedBlogPosts = [...data.blogPosts];
            const reversedArray = copiedBlogPosts.reverse();
            const firstThreeBlogPosts = reversedArray.slice(0, 3)
            setBlogPost(firstThreeBlogPosts);
        }
    }, [data, error, loading])

    //content
    let content = null;
    if (dataLoading) {
        // content = <LoadingIndicator>{'Loading Blog Posts'}</LoadingIndicator>;
        null
    } else if (fetchError) {
        content = <div><h1> Data Fetching Error: {fetchError}</h1></div>
    } else if (blogPosts.length) {
        content =

            <section className="blog-section">
                <header className="title-header">
                    <h2>FROM OUR BLOG</h2>
                </header>


                <div className="holder mt-3">
                    {
                        blogPosts.map((blog, index) => {
                            if (index <= 9) {
                                return <BlogPosts
                                    key={blog.post_id}
                                    item={blog}
                                />
                            }
                        })
                    }
                </div>
            </section>
    }
    return (
        <Fragment>
            <Title>{`Blogs`} - {STORE_NAME}</Title>
            <section className={defaultClasses['blog-section']}>
                <div className="main-container">
                    {content}
                </div>
            </section>
        </Fragment>
    );
}

export default Blogs;
