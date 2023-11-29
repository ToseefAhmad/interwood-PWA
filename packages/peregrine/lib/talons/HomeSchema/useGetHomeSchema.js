import {useQuery} from '@apollo/client';
import mergeOperations from "../../util/shallowMerge";
import DEFAULT_OPERATIONS from "./getHomeSchema.gql";

export const useGetHomeSchema = () => {

    const operations = mergeOperations(DEFAULT_OPERATIONS);
    const {
        getHomePageSchema
    } = operations;

    const {data}=useQuery(getHomePageSchema, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
    });

    return {
        data
    };
};
