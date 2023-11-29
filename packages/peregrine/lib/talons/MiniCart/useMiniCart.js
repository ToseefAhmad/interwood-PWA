import { useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import ReactGA4 from "react-ga4";
import { useCartContext } from '../../context/cart';
import { deriveErrorMessage } from '../../util/deriveErrorMessage';

/**
 *
 * @param {Function} props.setIsOpen - Function to toggle the mini cart
 * @param {DocumentNode} props.queries.miniCartQuery - Query to fetch mini cart data
 * @param {DocumentNode} props.mutations.removeItemMutation - Mutation to remove an item from cart
 *
 * @returns {
 *      closeMiniCart: Function,
 *      errorMessage: String,
 *      handleEditCart: Function,
 *      handleProceedToCheckout: Function,
 *      handleRemoveItem: Function,
 *      loading: Boolean,
 *      productList: Array<>,
 *      subTotal: Number,
 *      totalQuantity: Number
 *  }
 */
export const useMiniCart = props => {
    const { setIsOpen, queries, mutations } = props;
    const { miniCartQuery } = queries;
    const { removeItemMutation } = mutations;

    const [{ cartId }] = useCartContext();
    const history = useHistory();

    const { data: miniCartData, loading: miniCartLoading } = useQuery(
        miniCartQuery,
        {
            fetchPolicy: 'cache-and-network',
            nextFetchPolicy: 'cache-first',
            variables: { cartId },
            skip: !cartId
        }
    );

    const [
        removeItem,
        {
            loading: removeItemLoading,
            called: removeItemCalled,
            error: removeItemError
        }
    ] = useMutation(removeItemMutation);

    const totalQuantity = useMemo(() => {
        if (!miniCartLoading && miniCartData) {
            return miniCartData.cart.total_quantity;
        }
    }, [miniCartData, miniCartLoading]);

    const subTotal = useMemo(() => {
        if (!miniCartLoading && miniCartData) {
            return miniCartData.cart.prices.subtotal_excluding_tax;
        }
    }, [miniCartData, miniCartLoading]);

    const productList = useMemo(() => {
        if (!miniCartLoading && miniCartData) {
            return miniCartData.cart.items;
        }
    }, [miniCartData, miniCartLoading]);
    const closeMiniCart = useCallback(() => {
        setIsOpen(false);
    }, [setIsOpen]);

    const handleRemoveItem = useCallback(
        async id => {
            try {
                await removeItem({
                    variables: {
                        cartId,
                        itemId: id
                    }
                });
            } catch (e) {
                // Error is logged by apollo link - no need to double log.
            }
        },
        [cartId, removeItem]
    );

    const handleProceedToCheckout = useCallback((list, totalvalue) => {
        // const cart = miniCartData?.cart;
        const items = list;
        const newItem = [];
        items.forEach((item) => {
            const { product, quantity, prices } = item;
            newItem.push({
                item_id: product.id,
                item_name: product.name,
                price: prices.price.value,
                currency: prices.price.currency,
                quantity: quantity
            });
        })
        // const prices = cart?.prices;
        const total = totalvalue.value;
        setIsOpen(false);
        history.push('/checkout');
        if (list) {
            ReactGA4.event('begin_checkout', {
                priceExcludingTax: "Price Excluding Tax",
                currency: "PKR",
                items: newItem,
                value: total
            });
        }
    }, [history, setIsOpen]);

    const handleEditCart = useCallback(() => {
        setIsOpen(false);
        history.push('/cart');
    }, [history, setIsOpen]);

    const derivedErrorMessage = useMemo(
        () => deriveErrorMessage([removeItemError]),
        [removeItemError]
    );

    return {
        closeMiniCart,
        errorMessage: derivedErrorMessage,
        handleEditCart,
        handleProceedToCheckout,
        handleRemoveItem,
        loading: miniCartLoading || (removeItemCalled && removeItemLoading),
        productList,
        subTotal,
        totalQuantity
    };
};
