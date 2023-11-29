import React from "react";
import classify from '../../classify';
import defaultClasses from './instagramFeed.css';
import BestSeller from "../BestSeller";
import NewArrivals from "../NewArrivals";
import RecentlyViewed from "../RecentlyViewed";
import SlickSlider from "../../RootComponents/CMS/slider";
import ShopByCategories from "../ShopByCategory/shopByCategory";
import BlogsHome from "../BlogsHome";
import Catalogue from "../../RootComponents/CMS/Catalogue/catalogue";
import CmsBlock from "../CmsBlock/cmsBlock";
import {Title} from "../Head";
import TopBanner from "../TopBanner";
import Instagram from "../Instagram"
import HomeSchema from "../HomeSchema";

const HomePage = () => {
    return (
        <div>
            <h1>Test----- staging</h1>
            <HomeSchema/>
            <TopBanner/>
            <ShopByCategories/>
            <NewArrivals />
            <BestSeller/>
            <Catalogue/>
            <RecentlyViewed/>
            {/* <div className="section-insta-feed">
                <header className="title-header">
                    <h2>INSTAGRAM FEED</h2>
                </header>
                <Instagram />
            </div> */}
            <BlogsHome/>
            <Title>{`Interwood | Pakistan's Leading Home & Office Furniture Store`} </Title>
            <CmsBlock identifiers={'home_about_block'}/>

        </div>
    );
};

export default classify(defaultClasses)(HomePage);




