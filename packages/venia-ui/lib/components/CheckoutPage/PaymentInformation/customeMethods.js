import React, { useState } from 'react';
import classify from '../../../classify';
import defaultClasses from './customPaymentMethods.css';
import EMIPlan from "../../EMIPlan";
import Popup from "reactjs-popup";
import Price from "../../Price";
import QisstPayLogo from "../../../assets/img/qistpay.png";
const CustomMethods = (props) =>{
    const {
        onSuccess,
        onError,
        setTenure,
        setBankId,
        bank_id,
        tenure,
        total,
        paymentMethodDesc,
        setPaymentMethodDesc
    } = props;

    const [popupTriger,  setPopupTriger ] = useState(false);
    const [installmentAmount, setInstallmentAmount] = useState(null);
    const [bankName,setBankName]=useState();

    const handleInstallmentPlane = ()=>{
        onSuccess('hbl_pay')
        setPopupTriger(true);
        setPaymentMethodDesc('installmentPlan');
    }

    const setMethod = (value) =>{
        setPaymentMethodDesc(value);
        onSuccess(value)
    }
    const setPayment = () =>{
        bank_id && tenure ? onSuccess('hbl_pay'): <h2>"select bank and tenure"</h2>
    }

    return(
        <div>
            <div className="custom-payment-method">
                <label>
                    <input type='radio' name='paymentMethod' onClick={() => {
                        setMethod('hbl_pay')
                        setBankId(null)
                        setTenure(null)
                    }}/> Credit or Debit Card
                </label>
            </div>
            {/*<div className="custom-payment-method">*/}
            {/*    <label>*/}
            {/*        <span className="custom-checkbox-holder">*/}
            {/*            <input type='radio' name='paymentMethod' onClick={() =>{*/}
            {/*                setMethod('customcod')*/}
            {/*                setTenure(null)*/}
            {/*                setBankId(null)}}*/}
            {/*            />*/}
            {/*        </span>*/}
            {/*        <span className="d-block label-qistpay">QisstPay</span> <span className={defaultClasses['qp-size']}>Pay in 04 interest free monthly installments</span>*/}
            {/*        <div className="installment-plan-methods">*/}
            {/*            <img className="checkout-method-qistpay" src={QisstPayLogo}/>*/}
            {/*        </div>*/}
            {/*    </label>*/}

            {/*    {*/}
            {/*        paymentMethodDesc === 'customcod' ?*/}
            {/*            <div className="pl-20">*/}
            {/*              <br/>*/}
            {/*             <p>*/}
            {/*              <span className={[defaultClasses['qp-size'],"detail-item"].join(" ")}>*/}
            {/*                  <strong className="color-theme-prim"> Pay in 4 installments | <Price currencyCode={'PKR'} value={(total/4).toFixed()}/></strong>*/}
            {/*               <br/>*/}
            {/*                 All debit and credit cards*/}
            {/*                  <br/>*/}
            {/*                 Upto PKR 50,000*/}
            {/*              </span>*/}
            {/*             </p>*/}
            {/*                <p>*/}
            {/*                    <span className={[defaultClasses['qp-size'],"detail-item"].join(" ")}>*/}
            {/*                        <strong className="color-theme-prim"> Pay in 6 installments | <Price currencyCode={'PKR'} value={(total/6).toFixed()}/></strong>*/}
            {/*                   <br/>*/}
            {/*                   Only credit cards*/}
            {/*                        <br/>*/}
            {/*                   From PKR 5,000 to PKR 500,000*/}
            {/*                    </span>*/}
            {/*                </p>*/}
            {/*                    <Popup*/}
            {/*                        repositionOnResize={true}*/}
            {/*                        lockScroll={true}*/}
            {/*                        offsetX={900}*/}
            {/*                        offsetY={460}*/}
            {/*                        position={"center center"}*/}
            {/*                        trigger={*/}
            {/*                            <button className="btn-term-conditions" type={"button"}>Terms & Conditions</button>*/}
            {/*                        }*/}
            {/*                        modal*/}
            {/*                        nested>{*/}
            {/*                        close => (*/}
            {/*                            <div className="modal-content-custom">*/}
            {/*                                <div className="modal-header">*/}
            {/*                                    <h3>Terms & Conditions</h3>*/}
            {/*                                </div>*/}
            {/*                                <div className="modal-body">*/}
            {/*                                    General*/}
            {/*                                </div>*/}
            {/*                                <div className="modal-footer">*/}
            {/*                                   <button className="modal-btn-primary" onClick={close}>Ok</button>*/}
            {/*                                </div>*/}
            {/*                            </div>*/}
            {/*                        )*/}
            {/*                    }*/}
            {/*                    </Popup>*/}
            {/*            </div> : null*/}
            {/*    }*/}

            {/*</div>*/}
            <div className="custom-payment-method">
                <label>
                    <input type='radio' name='paymentMethod' onClick={() => {
                        setMethod('banktransfer')
                        setTenure(null)
                        setBankId(null)
                    }}/> Bank Transfer
                </label>
                {
                    paymentMethodDesc === 'banktransfer' ?
                        <div className="custom-payment-method mt-1 pl-20">
                            {/* <span className="d-block mb-10 w-500">Instructions:</span> */}
                            <p>
                                Please have your order amount deposited in any of our mentioned bank accounts.
                                Email us your deposit slip or payment transfer screen shot at <a href="mailto:esales@interwoodmobel.com">esales@interwoodmobel.com </a>
                                for payment verification
                            </p>

                            <span className="detail-item w-500 bank-branch-title">Standard Chartered - SCB</span>
                            <span className="detail-item"><strong>Branch :</strong> Tufail Road Branch, Lahore</span>
                            <span className="detail-item"><strong>Account Title :</strong> Interwood Mobel Pvt Ltd</span>
                            <span className="detail-item"><strong>Account Number :</strong> 01-0716933-02</span>

                            <div className="w-500 mb-10 text-center">OR</div>

                            <span className="detail-item w-500 bank-branch-title">Allied Bank - ABL</span>
                            <span className="detail-item"><strong>Branch :</strong> CORP Main Boulevard</span>
                            <span className="detail-item"><strong>Account Title :</strong> Interwood Mobel Pvt Ltd</span>
                            <span className="detail-item"><strong>Account Number :</strong> 001-00000234100-30</span>
                            {/* <span className="detail-item">
                            <p>
                                Delivery in Sialkot, Faisalabad, Multan, Hyderabad, Wah Cantt,
                                Rahim Yar Khan, Larkana, Quetta, Abbottabad, Sargodha and Sahiwal is only valid for
                                decor items.
                            </p>
                        </span> */}

                        </div> : null
                }
            </div>
            <div className="custom-payment-method">
                <label>
                    <Popup
                        repositionOnResize={true}
                        lockScroll={true}
                        offsetX={900}
                        offsetY={460}
                        position={"center center"}
                        trigger={
                            <input type='radio' name='paymentMethod'
                                   // onClick={() => {
                                // onSuccess('hbl_pay')
                        //    }}
                    />
                           }
                        modal
                        nested>{
                        close => (
                            <div className="modal-content-custom">
                                <div className="modal-header">
                                    <h3>Installment Details</h3>
                                </div>
                                <div className="modal-body">
                                        <EMIPlan  bank_id={bank_id}
                                                  tenure={tenure}
                                                  setBankId={setBankId}
                                                  setTenure={setTenure}
                                                  installmentAmount={installmentAmount}
                                                  setInstallmentAmount={setInstallmentAmount}
                                                  bankName={bankName}
                                                  setBankName={setBankName}
                                        />

                                </div>
                                <div className="modal-footer">
                                { bank_id && tenure ? <button  className="modal-btn-primary"
                                                               onClick={() => {
                                                                  setPayment()
                                                                   close()
                                                               }}
                                >Ok</button>:<span className={defaultClasses['installment-msg']}>Select bank and tenure to continue</span>}
                                </div>
                            </div>
                        )
                    }
                    </Popup>
                   Installment Plan
                </label>
                <div className="installment-main-brands">
                    <img className="checkout-method-sprite" src={require("../../../assets/img/methods-sprite-new.png")} />
                </div>

                {installmentAmount && tenure && bank_id ?
                    <div className="summary">
                           Installment details
                          <tr>
                              Bank: {bankName}
                          </tr>
                          <tr>
                             Plan:  {tenure} Months
                          </tr>
                         <tr>
                             Installment Amount per month : <Price currencyCode={'PKR'} value={installmentAmount}/>
                          </tr>
                </div>:null}
            </div>
            <div className="custom-payment-method">
                <label>
                    <input type='radio' name='paymentMethod' onClick={() =>{
                        setMethod('cashondelivery')
                        setTenure(null)
                        setBankId(null)}}
                        />
                    Cash On Delivery
                </label>
                {
                    paymentMethodDesc === 'cashondelivery' ?
                        <div className="payment-method-details has-text mt-1">
                            {/* <span className="d-block mb-10 w-500">Instructions:</span>  */}
                            Valid For Decor Items Only up to <span className="w-500 text-color-primary">PKR 25,000</span>
                        </div> : null
                }
            </div>



            {/* <div className="custom-payment-method">

                    <Popup
                            repositionOnResize={true}
                            lockScroll={true}
                            offsetX={900}
                            offsetY={460}
                            position={"center center"}
                            // overlayStyle={overlayStyle}
                            // contentStyle={contentStyle}
                            trigger={
                                    <div className="custom-payment-method">
                                        <input type='radio' name='paymentMethod' onClick={() => onSuccess('hbl_pay')}/> Installment Plan
                                        {
                                            paymentMethodDesc === "installmentPlan" ?
                                            <div>
                                                <span>
                                                    0% Markup Installment is available with Credit Cards of 1. Silk Bank 2. Bank Alfalah 3. UBL 4. Faisal Bank - Customer needs to make a transaction and call their respected bank's customer support to avail this facility. (Bank's service charges may apply) | Delivery in Sialkot, Faisalabad, Multan, Hyderabad, Wah Cantt, Rahim Yar Khan, Larkana, Quetta, Abbottabad, Sargodha and Sahiwal is only valid for decor items.
                                                </span>
                                            </div> : null
                                        }
                                    </div>
                                    }
                                    modal
                                    nested>{
                                    close => (
                                        <div className="modal-content-custom">
                                            <div className="modal-header">
                                                <h3>Installment Details</h3>
                                                <div className="modal-btn-close" onClick={close}>
                                                    <img src={require("../../../assets/img/close.svg")} alt="Close" />
                                                </div>
                                            </div>
                                            <div className="modal-body">
                                            <EMI product_id='1222'/>
                                            </div>
                                            <div className="modal-footer">
                                                <button className="modal-btn-primary" onClick={close}>OK</button>
                                            </div>
                                        </div>
                                    )
                                }
                    </Popup>
            </div> */}
        </div>
    )
}

export default classify(defaultClasses)(CustomMethods);
