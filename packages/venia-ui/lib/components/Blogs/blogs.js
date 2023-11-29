import React, {Fragment, useEffect, useState} from "react";

import defaultClasses from "./blogs.css";
import {useBlogs} from "@magento/peregrine/lib/talons/Blogs/useBlogs";
import {Title} from "../Head";
import BlogCategories from "./blogCategories";
import CategoryNames from "./categoyNames";


// Functional Component

const Blogs = ()=> {
    const [fetchError, setError] = useState("");
    const [dataLoading, setDataLoading] = useState(false);
    // const [blogPosts, setBlogPost] = useState([]);
    const [blogCategories, setBlogCategories] = useState([]);


    const [showTab,setTab]=useState(1);
    // get  blog posts
    const talonProps = useBlogs();
    const {cbData,cbError,cbLoading} = talonProps;

    //set blogs in state
    useEffect(() => {
        if(cbLoading) {
            setDataLoading(cbLoading)
        }
        else if(cbError)
        {
            setError(cbError.message)
        }
        else if(cbData)
        {
            setError("");
            setDataLoading(false);
            setBlogCategories([...cbData.blogCategories]);
        }
    }, [cbLoading,cbError,cbData])

    //content
    let content = null;
    if (dataLoading) {
        // content = <LoadingIndicator>{'Loading Blog Posts'}</LoadingIndicator>;
        null
    } else if (fetchError) {
        content = <div><h1> Data Fetching Error: {fetchError}</h1></div>
    }
    else if (blogCategories.length)
    {   content =
            <section className="blog-section">
                <div className="blog-main-banner">
                    <img src={require("../../assets/img/Blog_Main_Banner.jpg")} alt=""/>
                </div>
                <header className="title-header">
                    <h2>FROM OUR BLOG</h2>
                </header>
                <div className="blog-categories-list large-sc">
                    {
                        blogCategories.map((blog, index) =>{
                            if(index <= 9 ){
                                return<CategoryNames
                                    setTab={setTab}
                                    showTab={showTab}
                                    key={index}
                                    item={blog}
                                    index={index}
                                />
                            }
                        })
                    }
                </div>
                <section className="blog-categories-list top-nav">
                    <input id="menu-toggle" type="checkbox" />
                    Blogs Categories
                    <label className='menu-button-container' for="menu-toggle">
                        <div className='menu-button'></div>
                    </label>
                    <div className="menu">
                    {
                        blogCategories.map((blog, index) =>{
                            if(index <= 9 ){
                                return<CategoryNames
                                    setTab={setTab}
                                    showTab={showTab}
                                    key={index}
                                    item={blog}
                                    index={index}
                                />
                            }
                        })
                    }
                    </div>
                </section>
                <div className="blog-wrapper">
                    {
                        blogCategories.map((blog, index) =>{
                            if(index <= 9 ){
                                return<BlogCategories
                                    setTab={setTab}
                                    showTab={showTab}
                                    key={index}
                                    item={blog}
                                    index={index}
                                />
                            }
                        })
                    }
                </div>
        </section>
    }

    // else if (blogPosts.length) {
    //     content =
    //
    //     <section className="blog-section">
    //         <header className="title-header">
    //             <h2>FROM OUR BLOG</h2>
    //         </header>
    //         <div className="holder mt-3">
    //             {
    //                 blogPosts.map((blog, index) =>{
    //                     if(index <= 9 ){
    //                         return<BlogPosts
    //                             key={blog.post_id}
    //                             item={blog}
    //                         />
    //                     }
    //                 })
    //             }
    //         </div>
    //     </section>
    // }

    return (
        <Fragment>
            <Title>{`Blogs`} - {STORE_NAME}</Title>
            <section className={defaultClasses['blog-section']}>
                <div className="main-container blog-container">
                    {content}
                </div>
            </section>
        </Fragment>
    );
}

export default Blogs;
