import {gql} from '@apollo/client';

export const SUBMIT_LEAD_FORM = gql`
    mutation submitLeadForm(
        $name: String!,
        $city:String!,
        $email:String!,
        $contact :String!,
        $category:String!
    ) {
        submitLeadForm(input:{
            leadform_city:$city,
            leadform_name:$name,
            leadform_email:$email,
            leadform_contactnumber:$contact,
            leadform_category:$category
        })
    }
`;

export const GET_LEAD_CATEGORY = gql`
    query getLeadCategory {
      getLeadCategory{ 
          name
          value
      }
    }
`;

export default {
    submitLeadForm: SUBMIT_LEAD_FORM,
    getLeadCategory:GET_LEAD_CATEGORY
};
