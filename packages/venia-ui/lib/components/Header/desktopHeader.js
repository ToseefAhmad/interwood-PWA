import React, { Fragment } from 'react'; 

import { Link } from '@magento/venia-drivers';

import CartTrigger from './cartTrigger';
import { mergeClasses } from '../../classify';
import defaultClasses from './header.css';
import SearchBar from '../SearchBar';
import AccountTrigger from './accountTrigger';

const DesktopHeader = ( props ) => {
    const { isSearchOpen, searchRef,  isUserSignedIn,  urlPath } = props;

    const classes = mergeClasses(defaultClasses, props.classes);

    return (
        <Fragment>
                <div className={[defaultClasses["desktop-header"], " "].join(' ')}>
                <div className={[defaultClasses["header-left"], " "].join(' ')}>
                    <Link to="/" className={[defaultClasses["logo"], " "].join(' ')}>
                        <img alt="Interwood" src={require("../../assets/img/logo.png")} />
                    </Link>
                </div>
                {/* <!-- End .header-left --> */}
                <div className={[defaultClasses["header-right"], " "].join(' ')}>
                    {/* <!-- Search --> */}
                    <SearchBar isOpen={isSearchOpen} ref={searchRef} isCompare={false}/>
                    {/* <!-- End Search --> */}
                    <div className={[defaultClasses["header-action-icon"], " "].join(' ')}>
                        {/* <Link to="/signin" className={[defaultClasses["header-right-icons"], defaultClasses["header-icon"], defaultClasses["login-link"], " "].join(' ')}> */}
                                <AccountTrigger  isUserSignedIn={isUserSignedIn}/>
                        {/* </Link> */}
                        {
                            isUserSignedIn ?
                            <Link to="/wishlist" className={[defaultClasses["header-right-icons"], defaultClasses["header-icon"], defaultClasses["pl-1"], " "].join(' ')}>
                                <i className={[defaultClasses[""], "icon-wishlist-2"].join(' ')}></i>
                            </Link> :
                            <Link to="/signin" className={[defaultClasses["header-right-icons"], defaultClasses["header-icon"], defaultClasses["pl-1"], " "].join(' ')}>
                                <i className={[defaultClasses[""], "icon-wishlist-2"].join(' ')}></i>
                            </Link>
    
                        }
                            <CartTrigger />
                    </div>
                    {/* <!-- End .header-right --> */}
                </div>    
            </div>
        </Fragment>
    )
}

export default DesktopHeader;