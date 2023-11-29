import { useMutation, useQuery } from "@apollo/client";
import DEFAULT_OPERATIONS from "./NotifyMe.gql";
import mergeOperations from "../../util/shallowMerge";
import { useCallback } from "react";
import { useUserContext } from '../../context/user';

export const useNotifyMe = () => {
    const operations = mergeOperations(DEFAULT_OPERATIONS);
    const {
        ProductAlertNotifyInStock,
        getStorConfigData
    } = operations;

    const [
        { isSignedIn: isUserSignedIn, currentUser }
    ] = useUserContext();

    const { data: storeConfig } = useQuery(getStorConfigData,
        {
            fetchPolicy: "network-only"
        }
    );
    const [productNotifyMutation, { error, data, loading }] = useMutation(ProductAlertNotifyInStock);

    const notifyMeHandler = useCallback((id, email) => {
        productNotifyMutation({
            variables: {
                product_id: id,
                email: email
            }
        })
    }, [productNotifyMutation])

    return {
        notifyMeHandler,
        data,
        loading,
        error,
        currentUser,
        isUserSignedIn,
        storeConfig
    }
}



