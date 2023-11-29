import React, {Fragment,useState,useEffect} from "react";

import { Form } from 'informed';
import TextInput from "../TextInput";
import {isRequired} from "../../util/formValidators";
import defaultClasses from "./contactUs.css";
import {useContactUs} from "@magento/peregrine/lib/talons/ContactUs/useContactUs";
import LoadingIndicator from "../LoadingIndicator";
import ReCAPTCHA from "react-google-recaptcha";
import TextArea from "../TextArea";
import {Title} from "../Head";
import CmsBlock from "../CmsBlock";



function Iframe(props) {
    return (<div dangerouslySetInnerHTML={ {__html:  props.iframe?props.iframe:""}} />);
}

const ContactUs =()=>{

    const iframe = '<iframe id="iframeid" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54443.58823944283!2d74.2503423092385!3d31.476770389019244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919046e36aa5915%3A0xe7b162678ae8bdc1!2sInterwood%20Mobel%20Pvt%20Ltd!5e0!3m2!1sen!2s!4v1615371575314!5m2!1sen!2s" style="border:0;" allowfullscreen="" loading="lazy"></iframe>'; 

    const [name,setName]=useState();
    const [email,setEmail]=useState();
    const [phone,setPhone]=useState();
    const [message,setMessage]=useState();
    const [fetchError, setError] = useState("");
    const [dataLoading, setDataLoading] = useState(false);
    const [successPage, setSuccessPage] = useState(false);
    const [captcha,setCaptcha]=useState();

    const talons=useContactUs(
        {
            name: name,
            email:email,
            phone:phone,
            message:message
        }
    );
    const { handleSubmit,response}=talons;

    const handleName=(e)=>{
        setName(e.target.value);
    }
    const handleEmail=(e)=>{
        setEmail(e.target.value);
    }
    const handlePhone=(e)=>{
        setPhone(e.target.value);
    }
    const handleMessage=(e)=>{
        setMessage(e.target.value);
    }

    useEffect(() => {
        if (response && response.loading) {
            setDataLoading(response.loading);
        } else if (response && response.error) {
            setError(response.error.message);
            setDataLoading(false);
        } else if (response && response.data) {
            setError("");
            setDataLoading(false);
            if (response.data.sendContactForm === true) {
                setSuccessPage(true);
            }
            window.scrollTo({
                left: 0,
                top: 0,
                behavior: 'smooth'
            });
        }},[response]);


        //handle Submit
    const handleSubmitForm=()=>{
        handleSubmit();
    }
    const onCaptchaChange=(value)=> {
        setCaptcha(value);
    }
    let content;
    if(successPage===false)
    {
        content= <Form
            onSubmit={handleSubmitForm}>
            <div className="control">
                <label className={[defaultClasses["int-label"],  " "].join(' ')}  htmlFor="email">your Email <sup
                    className={[defaultClasses["rq-label"],  " "].join(' ')}> </sup></label>
                <TextInput
                    field="email"
                    autoComplete="email"
                    validate={isRequired}
                    name="email"
                    validateOnBlur
                    mask={value => value && value.trim()}
                    maskOnBlur={true}
                    onChange={handleEmail}
                />
                <span className={defaultClasses['email-msg']}>
                      We'll never share your email with anyone else.
                    </span>
            </div>
            <div className="control">
                <label className={[defaultClasses["int-label"],  " "].join(' ')}  htmlFor="name">your name <sup
                    className={[defaultClasses["rq-label"],  " "].join(' ')}> </sup></label>
                <TextInput
                    field="name"
                    autoComplete="name"
                    validate={isRequired}
                    name="name"
                    validateOnBlur
                    mask={value => value && value.trim()}
                    maskOnBlur={true}
                    onChange={handleName}
                />
            </div>
            <div className="control">
                <label className={[defaultClasses["int-label"],  " "].join(' ')}  htmlFor="name">your phone number <sup
                    className={[defaultClasses["rq-label"],  " "].join(' ')}> </sup></label>
                <TextInput
                    field="phone"
                    autoComplete="phone"
                    validate={isRequired}
                    name="phone"
                    validateOnBlur
                    mask={value => value && value.trim()}
                    maskOnBlur={true}
                    onChange={handlePhone}
                />
                <span className={defaultClasses['email-msg']}>
                 format (03942333453) 0 / 20
                </span>
            </div>
            <div className="control">
                <label className={[defaultClasses["int-label"],  " "].join(' ')}  htmlFor="name">Message<sup
                    className={[defaultClasses["rq-label"],  " "].join(' ')}> </sup></label>
                <TextArea
                    field="message"
                    autoComplete="message"
                    validate={isRequired}
                    name="message"
                    validateOnBlur
                    mask={value => value && value.trim()}
                    maskOnBlur={true}
                    onChange={handleMessage}
                />
                <span className={defaultClasses['email-msg']}>
                minimum 10 characters
                </span>
            </div>

            <div className={defaultClasses['recaptcha']}>
                <ReCAPTCHA
                    sitekey="6LdpOM8UAAAAADtAUlXIZnu8kZ41oyxC6wdvTxWb"
                    onChange={onCaptchaChange}
                />
                <input name="captcha" className={defaultClasses['captcha-input']} required={true} value={captcha}/>
            </div>

            <div className="form-action">
                <button type="submit" className={defaultClasses['bt-send']}>Send</button>
            </div>

            <div className={defaultClasses['error-msgs']}>
                {fetchError}
            </div>
        </Form>
    } else {
        content=<div>
            Thank you for getting in touch. One of our support team will be getting back to you shortly.
        </div>
    }

    return(
        <Fragment>
            <div className={defaultClasses['root']}> 
            {dataLoading ? <LoadingIndicator/> : null}

            <section className="contact-us">
                <div className="contact-map">]
                    <Iframe iframe={iframe} />
                </div>
                <div className="main-container">
                    <div className="main-title">
                        Contact Us
                    </div>
                    <div className="form">
                        {content}
                    </div>
                    <div className="contact-information">
                        <h3>Get Office info</h3>
                        <ul className="list-icon">
                            <li key={"122"}>
                                <i className="icon-mail-alt"></i>
                                <a >complaints@interwoodmobel.com</a>
                            </li>
                            <li key={"12"}>    
                                <i className="icon-phone"></i>
                                <a >021-111-203-203</a>
                            </li>
                            <li key={"221"}>
                                <i className="icon-location"></i>
                                <a >7, Babar Block New Garden Town,<br/>
                                    <span> Lahore, Punjab 54600</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            <Title>{`Contact Us`} - {STORE_NAME}</Title>
            
            </div>
        </Fragment>
    );
}


export default ContactUs;
