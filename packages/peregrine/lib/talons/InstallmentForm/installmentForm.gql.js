import {gql} from '@apollo/client';

export const SUBMIT_INSTALLMENT_FORM = gql`
    mutation submitInstallmentForm(
        $name: String!,
        $contact :String!,
        $email :String!,
        $city:String!,
        $card_type:String!,
        $installment_months:String!,
        $category:String!,
        $bank:String!) {
        submitInstallmentForm(input: { 
            name: $name,
            contact_number:$contact,
            email:$email,
            city:$city,
            card_type:  $card_type,
            installment_months:$installment_months,
            category:$category,
            bank:$bank
        })
        {
            status
        }
    }
`;

export const GET_CARD_TYPE = gql`
    query getCardType {
        getCardType{
            label
            value
        }
    }
`;

export const GET_BANK = gql`
    query getBank {
        getBank{
            label
            value
        }

    }
`;
export const GET_CATEGORY = gql`
    query getCategory {
        getCategory {
            label
            value
        }
    }
`;

export const GET_INSTALLMENT_MONTHS = gql`
    query getInstallmentMonths {
        getInstallmentMonths {
            label
            value
        }
    }
`;
export default {
    submitInstallmentForm: SUBMIT_INSTALLMENT_FORM,
    getCardType: GET_CARD_TYPE,
    getBank: GET_BANK,
    getCategory: GET_CATEGORY,
    getInstallmentMonths: GET_INSTALLMENT_MONTHS
};
