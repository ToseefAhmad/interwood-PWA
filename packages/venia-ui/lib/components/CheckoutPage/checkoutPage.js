import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { AlertCircle as AlertCircleIcon } from 'react-feather';
import { Link, Redirect, useHistory } from 'react-router-dom';
import ReactGA from 'react-ga';
import ReactGA4 from "react-ga4";
import ReactPixel from 'react-facebook-pixel';


import { useWindowSize, useToasts } from '@magento/peregrine';
import {
    CHECKOUT_STEP,
    useCheckoutPage
} from '@magento/peregrine/lib/talons/CheckoutPage/useCheckoutPage';

import { mergeClasses } from '../../classify';
import Button from '../Button';
import { Title } from '../Head';
import Icon from '../Icon';
import { fullPageLoadingIndicator } from '../LoadingIndicator';
import StockStatusMessage from '../StockStatusMessage';
import AddressBook from './AddressBook';
import GuestSignIn from './GuestSignIn';
import OrderSummary from './OrderSummary';
import PaymentInformation from './PaymentInformation';
import PriceAdjustments from './PriceAdjustments';
import ShippingMethod from './ShippingMethod';
import ShippingInformation from './ShippingInformation';
import OrderConfirmationPage from './OrderConfirmationPage';
import ItemsReview from './ItemsReview';
import defaultClasses from './checkoutPage.css';
import CheckoutPageOperations from './checkoutPage.gql.js';
import { usePriceSummary } from "@magento/peregrine/lib/talons/CartPage/PriceSummary/usePriceSummary";
import { gql } from "@apollo/client";
import { PriceSummaryFragment } from "../CartPage/PriceSummary/priceSummaryFragments";

const errorIcon = <Icon src={AlertCircleIcon} size={20} />;

const GET_PRICE_SUMMARY = gql`
    query getPriceSummary($cartId: String!) {
        cart(cart_id: $cartId) {
            id
            ...PriceSummaryFragment
        }
    }
    ${PriceSummaryFragment}
`;

