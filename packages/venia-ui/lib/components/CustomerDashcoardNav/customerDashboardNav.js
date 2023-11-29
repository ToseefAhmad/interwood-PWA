import React, {useState} from 'react';
import defaultClasses from './customerDashboard.css';
import classify from '../../classify';
import {NavLink} from 'react-router-dom';

const CustomerDashboardNav = () => {
    const [sideBarToggle, setSideBarToggle] = useState(false);

    return (
        <div>
            <button className="sidebar-toggle" onClick={() => setSideBarToggle(!sideBarToggle)}>
                <img src={require("../../assets/img/sidebar-toggle.svg")} alt="sidebar toggle"/>
                <span>Menu</span>
            </button>
            <div className={`dashboard-sidebar ${sideBarToggle ? 'show' : null}`}>
                <button className="sidebar-close-btn" onClick={() => setSideBarToggle(false)}>
                    <img src={require("../../assets/img/close.svg")} alt="close"/>
                </button>
                <ul>
                    <li key={"1"}>
                        <NavLink to='/order-history' activeClassName={'active'}>
                            Order History
                        </NavLink>
                    </li>
                    <li key={"2"}>
                        <NavLink to='/wishlist' activeClassName={'active'}>
                            Wishlist
                        </NavLink>
                    </li>
                    <li key={"3"}>
                        <NavLink to='/address-book' activeClassName={'active'}>
                            Personal Details
                        </NavLink>
                    </li>
                    <li key={"4"}>
                        <NavLink to='/account-information' activeClassName={'active'}>
                            Access Details
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="clear"></div>
        </div>
    )
};

export default classify(defaultClasses)(CustomerDashboardNav);
