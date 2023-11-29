import {useMutation} from '@apollo/client';
import {useCallback} from "react";

import mergeOperations from "../../util/shallowMerge";
import DEFAULT_OPERATIONS from "./newsletter.gql";

export const useNewsletter = props => {

    const operations = mergeOperations(DEFAULT_OPERATIONS, props.operations);
    const {
        subscribeEmailToNewsletter
    } = operations;

    const {
        email
    } = props;

    const [newsletterForm,{data, error}] = useMutation(
        subscribeEmailToNewsletter,
        {
           email
        }
    );

    const handleSubmit = useCallback(
        async () => {
            try {
                await newsletterForm({

                    variables:{
                      email:email
                    }
                });

            } catch (error) {
                console.error(error);
            }
        },
        [
            newsletterForm,
            email
        ]
    );

    return {
        handleSubmit,
        data,
        error
    };
};
