import {gql} from '@apollo/client';

export const GET_BEST_SELLERS = gql`
    query getBestSellers($id:Int!){
        getBestSellers(category_id:$id){
            __typename
            id
            name
            url_key
            url_suffix
            stock_status
            other_labels
            callForPrice
            group_product_sum
            group_product_url
            redirect
            special_price
            design_attribute
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
            price{
                regularPrice{
                    amount{
                        value
                        currency
                    }
                }
            }
        }
    }
`;


export default {
    getBestSellers:GET_BEST_SELLERS
};
