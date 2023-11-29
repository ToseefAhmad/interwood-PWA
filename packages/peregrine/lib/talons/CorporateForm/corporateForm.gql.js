import {gql} from '@apollo/client';

export const SUBMIT_CORPORATE_FORM = gql`
    mutation submitCorporateForm(
        $name: String!,
        $designation :String!,
        $organization :String!,
        $city:String!,
        $address:String!,
        $contact :String!,
        $interest:String!,
        $education:String!,
        $healthcare:String!
    ) {
        submitCorporateForm(input: { name: $name, designation:$designation ,organization:$organization
        city:$city, address:$address, contact_number:$contact ,interest:$interest , education:$education ,healthcare:$healthcare
        })
        {
            status
        }
    }
`;

export const GET_EDUCATION = gql`
    query getEducation {
      getEducation{ 
          label
          value
      }
    }
`;

export const GET_INTEREST = gql`
    query getInterest {
        getInterest{
            label
            value
        }
       
    }
`;
export const GET_HEALTHCARE = gql`
    query getHealthcare {
        getHealthcare {
            label
            value
        }
    }
`;
export default {
    submitCorporateForm: SUBMIT_CORPORATE_FORM,
    getEducation:GET_EDUCATION,
    getHealthcare:GET_HEALTHCARE,
    getInterest:GET_INTEREST
};
