import React, {Fragment, useState, useEffect} from "react";

import {useLoyaltyForm} from "@magento/peregrine/lib/talons/LoyaltyForm/useLoyaltyForm";

import {Title} from "../Head";
import defaultClasses from './loyaltyForm.css';
import{ fullPageLoadingIndicator } from "../LoadingIndicator";

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'
import Checkbox from "../Checkbox";

const LoyaltyForm = () => {


    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [city, setCity] = useState();
    const [contact, setContact] = useState();
    const [gender, setGender] = useState();
    const [dob, setDob] = useState(new Date());
    const [stores, setStores] = useState([]);
    const [storesList,setStoresList]=useState([]);
    const [fetchError, setError] = useState("");
    const [dataLoading, setDataLoading] = useState(false);
    const [successPage, setSuccessPage] = useState(false);

    // submit loyalty form
    const talonProps = useLoyaltyForm({
        firstName: firstName,
        lastName: lastName,
        email: email,
        city: city,
        contact: contact,
        gender: gender,
        dob: dob,
        stores: stores
    });


    // get call back function to submit form
    const {
        handleSubmit,
        data,
        storesData,
        storesError
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
            if(data.data.submitLoyaltyForm===true)
            {
                setSuccessPage(true);
            }
                window.scrollTo({
                    left: 0,
                    top: 0,
                    behavior: 'smooth'
                });
        }

        if (storesData) {
            setStoresList(storesData.loyaltyStores);
        } else if (storesError) {
            setError(storesError);
        }

    }, [data, storesData,storesError])

    //on change handlers
    const handleFirstName = (e) => {
        setFirstName(e.target.value);
    }
    const handleLastName = (e) => {
        setLastName(e.target.value);
    }
    const handleEmail = (e) => {
        setEmail(e.target.value);
    }
    const handleCity = (e) => {
        setCity(e.target.value);
    }
    const handleContact = (e) => {
        setContact(e.target.value);
    }
    const handleGender = (e) => {
        setGender(e.target.value);
    }
    const handleDob = (e) => {
        setDob(e);
    }

   const handleStores = (e) => {
        const checkedStores = [...stores];
        if(e.target.checked) {
            checkedStores.push(e.target.value)
        } else {
            const index = checkedStores.indexOf(e.target.value)
            checkedStores.splice(index, 1);
        }
        setStores(checkedStores);
    }

    let storeList=[{name:'Interwood Mobel - DHA Islamabad Showroom',id:1,value:"1"},
        {name:'Interwood Mobel - CSD Sialkot Showroom',id:2,value:"2"},
        {name:'Interwood Mobel - DHA Bukhari Showroom',id:3,value:"3"},
        {name:' Interwood Mobel - DHA-Y Block Showroom',id:4,value:"4"},
        {name:'Interwood Mobel - Golra Showroom',id:5,value:"5"},
        {name:' Interwood Mobel - Hayatabad Showroom',id:6,value:"6"},
        {name:'Interwood Mobel - I9 Showroom',id:7,value:"7"},
        {name:'Interwood Mobel - IES Showroom',id:8,value:"8"},
        {name:'Interwood Mobel - Karsaz Showroom',id:9,value:"9"},
        {name:'Interwood Mobel - LuckyOne Showroom',id:10,value:"10"}
    ]

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
                        className={defaultClasses['sep-head']}>Loyalty</span> Program Form</h2>
                    <div className={defaultClasses['corp-info']}>
                        <strong className={defaultClasses['text-head']}>Personal Information</strong>
                        <div className={defaultClasses['wrp-field']}>
                            <label className={defaultClasses['int-label']} htmlFor="FirstName"> First Name <sup
                                className={defaultClasses['rq-label']}></sup></label>
                            <input id="FirstName" type="text" className={defaultClasses['int-text']} placeholder=""
                                   onChange={handleFirstName} data-validate="{required:true}"
                                   required={true}/>
                        </div>
                        <div className={defaultClasses['wrp-field']}>
                            <label className={defaultClasses['int-label']} htmlFor="LastName">Last Name <sup
                                className={defaultClasses['rq-label']}></sup></label>
                            <input id="LastName" type="text" className={defaultClasses['int-text']} placeholder=""
                                   onChange={handleLastName} data-validate="{required:true}"
                                   required={true}/>
                        </div>
                        <div className={defaultClasses['wrp-field']}>
                            <label className={defaultClasses['int-label']} htmlFor="Email">Email <sup
                                className={defaultClasses['rq-label']}></sup></label>
                            <input id="Email" type="text" className={defaultClasses['int-text']} placeholder=""
                                   onChange={handleEmail} data-validate="{required:true}"
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
                        <div className={defaultClasses['wrp-field']}>
                            <label className={defaultClasses['int-label']} htmlFor="Gender">Gender <sup
                                className={defaultClasses['rq-label']}></sup></label>
                            <div className={defaultClasses['wrap-select']}>
                                <select id="Gender" className={defaultClasses['int-text']} onChange={handleGender}
                                        data-validate="{required:true}"
                                        required={true}>
                                    <option value="" hidden="hidden" selected="selected"
                                            disabled="disabled">Please Select One
                                    </option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>
                        <div className={defaultClasses['wrp-field']}>
                            <label className={defaultClasses['int-label']} htmlFor="dob">Date of Birth <sup
                                className={defaultClasses['rq-label']}></sup></label>
                            <div className={defaultClasses['wrap-select']}>
                                <span>{moment(dob).format('MMMM Do YYYY')}</span>
                                <div className={defaultClasses['result-calendar']}>
                                    <Calendar onChange={handleDob} value={dob} />
                                </div>
                            </div>
                        </div>
                        <div className={defaultClasses['wrp-field']}>
                            <label className={defaultClasses['int-label']} htmlFor="Stores">Nearest Stores <sup
                                className={defaultClasses['rq-label']}></sup></label>
                            <div className={defaultClasses['wrap-select']}>

                                    {
                                        storeList.map(item => (
                                            <label key={item.id}>
                                                {item.name}
                                                <Checkbox name={item.name} value={item.value} checked={stores[item.value]} onChange={handleStores} />
                                            </label>
                                        ))
                                    }

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
                className={defaultClasses['sep-head']}>Loyalty</span> Program Form</h2>
            <div>
                Thank you for getting in touch. One of our support team will be getting back to you shortly.
            </div>
        </div>
    }

    // return
    return (
        <Fragment>
            <Title>{`Loyalty Form`} - {STORE_NAME}</Title>
            {content}
        </Fragment>
    );
}

export default LoyaltyForm;
