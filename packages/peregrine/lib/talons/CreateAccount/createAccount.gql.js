import {gql} from '@apollo/client';

export const CREATE_ACCOUNT = gql`
    mutation CreateAccount(
        $email: String!
        $firstname: String!
        $lastname: String!
        $password: String!
        $is_subscribed: Boolean!
        $street:[String]
        $city:String
        $country_id:CountryCodeEnum
        $country_code:CountryCodeEnum
        $postcode:String
        $region_id:Int
        $telephone:String
    ) {
        createCustomer(
            input: {
                email: $email
                firstname: $firstname
                lastname: $lastname
                password: $password
                is_subscribed: $is_subscribed
                address:{
                    city:$city
                    country_id:$country_id
                    country_code:$country_code
                    postcode:$postcode
                    region:{region_id:$region_id}
                    telephone:$telephone
                    street:$street
                }
            }
        ) {
            # The createCustomer mutation returns a non-nullable CustomerOutput type
            # which requires that at least one of the sub fields be returned.
            customer {
                id
            }
        }
    }
`;

export const GET_CUSTOMER = gql`
    query GetCustomerAfterCreate {
        customer {
            id
            email
            firstname
            lastname
            is_subscribed
        }
    }
`;

export const SIGN_IN = gql`
    mutation SignInAfterCreate($email: String!, $password: String!) {
        generateCustomerToken(email: $email, password: $password) {
            token
        }
    }
`;

export const CREATE_CART = gql`
    mutation CreateCartAfterAccountCreation {
        cartId: createEmptyCart
    }
`;

export const GET_CART_DETAILS = gql`
    query GetCartDetailsAfterAccountCreation($cartId: String!) {
        cart(cart_id: $cartId) {
            id
            items {
                id
                prices {
                    price {
                        value
                    }
                }
                product {
                    id
                    name
                    sku
                    small_image {
                        url
                        label
                    }
                    price {
                        regularPrice {
                            amount {
                                value
                            }
                        }
                    }
                }
                quantity
                ... on ConfigurableCartItem {
                    configurable_options {
                        id
                        option_label
                        value_id
                        value_label
                    }
                }
            }
            prices {
                grand_total {
                    value
                    currency
                }
            }
        }
    }
`;

export const MERGE_CARTS = gql`
    mutation MergeCartsAfterAccountCreation(
        $sourceCartId: String!
        $destinationCartId: String!
    ) {
        mergeCarts(
            source_cart_id: $sourceCartId
            destination_cart_id: $destinationCartId
        ) @connection(key: "mergeCarts") {
            id
            items {
                id
            }
        }
    }
`;

const GET_CITIES = gql`
    query getCities($countryName: String!)
    {
        getCities(country_name: $countryName ){
            label
            value
            id
        }
    }
`;


export default {
    createAccountMutation: CREATE_ACCOUNT,
    createCartMutation: CREATE_CART,
    getCartDetailsQuery: GET_CART_DETAILS,
    getCustomerQuery: GET_CUSTOMER,
    mergeCartsMutation: MERGE_CARTS,
    signInMutation: SIGN_IN,
    getCities: GET_CITIES
};
