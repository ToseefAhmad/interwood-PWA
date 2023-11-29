import React, { Suspense } from 'react';
import { shape, string } from 'prop-types';

import Logo from '../Logo';
import { Link, resourceUrl, Route } from '@magento/venia-drivers';

import HeaderTop from './headerTop'
import AccountTrigger from './accountTrigger';
import CartTrigger from './cartTrigger';
import NavTrigger from './navTrigger';
import SearchTrigger from './searchTrigger';
import OnlineIndicator from './onlineIndicator';
import DesktopHeader from './desktopHeader'
import MobileHeader from './mobileHeader';
import { useHeader } from '@magento/peregrine/lib/talons/Header/useHeader';

import { mergeClasses } from '../../classify';
import defaultClasses from './header.css';
import PageLoadingIndicator from '../PageLoadingIndicator';
import DesktopCategoryTree from '../DesktopCategoryTree/desktopCategoryTree';
import CmsBlock from '../CmsBlock';
// import StoreSwitcher from './storeSwitcher';
// import CurrencySwitcher from './currencySwitcher';

const SearchBar = React.lazy(() => import('../SearchBar'));

const Header = props => {
    const {
        handleSearchTriggerClick,
        hasBeenOffline,
        isOnline,
        isPageLoading,
        isSearchOpen,
        searchRef,
        searchTriggerRef,
        isUserSignedIn,
        urlPath
    } = useHeader();

    const classes = mergeClasses(defaultClasses, props.classes);
    const rootClass = isSearchOpen ? classes.open : classes.closed;
    const searchBarFallback = (
        <div className={classes.searchFallback} ref={searchRef}>
            <div className={classes.input}>
                <div className={classes.loader} />
            </div>
        </div>
    );
    const searchBar = true ? (
        <Suspense fallback={searchBarFallback}>
            <Route>
                <SearchBar isOpen={isSearchOpen} ref={searchRef} />
            </Route>
        </Suspense>
    ) : null;
    const pageLoadingIndicator = isPageLoading ? (
        <PageLoadingIndicator />
    ) : null;

    return (
        <React.Fragment>

            <CmsBlock identifiers={'header_top_notice'} />

            <HeaderTop />
            <div className="main-desktop-header">
            <header className={[defaultClasses["header"], " "].join(' ')}>
                <div className={[defaultClasses["header-middle"], " "].join(' ')}>
                    <div className={[defaultClasses[""], "container"].join(' ')}>
                        <DesktopHeader isSearchOpen={isSearchOpen} searchRef={searchRef} isUserSignedIn={isUserSignedIn} urlPath={urlPath}/>
                        <MobileHeader isSearchOpen={isSearchOpen} searchRef={searchRef} isUserSignedIn={isUserSignedIn} urlPath={urlPath}/>

                    </div>
                </div>
            </header>
            <DesktopCategoryTree />
            </div>
            {/* <header className={rootClass}>
                <div className={classes.toolbar}>
                    <div className={classes.primaryActions}>
                        <NavTrigger />
                    </div>
                    {pageLoadingIndicator}
                    <OnlineIndicator
                        hasBeenOffline={hasBeenOffline}
                        isOnline={isOnline}
                    />
                    <Link to={resourceUrl('/')}>
                        <Logo classes={{ logo: classes.logo }} />
                    </Link>
                    <div className={classes.secondaryActions}>
                        <SearchTrigger
                            onClick={handleSearchTriggerClick}
                            ref={searchTriggerRef}
                        />
                        <AccountTrigger />
                        <CartTrigger />
                    </div>
                </div>
                {searchBar}
            </header> */}
        </React.Fragment>
    );
};

Header.propTypes = {
    classes: shape({
        closed: string,
        logo: string,
        open: string,
        primaryActions: string,
        secondaryActions: string,
        toolbar: string,
        switchers: string,
        switchersContainer: string
    })
};

export default Header;
