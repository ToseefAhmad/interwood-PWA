import { useQuery} from '@apollo/client';

import mergeOperations from "../../util/shallowMerge";
import DEFAULT_OPERATIONS from "./emi.gql";

export const useBanks = () => {

    const operations = mergeOperations(DEFAULT_OPERATIONS);
    const {
        getBankName
    } = operations;

    const {data ,error, loading}=useQuery(getBankName);

    return {
        data,
        error,
        loading
    }
};
