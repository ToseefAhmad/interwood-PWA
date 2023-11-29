import {useQuery} from '@apollo/client';
import mergeOperations from "../../util/shallowMerge";
import DEFAULT_OPERATIONS from "./instagram.gql";

export const useInstagram = () => {

    const operations = mergeOperations(DEFAULT_OPERATIONS);
    const {
        instaId
    } = operations;

    const {data ,error,loading}=useQuery(instaId);

    return {
        data,
        error,
        loading
    };
};
