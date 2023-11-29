import { useQuery} from '@apollo/client';

import mergeOperations from "../../util/shallowMerge";
import DEFAULT_OPERATIONS from "./storeLocator.gql";

export const useSearchStores = (props) => {
    const operations = mergeOperations(DEFAULT_OPERATIONS);
    const {
        searchStores
    } = operations;

    const { data ,error,loading } = useQuery(searchStores, {
        variables: { "key":props }
    });

    return {
        data,
        error,
        loading
    };
};
