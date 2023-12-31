import React, { Fragment, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import {
    Lock as LockIcon,
    AlertCircle as AlertCircleIcon
} from 'react-feather';
import { bool, shape, string } from 'prop-types';

import { useScrollLock, useToasts } from '@magento/peregrine';
import { useMiniCart } from '@magento/peregrine/lib/talons/MiniCart/useMiniCart';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import Price from '../Price';

import Button from '../Button';
import Icon from '../Icon';
import StockStatusMessage from '../StockStatusMessage';
import ProductList from './ProductList';
import defaultClasses from './miniCart.css';
import MiniCartOperations from './miniCart.gql';

const errorIcon = <Icon src={AlertCircleIcon} size={20} />;

/**
 * The MiniCart component shows a limited view of the user's cart.
 *
 * @param {Boolean} props.isOpen - Whether or not the MiniCart should be displayed.
 * @param {Function} props.setIsOpen - Function to toggle mini cart
 */
const MiniCart = React.forwardRef((props, ref) => {
    const { isOpen, setIsOpen } = props;

    // Prevent the page from scrolling in the background
    // when the MiniCart is open.
    useScrollLock(isOpen);

    const talonProps = useMiniCart({
        setIsOpen,
        ...MiniCartOperations,
    });

    const {
        closeMiniCart,
        errorMessage,
        handleEditCart,
        handleProceedToCheckout,
        handleRemoveItem,
        loading,
        productList,
        subTotal,
        totalQuantity
    } = talonProps;

    function getIndex(items) {
        return items ? items.findIndex(obj => obj.product.id === 1087) : 1;
    }

    const classes = mergeClasses(defaultClasses, props.classes);
    const rootClass = isOpen ? classes.root_open : classes.root;
    const contentsClass = isOpen ? classes.contents_open : classes.contents;
    const quantityClassName = loading
        ? classes.quantity_loading
        : classes.quantity;
    const priceClassName = loading ? classes.price_loading : classes.price;

    const isCartEmpty = !(productList && productList.length);

    const [, { addToast }] = useToasts();

    useEffect(() => {
        if (errorMessage) {
            addToast({
                type: 'error',
                icon: errorIcon,
                message: errorMessage,
                dismissable: true,
                timeout: 7000
            });
        }
    }, [addToast, errorMessage]);

    const header = subTotal ? (
        <Fragment>
            <div className={classes.stockStatusMessageContainer}>
                <StockStatusMessage cartItems={productList} />
            </div>
            <div className={[defaultClasses["minicart-header-count"], " "].join(' ')}>
                <h3>
                    <i className="icon-shopping-cart"></i> Your Cart ( <FormattedMessage id={'miniCart.totalQuantity'} defaultMessage={'Items'} values={{ totalQuantity }} />)
                </h3>
                <button className="minicart-close-btn" onClick={() => setIsOpen(false)}>
                    <img src={require("../../assets/img/close.svg")} alt="" />
                </button>
            </div>
            {/*<span className={quantityClassName}>*/}
            {/*    <FormattedMessage*/}
            {/*        id={'miniCart.totalQuantity'}*/}
            {/*        defaultMessage={'Items'}*/}
            {/*        values={{ totalQuantity }}*/}
            {/*    />*/}
            {/*</span>*/}
            {/*<span className={priceClassName}>*/}
            {/*    <span>*/}
            {/*        <FormattedMessage*/}
            {/*            id={'miniCart.subtotal'}*/}
            {/*            defaultMessage={'Subtotal: '}*/}
            {/*        />*/}
            {/*    </span>*/}
            {/*    <Price*/}
            {/*        currencyCode={subTotal.currency}*/}
            {/*        value={subTotal.value}*/}
            {/*    />*/}
            {/*</span>*/}
        </Fragment>
    ) : null;

    const contents = isCartEmpty ? (
        <div className={classes.emptyCart}>
            <div className={classes.emptyMessage}>
                <img src={require("../../assets/img/icons/empty-cart.png")} className="empty-cart-icon" alt="" />
                <FormattedMessage
                    id={'miniCart.emptyMessage'}
                    defaultMessage={'There are no items in your cart.'}
                />
            </div>
        </div>
    ) : (
        <Fragment>
            <div className={classes.header}>{header}</div>
            <div className={classes.body}>
                <ProductList
                    items={productList}
                    loading={loading}
                    handleRemoveItem={handleRemoveItem}
                    closeMiniCart={closeMiniCart}
                />
            </div>
            <div className={classes.footer}>
                <div className={[defaultClasses["minicart-total"], " "].join(' ')}>
                    <h3 className={[defaultClasses["total-title"], " "].join(' ')}>Total</h3>
                    <span className={priceClassName}>
                        <span>
                            <FormattedMessage
                                id={'miniCart.subtotal'}
                                defaultMessage={'Subtotal: '}
                            />
                        </span>
                        <Price
                            currencyCode={subTotal.currency}
                            value={subTotal.value}
                        />
                    </span>

                </div>
                <div>
                    {
                        subTotal.value >= 1000 ? null :
                            <div className="min-order-title"> Minimum Order amount  is PKR 1000. </div>
                    }
                </div>
                {
                    (!(getIndex(productList) === 0 && productList.length === 1) && subTotal.value < 1000) ?

                        <Button
                            onClick={() => handleProceedToCheckout(productList, subTotal)}
                            priority="high"
                            className={classes.checkoutButton}
                            disabled={true}
                        >

                            <FormattedMessage
                                id={'miniCart.checkout'}
                                defaultMessage={'CHECKOUT'}
                            />
                        </Button> :

                        <Button
                            onClick={() => handleProceedToCheckout(productList,subTotal)}
                            priority="high"
                            className={classes.checkoutButton}
                            disabled={loading || isCartEmpty}
                        >
                            {/*<Icon*/}
                            {/*    size={16}*/}
                            {/*    src={LockIcon}*/}
                            {/*    classes={{*/}
                            {/*        icon: classes.checkoutIcon*/}
                            {/*    }}*/}
                            {/*/>*/}
                            <FormattedMessage
                                id={'miniCart.checkout'}
                                defaultMessage={'CHECKOUT'}
                            />
                        </Button>


                }
                <Button
                    onClick={handleEditCart}
                    priority="high"
                    className={classes.editCartButton}
                    disabled={loading || isCartEmpty}
                >
                    Edit Cart
                </Button>
            </div>
        </Fragment>
    );
    const handleTogle = () => setIsOpen(false)
    return (
        <aside className={rootClass}>
            <div ref={ref} className={contentsClass} onMouseLeave={handleTogle}>
                {contents}
            </div>
        </aside>
    );
});

export default MiniCart;

MiniCart.propTypes = {
    classes: shape({
        root: string,
        root_open: string,
        contents: string,
        contents_open: string,
        header: string,
        body: string,
        footer: string,
        checkoutButton: string,
        editCartButton: string,
        emptyCart: string,
        emptyMessage: string,
        stockStatusMessageContainer: string
    }),
    isOpen: bool
};
