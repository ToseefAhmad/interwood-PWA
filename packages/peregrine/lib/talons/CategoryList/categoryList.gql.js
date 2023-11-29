import { gql } from '@apollo/client';

export const GET_CATEGORY_LIST = gql`
    query GetCategoryList($id: Int!) {
        category(id: $id) {
            id
            is_anchor
            children {
                id
                name
                url_key
                url_path
                url_suffix
                is_anchor
                children_count
                path
                image
                productImagePreview: products(pageSize: 1) {
                    items {
                        id
                        small_image {
                            url
                            label
                        }
                    }
                }
            }
        }
    }
`;

export default {
    getCategoryListQuery: GET_CATEGORY_LIST
};
