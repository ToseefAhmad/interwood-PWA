import React, {Fragment, useState, useEffect} from "react";
import {useCorporateForm} from '@magento/peregrine/lib/talons/CorporateForm/useCorporateForm';

import {Title} from "../Head";
import defaultClasses from './CorporateForm.css';
import{ fullPageLoadingIndicator } from "../LoadingIndicator";

const CorporateForm = () => {

    const [name, setName] = useState();
    const [designation, setDesignation] = useState();
    const [organization, setOrganization] = useState();
    const [city, setCity] = useState();
    const [address, setAddress] = useState();
    const [contact, setContact] = useState();
    const [interest, setInterest] = useState();
    const [education, setEducation] = useState();
    const [healthcare, setHealthcare] = useState();
    const [fetchError, setError] = useState("");
    const [dataLoading, setDataLoading] = useState(false);
    const [educationList, setEducationData] = useState([]);
    const [interestList, setInterestData] = useState([]);
    const [healthcareList, setHealthcareData] = useState([]);
    const [successPage, setSuccessPage] = useState(false);

    // submit corporate form
    const talonProps = useCorporateForm({
        name: name,
        designation: designation,
        organization: organization,
        city: city,
        address: address,
        contact: contact,
        interest: interest,
        education: education,
        healthcare: healthcare
    });


    // get call back function to submit form
    const {
        handleSubmit,
        data,
        educationError,
        educationData,
        interestData,
        interestError,
        healthcareData,
        healthcareError
    } = talonProps;


    useEffect(() => {
        if (data && data.loading) {
            setDataLoading(data.loading);
        } else if (data && data.error) {
            setError(data.error.message);
            setDataLoading(false);
        } else if (data && data.data) {
            setError("");
            setDataLoading(false);
            if(data.data.submitCorporateForm.status===true)
            {
                setSuccessPage(true);
            }
                window.scrollTo({
                    left: 0,
                    top: 0,
                    behavior: 'smooth'
                });
        }

        if (educationData) {
            setEducationData(educationData.getEducation);
        } else if (educationError) {
            setError(educationError);
        }

        if (interestData) {
            setInterestData(interestData.getInterest);
        } else if (interestError) {
            setError(interestError);
        }

        if (healthcareData) {
            setHealthcareData(healthcareData.getHealthcare);
        } else if (healthcareError) {
            setError(healthcareError);
        }

    }, [data, healthcareError, healthcareData, interestError, interestData, educationError, educationData])

    //on change handlers
    const handleName = (e) => {
        setName(e.target.value);
    }
    const handleDesignation = (e) => {
        setDesignation(e.target.value);
    }
    const handleOrganization = (e) => {
        setOrganization(e.target.value);
    }
    const handleCity = (e) => {
        setCity(e.target.value);
    }
    const handleAddress = (e) => {
        setAddress(e.target.value);
    }
    const handleContact = (e) => {
        setContact(e.target.value);
    }
    const handleInterest = (e) => {
        setInterest(e.target.value);
    }
    const handleEducation = (e) => {
        setEducation(e.target.value);
    }
    const handleHealthcare = (e) => {
        setHealthcare(e.target.value);
    }


    // on form submit
    const handleSubmitForm = (e) => {
        e.preventDefault();
        handleSubmit();
    }

    // page structure
    let content;
    if (successPage === false) {
        content = <div className={defaultClasses['int-regform']}>
            <div className={defaultClasses['form-holder']}>
                <form className={defaultClasses['wrp-formInfo']} onSubmit={handleSubmitForm}>
                    <h2 className={defaultClasses['form-head']}><span
                        className={defaultClasses['sep-head']}>Corporate</span> Contact Form</h2>
                    <div className={defaultClasses['corp-info']}>
                        <strong className={defaultClasses['text-head']}>Personal Information</strong>
                        <div className={defaultClasses['wrp-field']}>
                            <label className={defaultClasses['int-label']} htmlFor="Name">Name <sup
                                className={defaultClasses['rq-label']}></sup></label>
                            <input id="Name" type="text" className={defaultClasses['int-text']} placeholder=""
                                   onChange={handleName} data-validate="{required:true}"
                                   required={true}/>
                        </div>
                        <div className={defaultClasses['wrp-field']}>
                            <label className={defaultClasses['int-label']} htmlFor="Designation">Designation <sup
                                className={defaultClasses['rq-label']}></sup></label>
                            <input id="Designation" type="text" className={defaultClasses['int-text']} placeholder=""
                                   onChange={handleDesignation} data-validate="{required:true}"
                                   required={true}/>
                        </div>
                        <div className={defaultClasses['wrp-field']}>
                            <label className={defaultClasses['int-label']} htmlFor="Organization">Organization <sup
                                className={defaultClasses['rq-label']}></sup></label>
                            <input id="Organization" type="text" className={defaultClasses['int-text']} placeholder=""
                                   onChange={handleOrganization} data-validate="{required:true}"
                                   required={true}/>
                        </div>
                        <div className={defaultClasses['wrp-field']}>
                            <label className={defaultClasses['int-label']} htmlFor="Address">Address <sup
                                className={defaultClasses['rq-label']}></sup></label>
                            <input id="Address" type="text" className={defaultClasses['int-text']} placeholder=""
                                   onChange={handleAddress} data-validate="{required:true}"
                                   required={true}/>
                        </div>
                        <div className={defaultClasses['wrp-field']}>
                            <label className={defaultClasses['int-label']} htmlFor="city">City <sup
                                className={defaultClasses['rq-label']}></sup></label>
                            <input id="City" type="text" className={defaultClasses['int-text']} placeholder=""
                                   onChange={handleCity} data-validate="{required:true}"
                                   required={true}/>
                        </div>
                        <div className={defaultClasses['wrp-field']}>
                            <label className={defaultClasses['int-label']} htmlFor="contactNumber">Mobile Number <sup
                                className={defaultClasses['rq-label']}></sup></label>
                            <input id="contactNumber" type="tel" className={defaultClasses['int-text']} placeholder=""
                                   onChange={handleContact} data-validate="{required:true}"
                                   required={true}/>
                        </div>
                        <strong className={defaultClasses['text-head']}>Preference</strong>
                        <div className={defaultClasses['wrp-field']}>
                            <label className={defaultClasses['int-label']} htmlFor="Interested">Interested In <sup
                                className={defaultClasses['rq-label']}></sup></label>
                            <div className={defaultClasses['wrap-select']}>
                                <select id="Interested" className={defaultClasses['int-text']} onChange={handleInterest}
                                        data-validate="{required:true}"
                                        required={true}>
                                    <option value="" hidden="hidden" selected="selected"
                                            disabled="disabled">Please Select One
                                    </option>
                                    {interestList.map((e, key) => {
                                        return <option key={key} value={e.value}>{e.label}</option>;
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className={defaultClasses['wrp-field']}>
                            <label className={defaultClasses['int-label']} htmlFor="Education">Education <sup
                                className={defaultClasses['rq-label']}></sup></label>
                            <div className={defaultClasses['wrap-select']}>
                                <select id="Education" className={defaultClasses['int-text']} onChange={handleEducation}
                                        data-validate="{required:true}"
                                        required={true}>
                                    <option value="" hidden="hidden" selected="selected"
                                            disabled="disabled">Please Select One
                                    </option>
                                    {educationList.map((e, key) => {
                                        return <option key={key} value={e.value}>{e.label}</option>;
                                    })}
                                </select>
                            </div>
                        </div>
                        <strong className={defaultClasses['text-head']}>Healthcare</strong>
                        <div className={defaultClasses['wrp-field']}>
                            <label className={defaultClasses['int-label']} htmlFor="healthcare">Healthcare <sup
                                className={defaultClasses['rq-label']}></sup></label>
                            <div className={defaultClasses['wrap-select']}>
                                <select id="healthcare" className={defaultClasses['int-text']}
                                        onChange={handleHealthcare} data-validate="{required:true}"
                                        required={true}>
                                    <option value="" hidden="hidden" selected="selected"
                                            disabled="disabled">Please Select One
                                    </option>
                                    {healthcareList.map((e, key) => {
                                        return <option key={key} value={e.value}>{e.label}</option>;
                                    })}
                                </select>
                            </div>
                        </div>
                        {dataLoading ? fullPageLoadingIndicator : null}
                        <div className={defaultClasses['error-msgs']}>
                            {fetchError}
                        </div>
                        <div className={defaultClasses['btn-wrp']}>
                            <button type="submit" className={defaultClasses['bt-create']}>Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    } else {
        content = <div>
            <h2 className={defaultClasses['form-head']}><span
                className={defaultClasses['sep-head']}>Corporate</span> Contact Form</h2>
            <div>

                Thank you for getting in touch. One of our support team will be getting back to you shortly.
            </div>
        </div>
    }

    // return
    return (
        <Fragment>
            <Title>{`Corporate Form`} - {STORE_NAME}</Title>
            {content}
        </Fragment>
    );
}

export default CorporateForm;
