import { useQuery} from '@apollo/client';

import mergeOperations from "../../util/shallowMerge";
import DEFAULT_OPERATIONS from "./emiPlan.gql";

export const useGetTotalAmount = (props) => {

    const operations = mergeOperations(DEFAULT_OPERATIONS);
    const {
        getTotalAmount
    } = operations;

    const {total,bank_id,tenure}=props;

    const {data,error,loading}=useQuery(getTotalAmount,
        {
            variables:{
                total:total,
                bank_id:bank_id,
                tenure:tenure
            }
        });
    return {
        data,
        error,
        loading
    }
};
