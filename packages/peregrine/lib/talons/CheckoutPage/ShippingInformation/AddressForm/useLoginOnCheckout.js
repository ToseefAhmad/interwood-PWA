import { useCallback, useRef, useState, useMemo } from 'react';
import { useLocation , useHistory} from 'react-router-dom';
import { useApolloClient, useMutation } from '@apollo/client';


import { clearCartDataFromCache } from '../../../../Apollo/clearCartDataFromCache';
import { clearCustomerDataFromCache } from '../../../../Apollo/clearCustomerDataFromCache';
import mergeOperations from '../../../../util/shallowMerge';
import { useCartContext } from '../../../../context/cart';
import { useUserContext } from '../../../../context/user';
import { useAwaitQuery } from '../../../../hooks/useAwaitQuery';
import { retrieveCartId } from '../../../../store/actions/cart';

import DEFAULT_OPERATIONS from '../../../SignIn/signIn.gql';

export const useLoginOnCheckout = props => {
    const {
        getCartDetailsQuery,
        forgotPasswordMutation
    } = props;
    const [ password, setPassword ] = useState('')
    const [email, setEmail] = useState('');
    const [popupTriger,setPopupTriger]=useState(false);
    const operations = mergeOperations(DEFAULT_OPERATIONS, props.operations);
    const {
        createCartMutation,
        getCustomerQuery,
        mergeCartsMutation,
        signInMutation,
    } = operations;
    let history = useHistory();
    let location = useLocation();
    const apolloClient = useApolloClient();
    const [isSigningIn, setIsSigningIn] = useState(false);

    const [
        { cartId },
        { createCart, removeCart, getCartDetails }
    ] = useCartContext();

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
    const [runForgotMutation, {error: resetError, data : resetData} ] = useMutation(forgotPasswordMutation)

    const formApiRef = useRef(null);
    const setFormApi = useCallback(api => (formApiRef.current = api), []);

    const handlePassword = (e) =>{
        const temp = e.target.value;
        setPassword(temp)
    };

    const handleEmail = (e) =>{
        const temp = e.target.value;
        setEmail(temp)
    };

    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            e.stopPropagation();
            
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
                    setPopupTriger(signInResponse.data.generateCustomerToken.resetReq);
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
                
            } catch (error) {
                if (process.env.NODE_ENV !== 'production') {
                    console.error(error);
                }
                // setCustomerEmail(email);
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
            setPopupTriger,
            email, 
            password
        ]
    );

    // useMemo(() => {
    //     if(isUserSignedIn){
    //         if(location.hasOwnProperty('key')){
    //             history.goBack();
    //         } else {
    //             history.push('/')
    //         }
    //     }
    // },[isUserSignedIn]);

    const handleRestPassword = () => {
        runForgotMutation({
            variables : {email : email}
        });
        setPopupTriger(false);
    }


    return {
        signInError,
        handleSubmit,
        isBusy: isGettingDetails || isSigningIn,
        handlePassword,
        handleEmail,
        email,
        popupTriger,
        setPopupTriger,
        handleRestPassword,
        resetError,
        resetData
    };
};
// 