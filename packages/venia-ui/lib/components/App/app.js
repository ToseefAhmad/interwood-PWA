import React, { useCallback, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { array, func, shape, string } from 'prop-types';
import ReactGA from 'react-ga';
import ReactGA4 from "react-ga4";
import ReactPixel from 'react-facebook-pixel';

import { useToasts } from '@magento/peregrine';
import { useApp } from '@magento/peregrine/lib/talons/App/useApp';

import globalCSS from '../../index.css';
import { HeadProvider, Title } from '../Head';
import Main from '../Main';
import Mask from '../Mask';
import Navigation from '../Navigation';
import Routes from '../Routes';
import ToastContainer from '../ToastContainer';
import Icon from '../Icon';
import SalesModal from '../SalesModal';


import {
    AlertCircle as AlertCircleIcon,
    CloudOff as CloudOffIcon,
    Wifi as WifiIcon
} from 'react-feather';
import Version from "../Version";
import {useGA} from "@magento/peregrine/lib/talons/GA/useGA";

const OnlineIcon = <Icon src={WifiIcon} attrs={{ width: 18 }} />;
const OfflineIcon = <Icon src={CloudOffIcon} attrs={{ width: 18 }} />;
const ErrorIcon = <Icon src={AlertCircleIcon} attrs={{ width: 18 }} />;


ReactPixel.init('449736908992647');
ReactPixel.init('1924641961064075');

// ReactGA.initialize('UA-43977906-1'), {
//     siteSpeedSampleRate: 100
// };
const App = props => {
    const { markErrorHandled, renderError, unhandledErrors } = props;
    const { formatMessage } = useIntl();

    const [, { addToast }] = useToasts();

    const ERROR_MESSAGE = formatMessage({
        id: 'app.errorUnexpected',
        defaultMessage: 'Sorry! An unexpected error occurred.'
    });

    const GA_UI=useGA();
    const {data}=GA_UI;

    if(data && data.getGaUi)
    {
        ReactGA.initialize(data.getGaUi), {
            siteSpeedSampleRate: 100
        };
   }
    useEffect(() => {
        const GA4_ID = 'G-M8LM19C6EQ';
        ReactGA4.initialize(GA4_ID);
        ReactGA.plugin.require('ecommerce');
        ReactGA.plugin.require('ec');
        ReactGA4.send("pageview");
        // ReactGA.pageview(window.location.pathname + window.location.search);
    }, []);

    const handleIsOffline = useCallback(() => {
        addToast({
            type: 'error',
            icon: OfflineIcon,
            message: formatMessage({
                id: 'app.errorOffline',
                defaultMessage:
                    'You are offline. Some features may be unavailable.'
            }),
            timeout: 3000
        });
    }, [addToast, formatMessage]);

    const handleIsOnline = useCallback(() => {
        addToast({
            type: 'info',
            icon: OnlineIcon,
            message: formatMessage({
                id: 'app.infoOnline',
                defaultMessage: 'You are online.'
            }),
            timeout: 3000
        });
    }, [addToast, formatMessage]);

    const handleError = useCallback(
        (error, id, loc, handleDismissError) => {
            const errorToastProps = {
                icon: ErrorIcon,
                message: `${ERROR_MESSAGE}\nDebug: ${id} ${loc}`,
                onDismiss: remove => {
                    handleDismissError();
                    remove();
                },
                timeout: 15000,
                type: 'error'
            };

            addToast(errorToastProps);
        },
        [ERROR_MESSAGE, addToast]
    );

    const talonProps = useApp({
        handleError,
        handleIsOffline,
        handleIsOnline,
        markErrorHandled,
        renderError,
        unhandledErrors
    });

    const { hasOverlay, handleCloseDrawer } = talonProps;

    // const tagManagerArgs = {
    //     gtmId: 'GTM-P4ZNB6C',
    //     events: {
    //         sendUserInfo: 'userInfo',
    //         category : 'test'
    //     },
    //     dataLayer: {
    //         userId: '001',
    //         userProject: 'project'
    //     }
    // };

    // TagManager.initialize(tagManagerArgs)

    if (renderError) {
        return (
            <HeadProvider>
                <Title>
                    {formatMessage(
                        { id: 'app.titleHome', defaultMessage: 'Home Page' },
                        { name: STORE_NAME }
                    )}
                </Title>

                <Main isMasked={true} />
                <Mask isActive={true} />
                <ToastContainer />
            </HeadProvider>
        );
    }


    return (
        <HeadProvider>
            <Title>
                {formatMessage(
                    { id: 'app.titleHome', defaultMessage: 'Home Page' },
                    { name: STORE_NAME }
                )}
            </Title>
            <Version />
            <SalesModal />
            <Main isMasked={hasOverlay}>
                <Routes />
            </Main>
            <Mask isActive={hasOverlay} dismiss={handleCloseDrawer} />
            <Navigation />
            <ToastContainer />
        </HeadProvider>
    );
};

App.propTypes = {
    markErrorHandled: func.isRequired,
    renderError: shape({
        stack: string
    }),
    unhandledErrors: array
};

App.globalCSS = globalCSS;

export default App;
