// ProduProduct_Alert_Notify_InStock ---> GRAPHQL QUERY FOR NOTIFICATION ALERT

import { gql } from "@apollo/client";

const Product_Alert_Notify_InStock = gql`
    mutation ProductAlertNotifyInStock($product_id:Int!,$email:String! ) {
        ProductAlertNotifyInStock(input:{ product_id:$product_id, email:$email}){
            message
            id
        }
    }
`;

export const GET_STORE_CONFIG_DATA = gql`
    query getStoreConfigData {
        storeConfig {
            id
            code
            store_name
            is_back_in_stock_enable
        }
    }
`;

export default {
    getStorConfigData: GET_STORE_CONFIG_DATA,
    ProductAlertNotifyInStock: Product_Alert_Notify_InStock 
};