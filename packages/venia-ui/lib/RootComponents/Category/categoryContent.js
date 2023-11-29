import React, { Fragment, Suspense, useEffect, useMemo, useState } from 'react';
import { array, number, shape, string } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useCategoryContent } from '@magento/peregrine/lib/talons/RootComponents/Category';
import { useScrollPercentage } from 'react-scroll-percentage'

import { mergeClasses } from '../../classify';
import Breadcrumbs from '../../components/Breadcrumbs';
import Button from '../../components/Button';
import Gallery from '../../components/Gallery';
import { Title } from '../../components/Head';
import Pagination from '../../components/Pagination';
import ProductSort from '../../components/ProductSort';
import RichContent from '../../components/RichContent';
import defaultClasses from './category.css';
import NoProductsFound from './NoProductsFound';
import { useLocation } from 'react-router';
import ReactGA from 'react-ga';
const FilterModal = React.lazy(() => import('../../components/FilterModal'));
import ReactHtmlParser from "react-html-parser";
import SubCategoriesTile from '../../components/SubCategoriesTile';

const CategoryContent = props => {
    const { categoryId, data, pageControl, sortProps, pageSize, metaTitle } = props;
    const [currentSort] = sortProps;
    const [scrollPercentAge, setScrollPercentAge] = useState(0);
    const talonProps = useCategoryContent({
        categoryId,
        data,
        pageSize
    });

    useEffect(() => {
        window.scrollTo({
            behavior: 'smooth',
            left: 0,
            top: 0
        });
    }, [data]);

    // useEffect(() => {
    //     ReactGA.initialize('UA-43977906-1');
    //     ReactGA.pageview(window.location.pathname + window.location.search);
    // }, [])

    const [ref, percentage] = useScrollPercentage({
        /* Optional options */
        threshold: 0,
    })
    let tempPercent = percentage.toPrecision(2);


    const {
        categoryName,
        categoryDescription,
        categoryImage,
        filters,
        handleLoadFilters,
        handleOpenFilters,
        items,
        pageTitle,
        totalPagesFromData,
        fetchMore,
        isFetchMore,
        isAnchor
    } = talonProps;

    const subCategories = data && data?.category?.children || [];

    useMemo(() => {
        if (tempPercent == 0.88) {
            fetchMore()
        }
    }, [tempPercent])

    const classes = mergeClasses(defaultClasses, props.classes);
    const location = useLocation();
    let search = location.search;
    let isactive = search.search('%5Bfilter%');

    const maybeFilterButtons = filters ? (
        <Button
            priority={'low'}
            classes={{ root_lowPriority: classes.filterButton }}
            onClick={handleOpenFilters}
            onFocus={handleLoadFilters}
            onMouseOver={handleLoadFilters}
            type="button"
        >
            <FormattedMessage
                id={'categoryContent.filter'}
                defaultMessage={'Filter'}
            />
        </Button>
    ) : null;
    const maybeSortButton =
        filters ? (
            <ProductSort sortProps={sortProps} />
        ) : null;
    const maybeSortContainer =
        totalPagesFromData && filters ? (
            <div className={classes.sortContainer}>
                <FormattedMessage
                    id={'categoryContent.itemsSortedBy'}
                    defaultMessage={'Items sorted by '}
                />
                <span className={classes.sortText}>
                    <FormattedMessage
                        id={currentSort.sortId}
                        defaultMessage={currentSort.sortText}
                    />
                </span>
            </div>
        ) : null;

    // If you want to defer the loading of the FilterModal until user interaction
    // (hover, focus, click), simply add the talon's `loadFilters` prop as
    // part of the conditional here.
    const modal = filters ? <FilterModal filters={filters} /> : null;

    const categoryDescriptionElement = categoryDescription ? (
        <RichContent html={categoryDescription} />
    ) : null;
    const content = totalPagesFromData && items[0] !== null ? (
        <Fragment>
            <section className={classes.gallery} ref={ref} >
                <Gallery items={items} categoryId={categoryId} list={{ 'categoryName': categoryName, listName: ' category' }} />
            </section>
            {/* <div className={classes.pagination}>
                <Pagination pageControl={pageControl} />
            </div> */}
        </Fragment>
    ) : items.length == 0 ?
        <NoProductsFound categoryId={categoryId} /> : null
        ;
    let category_img = null;
    if (categoryImage) {
        category_img = <img src={categoryImage} alt={categoryName} />
    }
    return (
        <Fragment >

            {/* <div className={[defaultClasses["page-main-banner"], " "].join(' ')}>
                <div className={[defaultClasses["page-banner-img"], " "].join(' ')}>
                    {category_img}
                </div>
                <div className={[defaultClasses["banner-text"], " "].join(' ')}>
                   <h2>{categoryName}</h2>
                </div>
            </div> */}
            <SubCategoriesTile items={subCategories} />
            {subCategories.length ? null : <Breadcrumbs categoryId={categoryId} />}
            <Title>{metaTitle != '' ? metaTitle : pageTitle}</Title>
            <article className={[classes.root, "cms-promotional"].join(' ')}>
                {
                    data && data.category && (data.category.display_mode === "PAGE" || data.category.display_mode === "PRODUCTS_AND_PAGE") ?
                        <>
                            {
                                data.category.cms_block && data.category.cms_block.content ?
                                    <div>
                                        {ReactHtmlParser(data.category.cms_block.content)}
                                        {/*<RichContent html={data.category.cms_block.content}/>*/}
                                    </div> : null
                            }
                        </> : null
                }

                {
                    data && data.category && (data.category.display_mode == null || data.category.display_mode === "PRODUCTS" || data.category.display_mode === "PRODUCTS_AND_PAGE") ?
                        <>
                            <section className={[defaultClasses["filter-section"], defaultClasses["filter-section-mobile"], " "].join(' ')}>
                                <div className={[defaultClasses["main-container"], " "].join(' ')}>
                                    <div className={[defaultClasses["filter-area"], " "].join(' ')}>
                                        <ul>
                                            {
                                                maybeSortButton && isAnchor === 1 ?
                                                    <li className={[defaultClasses["filter-sort-item"], isactive != -1 ? defaultClasses["active"] : '', , ""].join(' ')}>
                                                        <a
                                                            className={[defaultClasses["filter-btn"], " "].join(' ')}
                                                            onClick={handleOpenFilters}
                                                            onFocus={handleLoadFilters}
                                                            onMouseOver={handleLoadFilters}

                                                        >
                                                            <img src={require("../../assets/img/filter-icon.svg")} className={[defaultClasses["filter-icons"], ""].join(' ')} alt="filter icon" />
                                                            Filter By
                                                        </a>
                                                    </li> : null
                                            }
                                            <li className={[defaultClasses["filter-sort-item"], " "].join(' ')}>
                                                {maybeSortButton}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </section>
                            {maybeSortContainer}
                            {content}
                            {
                                isFetchMore ?
                                    <button className="btn-load-more" onClick={fetchMore}>Load More</button> :
                                    null
                            }
                        </> : null
                }
                <Suspense fallback={null}>{modal}</Suspense>
                {categoryDescriptionElement}
            </article>
        </Fragment>
    );
};

export default CategoryContent;

CategoryContent.propTypes = {
    classes: shape({
        filterContainer: string,
        sortContainer: string,
        gallery: string,
        headerButtons: string,
        filterButton: string,
        pagination: string,
        root: string,
        title: string
    }),
    // sortProps contains the following structure:
    // [{sortDirection: string, sortAttribute: string, sortText: string},
    // React.Dispatch<React.SetStateAction<{sortDirection: string, sortAttribute: string, sortText: string}]
    sortProps: array,
    pageSize: number
};
