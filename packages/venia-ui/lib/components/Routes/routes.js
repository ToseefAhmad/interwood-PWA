import React, { Suspense, useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

import { fullPageLoadingIndicator } from '../LoadingIndicator';
// import HomePage from '../HomePage';
import HomePageLatest from "../HomePageLatest/HomePage"
import MagentoRoute from '../MagentoRoute';
import { useScrollTopOnChange } from '@magento/peregrine/lib/hooks/useScrollTopOnChange';
import ReactGA from 'react-ga';
import ReactPixel from 'react-facebook-pixel';

// export const history = createBrowserHistory();
// history.listen( loca => {
//     ReactGA.pageview(window.location.pathname + window.location.search)
// })

const Routes = () => {
    const { pathname } = useLocation();
    useScrollTopOnChange(pathname);
    ReactGA.pageview(window.location.pathname + window.location.search);
    ReactPixel.pageView();
    // ReactGA.modalview(window.location.pathname )

    return (
        <Suspense fallback={fullPageLoadingIndicator}>
            <Switch>
                {/*
                 * Client-side routes are injected by BabelRouteInjectionPlugin here.
                 * Venia's are defined in packages/venia-ui/lib/targets/venia-ui-intercept.js
                 */}
                <Route>
                    <MagentoRoute />
                    {/*
                     * The Route below is purposefully nested with the MagentoRoute above.
                     * MagentoRoute renders the CMS page, and HomePage adds a stylesheet.
                     * HomePage would be obsolete if the CMS could deliver a stylesheet.
                     */}
                    <Route exact path="/">
                        <HomePageLatest />
                    </Route>
                </Route>
            </Switch>
        </Suspense>
    );
};

export default Routes;
