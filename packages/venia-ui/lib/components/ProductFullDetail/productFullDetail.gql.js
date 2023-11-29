import { gql } from '@apollo/client';
import { ProductDetailsFragment } from '@magento/peregrine/lib/talons/RootComponents/Product/productDetailFragment.gql';

import { CartTriggerFragment } from '../Header/cartTriggerFragments.gql';
import { MiniCartFragment } from '../MiniCart/miniCart.gql';

export const ADD_CONFIGURABLE_MUTATION = gql`
    mutation addConfigurableProductToCart(
        $cartId: String!
        $quantity: Float!
        $sku: String!
        $parentSku: String!
    ) {
        addConfigurableProductsToCart(
            input: {
                cart_id: $cartId
                cart_items: [
                    {
                        data: { quantity: $quantity, sku: $sku }
                        parent_sku: $parentSku
                    }
                ]
            }
        ) @connection(key: "addConfigurableProductsToCart") {
            cart {
                id
                # Update the cart trigger when adding an item.
                ...CartTriggerFragment
                # Update the mini cart when adding an item.
                ...MiniCartFragment
            }
        }
    }
    ${CartTriggerFragment}
    ${MiniCartFragment}
`;

export const ADD_SIMPLE_MUTATION = gql`
    mutation addSimpleProductToCart(
        $cartId: String!
        $quantity: Float!
        $sku: String!
    ) {
        addSimpleProductsToCart(
            input: {
                cart_id: $cartId
                cart_items: [{ data: { quantity: $quantity, sku: $sku } }]
            }
        ) @connection(key: "addSimpleProductsToCart") {
            cart {
                id
                # Update the cart trigger when adding an item.
                ...CartTriggerFragment
                # Update the mini cart when adding an item.
                ...MiniCartFragment
            }
        }
    }
    ${CartTriggerFragment}
    ${MiniCartFragment}
`;
export const ADD_GROUP_MUTATION = gql`
    mutation addProductsToCart(
        $cartId: String!
        $cartItems: [CartItemInput!]!
    ) {
        addProductsToCart(
            cartId: $cartId
            cartItems: $cartItems
        ){
            cart {
                id
                # Update the cart trigger when adding an item.
                ...CartTriggerFragment
                # Update the mini cart when adding an item.
                ...MiniCartFragment
            }
        }
    }
    ${CartTriggerFragment}
    ${MiniCartFragment}
`;

export const VIRTUAL_PRODUCT_VIEW_QUERY = gql`
    query Product360ImageData(
        $productId: String!
    ) {
      Product360ImageData(productId: $productId) {
        status_360
        path_360
        total_images_360
      }
    }
`;

export const ADD_BUNDLE_PRODUCT_MUTATION = gql`
    mutation addBundleProductMutation (
        $cartId : String!
        $sku : String!
        $quantity : Float!
        $options: [BundleOptionInput!]!
    ){
        addBundleProductsToCart(
            input: {
                cart_id:  $cartId,
                cart_items: [
                    {
                        data : {
                            sku : $sku,
                            quantity: $quantity,
                        }
                        bundle_options: $options
                    }

                ]
            }
        ) @connection(key: "addBundleProductMutation") {
            cart {
                id
                # Update the cart trigger when adding an item.
                ...CartTriggerFragment
                # Update the mini cart when adding an item.
                ...MiniCartFragment
            }
        }
    }
    ${CartTriggerFragment}
    ${MiniCartFragment}
`;
export const GET_RELATED_PRODUCTS = gql`
    query getRelatedProducts (
        $productSku : String!
    ) { 
        products(filter: { sku: { eq:  $productSku } }) {
            items {
              uid
              name
              related_products {
                uid
                name
                sku
                stock_status
                url_key
                url_suffix
                group_product_sum
                hover {
                  url
                }
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
            upsell_products {
                uid
                name
                sku
                stock_status
                url_key
                url_suffix
                group_product_sum
                hover {
                  url
                }
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
