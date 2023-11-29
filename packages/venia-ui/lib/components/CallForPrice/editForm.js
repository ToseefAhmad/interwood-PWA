import React, { Fragment } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { shape, string } from 'prop-types';

import { mergeClasses } from '../../classify';
import Field from '../Field';
import TextInput from '../TextInput';

import {
    isRequired,
} from '../../util/formValidators';
import defaultClasses from './editForm.css';
import { TextArea } from 'informed';

const EditForm = props => {
    const {
        classes: propClasses, errors
    } = props;
    const { formatMessage } = useIntl();

    const classes = mergeClasses(defaultClasses, propClasses);

    const errorMessage = errors.length
    ? errors
          .map(({ message }) => message)
          .reduce((acc, msg) => msg + '\n' + acc, '')
    : null;

    return (
        <Fragment>
            {errors ? <div><p>{errorMessage}</p></div> :  null
            }
            <div className={classes.root}>
                <div className={classes.name}>
                    <Field
                        id="name"
                        label={formatMessage({
                            id: 'global.name',
                            defaultMessage: 'Name'
                        })}
                    >
                        <TextInput field="name" validate={isRequired} />
                    </Field>
                </div>
                <div className={classes.name}>
                    <Field
                        id="phone"
                        label={formatMessage({
                            id: 'global.phone',
                            defaultMessage: 'Phone'
                        })}
                    >
                        <TextInput field="phone" validate={isRequired} />
                    </Field>
                </div>
                <div className={classes.email}>
                    <Field
                        id="email"
                        label={formatMessage({
                            id: 'global.email',
                            defaultMessage: 'Email'
                        })}
                    >
                        <TextInput field="email" validate={isRequired} />
                    </Field>
                </div>
                <div className={classes.firstname}>
                    <Field
                        id="city"
                        label={formatMessage({
                            id: 'global.city',
                            defaultMessage: 'City'
                        })}
                    >
                        <TextInput field="city" validate={isRequired} />
                    </Field>
                </div>
                <div className={classes.message}>
                    <Field
                        id="message"
                        label={formatMessage({
                            id: 'global.message',
                            defaultMessage: 'Message'
                        })}
                    >
                        <TextArea field="message"/>
                    </Field>
                </div>
            </div>
        </Fragment>
    );
};

export default EditForm;

EditForm.propTypes = {
    classes: shape({
        changePasswordButton: string,
        changePasswordButtonContainer: string,
        root: string,
        field: string,
        email: string,
        firstname: string,
        lastname: string,
        buttons: string,
        passwordLabel: string,
        password: string,
        newPassword: string,
        message: string
    })
};
