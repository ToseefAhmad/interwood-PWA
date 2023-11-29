import { gql } from '@apollo/client';

/*
    This feature is being built ahead of GraphQL coverage that is landing in 2.4.2 of Magento. We're going to mock
    the data based on the approved schema to make removing the mocking layer as seamless as possible.

    @see https://github.com/magento/architecture/blob/master/design-documents/graph-ql/coverage/Wishlist.graphqls
 */
export const GET_CUSTOMER_WISHLIST = gql`
    query GetCustomerWishlist {
        customer{
            wishlist{
                items{
                    id
                    qty
                    product {
                        __typename
                        categories {
                            id
                            breadcrumbs {
                                category_id
                            }
                        }
                        description {
                            html
                        }
                        id
                        group_product_url
                        group_product_sum
                        redirect
                        callForPrice
                        price_range{
                            minimum_price
                            {
                                discount
                                {
                                    percent_off
                                    amount_off
                                }
                                final_price
                                {
                                    value
                                    currency
                                }
                                fixed_product_taxes{
                                    label
                                    amount
                                    {
                                        currency
                                        value
                                    }
                                }
                            }
                            maximum_price
                            {
                                discount
                                {
                                    percent_off
                                    amount_off
                                }
                                final_price
                                {
                                    value
                                    currency
                                }
                                fixed_product_taxes{
                                    label
                                    amount
                                    {
                                        currency
                                        value
                                    }
                                }
                            }
                        }
                        media_gallery_entries {
                            id
                            label
                            position
                            disabled
                            file
                        }
                        meta_title @include(if: true)
                        meta_keyword @include(if: true)
                        meta_description
                        name
                        price {
                            regularPrice {
                                amount {
                                    currency
                                    value
                                }
                            }
                        }
                        sku
                        small_image {
                            url
                            label
                        }
                        url_key
                        url_suffix
                        ... on ConfigurableProduct {
                            configurable_options {
                                attribute_code
                                attribute_id
                                id
                                label
                                values {
                                    default_label
                                    label
                                    store_label
                                    use_default_value
                                    value_index
                                }
                            }
                            variants {
                                attributes {
                                    code
                                    value_index
                                }
                                product {
                                    id
                                    media_gallery_entries {
                                        id
                                        disabled
                                        file
                                        label
                                        position
                                    }
                                    sku
                                    stock_status
                                    price {
                                        regularPrice {
                                            amount {
                                                currency
                                                value
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;

const MOCK_WISHLISTS = [
    {
        id: 123,
        items_count: 1,
        items_v2: [
            {
                __typename: 'ConfigurableWishlistItem',
                id: 1,
                child_sku: 'VD04-PE-XS',
                configurable_options: [
                    { id: 1, option_label: 'Color', value_label: 'Peach' },
                    { id: 2, option_label: 'Size', value_label: 'XS' }
                ],
                product: {
                    id: 1149,
                    image: {
                        label: 'Felicia Maxi Dress',
                        url:
                            'https://master-7rqtwti-mfwmkrjfqvbjk.us-4.magentosite.cloud/media/catalog/product/cache/d3ba9f7bcd3b0724e976dc5144b29c7d/v/d/vd04-pe_main_2.jpg'
                    },
                    name: 'Felicia Maxi Dress',
                    price_range: {
                        maximum_price: {
                            final_price: {
                                currency: 'USD',
                                value: 128
                            }
                        }
                    },
                    sku: 'VD04'
                }
            },
            {
                __typename: 'SimpleWishlistItem',
                id: 2,
                product: {
                    id: 1150,
                    image: {
                        label: 'Silver Sol Earrings',
                        url:
                            'https://master-7rqtwti-mfwmkrjfqvbjk.us-4.magentosite.cloud/media/catalog/product/cache/d3ba9f7bcd3b0724e976dc5144b29c7d/v/a/va15-si_main.jpg'
                    },
                    name: 'Silver Sol Earrings',
                    price_range: {
                        maximum_price: {
                            final_price: {
                                currency: 'USD',
                                value: 48
                            }
                        }
                    },
                    sku: 'VA15-SI-NA'
                }
            }
        ],
        name: 'Favorites',
        sharing_code: null
    }
];

export const CUSTOM_TYPES = {
    Customer: {
        fields: {
            wishlist: {
                read(cached) {
                    return cached;
                }
            }
        }
    }
};

export default {
    queries: {
        getCustomerWishlistQuery: GET_CUSTOMER_WISHLIST
    },
    types: CUSTOM_TYPES
};
