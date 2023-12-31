import React, { Fragment, useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useWishlistPage } from '@magento/peregrine/lib/talons/WishlistPage/useWishlistPage';
import { deriveErrorMessage } from '@magento/peregrine/lib/util/deriveErrorMessage';

import { mergeClasses } from '../../classify';
import LoadingIndicator, { fullPageLoadingIndicator } from '../LoadingIndicator';
import Wishlist from './wishlist';
import defaultClasses from './wishlistPage.css';
import WishlistPageOperations from './wishlistPage.gql';
import CreateWishlist from './createWishlist';
import CustomerDashboardNav from '../CustomerDashcoardNav';
import {Title} from "../Head";

const WishlistPage = props => {
    const talonProps = useWishlistPage({ ...WishlistPageOperations });
    const { errors, wishlists } = talonProps;
    const { formatMessage } = useIntl();
    const error = errors.get('getCustomerWishlistQuery');


    const classes = mergeClasses(defaultClasses, props.classes);
    const WISHLIST_DISABLED_MESSAGE = formatMessage({
        id: 'wishlistPage.wishlistDisabledMessage',
        defaultMessage: 'The wishlist is not currently available.'
    });

    const wishlistElements = wishlists ? <Wishlist  data={wishlists} /> : null
    //  useMemo(() => {
    //     return wishlists.map(wishlist => (
    //         <Wishlist key={wishlist.id} data={wishlist} />
    //     ));
    // }, [wishlists]);

    if (!wishlists && !error) {
        return <LoadingIndicator />;
    }

    let content;
    if (error) {
        const derivedErrorMessage = deriveErrorMessage([error]);
        const errorElement =
            derivedErrorMessage === WISHLIST_DISABLED_MESSAGE ? (
                <p>
                    <FormattedMessage
                        id={'wishlistPage.disabledMessage'}
                        defaultMessage={
                            'Sorry, this feature has been disabled.'
                        }
                    />
                </p>
            ) : (
                <p className={classes.fetchError}>
                    <FormattedMessage
                        id={'wishlistPage.fetchErrorMessage'}
                        defaultMessage={
                            'Something went wrong. Please refresh and try again.'
                        }
                    />
                </p>
            );

        content = <div className={classes.errorContainer}>{errorElement}</div>;
    } else {
        content = (
            <Fragment>
                {wishlistElements}
                <CreateWishlist />
            </Fragment>
        );
    }

    return (
        <Fragment>
            <Title>{`Wishlist`} - {STORE_NAME}</Title>
            <div className="page-main">
                <CustomerDashboardNav />
                <div className={classes.root}>
                    <h1 className={classes.heading}>
                        <FormattedMessage
                            id={'wishlistPage.headingText'}
                            defaultMessage={'Favorites Lists'}
                        />
                    </h1>
                    {content}
                </div>
            </div>
        </Fragment>
    );
};

export default WishlistPage;
