import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import CategoryNames from './categoyNames';
import BlogPosts from './blogPosts';
import { useBlogs } from "@magento/peregrine/lib/talons/Blogs/useBlogs";
import LoadingIndicator from "../LoadingIndicator";
import { Title } from "../Head";
import { Helmet } from 'react-helmet-async';

function ParticularCategoryPage() {
    const [blogCategories, setBlogCategories] = useState([]);
    const [fetchError, setError] = useState("");
    const [dataLoading, setDataLoading] = useState(false);

    const talonProps = useBlogs();
    const { cbData, cbError, cbLoading } = talonProps;



    useEffect(() => {
        if (cbLoading) {
            setDataLoading(cbLoading)
        }
        else if (cbError) {
            setError(cbError.message)
        }
        else if (cbData) {
            setError("");
            setDataLoading(false);
            setBlogCategories([...cbData.blogCategories]);
        }
    }, [cbLoading, cbError, cbData])




    const history = useHistory();
    const state = history.location.state;
    const { blogs, category, show, index } = state;
    const [showTab, setTab] = useState(show);
    const blogsList = [...blogs];
    const reversedArray = blogsList.reverse();
    return (
        <>
            <Title>{category}</Title>
            <Helmet>
                <meta name='tite' content={category} />
            </Helmet>
            <section className='blog-section'>
                <div className="blog-main-banner">
                    <img src={require("../../assets/img/Blog_Main_Banner.jpg")} alt="Path not Correct" />
                </div>
                <header className="title-header">
                    <h2>{category} Blogs </h2>
                </header>

                <div className="blog-categories-list large-sc">
                    {
                        blogCategories.map((blog, index) => {
                            if (index <= 9) {
                                return <CategoryNames
                                    setTab={setTab}
                                    showTab={show}
                                    key={index}
                                    item={blog}
                                    index={index}
                                    history={history.location.pathname}
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
                        blogCategories.map((blog, index) => {
                            if (index <= 9) {
                                return <CategoryNames
                                    setTab={setTab}
                                    showTab={show}
                                    key={index}
                                    item={blog}
                                    index={index}
                                    history={history.location.pathname}
                                />
                            }
                        })
                    }
                    </div>
                </section>
                <div className="holder mt-3">
                    {
                        reversedArray.map((blog, index) => {
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
        </>
    )
}

export default ParticularCategoryPage;