import { useEffect } from 'react'
import { useLazyQuery } from '@apollo/client';
import mergeOperations from '../../util/shallowMerge';
import DEFAULT_OPERATIONS from './desktopCategoryTree.gql.js';

export const useDesktopCategoryTree = props => {
    // const { categoryId } = props;
 
    const operations = mergeOperations(DEFAULT_OPERATIONS);
    const { getNavigationMenuListQuery } = operations;

    const [runListQuery, listQueryResult] = useLazyQuery(getNavigationMenuListQuery, {
        fetchPolicy: 'cache-and-network',
        // nextFetchPolicy: 'cache-first'
    });
    const { data, loading } = listQueryResult;

    // fetch categories
    useEffect(() => {
            runListQuery();
    }, [runListQuery]);

    return {
        data,
        loading
    }
}