import { gql } from '@apollo/client';

export const GET_CATEGORY = gql`
    query GetCategories(
        $id: Int!
        $pageSize: Int!
        $currentPage: Int!
        $filters: ProductAttributeFilterInput!
        $sort: ProductAttributeSortInput
    ) {
        category(id: $id) {
            id
            description
            name
            product_count
            meta_title
            is_anchor
            menu_image
            meta_keywords
            meta_description
            image
            cms_block
            {
                content
                title
                identifier

            }
            display_mode
            children {
              id
              name
              canonical_url
              url_key
              url_path
              url_suffix
              image
            }
        }
        products(
            pageSize: $pageSize
            currentPage: $currentPage
            filter: $filters
            sort: $sort
        ) {
            items {
                # id is always required, even if the fragment includes it.
                id
                # TODO: Once this issue is resolved we can use a
                # GalleryItemFragment here:
                # https://github.com/magento/magento2/issues/28584
                name
                group_product_id
                group_product_sum
                group_product_url
                redirect
                custom_label
                other_labels
                stock_status
                callForPrice
                design_attribute
                special_price
                created_at
                newpArrival
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
                price {
                    regularPrice {
                        amount {
                            currency
                            value
                        }
                    }
                }
                small_image {
                    label
                    url
                }
                hover {
                  url
                }
                url_key
                url_suffix
            }
            page_info {
                total_pages
            }
            total_count
        }
    }
`;

export const GET_FILTER_INPUTS = gql`
    query GetFilterInputsForCategory {
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
  getCategoryQuery: GET_CATEGORY,
  getFilterInputsQuery: GET_FILTER_INPUTS
};
