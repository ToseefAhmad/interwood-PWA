import {useQuery} from '@apollo/client';

import mergeOperations from "../../util/shallowMerge";
import DEFAULT_OPERATIONS from "./newArrivals.gql";

export const useNewArrivals = () => {
    const operations = mergeOperations(DEFAULT_OPERATIONS);
    const {
        getNewArrivals
    } = operations;
    const {data,error,loading}=useQuery(getNewArrivals, {
        fetchPolicy: 'cache-and-network',
        // nextFetchPolicy: 'cache-first'
    });


    return {
        data,
        error,
        loading
    };
};