const CheckoutPage = props => {
    const { classes: propClasses } = props;
    const [bank_id, setBankId] = useState();
    const [tenure, setTenure] = useState();
    const [paymentMethodDesc, setPaymentMethodDesc] = useState('')
    const { formatMessage } = useIntl();


    const priceProps = usePriceSummary({
        queries: {
            getPriceSummary: GET_PRICE_SUMMARY
        }
    });


    const {
        flatData,
        dataItems
    } = priceProps;
    const total = flatData ? flatData.total.value : 0;
    const talonProps = useCheckoutPage({
        ...CheckoutPageOperations,
        bank_id: bank_id,
        tenure: tenure,
        total,
        paymentMethodDesc,
        dataItems
    });


    const {
        /**
         * Enum, one of:
         * SHIPPING_ADDRESS, SHIPPING_METHOD, PAYMENT, REVIEW
         */
        activeContent,
        cartItems,
        checkoutStep,
        customer,
        error,
        handlePlaceOrder,
        hasError,
        isCartEmpty,
        isGuestCheckout,
        isLoading,
        isUpdating,
        orderDetailsData,
        orderDetailsLoading,
        orderNumber,
        placeOrderLoading,
        setCheckoutStep,
        setIsUpdating,
        setShippingInformationDone,
        setShippingMethodDone,
        setPaymentInformationDone,
        resetReviewOrderButtonClicked,
        handleReviewOrder,
        reviewOrderButtonClicked,
        toggleAddressBookContent,
        toggleSignInContent,
        history,
        setIsPaymentSelected,
        isPaymentSelected,
        placeOrderError
    } = talonProps;

    function getIndex(items) {
        return items ? items.findIndex(obj => obj.product.id === 1087) : 1;
    }

    useMemo(() => {
        if (dataItems) {
            dataItems.forEach(item => {
                let len = item.product.categories.length;
                ReactGA.ga('ec:addProduct', {
                    id: item.product.sku,
                    sku: item.product.sku,
                    quantity: item.quantity,
                    name: item.product.name,
                    price: item.product.price_range.maximum_price.final_price.value,
                    revenue: item.product.price_range.maximum_price.final_price.value,
                    category: len > 0 ? item.product.categories[len - 1].name : ' ',
                    list: len > 0 ? item.product.categories[len - 1].name : ' ',
                    position: len > 0 ? item.product.categories[len - 1].id : 1
                })
                ReactGA4.event('addProduct', {
                    currency: "PKR",
                    id: item.product.sku,
                    sku: item.product.sku,
                    quantity: item.quantity,
                    name: item.product.name,
                    value: item.product.price_range.maximum_price.final_price.value,
                    price: item.product.price_range.maximum_price.final_price.value,
                    revenue: item.product.price_range.maximum_price.final_price.value,
                    category: len > 0 ? item.product.categories[len - 1].name : ' ',
                    list: len > 0 ? item.product.categories[len - 1].name : ' ',
                    position: len > 0 ? item.product.categories[len - 1].id : 1,
                })

                ReactGA.ga('ec:setAction', 'checkout', { 'step': [checkoutStep] });
                ReactGA4.event('checkout', { 'step': [checkoutStep] });
                ReactGA.ga('send', 'pageview');
                ReactGA4.ga('send', 'pageview');
                ReactGA.plugin.execute('ec', 'clear')
                ReactGA4.event('ec', 'clear');
                // ReactGA4.plugin.execute('ec', 'clear')


            });
        }
    }, [checkoutStep]);

    const [dataLoader, setDataLoader] = useState(false);
    useMemo(() => {
        if (placeOrderLoading && placeOrderError == undefined) {
            setDataLoader(true)
        }
    }, [placeOrderLoading, placeOrderError, setDataLoader]);
    const [, { addToast }] = useToasts();

    // useEffect(() => {
    //     ReactGA.initialize('UA-43977906-1');
    //     ReactGA.pageview(window.location.pathname + window.location.search);
    // })

    useMemo(() => {
        if (orderNumber) {
            const newItems = [];
            dataItems.forEach((item) => {
                const { product, quantity } = item;
                newItems.push({
                    item_id: product.id,
                    item_name: product.name,
                    sku: product.sku,
                    price: product.price_range.maximum_price.final_price.value,
                    quantity: quantity,
                    currency: product.price_range.maximum_price.final_price.currency
                })
            });
            dataItems.forEach(item => {
                let len = item.product.categories.length;
                ReactGA.ga('ec:addProduct', {
                    id: item.product.sku,
                    sku: item.product.sku,
                    quantity: item.quantity,
                    name: item.product.name,
                    price: item.product.price_range.maximum_price.final_price.value,
                    revenue: item.product.price_range.maximum_price.final_price.value,
                    category: len > 0 ? item.product.categories[len - 1].name : ' ',
                    list: len > 0 ? item.product.categories[len - 1].name : ' ',
                    position: len > 0 ? item.product.categories[len - 1].id : 1
                })
                ReactGA4.event('addProduct', {
                    currency: "PKR",
                    value: item.product.price_range.maximum_price.final_price.value,
                    id: item.product.sku,
                    sku: item.product.sku,
                    quantity: item.quantity,
                    name: item.product.name,
                    price: item.product.price_range.maximum_price.final_price.value,
                    revenue: item.product.price_range.maximum_price.final_price.value,
                    category: len > 0 ? item.product.categories[len - 1].name : ' ',
                    list: len > 0 ? item.product.categories[len - 1].name : ' ',
                    position: len > 0 ? item.product.categories[len - 1].id : 1
                })
            });

            ReactGA.ga('ec:setAction', 'purchase', {
                id: orderNumber,
                revenue: total,
                currency: 'PKR',
            });
            ReactGA4.event('purchase', {
                transaction_id: orderNumber,
                revenue: total,
                value: total,
                currency: 'PKR',
                items: newItems
            });
            ReactGA.send('pageview');
            ReactGA4.send('pageview');
            ReactGA.plugin.execute('ecommerce', 'send');
            ReactGA4.event('ecommerce', 'send');

            // ReactGA4.plugin.execute('ecommerce', 'send');
            ReactGA.plugin.execute('ecommerce', 'clear');
            ReactGA.event('ecommerce', 'clear');
            // ReactGA4.plugin.execute('ecommerce', 'clear');
            ReactGA.plugin.execute('ec', 'clear');
            ReactGA4.event('ec', 'clear');

            // ReactGA4.plugin.execute('ec', 'clear')


            ReactPixel.track('Purchase', {
                'orderId': orderNumber,
                'value': total,
                'currency': 'PKR'
            });
        }

    }, [orderNumber])


    useEffect(() => {
        if (hasError) {
            const message =
                error && error.message
                    ? error.message
                    : formatMessage({
                        id: 'checkoutPage.errorSubmit',
                        defaultMessage:
                            'Oops! An error occurred while submitting. Please try again.'
                    });
            addToast({
                type: 'error',
                icon: errorIcon,
                message,
                dismissable: true,
                timeout: 7000
            });

            if (process.env.NODE_ENV !== 'production') {
                console.error(error);
            }
        }
    }, [addToast, error, formatMessage, hasError]);

    const classes = mergeClasses(defaultClasses, propClasses);

    const windowSize = useWindowSize();
    const isMobile = windowSize.innerWidth <= 960;

    let checkoutContent;
    const heading = isGuestCheckout ? formatMessage({
        id: 'checkoutPage.checkout',
        defaultMessage: 'Checkout'
    }) : null;

    if (orderNumber && orderDetailsData) {
        const paymentMethod = orderDetailsData.cart.selected_payment_method.code;
        if (paymentMethod == 'hbl_pay' && orderNumber) {
            // const baseUrli =  window.location.origin;
            // window.location.href = baseUrli + "/customcheckout/custompayment/index/orderid/" + orderNumber;
            // // window.open(`https://interwood.pk/customcheckout/custompayment/index/orderid/${orderNumber}`, "_top");
            const history = useHistory();
            history.push(`\payment-redirection?orderId=${orderNumber}`)
        }
        // else if(paymentMethod == 'customcod' && orderNumber) {
        //     const history = useHistory();
        //     history.push(`\qisst-pay?orderId=${orderNumber}`)
        // }
        else {
            history.push(`\order-confirmation?orderId=${orderNumber}`)
        }
    } else if (isLoading) {
        return fullPageLoadingIndicator;
    } else if (isCartEmpty) {
        checkoutContent = (
            <div className={classes.empty_cart_container}>
                <div className={classes.heading_container}>
                    {/* <h1 className={classes.heading}>{heading}</h1> */}
                </div>
                <h3>
                    <FormattedMessage
                        id={'checkoutPage.emptyMessage'}
                        defaultMessage={'There are no items in your cart.'}
                    />
                </h3>
            </div>
        );
    }

    else if (!(getIndex(cartItems) === 0 && cartItems.length === 1) && total < 1000) {
        checkoutContent = (
            <div className={classes.empty_cart_container}>
                <div className={classes.heading_container}>
                    {/* <h1 className={classes.heading}>{heading}</h1> */}
                </div>
                <h3>
                    Minimum Order amount  is PKR 1000.
                </h3>
            </div>
        );
    }
    else {
        const signInContainerElement = isGuestCheckout ? (
            <div className={classes.signInContainer}>
                <span className={classes.signInLabel}>
                    <FormattedMessage
                        id={'checkoutPage.signInLabel'}
                        defaultMessage={'Log in - For Existing customers'}
                    />
                </span>
                <Button
                    className={classes.signInButton}
                    onClick={toggleSignInContent}
                    priority="normal"
                >
                    <FormattedMessage
                        id={'checkoutPage.signInButton'}
                        defaultMessage={'Log In'}
                    />
                </Button>
            </div>
        ) : null;

        const shippingMethodSection =
            checkoutStep >= CHECKOUT_STEP.SHIPPING_METHOD ? (
                <ShippingMethod
                    items={dataItems}
                    total={total}
                    pageIsUpdating={isUpdating}
                    onSave={setShippingMethodDone}
                    setPageIsUpdating={setIsUpdating}
                />
            ) : (
                <h3 className={[defaultClasses["checkout-form-title"], defaultClasses["shipping"], " "].join(' ')}>
                    Shipping
                </h3>
            );

        const paymentInformationSection =
            checkoutStep >= CHECKOUT_STEP.PAYMENT ? (
                <PaymentInformation
                    onSave={setPaymentInformationDone}
                    checkoutError={error}
                    resetShouldSubmit={resetReviewOrderButtonClicked}
                    setCheckoutStep={setCheckoutStep}
                    shouldSubmit={reviewOrderButtonClicked}
                    setIsPaymentSelected={setIsPaymentSelected}
                    bank_id={bank_id}
                    tenure={tenure}
                    setBankId={setBankId}
                    setTenure={setTenure}
                    total={total}
                    paymentMethodDesc={paymentMethodDesc}
                    setPaymentMethodDesc={setPaymentMethodDesc}
                />
            ) : (
                <h3 className={[defaultClasses["checkout-form-title"], defaultClasses["payment-info"], " "].join(' ')}>
                    Payment Information
                </h3>
            );
        const priceAdjustmentsSection =
            checkoutStep === CHECKOUT_STEP.PAYMENT ? (
                <div className={classes.price_adjustments_container}>
                    <PriceAdjustments setPageIsUpdating={setIsUpdating} />
                </div>
            ) : null;

        const reviewOrderButton =
            checkoutStep === CHECKOUT_STEP.PAYMENT ? (
                <Button
                    onClick={() => handleReviewOrder(paymentMethodDesc)}
                    priority="high"
                    className={classes.review_order_button}
                    disabled={!isPaymentSelected}
                >
                    <FormattedMessage
                        id={'checkoutPage.reviewOrder'}
                        defaultMessage={'Review Order'}
                    />
                </Button>
            ) : null;

        const itemsReview =
            checkoutStep === CHECKOUT_STEP.REVIEW ? (
                <div className={classes.items_review_container}>
                    <ItemsReview />
                </div>
            ) : null;

        const placeOrderButton =
            checkoutStep === CHECKOUT_STEP.REVIEW ? (
                <Button
                    onClick={handlePlaceOrder}
                    priority="high"
                    className={classes.place_order_button}
                    disabled={
                        isUpdating || placeOrderLoading || orderDetailsLoading
                    }
                >
                    {
                        paymentMethodDesc === "customcod" || paymentMethodDesc === "hbl_pay" ?
                            <FormattedMessage
                                id={'checkoutPage.proceedToPay'}
                                defaultMessage={'Proceed to Pay'}
                            /> :
                            <FormattedMessage
                                id={'checkoutPage.placeOrder'}
                                defaultMessage={'Place Order'}
                            />
                    }
                </Button>
            ) : null;

        // If we're on mobile we should only render price summary in/after review.
        const shouldRenderPriceSummary = !(
            isMobile && checkoutStep < CHECKOUT_STEP.REVIEW
        );

        const orderSummary = true ? (
            <div className={classes.summaryContainer}>
                <div className={[defaultClasses[""], "summary-checkoutpage"].join(' ')}>
                    <OrderSummary isUpdating={isUpdating} />
                </div>
                {itemsReview}
            </div>
        ) : null;

        let headerText;

        if (isGuestCheckout) {
            headerText = formatMessage({
                id: 'checkoutPage.guestCheckout',
                defaultMessage: 'Guest Checkout'
            });
        } else if (customer.default_shipping) {
            headerText = formatMessage({
                id: 'checkoutPage.reviewAndPlaceOrder',
                defaultMessage: 'Review and Place Order'
            });
        } else {
            headerText = formatMessage(
                { id: 'checkoutPage.greeting', defaultMessage: 'Welcome' },
                { firstname: customer.firstname }
            );
        }

        const checkoutContentClass =
            activeContent === 'checkout'
                ? classes.checkoutContent
                : classes.checkoutContent_hidden;

        const stockStatusMessageElement = (
            <Fragment>
                <FormattedMessage
                    id={'checkoutPage.stockStatusMessage'}
                    defaultMessage={
                        'An item in your cart is currently out-of-stock and must be removed in order to Checkout. Please return to your cart to remove the item.'
                    }
                />
                <Link className={classes.cartLink} to={'/cart'}>
                    <FormattedMessage
                        id={'checkoutPage.returnToCart'}
                        defaultMessage={'Return to Cart'}
                    />
                </Link>
            </Fragment>
        );
        checkoutContent = (
            <div className={checkoutContentClass}>
                <div className={classes.heading_container}>
                    <StockStatusMessage
                        cartItems={cartItems}
                        message={stockStatusMessageElement}
                    />
                    <h1 className={classes.heading}>{headerText}</h1>
                </div>

                {/* {signInContainerElement} */}

                <div className={classes.shipping_information_container}>
                    <div className={[defaultClasses["content-shipping-info"], checkoutStep == 1 ? "shipping-info-step1" : null, " "].join(' ')}>
                        <ShippingInformation
                            onSave={setShippingInformationDone}
                            toggleActiveContent={toggleAddressBookContent}
                        />
                    </div>
                </div>

                <div className={classes.shipping_method_container}>
                    <div className={[defaultClasses["content-shipping-info"], checkoutStep == 1 ? "shipping-info-step1" : null, " "].join(' ')}>
                        {shippingMethodSection}
                    </div>
                </div>

                {priceAdjustmentsSection}
                <div className={classes.payment_information_container}>
                    {paymentInformationSection}
                </div>
                {reviewOrderButton}
                {orderSummary}
                {placeOrderButton}
            </div>
        );
    }

    const addressBookElement = !isGuestCheckout ? (
        <AddressBook
            activeContent={activeContent}
            toggleActiveContent={toggleAddressBookContent}
        />
    ) : null;

    const signInElement = isGuestCheckout ? (
        <GuestSignIn
            isActive={activeContent === 'signIn'}
            toggleActiveContent={toggleSignInContent}
        />
    ) : null;
    return (
        <div className={classes.root}>
            <Title>
                Checkout
            </Title>
            {checkoutContent}
            {addressBookElement}
            {signInElement}
            {
                placeOrderLoading ? fullPageLoadingIndicator : null
            }
            {
                dataLoader ? fullPageLoadingIndicator : null
            }
        </div>
    );
};

export default CheckoutPage;
