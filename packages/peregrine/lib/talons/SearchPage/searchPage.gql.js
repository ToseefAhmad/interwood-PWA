import { gql } from '@apollo/client';

export const GET_PAGE_SIZE = gql`
    query getPageSize {
        storeConfig {
            id
            grid_per_page
        }
    }
`;

export const GET_PRODUCT_FILTERS_BY_SEARCH = gql`
    query getProductFiltersBySearch($search: String!) {
        products(search: $search) {
            aggregations {
                label
                count
                attribute_code
                options {
                    label
                    value
                }
            }
        }
    }
`;

export const PRODUCT_SEARCH = gql`
    query ProductSearch(
        $currentPage: Int = 1
        $inputText: String!
        $pageSize: Int = 6
        $filters: ProductAttributeFilterInput!
        $sort: ProductAttributeSortInput
    ) {
        products(
            currentPage: $currentPage
            pageSize: $pageSize
            search: $inputText
            filter: $filters
            sort: $sort
        ) {
            items {
                id
                name
                design_attribute
                other_labels
                custom_label
                stock_status
                callForPrice
                created_at
                special_price
                group_product_sum
                group_product_url
                redirect
                seoJson
                newpArrival
                hover {
                    url
                }
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
                small_image {
                    url
                    label
                }
                url_key
                url_suffix
                price {
                    regularPrice {
                        amount {
                            value
                            currency
                        }
                    }
                }
            }
            page_info {
                total_pages
            }
            total_count
        }
    }
`;

export const GET_FILTER_INPUTS = gql`
    query GetFilterInputsForSearch {
        __type(name: "ProductAttributeFilterInput") {
            inputFields {
                name
                type {
                    name
                }
            }
        }
    }
`;

export default {
    getFilterInputsQuery: GET_FILTER_INPUTS,
    getPageSize: GET_PAGE_SIZE,
    getProductFiltersBySearchQuery: GET_PRODUCT_FILTERS_BY_SEARCH,
    productSearchQuery: PRODUCT_SEARCH
};
