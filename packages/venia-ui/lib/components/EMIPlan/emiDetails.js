import React, {useEffect, useState, Fragment} from "react";

import {fullPageLoadingIndicator} from "../LoadingIndicator";

import {useEmiPlan} from "@magento/peregrine/lib/talons/EMIPlan/useEmiPlan";
import EmiTotal from './emiTotal';
const EmiDetails = (props) => {

    const {bank_id,total,setBankId,tenure,setTenure,installmentAmount,setInstallmentAmount} = props;
    const [fetchError, setError] = useState("");
    const [dataLoading, setDataLoading] = useState(false);
    const [details, setDetails] = useState([]);
   // const [tenure,setTenure]=useState();

    const handleTenure = (e) => {
        setTenure(e.target.value)
    }

    const talonProps = useEmiPlan({
        bank_id: bank_id
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
            setDetails(data.getEMIPlan);
        }
    }, [data, error, loading])

    let content = null;
    if (dataLoading) {
        content = fullPageLoadingIndicator;
    } else if (fetchError) {
        content = <div><h1> Data Fetching Error: {fetchError}</h1></div>
    } else if (details && details.length > 0) {
        content = <div className="emi-form-group">
            <h2 className="form-title">Select Tenure</h2>
            <select className="form-field has-dropdown-icon" id="installmentMonths"
                    required={true} data-validate="{required:true}"
                    onChange={handleTenure}
                    defaultValue={tenure}
            >
                <option value="" hidden="hidden" selected="selected"
                        disabled="disabled">Please Select One
                </option>
                {details.map((e, key) => {
                    return <option key={key} value={e.emi_tenure}>{e.emi_tenure}</option>;
                })}
            </select>
        </div>;
    }

    return (
        <Fragment>
            {content}
            {tenure?<EmiTotal
                tenure={Number(tenure)}
                bank_id={bank_id}
                total={total}
                installmentAmount={installmentAmount}
                setInstallmentAmount={setInstallmentAmount}
            />:null}
        </Fragment>
    )

}
export default EmiDetails;
