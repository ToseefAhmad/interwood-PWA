import {gql} from '@apollo/client';

export const GET_GA_UI = gql`
    query getGaUi {
        getGaUi 
    }
`;
export default {
    getGaUi:GET_GA_UI
};
