import {useQuery} from '@apollo/client';

import mergeOperations from "../../util/shallowMerge";
import DEFAULT_OPERATIONS from "./bannerSlider.gql";

export const useBannerSlider = () => {

    const operations = mergeOperations(DEFAULT_OPERATIONS);
    const {
       getSliders
    } = operations;

    const {data, loading}=useQuery(getSliders, {
      fetchPolicy: 'cache-and-network',
      nextFetchPolicy: 'cache-first'
    });

    return {
       data,
       loading
    };
};
