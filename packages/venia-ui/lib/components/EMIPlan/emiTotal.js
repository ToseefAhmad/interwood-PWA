import React ,{useEffect,useState} from "react";
import {useGetTotalAmount} from "@magento/peregrine/lib/talons/EMIPlan/useGetTotalAmount";
import {fullPageLoadingIndicator} from "../LoadingIndicator";
import Price from "../Price";

const EmiTotal = (props) => {

    const {total , tenure , bank_id,setInstallmentAmount,installmentAmount} = props;

    const [fetchError, setError] = useState("");
    const [dataLoading, setDataLoading] = useState(false);

    const getTotal=useGetTotalAmount({
        total:total,
        bank_id:bank_id,
        tenure:tenure
    });
    const {data, error, loading} = getTotal;

    useEffect(() => {
        if (loading) {
            setDataLoading(true);
        } else if (error) {
            setError(error.message);
        } else if (data && data.getTotalAmount) {
            setError("");
            setDataLoading(false);
            setInstallmentAmount(data.getTotalAmount);
        }
    }, [data, error, loading])

    let content = null;
    if (dataLoading) {
        content = fullPageLoadingIndicator;
    } else if (fetchError) {
        content = <div><h1> Data Fetching Error: {fetchError}</h1></div>
    } else if (installmentAmount) {
        content =
            <div>
                <div> <h1> Installment Amount per Month</h1></div>
                <div><Price currencyCode={'PKR'} value={installmentAmount}/></div>
            </div>;
    }

    return(
        <div>
            {content}
        </div>
    )
}
export default EmiTotal;
