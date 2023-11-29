import {useMutation, useQuery} from '@apollo/client';
import {useCallback} from "react";

import mergeOperations from "../../util/shallowMerge";
import DEFAULT_OPERATIONS from "./corporateForm.gql";

export const useCorporateForm = props => {

    const operations = mergeOperations(DEFAULT_OPERATIONS, props.operations);
    const {
        submitCorporateForm,
        getEducation,
        getInterest,
        getHealthcare
    } = operations;

    const {
        name,
        designation,
        organization,
        city,
        address,
        contact,
        interest,
        education,
        healthcare
    } = props;

    const [corporateForm,data] = useMutation(
        submitCorporateForm,
        {
            name,
            designation,
            organization,
            city,
            address,
            contact,
            interest,
            education,
            healthcare
        },
        { errorPolicy: 'all' }
    );

    const {data:educationData ,error:educationError}=useQuery(getEducation);
    const {data:interestData ,error:interestError}=useQuery(getInterest);
    const {data:healthcareData ,error:healthcareError}=useQuery(getHealthcare);

    const handleSubmit = useCallback(
        async () => {
            try {
                await corporateForm({

                    variables:{
                        name: name,
                        designation: designation,
                        organization: organization,
                        city: city,
                        address: address,
                        contact: contact,
                        interest: interest,
                        education: education,
                        healthcare: healthcare
                    }
                });

            } catch (error) {
                console.error(error);
            }
        },
        [
            corporateForm,
            name,
            designation,
            organization,
            city,
            address,
            contact,
            interest,
            education,
            healthcare
        ]
    );

    return {
        handleSubmit,
        data,
        educationData,
        educationError,
        healthcareData,
        healthcareError,
        interestData,
        interestError};
};
