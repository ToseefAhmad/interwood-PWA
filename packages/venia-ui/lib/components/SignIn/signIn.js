import React, {Fragment, useEffect, useMemo, useState} from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { func, shape, string } from 'prop-types';
import ReactGA from 'react-ga';
import { Form } from 'informed';
import { useSignIn } from '@magento/peregrine/lib/talons/SignIn/useSignIn';
import { Link } from '@magento/venia-drivers';

import { mergeClasses } from '../../classify';
import { isRequired } from '../../util/formValidators';
import LoadingIndicator from '../LoadingIndicator';
import TextInput from '../TextInput';
import defaultClasses from './signIn.css';
import { GET_CART_DETAILS_QUERY } from './signIn.gql';
import Password from '../Password';
import FormError from '../FormError/formError';
import {Title} from "../Head";
import { useToasts } from '@magento/peregrine';

import forgotPasswordOperations from '../ForgotPassword/forgotPassword.gql';

const SignIn = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const { setDefaultUsername, showCreateAccount, showForgotPassword } = props;
    const [showReq,setShowReq]=useState(false);

    const [msg,setMsg]=useState();
    const talonProps = useSignIn({
        getCartDetailsQuery: GET_CART_DETAILS_QUERY,
        ...forgotPasswordOperations,
        setDefaultUsername,
        showCreateAccount,
        showForgotPassword
    });

    const {
        errors,
        handleCreateAccount,
        handleForgotPassword,
        handleSubmit,
        isBusy,
        setFormApi,
        resetReq,
        handleFormSubmit,
        hasCompleted,
        setResetReq,
        requestResetEmailError,
        restRequestData
        
    } = talonProps;

    // useEffect(() => {

    //     ReactGA.initialize('UA-43977906-1');
    //     ReactGA.pageview(window.location.pathname + window.location.search);
    // })
    
    useMemo(() => {
        if (resetReq) {
            setShowReq(true)
            setResetReq(false)
        }
        if (hasCompleted) {
           setMsg('Please check your email');
        }
    }, [resetReq, hasCompleted, setResetReq])

    const [, { addToast }] = useToasts();

    useMemo(() => {
        if(restRequestData) {
            addToast({
                type: 'info',
                message: 'Reset Password has been send successfully.',
                timeout: 5000
            });
        }
        if(requestResetEmailError) {
            addToast({
                type: 'error',
                message: 'Something went wrong Please try again later',
                timeout: 5000
            });
        }
    }, [ requestResetEmailError, restRequestData])

    if (isBusy) {
        return (
            <div className={classes.modal_active}>
                <LoadingIndicator>
                    <FormattedMessage
                        id={'signIn.loadingText'}
                        defaultMessage={'Signing In'}
                    />
                </LoadingIndicator>
            </div>
        );
    }

    const forgotPasswordClasses = {
        root: classes.forgotPasswordButton
    };

    const handleShowPopup=()=>{
        setShowReq(!showReq);
    }
    const popUp=<div id="modal" className="modal modal__bg" role="dialog" aria-hidden="true">
    <div className="modal__dialog">
        <div className="modal__content">
            <div className="modal__vector">
                <img src={require("../../assets/img/icons/password-reset.svg")}  alt="Reset Your Password" />
            </div>
            <h1 className="modal__title">Password Reset Request</h1>
            <p className="modal__discription">
                Your password has been expired. Please reset your password.
            </p>
            <div className="modal__actions">
                <button className="btn-modal btn-modal-primary" onClick={handleFormSubmit}>Reset Password</button>
            </div>
            <a className="modal__close demo-close" onClick={handleShowPopup}>
                <svg className="" viewBox="0 0 24 24"><path d="M19 6.41l-1.41-1.41-5.59 5.59-5.59-5.59-1.41 1.41 5.59 5.59-5.59 5.59 1.41 1.41 5.59-5.59 5.59 5.59 1.41-1.41-5.59-5.59z"/><path d="M0 0h24v24h-24z" fill="none"/></svg>
            </a>
        </div>
    </div>
