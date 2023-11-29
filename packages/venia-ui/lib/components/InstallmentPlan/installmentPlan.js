import React from 'react';
import { Form } from 'informed';

import FormError from '../FormError';

const InstallmentPlan = () => {
    return(
        <div>
            <Form
                className={classes.root}
                initialValues={initialValues}
                onSubmit={handleSubmit}
                >
                <h2 className={classes.title}>
                    SEND US A MESSAGE PERSONNEL INFO
                </h2>
                <FormError errors={Array.from(errors.values())} />
                <label>
                    
                </label>
                <Field
                    label={formatMessage({
                        id: 'createAccount.lastNameText',
                        defaultMessage: 'Last Name'
                    })}
                >
                    <TextInput
                        field="customer.lastname"
                        autoComplete="family-name"
                        validate={isRequired}
                        validateOnBlur
                        mask={value => value && value.trim()}
                        maskOnBlur={true}
                    />
                </Field>
                <Field
                    label={formatMessage({
                        id: 'createAccount.emailText',
                        defaultMessage: 'Email'
                    })}
                >
                    <TextInput
                        field="customer.email"
                        autoComplete="email"
                        validate={isRequired}
                        validateOnBlur
                        mask={value => value && value.trim()}
                        maskOnBlur={true}
                    />
                </Field>
                <Password
                    autoComplete="new-password"
                    fieldName="password"
                    isToggleButtonHidden={false}
                    label={formatMessage({
                        id: 'createAccount.passwordText',
                        defaultMessage: 'Password'
                    })}
                    validate={combine([
                        isRequired,
                        [hasLengthAtLeast, 8],
                        validatePassword
                    ])}
                    validateOnBlur
                    mask={value => value && value.trim()}
                    maskOnBlur={true}
                />
                <div className={classes.subscribe}>
                    <Checkbox
                        field="subscribe"
                        label={formatMessage({
                            id: 'createAccount.subscribeText',
                            defaultMessage: 'Subscribe to news and updates'
                        })}
                    />
                </div>
                <div className={classes.actions}>
                    {submitButton}
                    {cancelButton}
                </div>
            </Form>
        </div>
    )
}