import React, { useEffect, useState } from "react";
import classify from '../../classify';
import defaultClasses from './SalesModal.css';

import {deriveErrorMessage} from '@magento/peregrine/lib/util/deriveErrorMessage';
import { useSalePopUp } from "@magento/peregrine/lib/talons/SalesPopUp/useSalePopUp";
import {useNewsletter} from "@magento/peregrine/lib/talons/Newsletter/useNewsletter";

import { Link } from "react-router-dom";

const SalesModal = () => {
    const {data} = useSalePopUp();

    const promoData = data?.promotionsPopUpBox;
    const [showReq, setShowReq] = useState(true);
    const [email, setEmail] = useState('');

    const talonProps = useNewsletter({
        email:email
    });
    const {
        handleSubmit,
        error,
        data: newsletterData
    } = talonProps;

    const handlehidePopup = () => {
        let sessionfalse = sessionStorage.setItem("popup", !showReq);
        setShowReq(sessionfalse);
    };
    const isActive = +promoData?.days >= 0 && +promoData?.days;

    let divStructure = null;
    if ((!sessionStorage.getItem("popup")) && isActive) {
        divStructure = <div>
            <div id="salesModal" className="modal modal__bg" role="dialog" aria-hidden="true">
                <div className="modal__dialog">
                    <div className="modal__content">
                        <Link to={promoData?.url}>
                            <div className="modal__vector left-sec">
                                <img src={promoData?.image} onClick={handlehidePopup}/>
                            </div>
                        </Link>
                        <div className="right-sec">
                            <h1 className="modal__title">{promoData?.title}</h1>
                            <div className="counter">
                                {
                                    +promoData?.days === 0 ?
                                        <div className="content">Today</div>
                                    : <div className="content">{promoData.days}<br></br><span>DAYS</span></div>

                                }
                            </div>
                            <p className="modal__discription">
                                Till the Show Ends!
                            </p>
                            <p className="para">
                                {promoData?.description}
                            </p>
                            <form onSubmit={(e) => e.preventDefault()}>
                                <label style={{color: "red", fontSize: "12px", fontWeight: "bold"}} >{error != undefined ? deriveErrorMessage([error]): null}</label>
                                <label style={{color: "green", fontSize: "12px", fontWeight: "bold"}} >{newsletterData != undefined ? "You have successfully subscribed": null}</label>
                                <input type="text" placeholder="Email" required onChange={(e) => setEmail(e.target.value)}></input>
                                <div className="modal__actions">
                                    <button type="button" className="btn-modal btn-modal-primary" onClick={() => !!email? handleSubmit() : null}>Subscribe</button>
                                </div>
                            </form>
                            <a className="modal__close demo-close" onClick={handlehidePopup}>
                                <svg className="" viewBox="0 0 24 24"><path d="M19 6.41l-1.41-1.41-5.59 5.59-5.59-5.59-1.41 1.41 5.59 5.59-5.59 5.59 1.41 1.41 5.59-5.59 5.59 5.59 1.41-1.41-5.59-5.59z" /><path d="M0 0h24v24h-24z" fill="none" /></svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }

    return divStructure;

};

export default classify(defaultClasses)(SalesModal);
