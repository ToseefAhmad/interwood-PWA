import React, { useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { gql } from '@apollo/client';
import { Link, resourceUrl } from '@magento/venia-drivers';
import { useProduct } from '@magento/peregrine/lib/talons/CartPage/ProductListing/useProduct';
import Price from '@magento/venia-ui/lib/components/Price';

import { mergeClasses } from '../../../classify';
import Kebab from '../../LegacyMiniCart/kebab';
import ProductOptions from '../../LegacyMiniCart/productOptions';
import Quantity from './quantity';
import Section from '../../LegacyMiniCart/section';
import Image from '../../Image';
import defaultClasses from './product.css';
import { CartPageFragment } from '../cartPageFragments.gql';
import { AvailableShippingMethodsCartFragment } from '../PriceAdjustments/ShippingMethods/shippingMethodsFragments.gql';
import { useToasts } from '@magento/peregrine';

const IMAGE_SIZE = 100;

const Product = props => {
    const { item, setActiveEditItem, setIsCartUpdating } = props;
    const { formatMessage } = useIntl();
    const talonProps = useProduct({
        item,
        mutations: {
            removeItemMutation: REMOVE_ITEM_MUTATION,
            updateItemQuantityMutation: UPDATE_QUANTITY_MUTATION
        },
        setActiveEditItem,
        setIsCartUpdating
    });
    const [, { addToast }] = useToasts();



    const {
        errorMessage,
        handleEditItem,
        handleRemoveFromCart,
        handleToggleFavorites,
        handleUpdateItemQuantity,
        isEditable,
        isFavorite,
        product
    } = talonProps;

    const {
        currency,
        image,
        name,
        options,
        quantity,
        stockStatus,
        unitPrice,
        urlKey,
        urlSuffix,
    } = product;
    const classes = mergeClasses(defaultClasses, props.classes);

    // useMemo(() => {
    //     if(errorMessage){
    //         addToast({
    //             type: 'error',
    //             message: "Requested quantity not available.",
    //             timeout: 5000
    //         });
    //     }
    // }, [errorMessage]);

    const favoriteActionSection = isFavorite
        ? formatMessage({
              id: 'product.removeFromFavorites',
              defaultMessage: 'Remove from favorites'
          })
        : formatMessage({
              id: 'product.moveToFavorites',
              defaultMessage: 'Move to favorites'
          });

    const editItemSection = isEditable ? (
        <Section
            text={formatMessage({
                id: 'product.editItem',
                defaultMessage: 'Edit item'
            })}
            onClick={handleEditItem}
            icon="Edit2"
            classes={{
                text: classes.sectionText
            }}
        />
    ) : null;

    const itemLink = useMemo(() => resourceUrl(`/${urlKey}${urlSuffix}`), [
        urlKey,
        urlSuffix
    ]);

    const stockStatusMessage =
        stockStatus === 'OUT_OF_STOCK'
            ? formatMessage({
                  id: 'product.outOfStock',
                  defaultMessage: 'Out-of-stock'
              })
            : '';

    return (

        <div className={classes.root}>
            <div className={[defaultClasses["form-content"],  " "].join(' ')}>
                <div className={[defaultClasses["item-image"],  " "].join(' ')}>
                    <Link to={itemLink}>
                        <Image
                            alt={name}
                            resource={image}
                        />
                    </Link>
                </div>
                <div className={[defaultClasses["item-details"],  " "].join(' ')}>
                    <div className={[defaultClasses["items"], defaultClasses["item-name"],  " "].join(' ')}>
                        <Link to={itemLink}>{name}</Link>
                    </div>
                    <div>
                        <h2 className="cart-attributes">SKU : <span>{item.product.sku}</span></h2>
                        {
                            item.product.design_attribute?
                            <h2 className="cart-attributes">Design : <span>{item.product.design_attribute}</span></h2> : null
                        }
                        {
                            item.product.size_attribute ?
                            <h2 className="cart-attributes">Size : <span>{tem.product.size_attribute}</span></h2> : null
                        }
                    </div>
                    <div className={[defaultClasses["items"], defaultClasses["item-has-options"],  " "].join(' ')}>
                        <ProductOptions
                            options={options}
                            classes={{
                                options: classes.options,
                                optionLabel: classes.optionLabel
                            }}
                        />
                    </div>
                </div>
                <div className={[defaultClasses["qty-price"],  " "].join(' ')}>
                    <div className={[defaultClasses["items-price"],  " "].join(' ')}>
                        <Price currencyCode={currency} value={unitPrice} />
                    </div>
                    <div className={[defaultClasses["edit-delete"],  " "].join(' ')}>
                        {/* <span onClick={handleEditItem}  className={[defaultClasses["item-edit"],  " "].join(' ')}>
                            <img src={require("../../../assets/img/draw.svg")} />
                        </span> */}
                        <span onClick={handleRemoveFromCart} className={[defaultClasses["item-delete"],  " "].join(' ')}>
                            <img src={require("../../../assets/img/delete-24px.svg")} alt="delete"/>
                        </span>
                    </div>
                    <div className="qty-box" className={[defaultClasses["qty-box"],  " "].join(' ')}>
                        <Quantity
                            itemId={item.id}
                            initialValue={quantity}
                            onChange={handleUpdateItemQuantity}
                        />
                    </div>
                </div>
                <div className="cart-error">
                    {errorMessage}
                </div>
            </div>

        </div>


    );
};

export default Product;

export const REMOVE_ITEM_MUTATION = gql`
    mutation removeItem($cartId: String!, $itemId: Int!) {
        removeItemFromCart(input: { cart_id: $cartId, cart_item_id: $itemId })
            @connection(key: "removeItemFromCart") {
            cart {
                id
                ...CartPageFragment
                ...AvailableShippingMethodsCartFragment
            }
        }
    }
    ${CartPageFragment}
    ${AvailableShippingMethodsCartFragment}
`;

export const UPDATE_QUANTITY_MUTATION = gql`
    mutation updateItemQuantity(
        $cartId: String!
        $itemId: Int!
        $quantity: Float!
    ) {
        updateCartItems(
            input: {
                cart_id: $cartId
                cart_items: [{ cart_item_id: $itemId, quantity: $quantity }]
            }
        ) @connection(key: "updateCartItems") {
            cart {
                id
                ...CartPageFragment
                ...AvailableShippingMethodsCartFragment
            }
        }
    }
    ${CartPageFragment}
    ${AvailableShippingMethodsCartFragment}
`;
