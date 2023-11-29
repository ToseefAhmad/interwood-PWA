import React from 'react';

import { useHistory } from 'react-router';
import * as QueryString from "query-string";
import { useUserContext } from '@magento/peregrine/lib/context/user'
import { fullPageLoadingIndicator } from '../LoadingIndicator';
 
const PaymentRedirection =  () => {

    const history = useHistory();
    const search =  history.location.search;
    const params = QueryString.parse(search);

    window.location.href = "https://interwood.pk/customcheckout/custompayment/index/orderid/"+params.orderId;

    return ( fullPageLoadingIndicator )
};

export default PaymentRedirection;