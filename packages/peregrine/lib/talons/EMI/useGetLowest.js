import { useQuery} from '@apollo/client';

import mergeOperations from "../../util/shallowMerge";
import DEFAULT_OPERATIONS from "./emi.gql";

export const useGetLowest = (props) => {

    const operations = mergeOperations(DEFAULT_OPERATIONS);
    const {
        getLowestEmi
    } = operations;

    const {product_id}=props;

    const {data}=useQuery(getLowestEmi,
        {
            variables:{
                product_id:product_id
            }
        });
    return {
        data
    }
};
