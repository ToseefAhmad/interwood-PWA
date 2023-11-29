import React, {Fragment, useEffect, useState} from "react";

import {fullPageLoadingIndicator} from "../LoadingIndicator";

import {useBanks} from "@magento/peregrine/lib/talons/EMI/useBanks";
import EmiDetails from "./emiDetails";

const EMI = (props) => {


    const {product_id}=props;
    const [fetchError, setError] = useState("");
    const [dataLoading, setDataLoading] = useState(false);
    const [bank, setBank] = useState([]);

    const [bank_id, setBankId] = useState();

    const handleBankId = (e) => {
        setBankId(e.target.value)
    }

    const talonProps = useBanks();
    const {data, error, loading} = talonProps;

    useEffect(() => {
        if (loading) {
            setDataLoading(true);
        } else if (error) {
            setError(error.message);
        } else if (data) {
            setError("");
            setDataLoading(false);
            setBank(data.getBankName)
        }
    }, [data, error, loading])

    let content = null;
    if (dataLoading) {
        content = fullPageLoadingIndicator;
    } else if (fetchError) {
        content = <div><h1> Data Fetching Error: {fetchError}</h1></div>
    } else if (bank && bank.length > 0) {
        content = <div className="emi-form-group">
            <h2 className="form-title">Select a Bank</h2>
            <select className="form-field has-dropdown-icon" id="installmentMonths"
                    required={true} data-validate="{required:true}"
                    onChange={handleBankId}
            >
                <option value="" hidden="hidden" selected="selected"
                        disabled="disabled">Please Select One
                </option>
                {bank.map((e, key) => {
                    return <option key={key} value={e.bank_id}>{e.bank_name}</option>;
                })}
            </select>
        </div>;
    }

    return (
        <Fragment>
            <div className="emi-content">
                {content}
            </div>
            {bank_id?<EmiDetails bank_id={Number(bank_id)} product_id={product_id}/>:null}
        </Fragment>
    )
}

export default EMI;
