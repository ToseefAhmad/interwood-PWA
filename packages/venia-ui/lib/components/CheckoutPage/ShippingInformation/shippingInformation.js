import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { func, string, shape } from 'prop-types';
import { Edit2 as EditIcon } from 'react-feather';
import { useShippingInformation } from '@magento/peregrine/lib/talons/CheckoutPage/ShippingInformation/useShippingInformation';

import { mergeClasses } from '../../../classify';
import Icon from '../../Icon';
import LoadingIndicator from '../../LoadingIndicator';
import AddressForm from './AddressForm';
import Card from './card';
import EditModal from './editModal';
import defaultClasses from './shippingInformation.css';
import ShippingInformationOperations from './shippingInformation.gql';
import LinkButton from '../../LinkButton';

const ShippingInformation = props => {
    const { classes: propClasses, onSave, toggleActiveContent } = props;
    const talonProps = useShippingInformation({
        onSave,
        toggleActiveContent,
        ...ShippingInformationOperations
    });
    const {
        doneEditing,
        handleEditShipping,
        hasUpdate,
        isSignedIn,
        isLoading,
        shippingData,
        
    } = talonProps;

    const classes = mergeClasses(defaultClasses, propClasses);

    const rootClassName = !doneEditing
        ? classes.root_editMode
        : hasUpdate
        ? classes.root_updated
        : classes.root;

    if (isLoading) {
        return (
            <LoadingIndicator classes={{ root: classes.loading }}>
                <FormattedMessage
                    id={'shippingInformation.loading'}
                    defaultMessage={'Fetching Shipping Information...'}
                />
            </LoadingIndicator>
        );
    }

    const editModal = !isSignedIn ? (
        <EditModal shippingData={shippingData} />
    ) : null;

    const shippingInformation = doneEditing ? (
        <Fragment>
            <div className={classes.cardHeader}>
                {/*<h5 className={classes.cardTitle}>*/}
                {/*    <FormattedMessage*/}
                {/*        id={'shippingInformation.cardTitle'}*/}
                {/*        defaultMessage={'Shipping Information'}*/}
                {/*    />*/}
                {/*</h5>*/}
                <LinkButton
                    onClick={handleEditShipping}
                    className={classes.editButton}
                >
                    <Icon
                        size={16}
                        src={EditIcon}
                        classes={{ icon: classes.editIcon }}
                    />
                    <span className={classes.editText}>
                        <FormattedMessage
                            id={'global.editButton'}
                            defaultMessage={'Edit'}
                        />
                    </span>
                </LinkButton>
            </div>
            <Card shippingData={shippingData} />
            {editModal}
        </Fragment>
    ) : (
        <Fragment>
            <div className={classes.editWrapper}>

                <AddressForm shippingData={shippingData} />
            </div>
        </Fragment>
    );

    return <div className={rootClassName}>{shippingInformation}</div>;
};

export default ShippingInformation;

ShippingInformation.propTypes = {
    classes: shape({
        root: string,
        root_editMode: string,
        cardHeader: string,
        cartTitle: string,
        editWrapper: string,
        editTitle: string,
        editButton: string,
        editIcon: string,
        editText: string
    }),
    onSave: func.isRequired,
    toggleActiveContent: func.isRequired
};
