import { useQuery} from '@apollo/client';

import mergeOperations from "../../util/shallowMerge";
import DEFAULT_OPERATIONS from "./emiPlan.gql";

export const useEmiPlan = (props) => {

    const operations = mergeOperations(DEFAULT_OPERATIONS);
    const {
        getEMIPlan
    } = operations;

    const {bank_id}=props;

    const {data ,error, loading}=useQuery(getEMIPlan,
        {
            variables:{
                bank_id:bank_id,
            }
        });

    return {
        data,
        error,
        loading
    }
};
