import {gql} from '@apollo/client';

export const GET_HOME_SCHEMA = gql`
    query getHomePageSchema {
        getHomePageSchema
    }
`;

export default {
    getHomePageSchema:GET_HOME_SCHEMA
};
