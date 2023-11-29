import { gql } from '@apollo/client';

export const ProductListingFragment = gql`
    fragment ProductListingFragment on Cart {
        id
        items {
            id
            product {
                id
                sku
                name
                sku
                url_key
                url_suffix
                design_attribute
                size_attribute
                thumbnail {
                    url
                }
                small_image {
                    url
                    label
                }
                stock_status
            }
            prices {
                price {
                    currency
                    value
                }
            }
            quantity
            ... on ConfigurableCartItem {
                configurable_options {
                    id
                    option_label
                    value_id
                    value_label
                }
            }
        }
    }
`;
