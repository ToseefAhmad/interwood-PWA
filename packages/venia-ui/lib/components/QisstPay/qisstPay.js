import React from 'react';

import { useHistory } from 'react-router';
import * as QueryString from "query-string";
import { fullPageLoadingIndicator } from '../LoadingIndicator';

const QisstPay =  () => {

    const history = useHistory();
    const search =  history.location.search;
    const params = QueryString.parse(search);

    window.location.href = "http://staging.interwood.pk/qisstpay/qisstpay/index/orderid/"+params.orderId;

    return ( fullPageLoadingIndicator )
};

export default QisstPay;
