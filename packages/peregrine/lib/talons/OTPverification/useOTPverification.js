import { gql, useLazyQuery } from '@apollo/client';
import { useCallback } from 'react';

const GETOTPVERIFICATION = gql`
    query smsVerification($orderId:String!,$smsCode:String!){
        smsVerification(orderId:$orderId,smsCode:$smsCode) {
        status
    }
}`;

export const useOTPverification = (props) => {
    const {otp, orderId} = props;
    const [codeHandler, { data, error, loading }] = useLazyQuery(GETOTPVERIFICATION,{
        fetchPolicy: 'network-only'
    });

    const otpCodeHandler = useCallback(() => {
        codeHandler({
            variables: {
                orderId: orderId,
                smsCode: otp
            }
        })
    },[codeHandler, otp, orderId]);

    return {
        error,
        data,
        loading,
        otpCodeHandler
    }
};
