import {useQuery} from '@apollo/client';
import mergeOperations from "../../util/shallowMerge";
import DEFAULT_OPERATIONS from "../CityLocator/CityLocator.gql";

export const useCityLocator = (category_id) => {
    let id = Number(category_id);
    const operations = mergeOperations(DEFAULT_OPERATIONS);
    const {
       getBestSellers
    } = operations;
    const { data,error,loading } = useQuery(getBestSellers, {
        variables:{
            id:id,
        },
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
    });


    return {
        data,
        error,
        loading
    };
};
