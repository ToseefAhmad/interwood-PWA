import {gql} from '@apollo/client';

export const STORE_LOCATOR = gql`
    query getAllStores {
        getAllStores
        {
                name
                address
                city
                country
                latitude
                longitude
                phone
                postcode
                region
                schedule
        }
    }
`;

export const SEARCH_STORE = gql`
    query  searchStores($key:String) {
        searchStores(key:$key)
        {
            name
            address
            city
            country
            latitude
            longitude
            phone
            postcode
            region
            schedule
        }
    }
`;

export const MAPS_DATA = gql`
    query getMapsData {
        getMapsData{
            apiKey
            latitude
            longitude
        }
    }
`;
export default {
    getAllStores: STORE_LOCATOR,
    searchStores:SEARCH_STORE,
    getMapsData:MAPS_DATA
};
