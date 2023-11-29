import React from 'react';
import {useHistory} from 'react-router';
import {bool, shape, string} from 'prop-types';
import {useScrollLock} from '@magento/peregrine';

import {mergeClasses} from '../../classify';
import Footer from '../Footer';
import Header from '../Header';
import CheckoutHeader from '../CheckoutHeader';
import defaultClasses from './main.css';
import CompareListBlock from '../CompareList/compareListBlock';


const Main = props => {

    const {children, isMasked} = props;
    const history = useHistory();
    const urlPath = history.location.pathname;
    const classes = mergeClasses(defaultClasses, props.classes);

    const rootClass = isMasked ? classes.root_masked : classes.root;
    const pageClass = isMasked ? classes.page_masked : classes.page;

    useScrollLock(isMasked);
    return (
        <>
            <main className={[rootClass, urlPath == "/promotional-page" ? " cms-promotional" : ""]}>
                {
                    urlPath !== '/checkout' ?
                        <Header/> :
                        <CheckoutHeader/>
                }
                <div className={pageClass}>{children}</div>
                <Footer/>
            </main>
            <CompareListBlock/>
        </>
    );
};

export default Main;

Main.propTypes = {
    classes: shape({
        page: string,
        page_masked: string,
        root: string,
        root_masked: string
    }),
    isMasked: bool
};
