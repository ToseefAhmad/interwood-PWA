import { useCallback, useMemo, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';

export const useCallForPrice = props => {
    const {
        productId,
        callForPriceMutaion
    } = props;

    const [shouldShowNewPassword, setShouldShowNewPassword] = useState(false);

    const [isUpdateMode, setIsUpdateMode] = useState(false);

    // Use local state to determine whether to display errors or not.
    // Could be replaced by a "reset mutation" function from apollo client.
    // https://github.com/apollographql/apollo-feature-requests/issues/170
    const [displayError, setDisplayError] = useState(false);

    const [ runCallForPrice, { loading, error, data}] = useMutation(callForPriceMutaion)

    const handleChangePassword = useCallback(() => {
        setShouldShowNewPassword(true);
    }, [setShouldShowNewPassword]);

    const handleCancel = useCallback(() => {
        setIsUpdateMode(false);
        setShouldShowNewPassword(false);
    }, [setIsUpdateMode]);

    const showUpdateMode = useCallback(() => {
        setIsUpdateMode(true);

        // If there were errors from removing/updating info, hide them
        // when we open the modal.
        setDisplayError(false);
    }, [setIsUpdateMode]);

    const handleSubmit = useCallback(
        async ({ email, name, phone, city, message }) => {
            try {
                email = email.trim();
                runCallForPrice({
                    variables :{
                        name : name,
                        email: email,
                        phone : phone,
                        city : city,
                        message : message,
                        productId : productId
                    }
                })

                handleCancel(false);
            } catch (error){
                // Make sure any errors from the mutation are displayed.
                setDisplayError(false);

                // we have an onError link that logs errors, and FormError
                // already renders this error, so just return to avoid
                // triggering the success callback
                console.error(error);            
                return;
            }
        },
        [
            handleCancel,
            productId
        ]
    );

    const tempErrors = displayError
        ? [error]
        : [];

    return {
        handleCancel,
        formErrors: tempErrors,
        handleSubmit,
        handleChangePassword,
        // isDisabled: isUpdatingCustomerInformation || isChangingCustomerPassword,
        isUpdateMode,
        loadDataError : error,
        showUpdateMode,
        loading,
        data
    };
};
