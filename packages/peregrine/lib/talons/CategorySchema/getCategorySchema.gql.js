import {gql} from '@apollo/client';

export const GET_CATEGORY_SCHEMA = gql`
    query getCategoryPageSchema($category_id:Int!) {
        getCategoryPageSchema(category_id:$category_id)
    }
`;

export default {
    getCategoryPageSchema:GET_CATEGORY_SCHEMA
};
