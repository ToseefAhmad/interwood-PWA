import { useQuery} from '@apollo/client';

import mergeOperations from "../../util/shallowMerge";
import DEFAULT_OPERATIONS from "./emi.gql";

export const useEmi = (props) => {

    const operations = mergeOperations(DEFAULT_OPERATIONS);
    const {
        getEMIDetails
    } = operations;

    const {bank_id,product_id}=props;

    const {data ,error, loading}=useQuery(getEMIDetails,
        {
            variables:{
                bank_id:bank_id,
                product_id:product_id
            }
        });

    return {
        data,
        error,
        loading
    }
};
