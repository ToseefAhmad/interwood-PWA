import {gql} from '@apollo/client';

export const GET_BANK_NAME = gql`
    query getBankName{
        getBankName{
            bank_id
            bank_name
        }
    }
`;

export const GET_EMI_DETAILS = gql`
    query getEMIDetails($bank_id:Int! ,
        $product_id:Int!) {
        getEMIDetails(bank_id:$bank_id,product_id:$product_id){
            content
            plan{
                emi_tenure
                bank_interest_rate
                total_money
                total_markup
                monthly_installment
            }
        }
    }
`;
export const GET_LOWEST_EMI = gql`
    query getLowestEmi($product_id:Int!) {
        getLowestEmi(product_id:$product_id)
    }
`;

export default {
    getEMIDetails:GET_EMI_DETAILS,
    getBankName:GET_BANK_NAME,
    getLowestEmi:GET_LOWEST_EMI
};

