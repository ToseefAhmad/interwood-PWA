import { gql } from '@apollo/client';

export const CALL_FOR_PRICE = gql`
    mutation callForPrice(
        $productId: Int!
        $name: String!
        $email :String!
        $phone :String! 
        $city :String!
        $message :String 
    ){
        submitCallForPriceRequest(
            input: {
                product_id:$productId 
                name : $name
                email :$email 
                phone :$phone 
                city : $city
                message :$message 
            }

        )
    }
`;

export default {
    callForPriceMutaion: CALL_FOR_PRICE
};
