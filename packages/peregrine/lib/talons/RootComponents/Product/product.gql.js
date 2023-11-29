import { gql } from '@apollo/client';

import { ProductDetailsFragment } from './productDetailFragment.gql';

export const GET_PRODUCT_DETAIL_QUERY = gql`
    query getProductDetailForProductPage($urlKey: String!) {
        products(filter: { url_key: { eq: $urlKey } }) {
            items {
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
                id
                ...ProductDetailsFragment
            }
        }
    }
    ${ProductDetailsFragment}
`;

export const GET_PRODUCT_LABELS =gql`
    query productLabels($productId : Int!){
        product_label(id: $productId)
        {
            show_label
            name
            value
        }
    }
`;

export default {
    getProductDetailQuery: GET_PRODUCT_DETAIL_QUERY,
    getProductLabels : GET_PRODUCT_LABELS
};
