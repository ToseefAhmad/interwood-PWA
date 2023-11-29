import { useQuery } from '@apollo/client';
import mergeOperations from '../../../util/shallowMerge';
import DEFAULT_OPERATIONS from './product.gql';

export const useProductLabels = (props) => {
    const { id } = props;
    const operations = mergeOperations(DEFAULT_OPERATIONS, props.operations);
    const { getProductLabels } = operations;

    const {data} = useQuery(getProductLabels, {
        variables : {
            productId : id
        }
    });

    return {
        data
    }
}