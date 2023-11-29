import React, {useEffect, useState, Fragment} from "react";

import {useEmi} from "@magento/peregrine/lib/talons/EMI/useEmi";
import {fullPageLoadingIndicator} from "../LoadingIndicator";
import EmiTable from "./emiTable";
import ReactHtmlParser from 'react-html-parser';
const EmiDetails = (props) => {

    const {bank_id, product_id} = props;
    const [fetchError, setError] = useState("");
    const [dataLoading, setDataLoading] = useState(false);
    const [details, setDetails] = useState([]);
    const [emiContent, setEmiContent] = useState();

    const talonProps = useEmi({
        bank_id: bank_id,
        product_id: product_id
    });

    const {data, error, loading} = talonProps;

    useEffect(() => {
        if (loading) {
            setDataLoading(true);
        } else if (error) {
            setError(error.message);
        } else if (data) {
            setError("");
            setDataLoading(false);
            setDetails(data.getEMIDetails.plan);
            setEmiContent(data.getEMIDetails.content);
        }
    }, [data, error, loading])

    let content = null;
    if (dataLoading) {
        content = fullPageLoadingIndicator;
    } else if (fetchError) {
        content = <div><h1> Data Fetching Error: {fetchError}</h1></div>
    } else if (details && details.length > 0) {
        content = <div className="table-responsive">
            <table className="emi-table">
                <thead>
                    <tr>
                        <th>Tenure</th>
                        <th>Interest Rate Per Month</th>
                        <th>Total Mark-Up Amount</th>
                        <th>Monthly Installment</th>
                        <th>Total Amount</th>
                    </tr>
                </thead>
                <tbody>
                {details.map((data, idx) => {
                    return <EmiTable key={idx} data={data}/>
                })}
                </tbody>
            </table>
        </div>;
    }

    const contentSpan=ReactHtmlParser(emiContent);
    return (
        <Fragment>
            {content}
            {contentSpan}
        </Fragment>
    )

}
export default EmiDetails;
