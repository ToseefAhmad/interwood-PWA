import React from "react";
import Price from "../Price";

const EmiTable = (props) => {

    const {data} = props;
    const {emi_tenure, bank_interest_rate, total_money, total_markup, monthly_installment} = data;
    return (
        <tr>
            <td>{emi_tenure} Months</td>
            <td>{bank_interest_rate}%</td>
            <td>
                {
                    total_markup != '--' ? 
                    <Price value={total_markup} currencyCode={'PKR'}/> : 
                    total_markup
                }
            </td>
            <td>
                {
                    monthly_installment != '--' ? 
                    <Price value={monthly_installment} currencyCode={'PKR'}/> : monthly_installment
                }
            </td>
            <td>
                {
                    total_money != '--' ? 
                    <Price value={total_money} currencyCode={'PKR'}/> : total_money
                }
            </td>
        </tr>
    );

}
export default EmiTable;
