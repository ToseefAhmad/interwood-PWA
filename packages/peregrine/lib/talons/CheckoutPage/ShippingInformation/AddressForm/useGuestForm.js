import { useCallback, useMemo, useState } from 'react';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { useCartContext } from '../../../../context/cart';
export const useGuestForm = props => {
    const {
        afterSubmit,
        mutations: { setGuestShippingMutation },
        queries: { isEmailAvailableQuery, getCitiesQuery },
        onCancel,
        shippingData
    } = props;

    const [{ cartId }] = useCartContext();

    const [setGuestShipping, { error, loading }] = useMutation(
        setGuestShippingMutation
    );
    const [emailVerify, setEmailVerify] = useState('')

    const { country, region } = shippingData;
    const { code: countryCode } = country;
    const { code: regionCode } = region;

    const initialValues = {
        ...shippingData,
        country: "PK",
        region: regionCode
    };

    const [runIsEmailAvailAble, { data: isEmailAvailableData }] = useLazyQuery(isEmailAvailableQuery)
    const { data: citiesData } = useQuery(getCitiesQuery, { variables: { countryName: 'Pakistan' } });

    // Simple heuristic to indicate form was submitted prior to this render
    const isUpdate = !!shippingData.city;

    const isEmailAvailable = (e) => {
        const isEmail = e.target.value;
        if (isEmail.includes('@')) {
            setEmailVerify(isEmail)
            runIsEmailAvailAble({
                variables: { email: isEmail }
            })
        }
    };

    const handleSubmit = useCallback(
        async formValues => {
            const { country, email, ...address } = formValues;
            try {
                await setGuestShipping({
                    variables: {
                        cartId,
                        email,
                        address: {
                            ...address,
                            country_code: country
                        }
                    }
                });
            } catch {
                return;
            }




            if (afterSubmit) {
                afterSubmit();
            }
        },
        [afterSubmit, cartId, setGuestShipping]
    );

    const handleCancel = useCallback(() => {
        onCancel();
    }, [onCancel]);

    const errors = useMemo(
        () => new Map([['setGuestShippingMutation', error]]),
        [error]
    );

    return {
        errors,
        handleCancel,
        handleSubmit,
        initialValues,
        isSaving: loading,
        isUpdate,
        isEmailAvailable,
        emailVerify,
        userVerified: isEmailAvailableData ? isEmailAvailableData.isEmailAvailable.is_email_available : null,
        cities: citiesData ? citiesData.getCities : []

    };
};
