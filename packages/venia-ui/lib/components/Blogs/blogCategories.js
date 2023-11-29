import React from 'react';
import BlogPosts from "./blogPosts";

const BlogCategories = props => {
    const {item,index,setTab,showTab}=props;
    const {blogs}=item;
    const {category}=item;
    const name=showTab===index? "tabs active":"tabs";
    const title=showTab===index? "blog-category-selector mbl active":"blog-category-selector mbl";
    return(
        <>
        <h3 id={index} className={title} onClick={()=>setTab(index)}>{category}</h3>
        <div id={index} className={name}>
            <div className="holder mt-3">
                {
                    blogs?   blogs.map((blog, index) =>{
                        if(index <= 9 ){
                            return<BlogPosts
                                key={blog.post_id}
                                item={blog}
                            />
                        }
                    })
                        :null
                }
            </div>
        </div>
        </>
    )
}

export default BlogCategories;
