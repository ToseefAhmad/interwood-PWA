import React from "react";
import classify from '../../classify';
import defaultClasses from './shopByCategory.css';
import CmsBlock from '../CmsBlock';

const shopByCategory = (props) => {


    return (

        <div className="">
            <CmsBlock identifiers={'shop_categories'} />
        </div>
    )
}

export default classify(defaultClasses)(shopByCategory);
