import React, { useEffect } from 'react';
import {FormattedMessage, useIntl} from 'react-intl';
import {Form, Select} from 'informed';
import {func, shape, string, bool} from 'prop-types';
import {Redirect} from '@magento/venia-drivers';
import {useCreateAccount} from '@magento/peregrine/lib/talons/CreateAccount/useCreateAccount';
import {mergeClasses} from '../../classify';
import combine from '../../util/combineValidators';
import {
    hasLengthAtLeast,
    isRequired,
    validatePassword,
    phoneNumberVaildate
} from '../../util/formValidators';
import Button from '../Button';
import Checkbox from '../Checkbox';
import TextInput from '../TextInput';
import defaultClasses from './createAccount.css';
import FormError from '../FormError';
import Password from '../Password';
import Country from "../Country";
import Region from "../Region";
import Postcode from "../Postcode";
import {fullPageLoadingIndicator} from "../LoadingIndicator";
import Field from "../Field";
import { Link } from 'react-router-dom';

const CreateAccount = props => {
    const talonProps = useCreateAccount({
        initialValues: props.initialValues,
        onSubmit: props.onSubmit,
        onCancel: props.onCancel
    });


    const {
        errors,
        handleCancel,
        handleSubmit,
        isDisabled,
        isSignedIn,
        initialValues,
        cities
    } = talonProps;
    const {formatMessage} = useIntl();

    let content = null;

    if (isDisabled) {
        content = fullPageLoadingIndicator;
    }

    if (isSignedIn) {
        return <Redirect to="/"/>;
    }

    const citiesOptions = cities.map((city) => {
        return <option value={city.value}>{city.label}</option>
    });

    const classes = mergeClasses(defaultClasses, props.classes);

    const cancelButton = props.isCancelButtonHidden ? null : (
        <Button
            className={classes.cancelButton}
            disabled={isDisabled}
            type="button"
            priority="low"
            onClick={handleCancel}
        >
            <FormattedMessage
                id={'createAccount.cancelText'}
                defaultMessage={'Cancel'}
            />
        </Button>
    );

    const submitButton = (
        <Button
            className={classes.submitButton}
            disabled={isDisabled}
            type="submit"
            priority="high"
        >
            <FormattedMessage
                id={'createAccount.createAccountText'}
                defaultMessage={'Create an Account'}
            />
        </Button>
    );
    const subscribeCheckLabel = formatMessage({
        id: 'subscribe',
        defaultMessage: 'I wish to receive emails about new\n promotions / deals / products.'
    });
    const termsCheckLabel = formatMessage({
        id: 'terms',
        defaultMessage: ' I agree with the terms and conditions.'
    });

    return (

        <div className={classes.root}>
            <div className={[defaultClasses["int-regform"], " "].join(' ')}>
                <div className={[defaultClasses["form-holder"], " "].join(' ')}>

                    <FormError errors={Array.from(errors.values())}/>

                    <Form
                        className={[defaultClasses["wrp-formInfo"], " "].join(' ')}
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                    >
                        <h2 className={[defaultClasses["form-head"], " "].join(' ')}>New Customer</h2>
                        <strong className={[defaultClasses["text-login"], " "].join(' ')}>Already Registered? <Link
                            className={[defaultClasses["link-login"], " "].join(' ')} to="/signin">Login
                            </Link></strong>
                        <strong className={[defaultClasses["text-head"], " "].join(' ')}>User Account</strong>

                        <div className={[defaultClasses["cr-info"], " "].join(' ')}>
                            <div className={[defaultClasses["wrp-field"], " "].join(' ')}>
                                <label className={[defaultClasses["int-label"], " "].join(' ')} htmlFor="email">Email
                                    <sup className={[defaultClasses["rq-label"], " "].join(' ')}> </sup></label>
                                <TextInput
                                    field="customer.email"
                                    autoComplete="email"
                                    validate={isRequired}
                                    validateOnBlur
                                    mask={value => value && value.trim()}
                                    maskOnBlur={true}
                                />
                            </div>
                            <div className={[defaultClasses["wrp-field"], " "].join(' ')}>
                                <label htmlFor="pwd"
                                       className={[defaultClasses["int-label"], " "].join(' ')}>Password <sup
                                    className={[defaultClasses["rq-label"], " "].join(' ')}></sup></label>
                                <Password
                                    autoComplete="new-password"
                                    fieldName="password"
                                    isToggleButtonHidden={false}
                                    validate={combine([
                                        isRequired,
                                        [hasLengthAtLeast, 8],
                                        validatePassword
                                    ])}
                                    validateOnBlur
                                    mask={value => value && value.trim()}
                                    maskOnBlur={true}
                                />
                            </div>
                        </div>
                        <div className={[defaultClasses["cn-info"], " "].join(' ')}>

                            <strong className={[defaultClasses["text-head"], " "].join(' ')}>Contact
                                Information</strong>

                            <div className={[defaultClasses["wrp-field"], " "].join(' ')}>
                                <div className={[defaultClasses["wrap-split"], " "].join(' ')}>
                                    <div className={[defaultClasses["split-form"], " "].join(' ')}>
                                        <label className={[defaultClasses["int-label"], " "].join(' ')}
                                               htmlFor="firstName">First Name <sup
                                            className={[defaultClasses["rq-label"], " "].join(' ')}></sup></label>
                                        <TextInput
                                            field="customer.firstname"
                                            autoComplete="given-name"
                                            validate={isRequired}
                                            validateOnBlur
                                            mask={value => value && value.trim()}
                                            maskOnBlur={true}
                                        />
                                    </div>
                                    <div className={[defaultClasses["split-form"], " "].join(' ')}>
                                        <label className={[defaultClasses["int-label"], " "].join(' ')}
                                               htmlFor="lastName">Last Name <sup
                                            className={[defaultClasses["rq-label"], " "].join(' ')}></sup></label>
                                        <TextInput
                                            field="customer.lastname"
                                            autoComplete="family-name"
                                            validate={isRequired}
                                            validateOnBlur
                                            mask={value => value && value.trim()}
                                            maskOnBlur={true}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className={[defaultClasses["wrp-field"], " "].join(' ')}>
                                <label className={[defaultClasses["int-label"], " "].join(' ')}
                                       htmlFor="street">Address <sup
                                    className={[defaultClasses["rq-label"], " "].join(' ')}></sup></label>
                                <TextInput
                                    id="street"
                                    type="text"
                                    className={[defaultClasses["int-text"], " "].join(' ')}
                                    placeholder=""
                                    field="address.street"
                                    autoComplete="street"
                                    validate={isRequired}
                                    validateOnBlur
                                    mask={value => value && value.trim()}
                                    maskOnBlur={true}
                                />

                            </div>

                            <div className={[defaultClasses["wrp-field"], " "].join(' ')}>
                                <label className={[defaultClasses["int-label"], " "].join(' ')}
                                       htmlFor="country_id">Country <sup
                                    className={[defaultClasses["rq-label"], " "].join(' ')}></sup></label>
                                <div className={[defaultClasses["wrap-select"], " "].join(' ')}>
                                    <Country
                                        id="country"
                                        initialValue={"PK"}
                                        className={[defaultClasses["int-text"], " "].join(' ')}
                                        field={'address.country_code'} validate={isRequired}/>
                                </div>
                            </div>

                            {/* <div className={[defaultClasses["wrp-field"], " "].join(' ')}>
                                <label className={[defaultClasses["int-label"], " "].join(' ')} htmlFor="state">
                                    State / Province</label>
                                <div className={[defaultClasses["wrap-select"], " "].join(' ')}>
                                    <Region
                                        className={[defaultClasses["int-text"], " "].join(' ')}
                                        countryCodeField={'address.country_code'}
                                        fieldInput={'region[region]'}
                                        fieldSelect={'region[region_id]'}
                                        optionValueKey="id"
                                    />
                                </div>
                            </div> */}
                            <div className={[defaultClasses["wrp-field"], " "].join(' ')}>
                                <label className={[defaultClasses["int-label"], " "].join(' ')} htmlFor="city">City <sup
                                    className={[defaultClasses["rq-label"], " "].join(' ')}></sup></label>
                                <div className={[defaultClasses["wrap-select"], " "].join(' ')}>
                                    <Select field="address.city"
                                            className={[defaultClasses["int-text"], "icon-dropdown"].join(' ')}
                                            id="city" label="City" initialValue="non" validate={isRequired} required={true}>
                                <option value="non" hidden={true}>Please Select City...</option>
                                <option disabled={true}>Please Select City...</option>
                                        {citiesOptions}
                                    </Select>
                                </div>
                            </div>
                            <div className={[defaultClasses["wrp-field"], " "].join(' ')}>
                                <div className="wrap-split">
                                    <div className={[defaultClasses["split-fluid"], " "].join(' ')}>
                                        <label className={[defaultClasses["int-label"], " "].join(' ')}
                                               htmlFor="phone">Phone Number <sup
                                            className={[defaultClasses["rq-label"], " "].join(' ')}></sup></label>
                                        <TextInput field="address.telephone"
                                                   className={[defaultClasses["int-text"], " "].join(' ')}
                                                   validate={combine([
                                                    isRequired,
                                                    [phoneNumberVaildate, 11]
                                                ])}
                                                    maxLength={11}
                                                   autoComplete="phone"
                                                   type="tel"
                                                   placeHolder={'0301XXXXXXX'}
                                        />
                                    </div>
                                </div>
                            </div>
{/*
                            <div className={[defaultClasses["wrp-field"], " "].join(' ')}>
                                <label className={[defaultClasses["int-label"], " "].join(' ')} htmlFor="zip">
                                    ZIP / Postal Code </label>
                                <Postcode
                                    id="postcode"
                                    className={[defaultClasses["int-text"], " "].join(' ')}
                                    field="postcode"
                                    />
                            </div> */}

                            <div className={[defaultClasses["wrp-field"], "checkbox-wrapper"].join(' ')}>
                                <Checkbox
                                    field="terms"
                                    label={termsCheckLabel}
                                    required={true}
                                    className={[defaultClasses["int-checklabel"], " "].join(' ')}
                                />
                            </div>
                            <div className={[defaultClasses["wrp-field"], "checkbox-wrapper"].join(' ')}>
                                <Checkbox
                                    field="subscribe"
                                    label={subscribeCheckLabel}
                                    className={[defaultClasses["int-checklabel"], " "].join(' ')}
                                />

                            </div>
                            {content}
                            <button type="submit" className={[defaultClasses["bt-create"], " "].join(' ')}
                                    disabled={isDisabled}>Create Account
                            </button>

                        </div>
                    </Form>
                </div>
            </div>

        </div>
    );
};

CreateAccount.propTypes = {
    classes: shape({
        actions: string,
        lead: string,
        root: string,
        subscribe: string
    }),
    initialValues: shape({
        email: string,
        firstName: string,
        lastName: string,
        password: string,
        street: string,
        city: string,
        country_id: string,
        country_code: string,
        is_subscribed: bool,
        region: string,
        postcode: string,
        telephone: string
    }),
    isCancelButtonHidden: bool,
    onSubmit: func,
    onCancel: func
};

CreateAccount.defaultProps = {
    onCancel: () => {
    },
    isCancelButtonHidden: true
};

export default CreateAccount;
