import {useMutation, useQuery} from '@apollo/client';
import {useCallback} from "react";

import mergeOperations from "../../util/shallowMerge";
import DEFAULT_OPERATIONS from "./loyaltyForm.gql"

export const useLoyaltyForm = props => {

    const operations = mergeOperations(DEFAULT_OPERATIONS, props.operations);
    const {
        submitLoyaltyForm,
        loyaltyStores
    } = operations;

    const {
        firstName,
        lastName,
        email,
        city,
        contact,
        gender,
        dob,
        stores
    } = props;

    const [loyaltyForm,data] = useMutation(
        submitLoyaltyForm,
        {
            firstName,
            lastName,
            email,
            city,
            contact,
            gender,
            dob,
            stores
        }
    );

    const {data:storesData ,error:storesError}=useQuery(loyaltyStores);

    const handleSubmit = useCallback(
        async () => {
            try {
                await loyaltyForm({

                    variables:{
                        firstName: firstName,
                        lastName:lastName,
                        email:email,
                        city: city,
                        contact: contact,
                        gender: gender,
                        dob: dob,
                        stores: stores
                    }
                });

            } catch (error) {
                console.error(error);
            }
        },
        [
            loyaltyForm,
            firstName,
            lastName,
            email,
            city,
            contact,
            gender,
            dob,
            stores
        ]
    );

    return {
        handleSubmit,
        data,
        storesData,
        storesError
    };
};
