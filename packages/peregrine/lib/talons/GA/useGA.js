import {useQuery} from '@apollo/client';
import mergeOperations from "../../util/shallowMerge";
import DEFAULT_OPERATIONS from "./ga.gql";

export const useGA = () => {

    const operations = mergeOperations(DEFAULT_OPERATIONS);
    const {
        getGaUi
    } = operations;

    const {data}=useQuery(getGaUi);

    return {
        data
    };
};
