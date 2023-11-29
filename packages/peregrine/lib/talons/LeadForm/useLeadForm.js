import {useMutation, useQuery} from '@apollo/client';
import {useCallback} from "react";

import mergeOperations from "../../util/shallowMerge";
import DEFAULT_OPERATIONS from "./leadForm.gql";

export const useLeadForm = props => {

    const operations = mergeOperations(DEFAULT_OPERATIONS, props.operations);
    const {
        submitLeadForm,
        getLeadCategory
    } = operations;

    const {
        name,
        email,
        city,
        contact,
        category
    } = props;

    const [leadForm,data] = useMutation(
        submitLeadForm,
        {
            name,
            city,
            email,
            contact,
            category
        });

    const {data:categoryData ,error:categoryError}=useQuery(getLeadCategory);

    const handleSubmit = useCallback(
        async () => {
            try {
                await leadForm({

                    variables:{
                        name: name,
                        city: city,
                        contact: contact,
                        email:email,
                        category:category
                    }
                });

            } catch (error) {
                console.error(error);
            }
        },
        [
            leadForm,
            name,
            email,
            city,
            contact,
            category
        ]
    );

    return {
        handleSubmit,
        data,
        categoryData,
        categoryError
    };
};
