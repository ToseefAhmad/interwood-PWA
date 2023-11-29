import { useLazyQuery, useMutation } from '@apollo/client';
import { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ReactGA4 from "react-ga4";
import { useUserContext } from '../../context/user';
import mergeOperations from '../../util/shallowMerge';
import DEFAULT_OPERATIONS from "./wishListControl.gql";
import { iterateObserversSafely } from '@apollo/client/utilities';

export const useWishListControl = (props) => {
    const { id, item } = props;
    const [addItem, setAddItem] = useState(true);
    const [removeItm, setRemoveItem] = useState(false);

    const history = useHistory();
    const [
        { isSignedIn: isUserSignedIn }
    ] = useUserContext();
    const operations = mergeOperations(DEFAULT_OPERATIONS, props.operations);
    const {
        addToWishlistMutation,
        removeItemFromWishList
    } = operations;

    const [addToWishlistHandler, { data }] = useMutation(addToWishlistMutation, {
        fetchPolicy: "no-cache",
        onCompleted: () => {
            setAddItem(false)
            setRemoveItem(true)
        }
    });
    const [removeToWishlistHandler, { data: removeStatus }] = useMutation(removeItemFromWishList, {
        fetchPolicy: "no-cache",
        onCompleted: () => {
            setAddItem(true)
            setRemoveItem(false)
        }
    });

    const addItemToWishList = useCallback(() => {
        const { item } = props;
        const value = item?.price?.regularPrice?.amount?.value;
        if (isUserSignedIn) {
            addToWishlistHandler({
                variables: {
                    productId: id
                }
            })
            if (item) {
                ReactGA4.event('add_to_favourite', {
                    value: value,
                    currency: "PKR",
                    // id: item.id,
                    // name: item.name,
                    items: [
                        {
                            item_id: item.name,
                            item_name: item.id,
                            sku: item.sku,
                            price: item?.price?.regularPrice?.amount?.value
                        }
                    ]
                    // ['url-key']: item['url-key'],
                    // price: item.price.regularPrice.amount.value.DEFAULT_OPERATIONS
                })
            }
        } else {
            history.push('/signin')
        }
    }, [id, isUserSignedIn]);

    const removeItem = useCallback(() => {
        const { item } = props;
        const value = item?.price?.regularPrice?.amount?.value;
        if (isUserSignedIn) {
            removeToWishlistHandler({
                variables: {
                    productId: id
                }
            })
            if (item) {
                ReactGA4.event('remove_from_wishlist', {
                    value: value,
                    currency: "PKR",
                    // id: item.id,
                    // name: item.name,
                    items: [
                        {
                            item_id: item.name,
                            item_name: item.id,
                            sku: item.sku,
                            price: item?.price?.regularPrice?.amount?.value
                        }
                    ]
                })
            }
        }

    }, [id, isUserSignedIn])


    return {
        addItemToWishList,
        removeItem,
        addItem,
        removeItm
    };
};
