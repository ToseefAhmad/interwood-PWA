import React, {Fragment, useEffect, useState} from "react";

import {fullPageLoadingIndicator} from "../LoadingIndicator";

import {useBanks} from "@magento/peregrine/lib/talons/EMIPlan/useBanks";
import EmiDetails from "./emiDetails";
import {gql} from "@apollo/client";
import {PriceSummaryFragment} from "../CartPage/PriceSummary/priceSummaryFragments";
import {usePriceSummary} from "@magento/peregrine/lib/talons/CartPage/PriceSummary/usePriceSummary";


const GET_PRICE_SUMMARY = gql`
    query getPriceSummary($cartId: String!) {
        cart(cart_id: $cartId) {
            id
            ...PriceSummaryFragment
        }
    }
    ${PriceSummaryFragment}
`;

const EMIPlan = (props) => {

    const {
        bank_id,
        setBankId,
        tenure,
        setTenure,
        installmentAmount,
        setInstallmentAmount,
        setBankName,
        bankName
    }=props;
    const [fetchError, setError] = useState("");
    const [dataLoading, setDataLoading] = useState(false);
    const [bank, setBank] = useState([]);

    // const [bank_id, setBankId] = useState();

    const totalProps = usePriceSummary({
        queries: {
            getPriceSummary: GET_PRICE_SUMMARY
        }
    });
    const {
        flatData
    } = totalProps;
    const { total } = flatData;
    const handleBankId = (e) => {
        let index=e.nativeEvent.target.selectedIndex;
        let name=e.nativeEvent.target[index].text;
        setBankId(e.target.value)
        setBankName(name)
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
                    defaultValue={bank_id}
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
            {
                bank_id?<EmiDetails
                setBankId={setBankId}
                bank_id={Number(bank_id)}
                total={total.value}
                tenure={tenure}
                setTenure={setTenure}
                installmentAmount={installmentAmount}
                setInstallmentAmount={setInstallmentAmount}
            />:null
            }
        </Fragment>
    )
}

export default EMIPlan;
