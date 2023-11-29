import { useQuery} from '@apollo/client';

import mergeOperations from "../../util/shallowMerge";
import DEFAULT_OPERATIONS from "./storeLocator.gql";

export const useStoreLocator = () => {

    const operations = mergeOperations(DEFAULT_OPERATIONS);
    const {
        getAllStores,
        getMapsData
    } = operations;


    const {data,error,loading}=useQuery(getAllStores);
    const {data:mapsData,error:mapsError,loading:mapsLoading}=useQuery(getMapsData);

    return {
        data,
        error,
        loading,
        mapsLoading,
        mapsError,
        mapsData
        };
};
