import { useCallback, useEffect, useMemo, useState } from 'react';
import {
    useApolloClient,
    useLazyQuery,
    useMutation,
    useQuery
} from '@apollo/client';
import ReactGA4 from "react-ga4";
import { clearCartDataFromCache } from '../../Apollo/clearCartDataFromCache';
import { useUserContext } from '../../context/user';
import { useCartContext } from '../../context/cart';
import CheckoutError from './CheckoutError';
import { useHistory } from 'react-router';
import { useWindowSize } from '@magento/peregrine';

export const CHECKOUT_STEP = {
    SHIPPING_ADDRESS: 1,
    SHIPPING_METHOD: 2,
    PAYMENT: 3,
    REVIEW: 4
};

export const useCheckoutPage = props => {
    const {
        mutations: { createCartMutation, placeOrderMutation },
        queries: {
            getCheckoutDetailsQuery,
            getCustomerQuery,
            getOrderDetailsQuery
        },
        bank_id,
        tenure
    } = props;

    const windowSize = useWindowSize();
    const isMobile = windowSize.innerWidth <= 960;

    const [reviewOrderButtonClicked, setReviewOrderButtonClicked] = useState(
        false
    );
    const history = useHistory();
    // history.push('https://www.google.com/');
    // window.location.href='https://www.google.com/';

    const apolloClient = useApolloClient();
    const [isUpdating, setIsUpdating] = useState(false);
    const [activeContent, setActiveContent] = useState('checkout');
    const [isPaymentSelected, setIsPaymentSelected] = useState(false);
    const [checkoutStep, setCheckoutStep] = useState(
        CHECKOUT_STEP.SHIPPING_ADDRESS
    );
    const [{ isSignedIn }] = useUserContext();
    const [{ cartId }, { createCart, removeCart }] = useCartContext();

    const [fetchCartId] = useMutation(createCartMutation);
    const [
        placeOrder,
        {
            data: placeOrderData,
            error: placeOrderError,
            loading: placeOrderLoading,
            called: placeOrderCalled
        }
    ] = useMutation(placeOrderMutation);
    const [
        getOrderDetails,
        { data: orderDetailsData, loading: orderDetailsLoading }
    ] = useLazyQuery(getOrderDetailsQuery, {
        // We use this query to fetch details _just_ before submission, so we
        // want to make sure it is fresh. We also don't want to cache this data
        // because it may contain PII.
        fetchPolicy: 'no-cache',
        onCompleted: () => {

        }
    });


    const { data: customerData, loading: customerLoading } = useQuery(
        getCustomerQuery,
        { skip: !isSignedIn }
    );

    const {
        data: checkoutData,
        networkStatus: checkoutQueryNetworkStatus
    } = useQuery(getCheckoutDetailsQuery, {
        /**
         * Skip fetching checkout details if the `cartId`
         * is a falsy value.
         */
        skip: !cartId,
        notifyOnNetworkStatusChange: true,
        variables: {
            cartId
        }
    });


    const cartItems = useMemo(() => {
        return (checkoutData && checkoutData.cart.items) || [];
    }, [checkoutData]);

    /**
     * For more info about network statues check this out
     *
     * https://www.apollographql.com/docs/react/data/queries/#inspecting-loading-states
     */
    const isLoading = useMemo(() => {
        const checkoutQueryInFlight = checkoutQueryNetworkStatus
            ? checkoutQueryNetworkStatus < 7
            : true;

        return checkoutQueryInFlight || customerLoading;
    }, [checkoutQueryNetworkStatus, customerLoading]);
    const customer = customerData && customerData.customer;

    const toggleAddressBookContent = useCallback(() => {
        setActiveContent(currentlyActive =>
            currentlyActive === 'checkout' ? 'addressBook' : 'checkout'
        );
    }, []);
    const toggleSignInContent = useCallback(() => {
        setActiveContent(currentlyActive =>
            currentlyActive === 'checkout' ? 'signIn' : 'checkout'
        );
    }, []);

    const checkoutError = useMemo(() => {
        if (placeOrderError) {
            return new CheckoutError(placeOrderError);
        }
    }, [placeOrderError]);

    const handleReviewOrder = useCallback((paymentMethod) => {
        const { dataItems, total } = props;
        setReviewOrderButtonClicked(true);
        const newItems = [];
        dataItems.forEach((item) => {
            const { quantity, product } = item;
            newItems.push({
                item_id: product.id,
                sku: product.sku,
                item_name: product.name,
                quantity: quantity,
                price: product.price_range.maximum_price.final_price.value,
                currency: product.price_range.maximum_price.final_price.currency
            })
        })

        setCheckoutStep(CHECKOUT_STEP.REVIEW);
        if (isMobile) {
            window.scrollTo({
                left: 0,
                top: 950,
                behavior: 'smooth'
            });
        }
        ReactGA4.event("add_payment_info", {
            items: newItems,
            payment_type: paymentMethod,
            currency: "PKR",
            value: total
        })
    }, []);

    const resetReviewOrderButtonClicked = useCallback(() => {
        setReviewOrderButtonClicked(false);
    }, [setReviewOrderButtonClicked]);

    const setShippingInformationDone = useCallback(() => {
        if (checkoutStep === CHECKOUT_STEP.SHIPPING_ADDRESS) {
            setCheckoutStep(CHECKOUT_STEP.SHIPPING_METHOD);
            window.scrollTo({
                left: 0,
                top: 0,
                behavior: 'smooth'
            });
        }
    }, [checkoutStep, setCheckoutStep]);


    const setShippingMethodDone = useCallback(() => {
        if (checkoutStep === CHECKOUT_STEP.SHIPPING_METHOD) {
            setCheckoutStep(CHECKOUT_STEP.PAYMENT);
            if (isMobile) {
                window.scrollTo({
                    left: 0,
                    top: 550,
                    behavior: 'smooth'
                });
            }
        }
    }, [checkoutStep, setCheckoutStep]);

    const setPaymentInformationDone = useCallback(() => {
        if (checkoutStep === CHECKOUT_STEP.PAYMENT && isPaymentSelected) {
            window.scrollTo({
                left: 0,
                top: 0,
                behavior: 'smooth'
            });
            setCheckoutStep(CHECKOUT_STEP.REVIEW);
        }
    }, [checkoutStep, setCheckoutStep, isPaymentSelected]);

    const handlePlaceOrder = useCallback(async () => {
        // Fetch order details and then use an effect to actually place the
        // order. If/when Apollo returns promises for invokers from useLazyQuery
        // we can just await this function and then perform the rest of order
        // placement.
        if (isPaymentSelected) {
            getOrderDetails({
                variables: {
                    cartId
                }
            });
        }
    }, [cartId, getOrderDetails, isPaymentSelected]);

    // Go back to checkout if shopper logs in
    useEffect(() => {
        if (isSignedIn) {
            setActiveContent('checkout');
        }
    }, [isSignedIn]);

    useEffect(() => {
        async function placeOrderAndCleanup() {
            try {
                await placeOrder({
                    variables: {
                        cartId,
                        bank_name: bank_id,
                        tenure: tenure
                    }
                });

                // Cleanup stale cart and customer info.
                await removeCart();
                await clearCartDataFromCache(apolloClient);

                await createCart({
                    fetchCartId
                });
            } catch (err) {
                console.error(
                    'An error occurred during when placing the order',
                    err
                );
                setReviewOrderButtonClicked(false);
                setCheckoutStep(CHECKOUT_STEP.PAYMENT);
            }
        }
        // window.scrollTo({
        //     left: 0,
        //     top: 0,
        //     behavior: 'smooth'
        // });

        if (orderDetailsData && !placeOrderCalled) {
            placeOrderAndCleanup();
        }
    }, [
        apolloClient,
        cartId,
        createCart,
        fetchCartId,
        orderDetailsData,
        placeOrder,
        placeOrderCalled,
        removeCart,
        bank_id,
        tenure
    ]);
    return {
        activeContent,
        cartItems,
        checkoutStep,
        customer,
        error: checkoutError,
        handlePlaceOrder,
        hasError: !!checkoutError,
        isCartEmpty: !(checkoutData && checkoutData.cart.total_quantity),
        isGuestCheckout: !isSignedIn,
        isLoading,
        isUpdating,
        orderDetailsData,
        orderDetailsLoading,
        orderNumber:
            (placeOrderData && placeOrderData.placeOrder.order.order_number) ||
            null,
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

    };
};
