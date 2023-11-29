import { gql } from '@apollo/client';

import { ShippingInformationFragment } from '../shippingInformationFragments.gql';
import { ShippingMethodsCheckoutFragment } from '../../ShippingMethod/shippingMethodFragments.gql';
import { PriceSummaryFragment } from '../../../CartPage/PriceSummary/priceSummaryFragments';
import { AvailablePaymentMethodsFragment } from '../../PaymentInformation/paymentInformation.gql';

export const SET_GUEST_SHIPPING_MUTATION = gql`
    mutation SetGuestShipping(
        $cartId: String!
        $email: String!
        $address: CartAddressInput!
    ) {
        setGuestEmailOnCart(input: { cart_id: $cartId, email: $email })
            @connection(key: "setGuestEmailOnCart") {
            cart {
                id
            }
        }

        setShippingAddressesOnCart(
            input: {
                cart_id: $cartId
                shipping_addresses: [{ address: $address }]
            }
        ) @connection(key: "setShippingAddressesOnCart") {
            cart {
                id
                ...ShippingInformationFragment
                ...ShippingMethodsCheckoutFragment
                ...PriceSummaryFragment
                ...AvailablePaymentMethodsFragment
            }
        }
    }
    ${ShippingInformationFragment}
    ${ShippingMethodsCheckoutFragment}
    ${PriceSummaryFragment}
    ${AvailablePaymentMethodsFragment}
`;

const IS_EMAIL_AVIALABLE = gql `
    query IsEmailAvialable (
        $email : String!
    ){
        isEmailAvailable(email: $email) {
            is_email_available
          }
    }
`;

const GET_CITIES = gql `
query getCities($countryName: String!)
{ getCities(country_name: $countryName ){
    label
    value
    id
  }
}
`;
export default {
    mutations: {
        setGuestShippingMutation: SET_GUEST_SHIPPING_MUTATION
    },
    queries: {
        isEmailAvailableQuery : IS_EMAIL_AVIALABLE,
        getCitiesQuery : GET_CITIES 

    }
};
