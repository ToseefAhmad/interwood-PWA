import { useQuery } from '@apollo/client';

import mergeOperations from "../../util/shallowMerge";
import DEFAULT_OPERATIONS from "../BestSeller/bestSeller.gql";

export const useBestSeller = () => {
    const operations = mergeOperations(DEFAULT_OPERATIONS);
    const {
        getBestSellers
    } = operations;
    const { data, error, loading } = useQuery(getBestSellers, {
        fetchPolicy: 'cache-and-network',
    });


    return {
        data,
        error,
        loading
    };
};
