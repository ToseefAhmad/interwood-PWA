import React from "react";
import classify from '../../classify';
import defaultClasses from './PromotionalPage.css';
import PromotionalBanner from "../PromotionalBanner";
import BestSeller from "../BestSeller";
import CmsBlock from '../CmsBlock';

const PromotionalPage = () => {
    return(
        <div>
            <PromotionalBanner/>
        <CmsBlock identifiers={'landing_page_grid'}/>

            <BestSeller/>

        </div>
    );
};

export default classify(defaultClasses)(PromotionalPage);




