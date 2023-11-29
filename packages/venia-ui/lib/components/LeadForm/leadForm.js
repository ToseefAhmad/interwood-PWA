import React, {Fragment, useState, useEffect} from "react";

import {useLeadForm} from "@magento/peregrine/lib/talons/LeadForm/useLeadForm";
import {Title} from "../Head";
import defaultClasses from './leadForm.css';
import{ fullPageLoadingIndicator } from "../LoadingIndicator";

const LeadForm = () => {

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [contact, setContact] = useState();
    const [city, setCity] = useState();
    const [category, setCategory] = useState();
    const [fetchError, setError] = useState("");
    const [dataLoading, setDataLoading] = useState(false);
    const [categoryList, setCategoryList] = useState([]);
    const [successPage, setSuccessPage] = useState(false);

    // submit lead form
    const talonProps = useLeadForm({
        name: name,
        email: email,
        contact: contact,
        city: city,
        category: category,
    });

    // get call back function to submit form
    const {
        handleSubmit,
        data,
        categoryData,
        categoryError,
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
            if(data.data.submitLeadForm===true)
            {
                setSuccessPage(true);
            }
            window.scrollTo({
                left: 0,
                top: 0,
                behavior: 'smooth'
            });
        }

        if (categoryData) {
            setCategoryList(categoryData.getLeadCategory);
        } else if (categoryError) {
            setError(categoryError);
        }


    }, [data, categoryData, categoryError])



    //on change handlers
    const handleName = (e) => {
        setName(e.target.value);
    }
    const handleEmail = (e) => {
        setEmail(e.target.value);
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
    // on form submit
    const handleSubmitForm = (e) => {
        e.preventDefault();
        handleSubmit();
    }

    // page structure
let testing=<>
    <option key={1} value="office">Office</option>;
    <option key={1} value="home">Home</option>;
    <option key={1} value="kitchen">Kitchen</option>;
    <option key={1} value="doors">Doors</option>;
    <option key={1} value="wardrobe">Wardrobe</option>;
          </>;
    let content;
    if (successPage === false) {
        content = <div className={defaultClasses['sec-installment']}>
            <div className={defaultClasses['form-holder']}>
                <form className={defaultClasses['wrp-formInfo']} onSubmit={handleSubmitForm}>
                    <h2 className={defaultClasses['form-head']}><span className={defaultClasses['sep-head']}>
                            Interwood</span> Information Form </h2>
                    <div className={defaultClasses['inst-info']}>
                        <strong className={defaultClasses['text-head']}>Send us a Message </strong>
                        <span className={defaultClasses['text-head']}>Personal Info</span>
                        <div className={defaultClasses['wrp-field']}>
                            <div className={defaultClasses['wrap-split']}>
                                <div className={defaultClasses['split-form']}>
                                    <label className={defaultClasses['int-label']} htmlFor="Name">Name <sup
                                        className={defaultClasses['rq-label']}> </sup></label>
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
                            <label className={defaultClasses['int-label']} htmlFor="category">Category <sup
                                className={defaultClasses['rq-label']}></sup></label>
                            <div className={defaultClasses['wrap-select']}>
                                <select id="category" className={defaultClasses['int-text']}
                                        required={true} data-validate="{required:true}" onChange={handleCategory}
                                >
                                    <option value="" hidden="hidden" selected="selected"
                                            disabled="disabled">Please Select One
                                    </option>
                                    {categoryList ? categoryList.map((e, key) => {
                                        return <option key={key} value={e.value}>{e.label}</option>;
                                    }):testing}
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
                            Interwood</span> Information Form</h2>
            <div>
                Thank you for getting in touch. One of our support team will be getting back to you shortly.
            </div>
        </div>
    }

    // return
    return (
        <Fragment>
            <Title>{`Information/Lead Form`} - {STORE_NAME}</Title>
            {content}
        </Fragment>
    );
}

export default LeadForm;
