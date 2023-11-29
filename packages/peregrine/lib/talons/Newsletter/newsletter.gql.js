import {gql} from '@apollo/client';

export const SUBSCRIBE_EMAIL_TO_NEWSLETTER = gql`
    mutation subscribeEmailToNewsletter(
        $email: String!
    ) {
        subscribeEmailToNewsletter(email: $email)
        {
            status
        }
    }
`;

export default {
    subscribeEmailToNewsletter: SUBSCRIBE_EMAIL_TO_NEWSLETTER
};
