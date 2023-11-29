import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { number, string, shape } from 'prop-types';
import Price from '@magento/venia-ui/lib/components/Price';

import { mergeClasses } from '../../../../classify';
import defaultClasses from './shippingRadio.css';

const ShippingRadio = props => {
    const priceElement = props.price ? (
        <Price value={props.price} currencyCode={props.currency} />
    ) : (
        <span>
            {/* <FormattedMessage id={'global.free'} defaultMessage={''} /> */}
        </span>
    );

    const classes = mergeClasses(defaultClasses, props.classes);

    return (
        props.cname ?
            <Fragment>
                {props.price===0 ? <span>Free Shipping</span>:  <ul>
                   <li>{props.cname}</li>
                   <li>{props.name}</li>
               </ul>}
            </Fragment>:
            <Fragment>
                <span>{props.name}</span>
                <div className={classes.price}>{priceElement}</div>
            </Fragment>
    );
};

export default ShippingRadio;

ShippingRadio.propTypes = {
    classes: shape({
        price: string
    }),
    currency: string.isRequired,
    name: string.isRequired,
    price: number.isRequired
};
