import React, { useEffect, useRef, useState } from 'react';
import defaultClasses from './CareerApplicationForm.module.css';
import classify from '../../classify';
import { useMutation } from '@apollo/client';
import { useToasts } from '@magento/peregrine';
import { useFormik } from "formik";
import { JobApplicationSchema } from './Schema';
import { FORM_SUBMISSION } from '@magento/peregrine/lib/talons/CareerApplication/useCareerApplication';
import LoadingIndicator from '../LoadingIndicator';

const initialValues = {
    name: "",
    position: "",
    email: "",
    contact: '',
    cv: '',
    expected_salary: ''
}

function CareerApplicationForm(props) {

    const [formSubmission, { data, error, loading }] = useMutation(FORM_SUBMISSION);
    const [, { addToast }] = useToasts();
    const [fileContent, setFileContent] = useState();
    const [positionError, setPositionError] = useState(false);
    // const formApplication = useCareerApplication(FORM_SUBMISSION);
    const { position } = props;
    const positionRef = useRef();
    const fileRef = useRef();
    const Formik = useFormik({
        initialValues: initialValues,
        validationSchema: JobApplicationSchema,
        onSubmit: (values) => {
            const { handleReset } = Formik;
            const positionValue = positionRef.current.value;
            if (positionValue === '') {
                setPositionError(true);
                return;
            }
            let content;
            const handleFileRead = async (e) => {
                content = await e.target.result;
                const { name, contact, email, expected_salary } = values;
                formSubmission({
                    variables: {
                        name: name,
                        file_name: file_name,
                        file_content: content,
                        email: email,
                        job_title: positionValue,
                        expected_salary: expected_salary,
                        phone: contact
                    }
                })
                handleReset();
                // setFileContent(content);
                // … do something with the 'content' …
            };
            const file = fileRef.current.files[0];
            const file_name = file.name;
            let file_content;
            file_content = new FileReader();
            file_content.onload = handleFileRead
            file_content.readAsDataURL(file);
            // const reader = new FileReader();
            // reader.rea
            // reader.readAsDataURL(file, "UTF-8");
            // reader.onload = () => {
            //     console.log(reader.result);
            // }
            setPositionError(false);
           
            // setFileContent(content);
            // const { name, contact, email, expected_salary } = values;
            // console.log(name, fileContent, file_name, positionValue, expected_salary,email, contact);
            // formSubmission({
            //     variables:{
            //         name:name,
            //         file_name: file_name,
            //         file_content: fileContent,
            //         email: email,
            //         job_title: positionValue,
            //         expected_salary: expected_salary,
            //         phone: contact 
            //     }
            // })
        }
    })

    useEffect(() => {
        if (data) {
            addToast({
                type: 'info',
                message: "Form Submitted SuccessFully",
                timeout: 10000
            })
        }
        else if (error) {
            addToast({
                type: 'info',
                message: "Error Submitting Form",
                timeout: 10000
            })
        }
        // positionRef.current = "";
        // fileRef.current = {};
    }
        , [data, loading, error])

    const { values, touched, handleChange, handleBlur, handleSubmit, errors } = Formik;
    return (
        <>
        { loading && <LoadingIndicator global={true}>Applying....</LoadingIndicator>}
        <form onSubmit={handleSubmit} >

            <div className='form-control-position'>
                <label className='label' htmlFor='position'>Position Applying For *</label>
                <input ref={positionRef} readOnly required onChange={handleChange} onBlur={handleBlur} value={position} id="position" type='text' name="position" placeholder='Please Select Position From Above For Which You Are Applying For' />
                {positionError ? <p className='form-error'>Position is Required</p> : null}
            </div>

            <div className='row-1'>
                <div className='form-control'>
                    <label className='label' htmlFor='name'>Name of Candidate *</label>
                    <input required onChange={handleChange} onBlur={handleBlur} value={values.name} id="name" type='text' name="name" placeholder='Please Write Your Full Name' />
                    {errors.name && touched.name ? <p className='form-error'>{errors.name}</p> : null}
                </div>
                <div className='form-control'>
                    <label className='label' htmlFor='expected_salary'>Expected Salary *</label>
                    <input required onChange={handleChange} onBlur={handleBlur} value={values.expected_salary} id="expected_salary" type='number' name="expected_salary" placeholder='Please Write Your Expected Salary' />
                    {errors.expected_salary && touched.expected_salary ? <p className='form-error'>{errors.expected_salary}</p> : null}
                </div>
            </div>
            <div className='row-2'>
                <div className='form-control'>
                    <label className='label' htmlFor='email'>Email Address *</label>
                    <input required onChange={handleChange} onBlur={handleBlur} value={values.email} type='email' name="email" id="email" placeholder='Please Write Your Email Address' />
                    {errors.email && touched.email ? <p className='form-error'>{errors.email}</p> : null}
                </div>

                <div className='form-control'>
                    <label className='label' htmlFor='contact'>Contact Number *</label>
                    <input required onChange={handleChange} onBlur={handleBlur} value={values.contact} type='number' name="contact" id="contact" placeholder='Please Write Your Contact Number' />
                    {errors.contact && touched.contact ? <p className='form-error'>{errors.contact}</p> : null}
                </div>
            </div>

            <div className='row-8'>
                <div>
                <div class="image-upload">
                    <label className='label' htmlFor='cv'>Upload CV (pdf only) *
                        <img src={require("../../assets/img/attachment.svg")} alt="attachment" />
                    </label>
                    <input ref={fileRef} required accept='application/pdf' type="file" name="cv" id="cv" onChange={handleChange} />
                </div>
                <strong><br></br>{ values?.cv ? values?.cv : null }</strong>
            </div>
            </div>
            <button className='submit-btn' type='submit'>Submit</button>
        </form>
        </>
    )
}

export default classify(defaultClasses)(CareerApplicationForm);