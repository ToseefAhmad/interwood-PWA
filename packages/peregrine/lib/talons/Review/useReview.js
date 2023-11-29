import {useCallback} from 'react';
import {useMutation} from  '@apollo/client';
import mergeOperations from "../../util/shallowMerge";
import DEFAULT_OPERATIONS from "./createReview.gql";

export const UseReview = props => {

    const operations = mergeOperations(DEFAULT_OPERATIONS);
    const {createProductReview}=operations;

    const {
        sku,
        nickname,
        summary,
        text,
        ratings
    } = props;

    const [createReview, {error:reviewError, data:reviewData,loading}] = useMutation(
        createProductReview
    );
    const errors = [];
    if (reviewError) {
        errors.push(reviewError.graphQLErrors[0]);
    }
    const handleSubmit = useCallback(
        async () => {
            try {
                await createReview({
                    variables: {
                        sku: sku,
                        nickname: nickname,
                        summary: summary,
                        text: text,
                        ratings: ratings,
                    }
                });
            } catch (error) {
                if (process.env.NODE_ENV === 'development') {
                    console.error(error);
                }
            }
        },
        [
            createReview,
            sku,
            summary,
            text,
            nickname,
            ratings
        ]
    );

    return {
        errors,
        handleSubmit,
        reviewData,
        loading
    };
};
