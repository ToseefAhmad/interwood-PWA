import { gql } from '@apollo/client';

import { DiscountSummaryFragment } from './discountSummary';
import { GiftCardSummaryFragment } from './queries/giftCardSummary';
import { ShippingSummaryFragment } from './shippingSummary';
import { TaxSummaryFragment } from './taxSummary';

export const GrandTotalFragment = gql`
    fragment GrandTotalFragment on CartPrices {
        grand_total {
            currency
            value
        }
    }
`;

export const PriceSummaryFragment = gql`
    fragment PriceSummaryFragment on Cart {
        id
        items {
            id
            quantity
            product {
                id
                sku
                stock_status
                name
                price_range{
                    minimum_price
                    {
                        discount
                        {
                            percent_off
                            amount_off
                        }
                        final_price
                        {
                            value
                            currency
                        }
                        fixed_product_taxes{
                            label
                            amount
                            {
                                currency
                                value
                            }
                        }
                    }
                    maximum_price
                    {
                        discount
                        {
                            percent_off
                            amount_off
                        }
                        final_price
                        {
                            value
                            currency
                        }
                        fixed_product_taxes{
                            label
                            amount
                            {
                                currency
                                value
                            }
                        }
                    }
                }
                categories{
                    id
                    name
                }
                
            }
        }
        ...ShippingSummaryFragment
        prices {
            ...TaxSummaryFragment
            ...DiscountSummaryFragment
            ...GrandTotalFragment
            subtotal_excluding_tax {
                currency
                value
            }
        }
        ...GiftCardSummaryFragment
    }
    ${DiscountSummaryFragment}
    ${GiftCardSummaryFragment}
    ${GrandTotalFragment}
    ${ShippingSummaryFragment}
    ${TaxSummaryFragment}
`;
