import {gql} from '@apollo/client';

export const CREATE_COMPARELIST_UID = gql`
    mutation createComparelistUid(
        $productsList : [ID!]
    ) {
        createCompareList(
            input: {
                products: $productsList
            }
        ) {
            uid
            item_count
            attributes {
                code
                label
            }
            items {
                uid
                product {
                    sku
                    name
                    description {
                        html
                    }
                }
            }
        }
    }
`;


export const GET_COMPARE_LIST = gql`
    query getComapreLits($uid : ID!) {
        compareList(
            uid : $uid
        ){
            uid
            item_count
            attributes {
                code
                label
            }
            items {
                uid
                product {
                    sku
                    name 
                    url_suffix
                    url_key
                    description{
                        html
                    }
                    short_description{
                        html
                    }
                    image {
                        url
                        label
                    }
                    price {
                        regularPrice {
                            amount {
                                currency
                                value
                            }
                        }
                    }
                    description {
                        html
                    }
                }
            }
        }
    }
`;

export const ADD_PRODUCTS_COMPARELIST = gql`
    mutation addProductsToCompareList (
        $uid : ID!,
        $productId : [ID!]!
    ){
        addProductsToCompareList(
            input : {
                uid : $uid,
                products : $productId
            }
        ) {
            uid
            item_count
            attributes {
                code
                label
            }
                items {
                uid
                product {
                sku
                name
                description {
                html
                }
            }
        }
    } 
}       

`;

export const REMOVE_FROM_COMPARELIST = gql`
    mutation removeFromCompareList(
        $uid : ID!,
        $productId : [ID!]!
    ){
        removeProductsFromCompareList(
            input: {
              uid: $uid
              products: $productId
            }
          ) {
            uid
            item_count
            attributes {
              code
              label
            }
            items {
              uid
              product {
                sku
                name
                description {
                  html
                }
              }
            }
        }
    }
`;

export const DELETE_COMPARELIST = gql`
    mutation deleteCompareList($uid: ID!) {
        deleteCompareList(
            uid: $uid
        ) {
            result
        }
    }
`;

export const COMPARELIST_FOR_SIGNIN = gql`
    mutation compareListForUsers ( $uid : ID!) {
        assignCompareListToCustomer(
            uid: $uid
        ) {
            result
            compare_list {
                uid
                item_count
                attributes {
                    code
                    label
                }
                items {
                    uid
                    product {
                        sku
                        name
                        description {
                            html
                        }
                    }
                }
            }
        }
    }
`;

export default {
    createCompareListUidMutation : CREATE_COMPARELIST_UID,
    getCompareList : GET_COMPARE_LIST,
    addProductsToCompareListMutation : ADD_PRODUCTS_COMPARELIST,
    removeItemFromComparelistMutation : REMOVE_FROM_COMPARELIST,
    deleteCompareListMutation : DELETE_COMPARELIST,
    assignCompareListToUserMutation : COMPARELIST_FOR_SIGNIN 

};
