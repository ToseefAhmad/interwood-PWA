import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Form } from 'informed';
import { shape, func, string, bool, instanceOf } from 'prop-types';

import { usePaymentInformation } from '@magento/peregrine/lib/talons/CheckoutPage/PaymentInformation/usePaymentInformation';
import CheckoutError from '@magento/peregrine/lib/talons/CheckoutPage/CheckoutError';

import PaymentMethods from './paymentMethods';
import Summary from './summary';
import { mergeClasses } from '../../../classify';
import EditModal from './editModal';

import paymentInformationOperations from './paymentInformation.gql';

import defaultClasses from './paymentInformation.css';
import LoadingIndicator from '../../LoadingIndicator';

const PaymentInformation = props => {
    const {
        classes: propClasses,
        onSave,
        resetShouldSubmit,
        setCheckoutStep,
        shouldSubmit,
        checkoutError,
        setIsPaymentSelected,
        tenure,
        setTenure,
        bank_id,
        setBankId,
        total,
        setPaymentMethodDesc,
        paymentMethodDesc
    } = props;

    const classes = mergeClasses(defaultClasses, propClasses);

    const talonProps = usePaymentInformation({
        onSave,
        checkoutError,
        resetShouldSubmit,
        setCheckoutStep,
        shouldSubmit,
        ...paymentInformationOperations,
        setIsPaymentSelected
    });

    const {
        doneEditing,
        handlePaymentError,
        handlePaymentSuccess,
        hideEditModal,
        isLoading,
        isEditModalActive,
        showEditModal
    } = talonProps;

    if (isLoading) {
        return (
            <LoadingIndicator classes={{ root: classes.loading }}>
                <FormattedMessage
                    id={'checkoutPage.loadingPaymentInformation'}
                    defaultMessage={'Fetching Payment Information'}
                />
            </LoadingIndicator>
        );
    }

    const paymentInformation = doneEditing ? (
        <Summary onEdit={showEditModal} />
    ) : (
        <Form>
            <PaymentMethods
                onPaymentError={handlePaymentError}
                onPaymentSuccess={handlePaymentSuccess}
                resetShouldSubmit={resetShouldSubmit}
                shouldSubmit={shouldSubmit}
                bank_id={bank_id}
                tenure={tenure}
                setBankId={setBankId}
                setTenure={setTenure}
                total={total}
                paymentMethodDesc={paymentMethodDesc}
                setPaymentMethodDesc={setPaymentMethodDesc}
            />
        </Form>
    );

    const editModal = doneEditing ? (
        <EditModal onClose={hideEditModal}
                   isOpen={isEditModalActive}
                   bank_id={bank_id}
                   tenure={tenure}
                   setBankId={setBankId}
                   setTenure={setTenure}
                   total={total}
                   paymentMethodDesc={paymentMethodDesc}
                   setPaymentMethodDesc={setPaymentMethodDesc}
        />
    ) : null;

    return (
        <div className={classes.root}>
            <div className={classes.payment_info_container}>
                {paymentInformation}
            </div>
            <div className="info-free-shipping">
                <input type="checkbox" checked="checked" className="int-checklabel" />
                <span>I agree with the terms and conditions.</span>
            </div>
            <div className="info-free-shipping">
                <input type="checkbox" checked="checked" className="int-checklabel" />
                <span>I wish to receive emails about new promotions / deals / products.</span>
            </div>
            {editModal}
        </div>
    );
};

export default PaymentInformation;

PaymentInformation.propTypes = {
    classes: shape({
        container: string,
        payment_info_container: string,
        review_order_button: string
    }),
    onSave: func.isRequired,
    checkoutError: instanceOf(CheckoutError),
    resetShouldSubmit: func.isRequired,
    shouldSubmit: bool
};
