import React, { useMemo, useCallback } from 'react';
import { useIntl } from 'react-intl';
import { bool, func, shape, string } from 'prop-types';
import { useCreditCard } from '@magento/peregrine/lib/talons/CheckoutPage/PaymentInformation/useCreditCard';

import { isRequired } from '../../../util/formValidators';
import Country from '../../Country';
import Region from '../../Region';
import Postcode from '../../Postcode';
import Checkbox from '../../Checkbox';
import Field from '../../Field';
import TextInput from '../../TextInput';
import BrainTreeDropin from './brainTreeDropIn';
import LoadingIndicator from '../../LoadingIndicator';
import { mergeClasses } from '../../../classify';
import CustomMethods from './customeMethods';

import creditCardPaymentOperations from './creditCard.gql';

import defaultClasses from './creditCard.css';
import FormError from '../../FormError';
import { Select } from 'informed';

const STEP_DESCRIPTIONS = [
    { defaultMessage: 'Loading Payment', id: 'checkoutPage.step0' },
    {
        defaultMessage: 'Checking Credit Card Information',
        id: 'checkoutPage.step1'
    },
    {
        defaultMessage: 'Checking Credit Card Information',
        id: 'checkoutPage.step2'
    },
    {
        defaultMessage: 'Checking Credit Card Information',
        id: 'checkoutPage.step3'
    },
    {
        defaultMessage: 'Saved Credit Card Information Successfully',
        id: 'checkoutPage.step4'
    }
];

const CreditCard = props => {
    const {
        classes: propClasses,
        onPaymentSuccess: onSuccess,
        onDropinReady: onReady,
        onPaymentError: onError,
        resetShouldSubmit,
        shouldSubmit,
        bank_id,
        setBankId,
        tenure,
        setTenure,
        total,
        setPaymentMethodDesc,
        paymentMethodDesc
    } = props;
    const { formatMessage } = useIntl();

    const classes = mergeClasses(defaultClasses, propClasses);

    const talonProps = useCreditCard({
        onSuccess,
        onReady,
        onError,
        shouldSubmit,
        resetShouldSubmit,
        ...creditCardPaymentOperations
    });

    const {
        errors,
        shouldRequestPaymentNonce,
        onPaymentError,
        onPaymentSuccess,
        onPaymentReady,
        isBillingAddressSame,
        isLoading,
        cities,
        /**
         * `stepNumber` depicts the state of the process flow in credit card
         * payment flow.
         *
         * `0` No call made yet
         * `1` Billing address mutation intiated
         * `2` Braintree nonce requsted
         * `3` Payment information mutation intiated
         * `4` All mutations done
         */
        stepNumber,
        initialValues,
        shippingAddressCountry,
        shouldTeardownDropin,
        resetShouldTeardownDropin
    } = talonProps;

    const creditCardComponentClassName = isLoading
        ? classes.credit_card_root
        : classes.credit_card_root;

    const billingAddressFieldsClassName = isBillingAddressSame
        ? classes.billing_address_fields_root_hidden
        : classes.billing_address_fields_root;

    /**
     * Instead of defining classes={root: classes.FIELD_NAME}
     * we are using useMemo to only do it once (hopefully).
     */
    const fieldClasses = useMemo(() => {
        return [
            'first_name',
            'last_name',
            'country',
            'street1',
            'street2',
            'city',
            'region',
            'postal_code',
            'phone_number'
        ].reduce((acc, fieldName) => {
            acc[fieldName] = { root: classes[fieldName] };

            return acc;
        }, {});
    }, [classes]);

    /**
     * These 2 functions are wrappers around the `isRequired` function
     * of `formValidators`. They perform validations only if the
     * billing address is different from shipping address.
     *
     * We write this function in `venia-ui` and not in the `peregrine` talon
     * because it references `isRequired` which is a `venia-ui` function.
     */
    const isFieldRequired = useCallback(
        value => {
            if (isBillingAddressSame) {
                /**
                 * Informed validator functions return `undefined` is
                 * validation is `true`
                 */
                return undefined;
            } else {
                return isRequired(value);
            }
        },
        [isBillingAddressSame]
    );

    const stepTitle = STEP_DESCRIPTIONS[stepNumber].defaultMessage
        ? formatMessage({
              id: STEP_DESCRIPTIONS[stepNumber].id,
              defaultMessage: STEP_DESCRIPTIONS[stepNumber].defaultMessage
          })
        : formatMessage({
              id: 'checkoutPage.loadingPayment',
              defaultMessage: 'Loading Payment'
          });

    const loadingIndicator = isLoading ? (
        <LoadingIndicator>{stepTitle}</LoadingIndicator>
    ) : null;

    const citiesOptions = cities.map((city) => {
        return <option value={city.value} >{city.label}</option>
    });

    return (
        <div className={classes.root}>
            <div className={creditCardComponentClassName}>
                <FormError
                    classes={{ root: classes.formErrorContainer }}
                    errors={Array.from(errors.values())}
                />

                {/* <div className={classes.dropin_root}>
                    <BrainTreeDropin
                        onError={onPaymentError}
                        onReady={onPaymentReady}
                        onSuccess={onPaymentSuccess}
                        shouldRequestPaymentNonce={shouldRequestPaymentNonce}
                        shouldTeardownDropin={shouldTeardownDropin}
                        resetShouldTeardownDropin={resetShouldTeardownDropin}
                    />
                </div> */}
                <div className={classes.address_check}>
                    <Field
                        defaultChecked={true}
                        field="isBillingAddressSame"
                        label={formatMessage({
                            id: 'checkoutPage.billingAddressSame',
                            defaultMessage:
                                'Billing & Shipping address are same'
                        })}
                        initialValue={true}
                    />
                </div>

            </div>
            <CustomMethods
                    onError={onPaymentError}
                    onReady={onPaymentReady}
                    onSuccess={onPaymentSuccess}
                    bank_id={bank_id}
                    tenure={tenure}
                    setBankId={setBankId}
                    setTenure={setTenure}
                    total={total}
                    paymentMethodDesc={paymentMethodDesc}
                    setPaymentMethodDesc={setPaymentMethodDesc}
                />
        </div>
    );
};



export default CreditCard;

CreditCard.propTypes = {
    classes: shape({
        root: string,
        dropin_root: string,
        billing_address_fields_root: string,
        first_name: string,
        last_name: string,
        city: string,
        region: string,
        postal_code: string,
        phone_number: string,
        country: string,
        street1: string,
        street2: string,
        address_check: string,
        credit_card_root: string,
        credit_card_root_hidden: string
    }),
    shouldSubmit: bool.isRequired,
    onPaymentSuccess: func,
    onDropinReady: func,
    onPaymentError: func,
    resetShouldSubmit: func.isRequired
};
