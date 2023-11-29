import React, { Fragment, useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import {useToasts} from '@magento/peregrine';

import { mergeClasses } from '../../classify';
import Button from '../Button';
import { Message } from '../Field';
import LoadingIndicator from '../LoadingIndicator';
import EditModal from './editModal';
import defaultClasses from './callForPrice.css';
import { useCallForPrice } from '@magento/peregrine/lib/talons/CallForPrice/useCallForPrice';
import CallForPriceOperations from './callForPrice.gql'


const CallForPrice = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const { productId } = props

    const talonProps = useCallForPrice({
        ...CallForPriceOperations,
        productId
    });

    const {
        handleCancel,
        formErrors,
        handleSubmit,
        isDisabled,
        isUpdateMode,
        loadDataError,
        showUpdateMode,
        loading,
        data
    } = talonProps;

    const [, { addToast }] = useToasts();

    useMemo(() => {
        if(data) {
            addToast({
                type: 'info',
                message: 'Successfully Submitted.',
                timeout: 5000
            });
        }
        if(loadDataError) {
            addToast({
                type: 'error',
                message: 'Something went wrong Please try again.',
                timeout: 5000
            });
        }
    }, [ loadDataError, data]);

    const { formatMessage } = useIntl();

    const errorMessage = loadDataError ? (
        <Message>
            <FormattedMessage
                id={'callForPrice.errorTryAgain'}
                defaultMessage={
                    'Something went wrong. Please refresh and try again.'
                }
            />
        </Message>
    ) : null;

    let pageContent = null;
    if (false) {
        return <LoadingIndicator>{'Submitting..'}</LoadingIndicator>;
    } else {
        pageContent = (
            <Fragment>
                <div className="action-call-for-price">
                    <Button
                        className="btn-theme"
                        disabled={false}
                        onClick={showUpdateMode}
                        priority="normal"
                    >
                        <FormattedMessage
                            id={'callforPrice.button'}
                            defaultMessage={'Request a Quote'}
                        />
                    </Button>
                </div>
                
                <EditModal
                    formErrors={formErrors}
                    isDisabled={isDisabled}
                    isOpen={isUpdateMode}
                    onCancel={handleCancel}
                    onSubmit={handleSubmit}
                    isLoading={loading}
                    response={data}
                />
            </Fragment>
        );
    }

    return (
        <Fragment>
            <div className={classes.root}>
            {errorMessage ? errorMessage : pageContent}
        </div>
        </Fragment>
    );
};

export default CallForPrice;
