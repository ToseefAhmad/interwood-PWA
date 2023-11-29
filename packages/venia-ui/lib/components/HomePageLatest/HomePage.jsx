import React from 'react'
import HomeSchema from '../HomeSchema';
// IMPORTED SEO STYLES FROM HOMEPAGE COMPONENT
import classify from '../../classify';
import defaultClasses from '../HomePage/instagramFeed.css';

import TopBanner from '../TopBanner';
import ShopByCategories from "../ShopByCategory/shopByCategory";
import Catalogue from "../../RootComponents/CMS/Catalogue/catalogue";
import RecentlyViewed from '../RecentlyViewed';
import BlogsHome from '../BlogsHome';
import { Title } from '../Head';
import CmsBlock from '../CmsBlock';
import SectionContainer from '../SectionContainer/SectionContainer';
// import DailyFlashSale from '../DailyFlashSale/DailyFlashSale';


const HomePage = () => {
    return (
        <section className='home-page-conatiner'>
            <HomeSchema />
            <TopBanner />
            <ShopByCategories />
            {/* <DailyFlashSale></DailyFlashSale> */}
            <SectionContainer></SectionContainer>
            <Catalogue />
            <RecentlyViewed />
            <section className='home-page-blogs-section'>
                <BlogsHome />
            </section>
            <Title>{`Interwood | Pakistan's Leading Home & Office Furniture Store`} </Title>
            <article>
                <CmsBlock identifiers={'home_about_block'} />
            </article>
        </section>
    )
}

export default classify(defaultClasses)(HomePage);