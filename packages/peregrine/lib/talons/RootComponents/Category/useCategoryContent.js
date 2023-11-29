import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLazyQuery } from '@apollo/client';

import mergeOperations from '../../../util/shallowMerge';
import { useAppContext } from '../../../context/app';

import DEFAULT_OPERATIONS from './categoryContent.gql';
import { useScrollPercentage } from 'react-scroll-percentage'

const DRAWER_NAME = 'filter';

/**
 * Returns props necessary to render the categoryContent component.
 *
 * @param {object} props.data - The results of a getCategory GraphQL query.
 *
 * @returns {object} result
 * @returns {number} result.categoryId - This category's ID.
 * @returns {string} result.categoryName - This category's name.
 * @returns {object} result.filters - The filters object.
 * @returns {func}   result.handleLoadFilters - A callback function to signal the user's intent to interact with the filters.
 * @returns {func}   result.handleOpenFilters - A callback function that actually opens the filter drawer.
 * @returns {object} result.items - The items in this category.
 * @returns {bool}   result.loadFilters - Whether or not the user has signalled their intent to interact with the filters.
 * @returns {string} result.pageTitle - The text to put in the browser tab for this page.
 */
export const useCategoryContent = props => {
    const { categoryId, data, pageSize = 6 } = props;

    const [ref, percentage] = useScrollPercentage({
        /* Optional options */
        threshold: 0,
      })
      useMemo(() => {

      }, [ref, percentage])
    const operations = mergeOperations(DEFAULT_OPERATIONS, props.operations);
    const { getProductFiltersByCategoryQuery } = operations;

    const placeholderItems = Array.from({ length: pageSize }).fill(null);
    const [loadFilters, setLoadFilters] = useState(false);
    const [ listItems, setListItems ] = useState(placeholderItems);
    const [tempPageSize , setTempPageSize ] = useState(20);

    const [, { toggleDrawer }] = useAppContext();

    const handleLoadFilters = useCallback(() => {
        setLoadFilters(true);
    }, [setLoadFilters]);
    const handleOpenFilters = useCallback(() => {
        setLoadFilters(true);
        toggleDrawer(DRAWER_NAME);
    }, [setLoadFilters, toggleDrawer]);

    const [getFilters, { data: filterData }] = useLazyQuery(
        getProductFiltersByCategoryQuery,
        {
            fetchPolicy: 'cache-and-network',
            // nextFetchPolicy: 'cache-first'
        }
    );

    useEffect(() => {
        if (categoryId) {
            getFilters({
                variables: {
                    categoryIdFilter: {
                        eq: categoryId
                    }
                }
            });
        }
    }, [categoryId, getFilters]);

    const filters = filterData ? filterData.products.aggregations : null;
    const itemsData = data ? data.products.items : placeholderItems;

    useEffect(() => {
        if(itemsData[0] != null || itemsData.length == 0){
            let tempData = [];
            itemsData.forEach((item, index) =>{
                if(index <= tempPageSize )
                    tempData.push(item);
            });
            setListItems(tempData)
        }
    }, [itemsData, setListItems, tempPageSize]);

    const fetchMore = useCallback(() =>{
        if(itemsData.length > listItems.length ) {
            const tempLength = itemsData.length % 2;
            let tempData = [];
            let tempSize =  tempLength === 0 ? tempPageSize + 21 : tempPageSize + 21;
            itemsData.forEach((item, index) =>{
                if(index <= tempSize )
                    tempData.push(item);
            });
            setListItems(tempData);
            setTempPageSize(tempSize);
        }

    }, [itemsData, tempPageSize, setListItems, setTempPageSize]);

    let isFetchMore = listItems[0] !== null &&  listItems.length < itemsData.length ? true : false;

    const totalPagesFromData = data
        ? data.products.page_info.total_pages
        : null;
    const categoryName = data && data.category.name ? data.category.name : null;
    const categoryDescription = data && data.category.description ? data.category.description : null;
    const categoryImage=data && data.category.image ? data.category.image :null;
    const isAnchor=data && data.category.is_anchor ? data.category.is_anchor :null;
    // Note: STORE_NAME is injected by Webpack at build time.
    const pageTitle = categoryName
        ? `${categoryName} - ${STORE_NAME}`
        : STORE_NAME;

    return {
        categoryName,
        categoryDescription,
        categoryImage,
        filters,
        handleLoadFilters,
        handleOpenFilters,
        items : listItems,
        loadFilters,
        pageTitle,
        totalPagesFromData,
        fetchMore,
        isFetchMore,
        isAnchor
    };
};
