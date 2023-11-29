import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { gql } from '@apollo/client';
import Price from '@magento/venia-ui/lib/components/Price';
import { usePriceSummary } from '@magento/peregrine/lib/talons/CartPage/PriceSummary/usePriceSummary';
import { mergeClasses } from '../../../classify';
import defaultClasses from './priceSummary.css';
import DiscountSummary from './discountSummary';
import GiftCardSummary from './giftCardSummary';
import ShippingSummary from './shippingSummary';
import TaxSummary from './taxSummary';
import { PriceSummaryFragment } from './priceSummaryFragments';
import CouponCode from "../PriceAdjustments/CouponCode";

const GET_PRICE_SUMMARY = gql`
    query getPriceSummary($cartId: String!) {
        cart(cart_id: $cartId) {
            id
            ...PriceSummaryFragment
        }
    }
    ${PriceSummaryFragment}
`;

/**
 * A child component of the CartPage component.
 * This component fetches and renders cart data, such as subtotal, discounts applied,
 * gift cards applied, tax, shipping, and cart total.
 *
 * @param {Object} props
 * @param {Object} props.classes CSS className overrides.
 * See [priceSummary.css]{@link https://github.com/magento/pwa-studio/blob/develop/packages/venia-ui/lib/components/CartPage/PriceSummary/priceSummary.css}
 * for a list of classes you can override.
 *
 * @returns {React.Element}
 *
 * @example <caption>Importing into your project</caption>
 * import PriceSummary from "@magento/venia-ui/lib/components/CartPage/PriceSummary";
 */
