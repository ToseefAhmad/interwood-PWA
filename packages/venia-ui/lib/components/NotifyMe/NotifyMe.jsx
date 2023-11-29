// PRODUCT BACK IN STOCK NOTIFICATION COMPONENT
import React, { useState, useEffect } from 'react';
import NotifyMeModal from '../NotifyMeModal/NotifyMeModal';
import defaultClasses from './NotifyMe.module.css';
import { useToasts } from '@magento/peregrine';
import { useAccountChip } from '@magento/peregrine/lib/talons/AccountChip/useAccountChip';
import { GET_CUSTOMER_DETAILS } from '../AccountChip/accountChip.gql';

import classify from '../../classify';
import { useNotifyMe } from "@magento/peregrine/lib/talons/NotifyMe/useNotifyMe";

const NotifyMe = (props) => {

    const { product: { id } } = props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const talonProps = useAccountChip({
        queries: {
            getCustomerDetailsQuery: GET_CUSTOMER_DETAILS
        }
    });

    const { currentUser, isLoadingUserName, isUserSignedIn } = talonProps;
    const talons = useNotifyMe();
    const {
        notifyMeHandler,
        error,
        data,
        loading,
        storeConfig
    } = talons;
    const [, { addToast }] = useToasts();
    const isBackInStockEnabled = storeConfig?.storeConfig?.is_back_in_stock_enable;
    useEffect(() => {
        if (isModalOpen) {
            document.body.classList.add("modal-scroll");
        }
        else {
            document.body.classList.remove('modal-scroll');
        }
    }, [isModalOpen]);


    useEffect(() => {
        if (data) {
            setIsModalOpen(false);
            const successMessage = data?.ProductAlertNotifyInStock?.message;
            addToast({
                type: 'info',
                message: successMessage,
                timeout: 5000
            })
        }
        else if (error) {
            const errorMessage = data?.ProductAlertNotifyInStock?.message;
            addToast({
                type: 'info',
                message: errorMessage,
                timeout: 5000
            })
        }
    }, [error, data]);

    const notifyClickHandler = (user) => {
        const email = user?.email;
        if (id && email) {
            notifyMeHandler(id, email);
        }
        return;
    }

    if (isModalOpen) {
        return (
            <NotifyMeModal
                setIsModalOpen={setIsModalOpen}
                productId={id}
                isModalOpen={isModalOpen}
                notifyMeHandler={notifyMeHandler}
            />
        )
    }
    console.log("BAck in Stock Enabled", isBackInStockEnabled);
    return (
        <>
            {isBackInStockEnabled ? <div className='notifyMe-Component'>
                {isUserSignedIn ? (
                    <div className='signed-in-notify-button-container'>
                        <button onClick={(e) => notifyClickHandler(currentUser)} className='notify-button'>
                            <span> Notify Me </span>
                        </button>
                    </div>
                )
                    :
                    (
                        <div className='modal-button-container'>
                            <button onClick={() => setIsModalOpen(true)} className='modal-button'>
                                <span>
                                    Notify Me
                                </span>
                            </button>
                        </div>
                    )
                }
            </div> : null
            }
        </>
    )
}

export default classify(defaultClasses)(NotifyMe);