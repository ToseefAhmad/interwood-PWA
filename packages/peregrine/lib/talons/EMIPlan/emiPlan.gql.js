import {gql} from '@apollo/client';

export const GET_BANK_NAME = gql`
    query getBankName{
        getBankName{
            bank_id
            bank_name
        }
    }
`;

export const GET_EMI_PLAN = gql`
    query getEMIPlan($bank_id:Int!)
    {
        getEMIPlan(bank_id:$bank_id)
        {
            emi_tenure
        }
    }
`;
export const GET_TOTAL_AMOUNT = gql`
    query getTotalAmount($total:Float!,$bank_id:Int!,$tenure:Int!) {
        getTotalAmount(total:$total,bank_id:$bank_id,tenure:$tenure)
    }
`;

export default {
    getEMIPlan:GET_EMI_PLAN,
    getBankName:GET_BANK_NAME,
    getTotalAmount:GET_TOTAL_AMOUNT
};

