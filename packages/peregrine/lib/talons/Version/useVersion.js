import {useQuery} from '@apollo/client';
import mergeOperations from "../../util/shallowMerge";
import DEFAULT_OPERATIONS from "./version.gql";

export const useVersion = () => {

    const operations = mergeOperations(DEFAULT_OPERATIONS);
    const {
        PwaVersion
    } = operations;

    const {data}=useQuery(PwaVersion, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
    });

    return {
        data
    };
};
