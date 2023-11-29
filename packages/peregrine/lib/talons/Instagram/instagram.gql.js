import {gql} from '@apollo/client';

export const GET_INSTAGRAM_ID = gql`
    query instaId {
        instaId 
    }
`;
export default {
    instaId:GET_INSTAGRAM_ID
};
