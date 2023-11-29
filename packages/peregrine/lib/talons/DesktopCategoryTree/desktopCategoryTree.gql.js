import { gql } from '@apollo/client';

export const GET_NAVIGATION_MENU_LIST = gql`
    query {
        categories {
        total_count
        items {
            uid
            level
            name
            path
            menu_image
            include_in_menu
            children_count
            children {
            uid
            level
            name
            include_in_menu
            position
            menu_image
            path
            url_path
            url_suffix
            children_count
            children {
                uid
                level
                name
                include_in_menu
                position
                path
                menu_image
                url_path
                url_suffix
                children_count
                children {
                    uid
                    level
                    name
                    include_in_menu
                    position
                    menu_image
                    path
                    url_path
                    url_suffix
                    children_count
                }
            }
            }
        }
        }
    }
`;

export default {
    getNavigationMenuListQuery : GET_NAVIGATION_MENU_LIST
};
