import React from 'react';
import defaultClasses from './orderSuccessPage.css';
import classify from '../../classify';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import * as QueryString from "query-string";
import { useUserContext } from '@magento/peregrine/lib/context/user';
import OTPverification from '../OTPverification';

 const OrderConfirmationPage = props =>{
    const history = useHistory();
    const search =  history.location.search;
    const params = QueryString.parse(search);
    const { classes } = props;

    const [
        { isGettingDetails, getDetailsError, isSignedIn: isUserSignedIn},
        { getUserDetails, setToken }
    ] = useUserContext();
    let content = null;
    if(params.status == 'success'){
        content = <div className={classes.root}>
        <section className="order-success-page">
            <div className="success-vector">
                <img src={require("../../assets/img/order-success.png")} alt="" />
            </div>
            <div className="succuss-page-content">
                <h3>
                    Thank you for your Purchase!
                </h3>
                
                <p>
                    your order number is: <span className="order-no">{params.orderid}.</span>
                </p>
                <p>
                    {params.message}
                </p>
                <p>
                    We'll email you an order confirmation with details and tracking info.
                </p>
                {
                    !isUserSignedIn ? <Link to="/create-account" className="continue-shopping">Create An Account</Link> : null

                }
                
                <Link to="/" className="continue-shopping">Continue Shopping</Link>
            </div>
        </section>
    </div>
    } else if(params.status == 'error') {
        content = <div className={classes.root}>
                  <section className="order-success-page">
                    <div className="success-vector">
                        <img src={require("../../assets/img/order-error.svg")} alt="" />
                    </div>
                    <div className="succuss-page-content">
                        <h3>
                            Error While Processing Your Order!
                        </h3>
                        <p className="error-text">
                            {params.message}
                        </p>
                        {
                        !isUserSignedIn ? <Link to="/create-account" className="continue-shopping">Create An Account</Link> : null

                    }
                        <Link to="/" className="continue-shopping">Continue Shopping</Link>
                    </div>
                </section>
            </div>
    }  else if (params.orderId){
        content = <div className={classes.root}>
            <section className="order-success-page">
                <div className="success-vector">
                    <img src={require("../../assets/img/order-success.png")} alt="" />
                </div>
                <div className="succuss-page-content">
                    <h3>
                        Thank you for your purchase!
                    </h3>
                    {/* <div className="verifyfield"><OTPverification orderId={params.orderId}/></div> */}
                    <p>
                        your order number is: <span className="order-no">{params.orderId}.</span>
                        We'll email you an order confirmation with details and tracking info.
                    </p>
                    {
                        !isUserSignedIn ? <Link to="/create-account" className="continue-shopping">Create An Account</Link> : null

                    }
                    <Link to="/" className="continue-shopping">Continue Shopping</Link>
                </div>
            </section>
        </div>
    }
        return (
            <div>
            {content}
            </div>
        );
}


export default classify(defaultClasses)(OrderConfirmationPage);
