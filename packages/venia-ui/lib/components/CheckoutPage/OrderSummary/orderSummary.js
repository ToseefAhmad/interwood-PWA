import React from 'react';
import { FormattedMessage } from 'react-intl';
import PriceSummary from '../../CartPage/PriceSummary';
import { mergeClasses } from '../../../classify';

import defaultClasses from './orderSummary.css';

const OrderSummary = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    return (
        <div className={classes.root}>
            {/*<h1 className={classes.title}>*/}
            {/*    <FormattedMessage*/}
            {/*        id={'checkoutPage.orderSummary'}*/}
            {/*        defaultMessage={'Order Summary'}*/}
            {/*    />*/}
            {/*</h1>*/}
            {/*<div className={[defaultClasses["summary-item-count"],  " "].join(' ')}>*/}
            {/*    <h3>3 Items In Your Cart</h3>*/}
            {/*</div>*/}
            <PriceSummary isUpdating={props.isUpdating} />
        </div>
    );
};

export default OrderSummary;
