import { gql } from '@apollo/client';

export const GET_NAVIGATION_MENU = gql`
    query GetNavigationMenu($id: Int!) {
        category(id: $id) {
            id
            name
            is_anchor
            children {
                children_count
                id
                is_anchor
                include_in_menu
                name
                position
                url_path
                url_suffix
            }
            include_in_menu
            url_path
            url_suffix
        }
    }
`;

export const GET_NAVIGATION_MENU_LIST = gql`
    query {
        categories {
        total_count
        items {
            uid
            level
            name
            path
            children_count
            children {
            uid
            level
            name
            path
            url_path
            url_suffix
            children_count
            children {
                uid
                level
                name
                path
                url_path
                url_suffix
                children_count
            }
            }
        }
        }
    }
`;

export default {
    getNavigationMenuQuery: GET_NAVIGATION_MENU,
    getNavigationMenuListQuery : GET_NAVIGATION_MENU_LIST
};
