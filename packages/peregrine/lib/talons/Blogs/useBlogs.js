import {useQuery} from '@apollo/client';

import mergeOperations from "../../util/shallowMerge";
import DEFAULT_OPERATIONS from "./blogs.gql";

export const useBlogs = () => {

    const operations = mergeOperations(DEFAULT_OPERATIONS);
    const {
         blogPosts,
        blogCategories
    } = operations;

    const {data ,error,loading}=useQuery(blogPosts, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
    });
    const {data:cbData ,error:cbError,loading:cbLoading}=useQuery(blogCategories, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
    });
    return {
        data,
        error,
        loading,
        cbData,
        cbError,
        cbLoading
    };
};
