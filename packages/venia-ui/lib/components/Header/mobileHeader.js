import React, { useCallback} from 'react';
import { useAppContext } from '@magento/peregrine/lib/context/app';

import CartTrigger from './cartTrigger';
import { mergeClasses } from '../../classify';
import defaultClasses from './header.css';
import AccountTrigger from './accountTrigger';
import SearchBar from '../SearchBar';
import { Link } from '@magento/venia-drivers';

const MobileHeader = (props) => {
    const { isSearchOpen, searchRef, isUserSignedIn} = props;
    const [, { toggleDrawer }] = useAppContext();
    const handleOpenNavigation = useCallback(() => {
        toggleDrawer('nav');
    }, [toggleDrawer]);

    const classes = mergeClasses(defaultClasses, props.classes);
    return(
        <div className={[defaultClasses["mobile-header"], " "].join(' ')}>
            <div className={[defaultClasses["header-left"], ""].join(' ')}>
                <button className={[defaultClasses["mobile-menu-toggler"], " "].join(' ')} type="button">
                    <i className={[defaultClasses[""], "icon-menu"].join(' ')} onClick={handleOpenNavigation}></i>
                </button>
                <div className={[defaultClasses["contact-info"], " "].join(' ')}>
                    <a href="tel:021111203203"><i className={[defaultClasses[" "], "icon-phone"].join(' ')}></i></a>
                </div>
            </div>
            <div className={[defaultClasses["header-center"], " "].join(' ')}>
                <Link className={[defaultClasses["logo"], " "].join(' ')} to="/">
                    <img alt="Interwood" src={require("../../assets/img/logo.png")} />
                </Link>
            </div>
            <div className={[defaultClasses["header-right"], " "].join(' ')}>
                <div className={[defaultClasses["header-action-icon"], " "].join(' ')}>
                    {/* <a className={[defaultClasses["header-right-icons"], defaultClasses["header-icon"], defaultClasses["login-link"], defaultClasses["pl-1"], " "].join(' ')} href="login.html">
                        <i className={[defaultClasses[""], "icon-user-2"].join(' ')}></i>
                    </a> */}
                    <AccountTrigger  isUserSignedIn={isUserSignedIn}/>
                    <CartTrigger />

                </div>
                {/* <!-- End .header-right --> */}
            </div>
            <div className={[defaultClasses["header-bottom"], " "].join(' ')}>
                {/* <!-- Search --> */}
                <div className={[defaultClasses["header-icon"], defaultClasses["header-search"], defaultClasses["header-search-inline"], defaultClasses["header-search-category"], " "].join(' ')}>
                    <SearchBar isOpen={isSearchOpen} ref={searchRef} isCompare={false}/>
                </div>
                {/* <!-- End Search --> */}
            </div>
        </div>
    )
}

export default MobileHeader;
