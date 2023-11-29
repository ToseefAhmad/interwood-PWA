import React, { useEffect, Fragment } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useCartPage } from '@magento/peregrine/lib/talons/CartPage/useCartPage';
import ReactGA from 'react-ga';

import { mergeClasses } from '../../classify';
import { Title } from '../Head';
import { fullPageLoadingIndicator } from '../LoadingIndicator';
import StockStatusMessage from '../StockStatusMessage';
import PriceAdjustments from './PriceAdjustments';
import ProductListing from './ProductListing';
import PriceSummary from './PriceSummary';
import defaultClasses from './cartPage.css';
import { GET_CART_DETAILS, GET_CROSS_SELL_PRODUCTS } from './cartPage.gql';
import { Link } from 'react-router-dom';
import CrossSellProducts  from './crossSellProducts';

/**
 * Structural page component for the shopping cart.
 * This is the main component used in the `/cart` route in Venia.
 * It uses child components to render the different pieces of the cart page.
 *
 * @see {@link https://venia.magento.com/cart}
 *
 * @param {Object} props
 * @param {Object} props.classes CSS className overrides for the component.
 * See [cartPage.css]{@link https://github.com/magento/pwa-studio/blob/develop/packages/venia-ui/lib/components/CartPage/cartPage.css}
 * for a list of classes you can override.
 *
 * @returns {React.Element}
 *
 * @example <caption>Importing into your project</caption>
 * import CartPage from "@magento/venia-ui/lib/components/CartPage";
 */
const CartPage = props => {
    const talonProps = useCartPage({
        queries: {
            getCartDetails: GET_CART_DETAILS,
            getCrossSellProducts : GET_CROSS_SELL_PRODUCTS
        }
    });

    // useEffect(() =>{
    //     ReactGA.initialize('UA-43977906-1');
    //     ReactGA.pageview(window.location.pathname + window.location.search);
    // })

    const {
        cartItems,
        hasItems,
        isCartUpdating,
        setIsCartUpdating,
        shouldShowLoadingIndicator,
        crossSellProducts
    } = talonProps;
    const { formatMessage } = useIntl();

    const classes = mergeClasses(defaultClasses, props.classes);

    if (shouldShowLoadingIndicator) {
        return fullPageLoadingIndicator;
    }

    const productListing = hasItems ? (
        <ProductListing setIsCartUpdating={setIsCartUpdating} />
    ) : (
        <h3>
            <FormattedMessage
                id={'cartPage.emptyCart'}
                defaultMessage={'There are no items in your cart.'}
            />
        </h3>
    );

    const priceAdjustments = hasItems ? (
        <PriceAdjustments setIsCartUpdating={setIsCartUpdating} />
    ) : null;
    const priceSummary = hasItems ? (
        <PriceSummary isUpdating={isCartUpdating} setIsCartUpdating={setIsCartUpdating}  />
    ) : null;

    return (
        <Fragment>
        <div className={classes.root}>
            <section className={[defaultClasses["cart-page"],  " "].join(' ')}>
                <header className={[defaultClasses["w-100"], defaultClasses["title-header"], defaultClasses["text-center"],  " "].join(' ')}>
                    <h2>
                        <span>Shopping</span> Cart
                    </h2>
                </header>
                <div className={[defaultClasses["row"],  " "].join(' ')}>
                    <div className={classes.stockStatusMessageContainer}>
                        <StockStatusMessage cartItems={cartItems} />
                    </div>
                    <div className={[defaultClasses["left-section"],  " "].join(' ')}>
                        <div className={[defaultClasses["cart-form"],  " "].join(' ')}>
                            {productListing}
                        </div>
                        <div className="bottom-buttons" className={[defaultClasses["bottom-buttons"],  " "].join(' ')}>
                            <div className="cont-shopping" className={[defaultClasses["cont-shopping"],  " "].join(' ')}>
                                <Link to='/'>Continue Shopping</Link>
                            </div>
                            {/* <div className="clear-cart" className={[defaultClasses["clear-cart"],  " "].join(' ')}>
                                <button>Clear Cart</button>
                            </div> */}
                        </div>
                        
                    </div>


                    {priceSummary}

                </div>

                <div className="cartpage-carousel">
                        {
                            crossSellProducts.length ? <CrossSellProducts items={crossSellProducts}/> : null
                        }
                </div>
                        
            </section>

            <Title>
                {formatMessage(
                    {
                        id: 'cartPage.title',
                        defaultMessage: 'Cart'
                    },
                    { name: STORE_NAME }
                )}
            </Title>
            <div className={classes.heading_container}>
                {/*<h1 className={classes.heading}>*/}
                {/*    <FormattedMessage*/}
                {/*        id={'cartPage.heading'}*/}
                {/*        defaultMessage={'Cart'}*/}
                {/*    />*/}
                {/*</h1>*/}

            </div>
            <div className={classes.body}>
                {/*<div className={classes.items_container}>{productListing}</div>*/}
                <div className={classes.price_adjustments_container}>
                    {/*{priceAdjustments}*/}
                </div>
                <div className={classes.summary_container}>
                    <div className={classes.summary_contents}>
                        {/*{priceSummary}*/}
                    </div>
                </div>
            </div>
            {
                isCartUpdating ? fullPageLoadingIndicator :null
            }
        </div>

        </Fragment>
    );
};

export default CartPage;
