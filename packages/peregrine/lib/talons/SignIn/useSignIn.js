import { useCallback, useRef, useState, useMemo } from 'react';
import { useLocation , useHistory} from 'react-router-dom';
import { useApolloClient, useMutation } from '@apollo/client';


import { clearCartDataFromCache } from '../../Apollo/clearCartDataFromCache';
import { clearCustomerDataFromCache } from '../../Apollo/clearCustomerDataFromCache';
import mergeOperations from '../../util/shallowMerge';
import { useCartContext } from '../../context/cart';
import { useUserContext } from '../../context/user';
import { useAwaitQuery } from '../../hooks/useAwaitQuery';
import { retrieveCartId } from '../../store/actions/cart';

import DEFAULT_OPERATIONS from './signIn.gql';

export const useSignIn = props => {
    const {
        getCartDetailsQuery,
        setDefaultUsername,
        showCreateAccount,
        showForgotPassword,
        mutations
    } = props;

    const operations = mergeOperations(DEFAULT_OPERATIONS, props.operations);
    const {
        createCartMutation,
        getCustomerQuery,
        mergeCartsMutation,
        signInMutation
    } = operations;
    let history = useHistory();
    let location = useLocation();
    const apolloClient = useApolloClient();
    const [isSigningIn, setIsSigningIn] = useState(false);

    const [resetReq,setResetReq]=useState(false);
    const [customerEmail,setCustomerEmail]=useState();

    const [
        { cartId },
        { createCart, removeCart, getCartDetails }
    ] = useCartContext();

    const [
        requestResetEmail,
        { error: requestResetEmailError, loading: isResettingPassword, data: restRequestData }
    ] = useMutation(mutations.requestPasswordResetEmailMutation);

    const [forgotPasswordEmail, setForgotPasswordEmail] = useState(null);
    const [hasCompleted, setCompleted] = useState(false);

    const handleForgotPassword = useCallback(() => {
        if (customerEmail) {
            setDefaultUsername(customerEmail);
        }
        showForgotPassword();
    }, [setDefaultUsername, showForgotPassword]);

    const handleFormSubmit = useCallback(
        async () => {
            try {
                await requestResetEmail({ variables: { email:customerEmail } });
                setForgotPasswordEmail(customerEmail);
                setCompleted(true);
            } catch (err) {
                setCompleted(false);
            }
        },
        [requestResetEmail,customerEmail]
    );

    const [
        { isGettingDetails, getDetailsError, isSignedIn: isUserSignedIn},
        { getUserDetails, setToken }
    ] = useUserContext();

    const [signIn, { error: signInError }] = useMutation(signInMutation, {
        fetchPolicy: 'no-cache'
    });

    const [fetchCartId] = useMutation(createCartMutation);
    const [mergeCarts] = useMutation(mergeCartsMutation);
    const fetchUserDetails = useAwaitQuery(getCustomerQuery);
    const fetchCartDetails = useAwaitQuery(getCartDetailsQuery);

    const formApiRef = useRef(null);
    const setFormApi = useCallback(api => (formApiRef.current = api), []);

    const handleSubmit = useCallback(
        async ({ email, password }) => {
            setIsSigningIn(true);
            try {
                // Get source cart id (guest cart id).
                const sourceCartId = cartId;

                // Sign in and set the token.
                const signInResponse = await signIn({
                    variables: { email, password }
                });
                if(signInResponse.data.generateCustomerToken.token!==null)
                {
                    const token = signInResponse.data.generateCustomerToken.token;
                    await setToken(token);
                }

                if(signInResponse.data &&
                    signInResponse.data.generateCustomerToken &&
                    signInResponse.data.generateCustomerToken.resetReq ){
                    setResetReq(signInResponse.data.generateCustomerToken.resetReq);
                    setCompleted(false)
                }

                if(signInResponse.data.generateCustomerToken.token!==null) {
                // Clear all cart/customer data from cache and redux.
                    await clearCartDataFromCache(apolloClient);
                    await clearCustomerDataFromCache(apolloClient);
                    await removeCart();

                    // Create and get the customer's cart id.
                    await createCart({
                        fetchCartId
                    });
                    const destinationCartId = await retrieveCartId();

                    // Merge the guest cart into the customer cart.
                    await mergeCarts({
                        variables: {
                            destinationCartId,
                            sourceCartId
                        }
                    });
                } else {
                    setIsSigningIn(false);
                }
                    // Ensure old stores are updated with any new data.
                    getUserDetails({ fetchUserDetails });
                    getCartDetails({ fetchCartId, fetchCartDetails });
                    setCustomerEmail(email);
                
            } catch (error) {
                if (process.env.NODE_ENV !== 'production') {
                    console.error(error);
                }
                setCustomerEmail(email);
                setIsSigningIn(false);
            }
        },
        [
            cartId,
            apolloClient,
            removeCart,
            signIn,
            setToken,
            createCart,
            fetchCartId,
            mergeCarts,
            getUserDetails,
            fetchUserDetails,
            getCartDetails,
            fetchCartDetails,
            setCompleted
        ]
    );

    const handleCreateAccount = useCallback(() => {
        const { current: formApi } = formApiRef;

        if (formApi) {
            setDefaultUsername(formApi.getValue('email'));
        }
        showCreateAccount();
    }, [setDefaultUsername, showCreateAccount]);

    const errors = useMemo(
        () =>
            new Map([
                ['getUserDetailsQuery', getDetailsError],
                ['signInMutation', signInError]
            ]),
        [getDetailsError, signInError]
    );
    useMemo(() => {
        if(isUserSignedIn){
            if(location.hasOwnProperty('key')){
                history.goBack();
            } else {
                history.push('/')
            }
        }
    },[isUserSignedIn]);

    return {
        errors,
        handleCreateAccount,
        handleForgotPassword,
        handleSubmit,
        isBusy: isGettingDetails || isSigningIn,
        setFormApi,
        resetReq,
        handleFormSubmit,
        hasCompleted,
        setResetReq,
        requestResetEmailError,
        restRequestData
        

    };
};
