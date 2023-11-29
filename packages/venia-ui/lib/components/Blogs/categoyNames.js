import React from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Route, Switch, useLocation } from 'react-router-dom';

const CategoryNames = props => {
    const { pathname } = useLocation();
    const { item, index, setTab, showTab } = props;
    const params = useParams();
    const { category, blogs } = item;
    let link = null;
    if (pathname === props.history) {
        link = category;


    }
    else {
        // let root = window.location.origin;
        link = `/blogs-page/${category}`;
    }

    const name = showTab === index ? "item-active" : "tabs-pane";


    return (
        <>
            {/* <input type="radio" name="tabs" id={index} onClick={()=>setTab(index)}/> */}
            {blogs ?
                <Link to={{ pathname: `${link}`, state: { blogs: blogs, category: category, show: index } }} ><label htmlFor="tabone" className={name} id={index} onClick={() => setTab(index)}>{category}</label></Link>
                : null
            }
        </>

    )
}

export default CategoryNames;