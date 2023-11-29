import {gql} from '@apollo/client';

export const GET_RECENTLY_VIEWED = gql`
    query getRecentlyViewed($visitor_id:Int){
        getRecentlyViewed(visitor_id:$visitor_id){
            __typename
            id
            name
            url_key
            url_suffix
            stock_status
            other_labels
            redirect
            group_product_sum
            group_product_url
            callForPrice
        special_price
        design_attribute
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

export const SET_RECENTLY_VIEWED = gql`
    query callObserver($product_id: Int!,$visitor_id:Int){
        callObserver(product_id:$product_id,visitor_id:$visitor_id)
    }
`;

export const GET_VISITOR_ID = gql`
    query getVisitorId{
        getVisitorId
    }
`;

export default {
    getRecentlyViewed:GET_RECENTLY_VIEWED,
    callObserver:SET_RECENTLY_VIEWED,
    getVisitorId:GET_VISITOR_ID
};
