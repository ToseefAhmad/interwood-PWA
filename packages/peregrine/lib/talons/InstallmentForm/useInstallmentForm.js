import {useMutation, useQuery} from '@apollo/client';
import {useCallback, useState} from "react";
import mergeOperations from "../../util/shallowMerge";
import DEFAULT_OPERATIONS from "./installmentForm.gql";

export const useInstallmentForm = props => {

    const operations = mergeOperations(DEFAULT_OPERATIONS, props.operations);
    const {
        submitInstallmentForm,
        getCardType,
        getBank,
        getCategory,
        getInstallmentMonths
    } = operations;

    const {
        name,
        contact,
        email,
        city,
        card_type,
        installment_months,
        category,
        bank
    } = props;

    const [installmentForm,data] = useMutation(
        submitInstallmentForm,
        {
            name,
            contact,
            email,
            city,
            card_type,
            installment_months,
            category,
            bank
        },
        { errorPolicy: 'all' }
    );

    const {data:cardData ,error:cardError}=useQuery(getCardType);
    const {data:bankData ,error:bankError}=useQuery(getBank);
    const {data:categoryData ,error:categoryError}=useQuery(getCategory);
    const {data:installmentData ,error:installmentError}=useQuery(getInstallmentMonths);


    const handleSubmit = useCallback(
        async () => {
            try {
                await installmentForm({

                    variables:{
                        name:name,
                        contact:contact,
                        email:email,
                        city:city,
                        card_type:card_type,
                        installment_months:installment_months,
                        category:category,
                        bank:bank
                    }
                });

            } catch (error) {
                console.error(error);
            }
        },
        [
            installmentForm,
            name,
            contact,
            email,
            city,
            card_type,
            installment_months,
            category,
            bank
        ]
    );

    return {
        handleSubmit,
        data,
        cardData,
        cardError,
        categoryData,
        categoryError,
        bankData,
        bankError,
        installmentData,
        installmentError};
};
