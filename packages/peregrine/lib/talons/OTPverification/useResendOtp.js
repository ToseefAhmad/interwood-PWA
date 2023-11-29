import { useCallback } from 'react';
import { gql, useLazyQuery } from '@apollo/client';

const RESENDOTP = gql`
    query resendSMS($orderId:String){
        resendSMS(orderId:$orderId) {
            status
               }
}`;

export const useResendOtp = (props) => {
    const {orderId} = props;
    const [codeHandler, { data, error, loading }] = useLazyQuery(RESENDOTP,{
        fetchPolicy: 'network-only'
    });

    const reSendCodeHandler = useCallback(() => {
        codeHandler({
            variables: {
                orderId: orderId
            }
        })
    },[codeHandler, orderId]);
    
    return {
        error,
        data,
        loading,
        reSendCodeHandler
    }
};

