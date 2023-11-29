import {useMutation} from '@apollo/client';
import {useCallback} from "react";

import mergeOperations from "../../util/shallowMerge";
import DEFAULT_OPERATIONS from "./contactUs.gql";

export const useContactUs = (props) => {

    const operations = mergeOperations(DEFAULT_OPERATIONS);
    const {
        sendContactForm
    } = operations;

    const {
        name,
        email,
        phone,
        message
    } = props;

    const [contactForm,response] = useMutation(
        sendContactForm,
        {
            name,
            email,
            phone,
            message
        });


    const handleSubmit = useCallback(
        async () => {
            try {
                await contactForm({

                    variables:{
                        name: name,
                        email:email,
                        phone:phone,
                        message:message
                    }
                });

            } catch (error) {
                console.error(error);
            }
        },
        [
            contactForm,
            name,
            email,
            phone,
            message
        ]
    );

    return {
        handleSubmit,
        response
           };
};
