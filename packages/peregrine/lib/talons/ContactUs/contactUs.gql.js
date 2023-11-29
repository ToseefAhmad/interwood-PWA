import {gql} from '@apollo/client';

export const SEND_CONTACT_FORM = gql`
    mutation sendContactForm(
        $name: String!,
        $email :String!,
        $phone :String!,
        $message:String!
    ) {
        sendContactForm(input: { name: $name, email:$email ,telephone:$phone,comment:$message})
    }
`;

export default {
    sendContactForm: SEND_CONTACT_FORM
};
