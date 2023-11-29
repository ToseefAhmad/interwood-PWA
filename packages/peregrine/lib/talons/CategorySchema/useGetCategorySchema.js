import {useQuery} from '@apollo/client';
import mergeOperations from "../../util/shallowMerge";
import DEFAULT_OPERATIONS from "./getCategorySchema.gql";

export const useGetCategorySchema = (props) => {

    const {category_id} = props;
    const operations = mergeOperations(DEFAULT_OPERATIONS);
    const {
        getCategoryPageSchema
    } = operations;

    const {data} = useQuery(getCategoryPageSchema, {
        variables: {
            category_id: category_id
        }
    });

    return {
        data
    };
};
