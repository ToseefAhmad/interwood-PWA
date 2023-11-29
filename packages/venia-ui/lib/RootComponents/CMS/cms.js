import React, { Fragment } from 'react';
import { number, shape, string } from 'prop-types';
import { fullPageLoadingIndicator } from '../../components/LoadingIndicator';
import { useCmsPage } from '@magento/peregrine/lib/talons/Cms/useCmsPage';
import RichContent from '../../components/RichContent';
import CategoryList from '../../components/CategoryList';
import { Meta, Title } from '../../components/Head';
import { mergeClasses } from '../../classify';
import { useIntl } from 'react-intl';
import defaultClasses from './cms.css';
import CmsBlock from '../../components/CmsBlock';
import SlickSlider from './slider';
import ShopByCategories from '../../components/ShopByCategory';
import Catalogue from  './Catalogue/catalogue';
import { Helmet } from 'react-helmet-async';

const CMSPage = props => {
    const { id } = props;

    const talonProps = useCmsPage({ id });
    const {
        cmsPage,
        hasContent,
        rootCategoryId,
        shouldShowLoadingIndicator,
        metaKeywords,
        metaDescription,
        metaTitle
    } = talonProps;
    const { formatMessage } = useIntl();

    if (shouldShowLoadingIndicator) {
        return null;
    }

    const classes = mergeClasses(defaultClasses, props.classes);

    if (hasContent) {
        const {
            content_heading,
            title,
            meta_title,
            meta_description,
            content
        } = cmsPage;

        const headingElement =
            content_heading !== '' ? (
                <h1 className={classes.heading}>{content_heading}</h1>
            ) : null;

        const pageTitle = meta_title || title;

        return (
            <Fragment>
                <Title>{pageTitle}</Title>
                <Meta name="title" content={pageTitle} />
                <Meta name="description" content={meta_description} />
                <Meta name="keywords" content={metaKeywords} />
                {headingElement}
                <RichContent html={content} />
            </Fragment>
        );
    }

    // Fallback to a category list if there is no cms content.
    return (
        <div className="page-default-class">
                {/* <Meta name="title" content={metaTitle} />
                <Meta name="description" content={metaDescription} />
                <Meta name="keywords" content={metaKeywords} /> */}
                <Helmet>
                    <meta property="og:title" content={metaTitle} />
                    <meta property="og:description" content={metaDescription} />
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content={window.location.href}/>
                    <meta property="og:image" content={require("../../assets/img/og_image.jpg")}/>
                    <meta name="title" content={metaTitle} />
                    <meta name="description" content={metaDescription} />
                    <meta name="keywords" content={metaKeywords} />
                </Helmet>
            {/*<SlickSlider />*/}
            {/*<ShopByCategories />*/}
            {/*<Catalogue />*/}
            <CmsBlock identifiers={'seo_content'} />
        </div>
    );
};

CMSPage.propTypes = {
    id: number,
    classes: shape({
        heading: string
    })
};

export default CMSPage;
