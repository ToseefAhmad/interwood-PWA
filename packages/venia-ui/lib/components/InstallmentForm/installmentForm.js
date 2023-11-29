import React, {Fragment, useState, useEffect} from "react";
import {useInstallmentForm} from '@magento/peregrine/lib/talons/InstallmentForm/useInstallmentForm';

import {Title} from "../Head";
import defaultClasses from './installmentForm.css';
import{ fullPageLoadingIndicator } from "../LoadingIndicator";

const InstallmentForm = () => {

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [contact, setContact] = useState();
    const [city, setCity] = useState();
    const [card_type, setCardType] = useState();
    const [category, setCategory] = useState();
    const [bank, setBank] = useState();
    const [installment_months, setInstallmentMonths] = useState();
    const [fetchError, setError] = useState("");
    const [dataLoading, setDataLoading] = useState(false);
    const [installmentList, setInstallmentList] = useState([]);
    const [bankList, setBankList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [cardsList, setCardsList] = useState([]);
    const [successPage, setSuccessPage] = useState(false);


    // submit installment form
    const talonProps = useInstallmentForm({
        name: name,
        email: email,
        contact: contact,
        city: city,
        bank: bank,
        category: category,
        card_type: card_type,
        installment_months: installment_months
    });

    // get call back function to submit form
    const {
        handleSubmit,
        data,
        installmentData,
        installmentError,
        bankData,
        bankError,
        categoryData,
        categoryError,
        cardData,
        cardError
    } = talonProps;


    useEffect(() => {
        if(data && data.loading){
            setDataLoading(data.loading);
        } else if ( data && data.error) {
            setError(data.error.message);
            setDataLoading(false);
        } else if (data && data.data) {
            setError("");
            setDataLoading(false);
            if(data.data.submitInstallmentForm.status===true)
            {
                setSuccessPage(true);
            }
            window.scrollTo({
                left: 0,
                top: 0,
                behavior: 'smooth'
            });
        }

        if (cardData) {
            setCardsList(cardData.getCardType);
        } else if (cardError) {
            setError(cardError);
        }

        if (bankData) {
            setBankList(bankData.getBank);
        } else if (bankError) {
            setError(bankError);
        }

        if (categoryData) {
            setCategoryList(categoryData.getCategory);
        } else if (categoryError) {
            setError(categoryError);
        }


        if (installmentData) {
            setInstallmentList(installmentData.getInstallmentMonths);
        } else if (installmentError) {
            setError(installmentError);
        }

    }, [data, cardData, cardError, bankData, bankError, categoryData, categoryError, installmentData, installmentError])



    //on change handlers
    const handleName = (e) => {
        setName(e.target.value);
    }
    const handleEmail = (e) => {
        setEmail(e.target.value);
    }
    const handleBank = (e) => {
        setBank(e.target.value);
    }
    const handleCity = (e) => {
        setCity(e.target.value);
    }
    const handleCategory = (e) => {
        setCategory(e.target.value);
    }
    const handleContact = (e) => {
        setContact(e.target.value);
    }
    const handleInstallmentMonths = (e) => {
        setInstallmentMonths(e.target.value);
    }
    const handleCards = (e) => {
        setCardType(e.target.value);
    }

    // on form submit
    const handleSubmitForm = (e) => {
        e.preventDefault();
        handleSubmit();
    }

    // page structure

    let content;
    if (successPage === false) {
        content = <div className={defaultClasses['sec-installment']}>
            <div className={defaultClasses['form-holder']}>
                <form className={defaultClasses['wrp-formInfo']} onSubmit={handleSubmitForm}>
                    <h2 className={defaultClasses['form-head']}><span className={defaultClasses['sep-head']}>
                            Interwood</span> Information Form For Installment Plan</h2>
                    <div className={defaultClasses['inst-info']}>
                        <strong className={defaultClasses['text-head']}>Send us a Message Personal Info</strong>
                        <div className={defaultClasses['wrp-field']}>
                            <div className={defaultClasses['wrap-split']}>
                                <div className={defaultClasses['split-form']}>
                                    <label className={defaultClasses['int-label']} htmlFor="Name">Name <sup
                                        className={defaultClasses['rq-label']}></sup></label>
                                    <input id="Name" type="text" className={defaultClasses['int-text']} placeholder=""
                                           required={true} data-validate="{required:true}" onChange={handleName}
                                    />
                                </div>
                                <div className={defaultClasses['split-form']}>
                                    <label className={defaultClasses['int-label']} htmlFor="Email">Email <sup
                                        className={defaultClasses['rq-label']}></sup></label>
                                    <input id="Email" type="email" className={defaultClasses['int-text']} placeholder=""
                                           required={true} data-validate="{required:true}" onChange={handleEmail}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={defaultClasses['wrp-field']}>
                            <div className={defaultClasses['wrap-split']}>
                                <div className={defaultClasses['split-form']}>
                                    <label className={defaultClasses['int-label']} htmlFor="phone">Phone <sup
                                        className={defaultClasses['rq-label']}></sup></label>
                                    <input id="phone" type="tel" className={defaultClasses['int-text']} placeholder=""
                                           required={true} data-validate="{required:true}" onChange={handleContact}
                                    />
                                </div>
                                <div className={defaultClasses['split-form']}>
                                    <label className={defaultClasses['int-label']} htmlFor="city">City <sup
                                        className={defaultClasses['rq-label']}></sup></label>
                                    <div className={defaultClasses['wrap-select']}>
                                        <input id="city" type="text" className={defaultClasses['int-text']}
                                               placeholder=""
                                               required={true} data-validate="{required:true}" onChange={handleCity}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={defaultClasses['wrp-field']}>
                            <div className={defaultClasses['wrap-split']}>
                                <div className={defaultClasses['split-form']}>
                                    <label className={defaultClasses['int-label']} htmlFor="cardType">Bank Card
                                        Type <sup
                                            className={defaultClasses['rq-label']}></sup></label>
                                    <div className={defaultClasses['wrap-select']}>
                                        <select id="cardType" className={defaultClasses['int-text']}
                                                required={true} data-validate="{required:true}" onChange={handleCards}
                                        >
                                            <option value="" hidden="hidden" selected="selected"
                                                    disabled="disabled">Please Select One
                                            </option>
                                            {cardsList.map((e, key) => {
                                                return <option key={key} value={e.value}>{e.label}</option>;
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div className={defaultClasses['split-form']}>
                                    <label className={defaultClasses['int-label']} htmlFor="cardIssueBank">Name of Card
                                        Issue
                                        Bank <sup className={defaultClasses['rq-label']}></sup></label>
                                    <div className={defaultClasses['wrap-select']}>
                                        <select id="cardIssueBank" className={defaultClasses['int-text']}
                                                required={true} data-validate="{required:true}" onChange={handleBank}
                                        >
                                            <option value="" hidden="hidden" selected="selected"
                                                    disabled="disabled">Please Select One
                                            </option>
                                            {bankList.map((e, key) => {
                                                return <option key={key} value={e.value}>{e.label}</option>;
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={defaultClasses['wrp-field']}>
                            <label className={defaultClasses['int-label']} htmlFor="category">Category <sup
                                className={defaultClasses['rq-label']}></sup></label>
                            <div className={defaultClasses['wrap-select']}>
                                <select id="category" className={defaultClasses['int-text']}
                                        required={true} data-validate="{required:true}" onChange={handleCategory}
                                >
                                    <option value="" hidden="hidden" selected="selected"
                                            disabled="disabled">Please Select One
                                    </option>
                                    {categoryList.map((e, key) => {
                                        return <option key={key} value={e.value}>{e.label}</option>;
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className={defaultClasses['wrp-field']}>
                            <label className={defaultClasses['int-label']} htmlFor="city">Installment Months <sup
                                className={defaultClasses['rq-label']}></sup></label>
                            <div className={defaultClasses['wrap-select']}>
                                <select id="installmentMonths" className={defaultClasses['int-text']}
                                        required={true} data-validate="{required:true}"
                                        onChange={handleInstallmentMonths}
                                >
                                    <option value="" hidden="hidden" selected="selected"
                                            disabled="disabled">Please Select One
                                    </option>
                                    {installmentList.map((e, key) => {
                                        return <option key={key} value={e.value}>{e.label}</option>;
                                    })}
                                </select>
                            </div>
                        </div>
                        {dataLoading ? fullPageLoadingIndicator : null}
                        <div className={defaultClasses['error-msgs']}>
                            {fetchError}
                        </div>
                        <button type="submit" className={defaultClasses['bt-create']}>Submit</button>
                    </div>
                </form>
            </div>
        </div>;
    } else {
        content = <div>
            <h2 className={defaultClasses['form-head']}><span className={defaultClasses['sep-head']}>
                            Interwood</span> Information Form For Installment Plan</h2>
            <div>
                Thank you for getting in touch. One of our support team will be getting back to you shortly.
            </div>
        </div>
    }

    // return
    return (
        <Fragment>
            <Title>{`Installment Form`} - {STORE_NAME}</Title>
            {content}
        </Fragment>
    );
}

export default InstallmentForm;
