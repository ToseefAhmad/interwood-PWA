import React, { useEffect } from 'react';
import { Trash2 } from 'react-feather';
import { useIntl } from 'react-intl';
import { useToasts } from '@magento/peregrine';
import { useWishlistItem } from '@magento/peregrine/lib/talons/WishlistPage/useWishlistItem';
import { Link,resourceUrl } from '@magento/venia-drivers';
import Price from '@magento/venia-ui/lib/components/Price';


import { mergeClasses } from '../../classify';
import Icon from '../Icon';
import Image from '../Image';
import WishlistConfirmRemoveProductDialog from './wishlistConfirmRemoveProductDialog';
import defaultClasses from './wishlistItem.css';
import wishlistItemOperations from './wishlistItem.gql';
import Quries from './wishlistPage.gql';
import CallForPrice from "../CallForPrice/callForPrice";

const WishlistItem = props => {
    const { item, wishlistId } = props;
    const getCustomerWishlistQuery = Quries.queries.getCustomerWishlistQuery;

    const {
        sku: childSku,
        // configurable_options: configurableOptions = [],
        id: itemId,
        // product
    } = item;
    const { small_image: image, name,sku,price,
        url_suffix,redirect,callForPrice,price_range,url_key,
        group_product_sum} = item;

    const { label: imageLabel, url } = image;


    const talonProps = useWishlistItem({
        childSku,
        itemId,
        operations: { ...wishlistItemOperations },
        sku,
        wishlistId,
        getCustomerWishlistQuery
    });
    const {
        confirmRemovalIsOpen,
        handleHideDialogs,
        handleRemoveProductFromWishlist,
        handleShowConfirmRemoval,
        hasError,
        hasRemoveProductFromWishlistError,
        isLoading,
        isRemovalInProgress,
    } = talonProps;

    const { formatMessage } = useIntl();
    const [, { addToast }] = useToasts();

    useEffect(() => {
        if (hasError) {
            addToast({
                type: 'error',
                message: formatMessage({
                    id: 'wishlistItem.addToCartError',
                    defaultMessage:
                        'Something went wrong. Please refresh and try again.'
                }),
                timeout: 5000
            });
        }
    }, [addToast, formatMessage, hasError]);

    const classes = mergeClasses(defaultClasses, props.classes);

    let productLink;
    if(redirect)
    {
        productLink = resourceUrl(`/${redirect}${url_suffix}`);
    }
    else {
        productLink= resourceUrl(`/${url_key}${url_suffix}`);

    }

    // const optionElements = configurableOptions.map(option => {
    //     const {
    //         id,
    //         option_label: optionLabel,
    //         value_label: valueLabel
    //     } = option;

    //     const optionString = `${optionLabel} : ${valueLabel}`;

    //     return (
    //         <span className={classes.option} key={id}>
    //             {optionString}
    //         </span>
    //     );
    // });

    let priceDiv=null;
    if(item.__typename==="GroupedProduct")
    {
        let tempPrice;
        tempPrice=group_product_sum;
        priceDiv= tempPrice != null ? <div className={[defaultClasses["price-box"], " "].join(' ')}>
            <Price value={tempPrice} currencyCode={"PKR"}/>
        </div> : null
    }
    else {
        priceDiv= <div className={[defaultClasses["price-box"], " "].join(' ')}>
            { price_range.maximum_price.discount.amount_off ?
                <>
                    <Price
                        value={price_range.maximum_price.final_price.value}
                        currencyCode={price.regularPrice.amount.currency}
                    />
                    <span className={[defaultClasses["old-price"], " "].join(' ')}>
                            <Price
                                value={price.regularPrice.amount.value}
                                currencyCode={price.regularPrice.amount.currency}
                            />
                       </span>

                </> :
                <Price
                    value={price.regularPrice.amount.value}
                    currencyCode={price.regularPrice.amount.currency}
                />}
        </div>

    }

    return (
        <div className={classes.root}>
            <div className="img-item-wishlist">
                <Link to={productLink}>
                    <Image
                        alt={imageLabel}
                        classes={{ image: classes.image }}
                        src={url}
                        width={400}
                    />
                </Link>
            </div>

            <Link to={productLink} className={classes.name}>{name}</Link>
            {/* {optionElements} */}

            <div className={classes.actionsContainer}>
                <div className={classes.priceContainer}>
                    { callForPrice ?
                        <CallForPrice productId={item.id}/>
                        : priceDiv
                    }
                </div>
                {
                    callForPrice ? null : <Link
                        to={productLink}
                        className={classes.addToCart}
                        disabled={isLoading}
                    >
                        {formatMessage({
                            id: 'wishlistItem.addToCart',
                            defaultMessage: 'Add to Cart'
                        })}
                    </Link>
                }
                <button
                    className={classes.moreActions}
                    onClick={handleShowConfirmRemoval}
                >
                    <Icon size={16} src={Trash2} />
                </button>

                <WishlistConfirmRemoveProductDialog
                    hasError={hasRemoveProductFromWishlistError}
                    isOpen={confirmRemovalIsOpen}
                    isRemovalInProgress={isRemovalInProgress}
                    onCancel={handleHideDialogs}
                    onConfirm={handleRemoveProductFromWishlist}
                />
            </div>
        </div>
    );
};

export default WishlistItem;
