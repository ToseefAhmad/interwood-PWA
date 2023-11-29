import {gql} from '@apollo/client';

export const SUBMIT_LOYALTY_FORM = gql`
    mutation submitLoyaltyForm(
        $firstName: String!,
        $lastName :String!,
        $city:String!,
        $email:String!,
        $contact :String!,
        $gender:String!,
        $dob:String!,
        $stores:[String!]
    ) {
        submitLoyaltyForm(input:{
            loyaltyprogram_lastname:$lastName,
            loyaltyprogram_firstname:$firstName,
            loyaltyprogram_city:$city,
            loyaltyprogram_email:$email,
            loyaltyprogram_cellno:$contact,
            loyaltyprogram_gender:$gender,
            loyaltyprogram_dateofbirth:$dob,
            loyaltyprogram_storelocation:$stores
        })
    }
`;

export const LOYALTY_STORES = gql`
    query loyaltyStores {
        loyaltyStores
        {
            id
            name
            value
        }
    }
`;

export default {
    submitLoyaltyForm: SUBMIT_LOYALTY_FORM,
    loyaltyStores:LOYALTY_STORES
};
