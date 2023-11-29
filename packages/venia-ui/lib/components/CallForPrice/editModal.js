import React from 'react';
import { useIntl } from 'react-intl';
import { shape, string, bool, array, func, object } from 'prop-types';

import { mergeClasses } from '../../classify';
import EditForm from './editForm';
import FormError from '../FormError';
import Dialog from '../Dialog';
import defaultClasses from './editModal.css';
import LoadingIndicator from '../LoadingIndicator';

const EditModal = props => {
    const {
        classes: propClasses,
        formErrors,
        onCancel,
        onSubmit,
        isDisabled,
        isOpen,
        isLoading,
        response
    } = props;
    const { formatMessage } = useIntl();

    const classes = mergeClasses(defaultClasses, propClasses);
    const isSubmitted = response ? response.submitCallForPriceRequest : null;
    
    return (
        <Dialog
            classes={{ body: classes.bodyEditAccountInformation }}
            confirmText={'Save'}
            isOpen={isOpen}
            onCancel={onCancel}
            onConfirm={onSubmit}
            shouldDisableAllButtons={isDisabled}
            shouldDisableConfirmButton={isDisabled}
            title={formatMessage({
                id: 'callForPrice.callForPrice',
                defaultMessage: 'Request a Quote'
            })}
        >
            <FormError
                classes={{ root: classes.errorContainer }}
                errors={formErrors}
            />
            {
                isLoading ? <LoadingIndicator>{'Submitting Query...'}</LoadingIndicator>  :
                // : !isSubmitted ? 
                <EditForm errors={formErrors}/>
                // : null
            }
            {/* {
                isSubmitted ? <div>
                    <h1>Query Is Submitted Successfully</h1>
                </div> : null
            } */}
        </Dialog>
    );
};

export default EditModal;

EditModal.propTypes = {
    classes: shape({
        errorContainer: string
    }),
    formErrors: array,
    handleCancel: func,
    handleSubmit: func,
    initialValues: object,
    isDisabled: bool,
    isOpen: bool
};
