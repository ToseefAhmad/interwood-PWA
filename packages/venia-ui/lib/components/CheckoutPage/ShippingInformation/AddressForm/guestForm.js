import React, { Fragment, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Form, Select } from 'informed';
import { func, shape, string, arrayOf } from 'prop-types';
import { useGuestForm } from '@magento/peregrine/lib/talons/CheckoutPage/ShippingInformation/AddressForm/useGuestForm';

import { mergeClasses } from '../../../../classify';
import { isRequired, phoneNumberVaildate, hasLengthAtMost, hasLengthAtLeast} from '../../../../util/formValidators';
import combine from '../../../../util/combineValidators';
import Button from '../../../Button';
import Country from '../../../Country';
import Field, { Message } from '../../../Field';
import FormError from '../../../FormError';
import Region from '../../../Region';
import Postcode from '../../../Postcode';
import TextInput from '../../../TextInput';
import defaultClasses from './guestForm.css';
import GuestFormOperations from './guestForm.gql';
import LoginOnCheckout from './loginOnCheckout';
import shippingClass from '../shippingInformation.css'
import { fullPageLoadingIndicator } from '../../../LoadingIndicator';
const GuestForm = props => {
    const { afterSubmit, classes: propClasses, onCancel, shippingData } = props;

    const talonProps = useGuestForm({
        afterSubmit,
        ...GuestFormOperations,
        onCancel,
        shippingData
    });
    const {
        errors,
        handleCancel,
        handleSubmit,
        initialValues,
        isSaving,
        isUpdate,
        isEmailAvailable,
        userVerified,
        emailVerify,
        cities,
    } = talonProps;

    const [ loginTab, setLoginTab] = useState(false);
    const [ cityBar, setCityBar ] = useState(false);

    const { formatMessage } = useIntl();
    const classes = mergeClasses(defaultClasses, propClasses);

    const guestEmailMessage = !isUpdate ? (
        <Message>
            <FormattedMessage
                id={'guestForm.emailMessage'}
                defaultMessage={
                    'Set a password at the end of guest checkout to create an account in one easy step.'
                }
            />
        </Message>
    ) : null;

    const cancelButton = isUpdate ? (
        <Button disabled={isSaving} onClick={handleCancel} priority="low">
            <FormattedMessage
                id={'global.cancelButton'}
                defaultMessage={'Cancel'}
            />
        </Button>
    ) : null;

    const submitButtonText = isUpdate
        ? formatMessage({
              id: 'global.updateButton',
              defaultMessage: 'Update'
          })
        : formatMessage({
              id: 'guestForm.continueToNextStep',
              defaultMessage: 'Continue to Shipping Method'
          });
    const submitButtonProps = {
        disabled: isSaving,
        priority: isUpdate ? 'high' : 'normal',
        type: 'submit'
    };

    const citiesOptions = cities.map((city) => {
        return <option value={city.value} >{city.label}</option>
    });

    const cityHandler = (e) =>{
        const city = e.target.value;
        const tempCities = ['Sialkot', 'Faisalabad', 'Multan', 'Hyderabad', 'Wah Cantt', 'Rahim Yar Khan', 'Larkana', 'Quetta', 'Abbottabad', 'Sargodha', 'Sahiwal'];
        const result  = tempCities.findIndex((i) => i == city);
        if(result != -1) {
            setCityBar(true);
        } else{
            setCityBar(false);
        }
    }
    return (
        <Fragment>
            {
                isSaving ? fullPageLoadingIndicator : null
            }
            <a className={[shippingClass["checkout-form-title"], shippingClass["shipping"]].join(' ')} style={{"color": "#00b950"}} onClick={() => setLoginTab(!loginTab)}>
                Already have an account?
                <a className={[shippingClass["checkout-form-title"], shippingClass["shipping"], "guest-form-title"].join(' ')}>
                    Login
                </a>
            </a>
            {
                loginTab ? <LoginOnCheckout /> : null
            }
            <FormError errors={Array.from(errors.values())} />
            <h3 className="checkout-seprator">
                or
            </h3>
            <h3 className={[shippingClass["checkout-form-title"], shippingClass["shipping"], "mt-1"].join(' ')}>
                Continue as a Guest
            </h3>
            <Form
                className={classes.root}
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                <div className={classes.email}>
                    <Field
                        id="email"
                        label={formatMessage({
                            id: 'global.email',
                            defaultMessage: 'Email'
                        })}
                    >
                        <span className="has-required-icon required-email">*</span>
                        <TextInput
                            field="email"
                            id="email"
                            validate={isRequired}
                            onBlur={isEmailAvailable}
                        />
                        {/* {
                            userVerified != null && userVerified === false ? <LoginOnCheckout email={emailVerify} /> :
                             guestEmailMessage
                        } */}
                    </Field>
                    {/* <h3 className={[shippingClass["checkout-form-title"], shippingClass["shipping"], "mt-2"].join(' ')}>
                        Shipping Information
                    </h3> */}
                </div>
                <div className={classes.firstname}>
                    <Field
                        id="firstname"
                        label={formatMessage({
                            id: 'global.firstName',
                            defaultMessage: 'First Name'
                        })}
                    >
                        <span className="has-required-icon required-fn">*</span>
                        <TextInput
                            field="firstname"
                            id="firstname"
                            validate={isRequired}
                        />
                    </Field>
                </div>
                <div className={classes.lastname}>
                    <Field
                        id="lastname"
                        label={formatMessage({
                            id: 'global.lastName',
                            defaultMessage: 'Last Name'
                        })}
                    >
                        <span className="has-required-icon required-ln">*</span>
                        <TextInput
                            field="lastname"
                            id="lastname"
                            validate={isRequired}
                        />
                    </Field>
                </div>
                <div className={classes.country}>
                    <span className="has-required-icon required-country">*</span>
                    <Country
                        initialValue="PK"
                       validate={isRequired}/>
                </div>
                <div className={classes.street0}>
                    <Field
                        id="street0"
                        label={formatMessage({
                            id: 'global.streetAddress',
                            defaultMessage: 'Street Address'
                        })}
                    >
                        <span className="has-required-icon required-sa">*</span>
                        <TextInput
                            field="street[0]"
                            id="street0"
                            validate={isRequired}
                        />
                    </Field>
                </div>
                <div className={classes.street1}>
                    <Field
                        id="street1"
                        label={formatMessage({
                            id: 'global.streetAddress2',
                            defaultMessage: 'Street Address 2'
                        })}
                        optional={true}
                    >
                        <TextInput field="street[1]" id="street1" />
                    </Field>
                </div>
                <div className={classes.country}>
                    <Field
                        id="city"
                        label={formatMessage({
                            id: 'global.city',
                            defaultMessage: 'City'
                        })}
                    >

                        <span className="has-required-icon required-city">*</span>
                        <Select field="city"  id="city" label="City"  defaultValue="" validate={isRequired} onChange={cityHandler} >
                            <option value="" hidden={true}>Please Select City...</option>
                            <option disabled={true}>Please Select City...</option>
                            {citiesOptions}
                        </Select>
                        {/* <TextInput
                            field="city"
                            id="city"
                            validate={isRequired}
                        /> */}
                    </Field>
                    {
                        cityBar ? <div className="info-free-shipping mt-1 modal-checkbox-wrapper"><span><input type="checkbox" checked="checked" className="int-checklabel no-gutter" /> Delivery to this city is only valid for décor items,</span>
                       <span>Additional delivery and fixing charges shall apply on all furniture items.</span></div> : null
                    }
                </div>
                {/* <div className={classes.region}>
                    <Region validate={isRequired} />
                </div> */}
                {/* <div className={classes.postcode}>
                    <Postcode validate={isRequired} />
                </div> */}
                <div className={classes.telephone}>
                    <Field
                        id="telephone"
                        label={formatMessage({
                            id: 'global.phoneNumber',
                            defaultMessage: 'Phone Number'
                        })}
                    >
                        <span className="has-required-icon required-pn">*</span>
                        <TextInput
                            field="telephone"
                            id="telephone"
                            autoComplete="phone"
                            type="tel"
                            placeHolder={'0300xxxxxxx'}
                            maxLength={11}
                            validate={combine([
                                isRequired,
                                [phoneNumberVaildate, 11]
                            ])}
                        />
                    </Field>
                </div>
                <div className={classes.buttons}>
                    {cancelButton}
                    <Button {...submitButtonProps}>{submitButtonText}</Button>
                </div>
            </Form>
        </Fragment>
    );
};

export default GuestForm;

GuestForm.defaultProps = {
    shippingData: {
        country: {
            code: 'US'
        },
        region: {
            code: ''
        }
    }
};

GuestForm.propTypes = {
    afterSubmit: func,
    classes: shape({
        root: string,
        field: string,
        email: string,
        firstname: string,
        lastname: string,
        country: string,
        street0: string,
        street1: string,
        city: string,
        region: string,
        postcode: string,
        telephone: string,
        buttons: string,
        submit: string,
        submit_update: string
    }),
    onCancel: func,
    shippingData: shape({
        city: string,
        country: shape({
            code: string.isRequired
        }).isRequired,
        email: string,
        firstname: string,
        lastname: string,
        postcode: string,
        region: shape({
            code: string.isRequired
        }).isRequired,
        street: arrayOf(string),
        telephone: string
    })
};
