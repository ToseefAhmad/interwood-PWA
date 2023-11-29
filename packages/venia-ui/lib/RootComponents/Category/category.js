import React, { Fragment, useEffect } from 'react';
import { number, shape, string } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Helmet } from 'react-helmet-async';

import { useCategory } from '@magento/peregrine/lib/talons/RootComponents/Category';
import { mergeClasses } from '../../classify';
import LoadingIndicator ,{ fullPageLoadingIndicator } from '../../components/LoadingIndicator';

import CategoryContent from './categoryContent';
import defaultClasses from './category.css';
import { Meta } from '../../components/Head';
import { GET_PAGE_SIZE } from './category.gql';
import CategorySchema from "../../components/CategorySchema";
const Category = props => {
    const { id } = props;

    const talonProps = useCategory({
        id,
        queries: {
            getPageSize: GET_PAGE_SIZE
        }
    });

    useEffect(() => {
        window.scrollTo({
            behavior: 'smooth',
            left: 0,
            top: 0
        });
    }, []);

    const {
        error,
        metaDescription,
        loading,
        categoryData,
        pageControl,
        sortProps,
        pageSize,
        categoryLoading,
        metaKeywords,
        metaTitle,
        metaMenuImage,
        url
    } = talonProps;

    const classes = mergeClasses(defaultClasses, props.classes);

    if (!categoryData) {
        // Show the loading indicator until data has been fetched.
        if (loading) {
            return <LoadingIndicator global={true}>{'Loadding ...'}</LoadingIndicator>;
        }

        if (error && pageControl.currentPage === 1) {
            if (process.env.NODE_ENV !== 'production') {
                console.error(error);
            }

            return (
                <div>
                    <FormattedMessage
                        id={'category.dataFetchError'}
                        defaultMessage={'Data Fetch Error'}
                    />
                </div>
            );
        }
    }

    return (
        <Fragment>
            <Helmet>
                {
                    metaMenuImage ?
                    <meta property="og:image" content={`${window.location.origin}${metaMenuImage}`}/> :
                    <meta property="og:image" content={require("../../assets/img/og_image.jpg")}/> 
                }
                <meta property="og:title" content={metaTitle} />
                <meta property="og:description" content={metaDescription} />
                <meta property="og:url" content={url}/>
                <meta property="og:type" content="catalogue"/>
                <meta name="description" content={metaDescription} />
                <meta name="title" content={metaTitle} />
                <meta name="keywords" content={metaKeywords} />
            </Helmet>
            {/* <Meta name="description" content={metaDescription} /> */}
            {/* <Meta name="title" content={metaTitle} /> */}
            <CategorySchema category_id={id}/>
            {/* <Meta name="keywords" content={metaKeywords} /> */}
            
            <CategoryContent
                categoryId={id}
                classes={classes}
                data={categoryData}
                pageControl={pageControl}
                sortProps={sortProps}
                pageSize={pageSize}
                metaTitle={metaTitle}
            />
            {
                categoryLoading ? <LoadingIndicator>{'Loading..'}</LoadingIndicator> : null
            }
        </Fragment>
    );
};

Category.propTypes = {
    classes: shape({
        gallery: string,
        root: string,
        title: string
    }),
    id: number
};

Category.defaultProps = {
    id: 3
};

export default Category;