const PriceSummary = props => {
    const { isUpdating, setIsCartUpdating } = props;
    const classes = mergeClasses(defaultClasses, props.classes);
    const [coupon, setCoupon] = useState(false)
    const talonProps = usePriceSummary({
        queries: {
            getPriceSummary: GET_PRICE_SUMMARY
        }
    });

    const {
        handleProceedToCheckout,
        hasError,
        hasItems,
        isCheckout,
        isLoading,
        flatData,
        dataItems
    } = talonProps;

    const { formatMessage } = useIntl();
    function getIndex(items) {
        return items ? items.findIndex(obj => obj.product.id === 1087) : 1;
    }

    if (hasError) {
        return (
            <div className={classes.root}>
                <span className={classes.errorText}>
                    <FormattedMessage
                        id={'priceSummary.errorText'}
                        defaultMessage={
                            'Something went wrong. Please refresh and try again.'
                        }
                    />
                </span>
            </div>
        );
    } else if (!hasItems) {
        return null;
    }

    const { subtotal, total, discounts, giftCards, taxes, shipping } = flatData;

    const isPriceUpdating = isUpdating || isLoading;
    const priceClass = isPriceUpdating ? classes.priceUpdating : classes.price;
    const totalPriceClass = isPriceUpdating
        ? classes.priceUpdating
        : classes.totalPrice;

    const totalPriceLabel = isCheckout
        ? formatMessage({
            id: 'priceSummary.total',
            defaultMessage: 'Total'
        })
        : formatMessage({
            id: 'priceSummary.estimatedTotal',
            defaultMessage: 'Estimated Total'
        });

    const proceedToCheckoutButton = !isCheckout ? (
        (!(getIndex(dataItems) === 0 && dataItems.length === 1) && total.value < 1000) ?

            <button
                className={[defaultClasses["checkout-btn"], " "].join(' ')}
                disabled={true}
                priority={'high'}
                onClick={() => handleProceedToCheckout(dataItems, total)}
            >
                <FormattedMessage
                    id={'priceSummary.checkoutButton'}
                    defaultMessage={'Proceed to Checkout'}
                />
            </button>
            :
            <button
                className={[defaultClasses["checkout-btn"], " "].join(' ')}
                disabled={isPriceUpdating}
                priority={'high'}
                onClick={() => handleProceedToCheckout(dataItems, total)}
            >
                <FormattedMessage
                    id={'priceSummary.checkoutButton'}
                    defaultMessage={'Proceed to Checkout'}
                />
            </button>

    ) : null;

    const TotalWithoutShipping = shipping && shipping[0] && shipping[0].selected_shipping_method && shipping[0].selected_shipping_method.amount.value ?
        total.value - shipping[0].selected_shipping_method.amount.value : total.value;
    return (
        <div className={classes.root}>
            <div className={[defaultClasses["cart-summary"], "summary-global-class"].join(' ')}>
                <h2>SUMMARY</h2>
                <div className={[defaultClasses["summary-content"], "summary-content-global"].join(' ')}>
                    <div className={[defaultClasses["estimate"], "estimate"].join(' ')}>Cart Summary
                    </div>
                    <div className={[defaultClasses["subtotal"], "subtotal", defaultClasses['divider']].join(' ')}>
                        Subtotal
                        <span className={[defaultClasses["price-inner-container"], " "].join(' ')}>
                            <Price
                                value={subtotal.value}
                                currencyCode={subtotal.currency}
                            />
                        </span>
                    </div>
                    {/* <div className={[defaultClasses["tax"],  "tax"].join(' ')}>
                        Tax
                        <span className={[defaultClasses["price-inner-container"],  " "].join(' ')}>
                            <TaxSummary
                                classes={{
                                    lineItemLabel: classes.lineItemLabel,
                                    price: priceClass
                                }}
                                data={taxes}
                                isCheckout={isCheckout}
                            />
                        </span>
                    </div> */}
                    {
                        subtotal.value - TotalWithoutShipping > 0 ?
                            <div className={[defaultClasses["subtotal"], "subtotal", defaultClasses['divider']].join(' ')}>

                                {/* <div className={[defaultClasses["ordertotal"],  "ordertotal"].join(' ')}> */}
                                Discounted Amount
                                <span className={[defaultClasses["price-inner-container"], " "].join(' ')}>
                                    <Price value={subtotal.value - TotalWithoutShipping} currencyCode={total.currency} />
                                </span>
                            </div> : null
                    }

                    {
                        subtotal.value - TotalWithoutShipping > 0 ?
                            <div className={[defaultClasses["subtotal"], "subtotal", defaultClasses['divider']].join(' ')}>

                                {/* <div className={[defaultClasses["ordertotal"],  "ordertotal"].join(' ')}> */}
                                Discount %
                                <span className={[defaultClasses["price-inner-container"], " "].join(' ')}>

                                    {Math.round(((subtotal.value - TotalWithoutShipping) * 100) / subtotal.value)} %
                                </span>
                            </div> : null
                    }

                    {
                        shipping && shipping[0] && shipping[0].selected_shipping_method && shipping[0].selected_shipping_method.amount.value ?
                            <div className={[defaultClasses["subtotal"], "subtotal"].join(' ')}>
                                Shipping & Fixing
                                <span className={[defaultClasses["price-inner-container"], " "].join(' ')}>
                                    <Price value={shipping[0].selected_shipping_method.amount.value} currencyCode={shipping[0].selected_shipping_method.amount.currency} />
                                </span>
                            </div> : null

                    }
                    <div className={[defaultClasses["tax"], "tax", defaultClasses["total"]].join(' ')}>

                        {/* <div className={[defaultClasses["ordertotal"],  "ordertotal"].join(' ')}> */}
                        Order Total
                        <span className={[defaultClasses["price-inner-container"], " "].join(' ')}>
                            <Price value={total.value} currencyCode={total.currency} />
                        </span>
                    </div>

                </div>
                <div className={[defaultClasses["discount"], "field-coupon-code"].join(' ')}>
                    <div className={[defaultClasses["discount-title"], " "].join(' ')} onClick={() => setCoupon(!coupon)}>
                        Enter Coupon Code
                    </div>
                    {
                        coupon ?
                            <CouponCode setIsCartUpdating={setIsCartUpdating} /> : null
                    }
                </div>
                {
                    total.value >= 1000 ? null : <div className="minimum-order">Minimum Order amount  is PKR 1000. </div>
                }
                <div className="control" className={[defaultClasses["control"], " "].join(' ')}>
                    {proceedToCheckoutButton}
                </div>
            </div>

        </div>
    );
};

export default PriceSummary;
