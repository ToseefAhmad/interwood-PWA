import {gql} from '@apollo/client';

export const CREATE_PRODUCT_REVIEW = gql`
    mutation createProductReview(
        $sku:String!
        $nickname:String!
        $summary: String!
        $text: String!
        $ratings: String!
    ) {
        createProductReview(
            input: {
                sku:$sku
                nickname:$nickname
                summary: $summary
                text: $text
                ratings:{
                    id: "NA==",
                    value_id:$ratings
                }
            }
        ) {
            review{
                nickname
            }
        }
    }
`;

export default {
    createProductReview:CREATE_PRODUCT_REVIEW
};