</div>;


    return (
        <Fragment>
            <Title>{`Sign In`} - {STORE_NAME}</Title>
            <div className={classes.root}>
                {showReq && !hasCompleted ?popUp:null}
                <div className={[defaultClasses["int-form"],  " "].join(' ')}>
                    <div className={[defaultClasses["form-holder"],  " "].join(' ')}>
                        <div className={[defaultClasses["form-area"],  " "].join(' ')}>
                            <h2 className={[defaultClasses["form-head"],  " "].join(' ')}>Login with your account</h2>
                            <strong className={[defaultClasses["text-head"],  " "].join(' ')}>Enter your e-mail address and password to log in.</strong>

                            {msg ?  <span className={defaultClasses['msg']}>{msg}</span>: <FormError errors={Array.from(errors.values())} /> }
                            <Form
                                getApi={setFormApi}
                                className={classes.form}
                                onSubmit={handleSubmit}
                            >
                                <div className={[defaultClasses["wrp-field"],  " "].join(' ')}>
                                    <TextInput
                                        autoComplete="email"
                                        field="email"
                                        placeholder="Your Email"
                                        validate={isRequired}
                                    />
                                </div>
                                <div className={[defaultClasses["wrp-field"],  " "].join(' ')}>
                                    <Password
                                        fieldName="password"
                                        validate={isRequired}
                                        autoComplete="current-password"
                                        placeholder="Your Password"
                                        isToggleButtonHidden={false}
                                    />
                                </div>
                                <strong className={[defaultClasses["text-forgot"],  " "].join(' ')}>
                                    <Link className={[defaultClasses["link-forgot"],  " "].join(' ')} to="/forgot-password">
                                        Forgot password?
                                    </Link>
                                </strong>
                                <button type="submit" className={[defaultClasses["bt-login"],  " "].join(' ')}>Sign In</button>
                            </Form>

                        </div>
                        <div className={[defaultClasses["cr-acc"],  " "].join(' ')}>
                            <h2 className={[defaultClasses["form-head"],  " "].join(' ')}>New Customer</h2>
                            <strong className={[defaultClasses["text-head"],  " "].join(' ')}>By creating an account with us, purchasing on our website becomes
                                much faster and easier.
                            </strong>
                            <Link className={[defaultClasses["bt-create"],  " "].join(' ')} to="/create-account">
                                Create an Account
                            </Link>
                        </div>
                    </div>
                </div>



                {/*<FormError errors={Array.from(errors.values())} />*/}
                {/*<Form*/}
                {/*    getApi={setFormApi}*/}
                {/*    className={classes.form}*/}
                {/*    onSubmit={handleSubmit}*/}
                {/*>*/}
                {/*    <Field*/}
                {/*        label={formatMessage({*/}
                {/*            id: 'signIn.emailAddressText',*/}
                {/*            defaultMessage: 'Email address'*/}
                {/*        })}*/}
                {/*    >*/}
                {/*        <TextInput*/}
                {/*            autoComplete="email"*/}
                {/*            field="email"*/}
                {/*            validate={isRequired}*/}
                {/*        />*/}
                {/*    </Field>*/}
                {/*    <Password*/}
                {/*        fieldName="password"*/}
                {/*        label={formatMessage({*/}
                {/*            id: 'signIn.passwordText',*/}
                {/*            defaultMessage: 'Password'*/}
                {/*        })}*/}
                {/*        validate={isRequired}*/}
                {/*        autoComplete="current-password"*/}
                {/*        isToggleButtonHidden={false}*/}
                {/*    />*/}
                {/*    <div className={classes.forgotPasswordButtonContainer}>*/}
                {/*        <LinkButton*/}
                {/*            classes={forgotPasswordClasses}*/}
                {/*            type="button"*/}
                {/*            onClick={handleForgotPassword}*/}
                {/*        >*/}
                {/*            <FormattedMessage*/}
                {/*                id={'signIn.forgotPasswordText'}*/}
                {/*                defaultMessage={'Forgot Password?'}*/}
                {/*            />*/}
                {/*        </LinkButton>*/}
                {/*    </div>*/}
                {/*    <div className={classes.buttonsContainer}>*/}
                {/*        <Button priority="high" type="submit">*/}
                {/*            <FormattedMessage*/}
                {/*                id={'signIn.signInText'}*/}
                {/*                defaultMessage={'Sign In'}*/}
                {/*            />*/}
                {/*        </Button>*/}
                {/*        <Button*/}
                {/*            priority="normal"*/}
                {/*            type="button"*/}
                {/*            onClick={handleCreateAccount}*/}
                {/*        >*/}
                {/*            <FormattedMessage*/}
                {/*                id={'signIn.createAccountText'}*/}
                {/*                defaultMessage={'Create an Account'}*/}
                {/*            />*/}
                {/*        </Button>*/}
                {/*    </div>*/}
                {/*</Form>*/}

            </div>
        </Fragment>

    );
};

export default SignIn;
SignIn.propTypes = {
    classes: shape({
        buttonsContainer: string,
        form: string,
        forgotPasswordButton: string,
        forgotPasswordButtonContainer: string,
        root: string,
        title: string
    }),
    setDefaultUsername: func,
    showCreateAccount: func,
    showForgotPassword: func
};
SignIn.defaultProps = {
    setDefaultUsername: () => {},
    showCreateAccount: () => {},
    showForgotPassword: () => {}
};
