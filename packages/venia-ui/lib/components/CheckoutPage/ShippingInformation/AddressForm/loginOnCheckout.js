import React, { useMemo } from 'react';
import { GET_CART_DETAILS_QUERY } from './cartDetail.gql';
import {fullPageLoadingIndicator } from '../../../LoadingIndicator';

import {useLoginOnCheckout} from '@magento/peregrine/lib/talons/CheckoutPage/ShippingInformation/AddressForm/useLoginOnCheckout';
import classify from '../../../../classify';
import defaultClasses from './addressForm.css';
import { useToasts } from '@magento/peregrine';
import forgotPasswordOperations from '../../../ForgotPassword/forgotPassword.gql';
import { Link } from 'react-router-dom';

const LoginOnCheckout = (props) => {
    // const { email } = props;

    const {
            handlePassword,
            handleSubmit,
            signInError,
            isBusy,
            handleEmail,
            email,
            popupTriger,
            setPopupTriger,
            handleRestPassword,
            resetError,
            resetData
        }  = useLoginOnCheckout({
        getCartDetailsQuery: GET_CART_DETAILS_QUERY,
        forgotPasswordMutation : forgotPasswordOperations.mutations.requestPasswordResetEmailMutation
    });
    const [, { addToast }] = useToasts();

    useMemo(() => {
        if(resetData) {
            addToast({
                type: 'info',
                message: 'Reset Password has been send successfully.',
                timeout: 5000
            });
        }
        if(resetError) {
            addToast({
                type: 'error',
                message: 'Something went wrong Please try again later',
                timeout: 5000
            });
        }
    }, [ resetError, resetData])

    let firePopup = popupTriger ? 
        <div id="modal" className="modal modal__bg" role="dialog" aria-hidden="true">
            <div className="modal__dialog">
                <div className="modal__content">
                    <div className="modal__vector">
                        <img src={require("../../../../assets/img/icons/password-reset.svg")}  alt="Reset Your Password" />
                    </div>
                    <h1 className="modal__title">Password Reset Request</h1>
                    <p className="modal__discription">
                        Your password has been expired. Please reset your password.
                    </p>
                    <div className="modal__actions">
                        <button className="btn-modal btn-modal-primary" onClick={handleRestPassword}>Reset Password</button>
                    </div>
                    <a className="modal__close demo-close" onClick={() => setPopupTriger(false)}>
                        <svg className="" viewBox="0 0 24 24"><path d="M19 6.41l-1.41-1.41-5.59 5.59-5.59-5.59-1.41 1.41 5.59 5.59-5.59 5.59 1.41 1.41 5.59-5.59 5.59 5.59 1.41-1.41-5.59-5.59z"/><path d="M0 0h24v24h-24z" fill="none"/></svg>
                    </a>
                </div>
            </div>
        </div> :  null;


    return(
        <div>
            {firePopup}
            <div className="error">
            {signInError ? signInError.message: null}
            </div>
            <div>
                <form onSubmit={handleSubmit} className="login-checkout">
                    <div className="form-group">
                        <label className="form-label">Enter Email</label>
                        <input className="input" type='email' required={true} value={email} onChange={() => handleEmail(event) } placeholder='example@example.com'/>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Enter Password</label>
                        <input className="input" type='password' required={true}  onChange={() => handlePassword(event) }/>
                    </div>
                    <button className="btn-login" type='submit'>Login</button>
                    <div className="forgot-password">
                        <Link to='/forgot-password'>
                                Forgot password?
                        </Link>
                    </div>
                </form>
                {/* <span className="checkout-note">Please enter password and make faster checkout</span> */}

            </div>
            {/* {signInError ? signInError.message: null} */}
            {isBusy ? fullPageLoadingIndicator : null}
        </div>
    )
}

export default classify(defaultClasses)(LoginOnCheckout);