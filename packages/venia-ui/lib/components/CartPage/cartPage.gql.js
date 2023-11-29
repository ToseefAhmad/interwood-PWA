import { gql } from '@apollo/client';
import { CartPageFragment } from './cartPageFragments.gql';

export const GET_CART_DETAILS = gql`
    query GetCartDetails($cartId: String!) {
        cart(cart_id: $cartId) {
            id
            ...CartPageFragment
        }
    }
    ${CartPageFragment}
`;

export const GET_CROSS_SELL_PRODUCTS = gql`
    query getCorsssellProducts (
        $productSku : String!
    ) { 
        products(filter: { sku: { eq:  $productSku } }) {
            items {
              uid
              name
              crosssell_products {
                uid
                name
                sku
                stock_status
                url_key
                url_suffix
                group_product_sum
                price {
                    regularPrice {
                        amount {
                            currency
                            value
                        }
                    }
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
                __typename
              }
            }
        }
    }
 `;
