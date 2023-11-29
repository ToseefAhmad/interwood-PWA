import React, { Fragment, Suspense, useEffect, useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { shape, string } from 'prop-types';
import ReactGA from 'react-ga';

import { useSearchPage } from '@magento/peregrine/lib/talons/SearchPage/useSearchPage';
import { useScrollPercentage } from 'react-scroll-percentage'

import { mergeClasses } from '../../classify';
import Pagination from '../../components/Pagination';
import FilterModal from '../FilterModal';
import Gallery from '../Gallery';
import LoadingIndicator, { fullPageLoadingIndicator } from '../LoadingIndicator';
import ProductSort from '../ProductSort';
import Button from '../Button';

import defaultClasses from './searchPage.css';
import { useLocation } from 'react-router';

const SearchPage = props => {
    const classes = mergeClasses(defaultClasses, props.classes);

    const talonProps = useSearchPage();

    const {
        data,
        error,
        filters,
        loading,
        openDrawer,
        pageControl,
        searchCategory,
        searchTerm,
        sortProps,
        products,
        fetchMore,
        isFetchMore
    } = talonProps;

    // useEffect(() => {
    //     ReactGA.initialize('UA-43977906-1');
    //     ReactGA.pageview(window.location.pathname + window.location.search);
    // }, []);

    useEffect(() => {
        window.scrollTo({
            behavior: 'smooth',
            left: 0,
            top: 0
        });
    }, [data]);

    const [ref, percentage] = useScrollPercentage({
        /* Optional options */
        threshold: 0,
    });

    let tempPercent = percentage.toPrecision(2);
    useMemo(() => {
        if(tempPercent == 0.88) {
            fetchMore()
        }
    }, [tempPercent]);

    const { formatMessage } = useIntl();
    const location = useLocation()
    let search = location.search;
    let isactive = search.search('%5Bfilter%');
    const [currentSort] = sortProps;

    if (!data) {
        // if (loading) return fullPageLoadingIndicator;
        // else
         if (error) {
            return (
                <div className={classes.noResult}>
                    <FormattedMessage
                        id={'searchPage.noResult'}
                        defaultMessage={
                            'No results found. The search term may be missing or invalid.'
                        }
                    />
                </div>
            );
        }
    }
    let content;
    if (products.length === 0 && !loading) {
        content = (
            <div className={classes.noResult}>
                <FormattedMessage
                    id={'searchPage.noResultImportant'}
                    defaultMessage={'No results found!'}
                />
            </div>
        );
    } else if (products.length){
        content = (
            <Fragment>
                <section className={classes.gallery} ref={ref} >
                    <Gallery items={products} list={{'categoryName': searchTerm, listName: 'search list'}}/>
                </section>
                {/* <section className={classes.pagination}>
                    <Pagination pageControl={pageControl} />
                </section> */}
            </Fragment>
        );
    }

    const totalCount = data != undefined &&  data.products.total_count || 0;

    const maybeFilterButtons =
        filters && filters.length ? (
            <Button
                priority={'low'}
                classes={{
                    root_lowPriority: classes.filterButton
                }}
                onClick={openDrawer}
                type="button"
            >
                <FormattedMessage
                    id={'searchPage.filterButton'}
                    defaultMessage={'Filter'}
                />
            </Button>
        ) : null;

    const maybeFilterModal =
        filters && filters.length ? <FilterModal filters={filters} /> : null;

    const maybeSortButton = true ? (
        <ProductSort sortProps={sortProps} />
    ) : null;

    const maybeSortContainer = totalCount ? (
        <span className={classes.sortContainer}>
            <FormattedMessage
                id={'searchPage.sortContainer'}
                defaultMessage={'Items sorted by '}
            />
            <span className={classes.sortText}>
                <FormattedMessage
                    id={currentSort.sortId}
                    defaultMessage={currentSort.sortText}
                />
            </span>
        </span>
    ) : null;

    const searchResultsHeading = searchTerm ? (
        <FormattedMessage
            id={'searchPage.searchTerm'}
            values={{
                highlight: chunks => (
                    <span className={classes.headingHighlight}>{chunks}</span>
                ),
                category: searchCategory,
                term: searchTerm
            }}
            defaultMessage={'Showing results:'}
        />
    ) : (
        <FormattedMessage
            id={'searchPage.searchTermEmpty'}
            defaultMessage={'Showing all results:'}
        />
    );

    return (
        <article className={classes.root}>

            <section className={[defaultClasses["filter-section"], defaultClasses["filter-section-mobile"], " "].join(' ')}>
                <div className={[defaultClasses["main-container"]," "].join(' ')}>
                    <div className={[defaultClasses["filter-area"]," "].join(' ')}>
                        <ul>
                            {
                                maybeSortButton ?
                            
                                <li className={[defaultClasses["filter-sort-item"], isactive != -1 ? defaultClasses["active"] : ' ', " "].join(' ')}>
                                    <a
                                    className={[defaultClasses["filter-btn"]," "].join(' ')}
                                    onClick={openDrawer}
                                    >
                                        <img src={require("../../assets/img/filter-icon.svg")} className={[defaultClasses["filter-icons"],""].join(' ')} alt=""/>
                                        Filter By
                                    </a>
                                </li> : null                
                            }
                            <li className={[defaultClasses["filter-sort-item"]," "].join(' ')}>
                                {maybeSortButton}
                            </li>
                        </ul>
                    </div>
                </div>
            </section>


            <div className={classes.heading}>{searchResultsHeading}</div>
            {content}
            {
                loading ? <LoadingIndicator>{'Loading..'}</LoadingIndicator> : null
            }
            {
                isFetchMore ? <button className="btn-load-more" onClick={fetchMore}> Load More </button> : null
            }
            <Suspense fallback={null}>{maybeFilterModal}</Suspense>
        </article>
    );
};

export default SearchPage;

SearchPage.propTypes = {
    classes: shape({
        noResult: string,
        root: string,
        totalPages: string
    })
};
