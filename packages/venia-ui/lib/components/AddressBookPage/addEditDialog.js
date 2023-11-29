import React from 'react';
import { bool, func, object, shape, string } from 'prop-types';
import { useIntl } from 'react-intl';

import { mergeClasses } from '@magento/venia-ui/lib/classify';
import { isRequired, phoneNumberVaildate } from '@magento/venia-ui/lib/util/formValidators';
import combine from '@magento/venia-ui/lib/util/combineValidators';

import Checkbox from '@magento/venia-ui/lib/components/Checkbox';
import Country from '@magento/venia-ui/lib/components/Country';
import Dialog from '@magento/venia-ui/lib/components/Dialog';
import Field from '@magento/venia-ui/lib/components/Field';
import FormError from '@magento/venia-ui/lib/components/FormError';
import Postcode from '@magento/venia-ui/lib/components/Postcode';
import Region from '@magento/venia-ui/lib/components/Region';
import TextInput from '@magento/venia-ui/lib/components/TextInput';
import defaultClasses from './addEditDialog.css';
import { Select } from 'informed';

const AddEditDialog = props => {
    const {
        formErrors,
        formProps,
        isBusy,
        isEditMode,
        isOpen,
        onCancel,
        onConfirm,
        citiesList
    } = props;

    const { formatMessage } = useIntl();

    const classes = mergeClasses(defaultClasses, props.classes);
    const citiesOptions = citiesList.map((city) => {
        return <option value={city.value} >{city.label}</option>
    });

    let formatTitleArgs;
    if (isEditMode) {
        formatTitleArgs = {
            id: 'addressBookPage.editDialogTitle',
            defaultMessage: 'Edit Address'
        };
    } else {
        formatTitleArgs = {
            id: 'addressBookPage.addDialogTitle',
            defaultMessage: 'New Address'
        };
    }
    const title = formatMessage(formatTitleArgs);

    const firstNameLabel = formatMessage({
        id: 'global.firstName',
        defaultMessage: 'First Name'
    });
    const middleNameLabel = formatMessage({
        id: 'global.middleName',
        defaultMessage: 'Middle Name'
    });
    const lastNameLabel = formatMessage({
        id: 'global.lastName',
        defaultMessage: 'Last Name'
    });
    const street1Label = formatMessage({
        id: 'global.streetAddress',
        defaultMessage: 'Street Address'
    });
    const street2Label = formatMessage({
        id: 'global.streetAddress2',
        defaultMessage: 'Street Address 2'
    });
    const cityLabel = formatMessage({
        id: 'global.city',
        defaultMessage: 'City'
    });
    const telephoneLabel = formatMessage({
        id: 'global.phoneNumber',
        defaultMessage: 'Phone Number'
    });
    const defaultAddressCheckLabel = formatMessage({
        id: 'addressBookPage.makeDefaultAddress',
        defaultMessage: 'Make this my default address'
    });

    return (
        <Dialog
            confirmTranslationId={'global.save'}
            confirmText="Save"
            formProps={formProps}
            isOpen={isOpen}
            onCancel={onCancel}
            onConfirm={onConfirm}
            shouldDisableAllButtons={isBusy}
            shouldUnmountOnHide={true}
            title={title}
        >
            <FormError
                classes={{ root: classes.errorContainer }}
                errors={Array.from(formErrors.values())}
            />
            <div className={classes.root}>
                <div className={classes.firstname}>
                    <Field id="firstname" label={firstNameLabel}>
                        <TextInput field="firstname" validate={isRequired} />
                    </Field>
                </div>
                <div className={classes.lastname}>
                    <Field id="lastname" label={lastNameLabel}>
                        <TextInput field="lastname" validate={isRequired} />
                    </Field>
                </div>
                <div className={classes.country}>
                    <Country field={'country_id'} initialValue="PK"  validate={isRequired} />
                </div>
                <div className={classes.country}>
                    <Field
                        id="city"
                        label={formatMessage({
                            id: 'global.city',
                            defaultMessage: 'City'
                        })}
                    >
                        <Select field="city"  id="city" label="City"  defaultValue='non' validate={isRequired}  required={true}>
                            <option value="non" hidden={true}>Please Select City...</option>
                            <option disabled={true}>Please Select City...</option>
                            {citiesOptions}
                        </Select>
                        {/* <TextInput
                            field="city"
                            id="city"
                            validate={isRequired}
                        /> */}
                    </Field>
                </div>
                <div className={classes.street1}>
                    <Field id="street1" label={street1Label}>
                        <TextInput field="street[0]" validate={isRequired} />
                    </Field>
                </div>
                <div className={classes.street2}>
                    <Field id="street2" label={street2Label} optional={true}>
                        <TextInput field="street[1]" />
                    </Field>
                </div>
                
                {/* <div className={classes.postcode}>
                    <Postcode validate={isRequired} />
                </div> */}
                <div className="field-telephone">
                    <Field
                        id="telephone"
                        label={formatMessage({
                            id: 'global.phoneNumber',
                            defaultMessage: 'Phone Number'
                        })}
                    >
                        <span className="has-required-icon required-pn"></span>
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
                <div className="modal-checkbox-group">
                    <div className={classes.default_address_check}>
                        <Checkbox
                            field="default_shipping"
                            label={defaultAddressCheckLabel}
                        />
                    </div>
                </div>
            </div>
        </Dialog>
    );
};

export default AddEditDialog;

AddEditDialog.propTypes = {
    classes: shape({
        root: string,
        city: string,
        country: string,
        default_address_check: string,
        errorContainer: string,
        firstname: string,
        lastname: string,
        middlename: string,
        postcode: string,
        region: string,
        street1: string,
        street2: string,
        telephone: string
    }),
    formErrors: object,
    isEditMode: bool,
    isOpen: bool,
    onCancel: func,
    onConfirm: func
};
