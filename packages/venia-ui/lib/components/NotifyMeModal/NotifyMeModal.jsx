import React, { useState } from 'react';
import { ImCross } from "react-icons/im";
import defaultClasses from './NotifyMeModal.module.css';
import classify from '../../classify';

const NotifyMeModal = (props) => {
    const { setIsModalOpen, productId, notifyMeHandler } = props;

    const [email, setEmail] = useState("");
    const [errorValue, setErrorValue] = useState("");

    const emailHandler = (e) => {
        setEmail(e.target.value);
        setErrorValue("");
    }
    const emailValidation = () => {
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!email || regex.test(email) === false) {
            setErrorValue("Enter Correct Email Value");
            return false;
        }

        return true;
    }

    const modalClickHandler = (e) => {
        e.preventDefault();
        if (emailValidation()) {
            if (productId && email) {
                notifyMeHandler(productId, email);
            }
        }

        return;
    }

    return (
        <div className='modal-container'>
            <div className='content'>
                <div onClick={() => setIsModalOpen(false)} className='close-button-container'>
                    <span className='icon-container'><ImCross></ImCross></span>
                </div>
                <div className='description-text'>
                    <p className='heading-text'>EMAIL ME WHEN AVAILABLE</p>
                    <p className='notification-text'>Get notified via email when this product is back in stock</p>
                </div>
                <form className='form'>
                    <div className='email-container'>
                        <input required className='input-field' name="email" value={email} onChange={(e) => emailHandler(e)} placeholder="Enter Email Here">

                        </input>
                        <p className='error'>{errorValue ? errorValue : null}</p>
                    </div>
                    <div className='btn-container'>
                        <button type='submit' onClick={(e) => modalClickHandler(e)} className='btn'>
                            Notify Me
                        </button>
                    </div>
                </form>
                <p className='clarification'>While entering the email will not select the product for you, It will allow us to notify you once the product becomes avaialble again!</p>
            </div>
        </div>
    )
}

export default classify(defaultClasses)(NotifyMeModal)