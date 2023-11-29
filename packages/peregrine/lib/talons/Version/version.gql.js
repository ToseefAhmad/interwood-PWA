import { gql } from '@apollo/client';

export const PWA_VERSION = gql`
    query PwaVersion
    {
        PwaVersion
    }
`;

export default {
    PwaVersion:PWA_VERSION
};
