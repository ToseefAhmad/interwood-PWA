import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useToasts } from '@magento/peregrine';
import {deriveErrorMessage} from '@magento/peregrine/lib/util/deriveErrorMessage';
import { useResendOtp } from "@magento/peregrine/lib/talons/OTPverification/useResendOtp";
import { useOTPverification } from '@magento/peregrine/lib/talons/OTPverification/useOTPverification';

import classify from '../../classify';
import defaultClasses from './OTPverification.module.css';
import {fullPageLoadingIndicator} from "../LoadingIndicator";

const OTPverification = (props) => {
    const {orderId} = props;
    const [otp, setotp] = useState('');
    const [resend, setResend] = useState(false);
    const [count, setCount] = useState(30);

    const talonProps = useOTPverification({orderId, otp});
    const resendTalons = useResendOtp({orderId});
    const [, { addToast }] = useToasts();

    const { 
        data: resendData,   
        error: resendError,
        loading: resendLoading,
        reSendCodeHandler 
    } = resendTalons;  
    const { 
        data: smsVerificationData,
        error: smsVerificationError,
        loading: smsVerificationLoading,
        otpCodeHandler 
    } = talonProps;

    useEffect(() => {
        if(smsVerificationData !== undefined) {
            const status = smsVerificationData?.smsVerification?.status;
            addToast({
                type: 'info',
                message: status.toUpperCase(),
                timeout: 10000
            });
        };
        if(resendData !== undefined) {
            const status = resendData?.resendSMS?.status;
            addToast({
                type: 'info',
                message: status.toUpperCase(),
                timeout: 10000
            });
        }
    },
    [ smsVerificationData, 
      resendData, 
      addToast
    ]);

    useEffect(() => {
        if((resendError || smsVerificationError)) {
            const getError = resendError || smsVerificationError;
            const errorMessage = deriveErrorMessage([getError]);
            addToast({
                type: 'error',
                message: errorMessage,
                timeout: 5000
            });

        }
    }, [resendError, smsVerificationError, deriveErrorMessage, addToast]);

    const changehandler = (e) => {
        const value = e.target.value;
        setotp(value);
    };                                                                                           

    const verifyBtnHandler = useCallback(() => {

        if(!!otp) {
            otpCodeHandler({
                orderId,
                otp
            });
        }
    }, [otp, orderId, otpCodeHandler]);

    const startCountdown = (seconds) => {
        let counter = seconds;
        const interval = setInterval(() => {
            counter--;
            setCount((prevCount) => {
                return prevCount - 1;
            });
            if (counter < 0) {
                clearInterval(interval);
                setCount(30);
            }
        }, 1000);
    };

    const resendBtnHandler = () => {
        reSendCodeHandler(orderId);
        setResend(!resend);
        setTimeout(() => {
            setResend(false);
        }, 30000);
        startCountdown(count);
    };

    return (
        <div id="verifyotp" className="verify">
            <label>Verify OTP To Confirm Your Order</label>
            <p>
                <input onChange={changehandler} type="number" required value={otp} />
                <span>
                    <button 
                        onClick={verifyBtnHandler} 
                        disabled={otp.length < 4 } 
                        type="button" 
                        className="btnone">
                            Verify
                    </button>
                </span> 
                <span>
                    <button 
                        onClick={resendBtnHandler}
                        type="button"
                        className="btntwo"
                        disabled={resend}>
                            Resend OTP
                    </button>
                </span>
            </p>
            <p className="wait">
                {resend ? `Wait for ${count} seconds` : null}
            </p>
            { (smsVerificationLoading ||  resendLoading) && fullPageLoadingIndicator }
        </div>
    )
};

export default classify(defaultClasses)(OTPverification);
