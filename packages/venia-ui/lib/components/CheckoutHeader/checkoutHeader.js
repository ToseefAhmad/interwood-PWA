import React from 'react';
import { Link } from 'react-router-dom';
import classify from '../../classify';
import defaultClasses from './checkoutHeader.css';

const CheckoutHeader = props => {
    
    return (

        <div className="checout-header has-box-shadow">
            <div className="checkout-header-left">
                <Link to='/' className="continue-shopping-link">Continue Shopping</Link>
            </div>
            <div className="checkout-header-center">
                <Link to="/">
                    <img src={require("../../assets/img/logo.png")} alt="Interwood" />
                </Link>
            </div>
            <div className="checkout-header-right">
                <div className="contact-info">
                    <a >021-111-203-203</a>
                    <a >Complaints@interwood.pk</a>
                </div>
            </div>
        </div>

    );

};

export default classify(defaultClasses)(CheckoutHeader);
