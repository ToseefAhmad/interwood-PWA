import React, { Fragment } from 'react';
import { shape, string } from 'prop-types';
import { ShoppingBag as ShoppingCartIcon } from 'react-feather';
import { useIntl } from 'react-intl';

import { useCartTrigger } from '@magento/peregrine/lib/talons/Header/useCartTrigger';

import { mergeClasses } from '../../classify';
import Icon from '../Icon';
import MiniCart from '../MiniCart';
import defaultClasses from './header.css';
import { GET_ITEM_COUNT_QUERY } from './cartTrigger.gql';

const CartTrigger = props => {
    const {
        handleLinkClick,
        handleTriggerClick,
        itemCount,
        miniCartRef,
        miniCartIsOpen,
        hideCartTrigger,
        setMiniCartIsOpen,
        miniCartTriggerRef
    } = useCartTrigger({
        queries: {
            getItemCountQuery: GET_ITEM_COUNT_QUERY
        }
    });

    const classes = mergeClasses(defaultClasses, props.classes);
    const { formatMessage } = useIntl();
    const buttonAriaLabel = formatMessage(
        {
            id: 'cartTrigger.ariaLabel',
            defaultMessage:
                'Toggle mini cart. You have {count} items in your cart.'
        },
        { count: itemCount }
    );
    const itemCountDisplay = itemCount > 99 ? '99+' : itemCount;
    const triggerClassName = miniCartIsOpen
        ? classes.triggerContainer_open
        : classes.triggerContainer;

    const maybeItemCounter = itemCount ? (
        <span className={classes.counter}>{itemCountDisplay}</span>
    ) : null;

    const cartTrigger = hideCartTrigger ? null : (
        // Because this button behaves differently on desktop and mobile
        // we render two buttons that differ only in their click handler
        // and control which one displays via CSS.
        <Fragment>
            <div className={[defaultClasses["dropdown"], defaultClasses["cart-dropdown"], " "].join(' ')} ref={miniCartTriggerRef} onClick={handleTriggerClick}>
                <a aria-expanded="false" aria-haspopup="true" className={[defaultClasses["dropdown-toggle"], defaultClasses["dropdown-arrow"], " "].join(' ')} data-display="static"
                    data-toggle="dropdown"  role="button">
                     <i className={[defaultClasses[""], "icon-shopping-cart"].join(' ')}></i>
                     <span className={[defaultClasses["cart-count"], defaultClasses["badge-circle"], " "].join(' ')}>{itemCountDisplay} </span>
                </a>
            </div>
                {/* <button
                    aria-label={buttonAriaLabel}
                    className={classes.trigger}
                    onClick={handleTriggerClick}
                >
                    <Icon src={ShoppingCartIcon} />
                    {maybeItemCounter}
                </button>
            </div>
            <button
                aria-label={buttonAriaLabel}
                className={classes.link}
                onClick={handleLinkClick}
            >
                <Icon src={ShoppingCartIcon} />
                {maybeItemCounter}
            </button> */}
            <MiniCart
                isOpen={miniCartIsOpen}
                setIsOpen={setMiniCartIsOpen}
                ref={miniCartRef}
            />
        </Fragment>
    );

    return cartTrigger;
};

export default CartTrigger;

CartTrigger.propTypes = {
    classes: shape({
        counter: string,
        link: string,
        openIndicator: string,
        root: string,
        trigger: string,
        triggerContainer: string
    })
};
