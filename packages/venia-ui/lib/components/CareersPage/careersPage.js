import React, { useEffect, useRef, useState, useMemo } from 'react';
// import { shape, string } from 'prop-types';
import defaultClasses from './careers.css';
import classify from '../../classify';
import JobDescription from '../JobDescription/JobDescription';
import CareerApplicationForm from '../CareerApplicationForm';
import { useQuery, gql } from '@apollo/client';
import LoadingIndicator, { fullPageLoadingIndicator } from '../LoadingIndicator';
import { useCareerJobs } from '@magento/peregrine/lib/talons/CareersPage/useCareerJobs';

export const Careers = (props) => {
    const [position, setPosition] = useState('');
    const formRef = useRef(null);
    const { classes } = props;
    const talonProps = useCareerJobs();
    const {
        data,
        error,
        loading
    } = talonProps;
    const clickHandler = () => {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: "start", inline: "start" });
    }

    return (
        <>
        { loading && fullPageLoadingIndicator }
        {
            data !== undefined && !loading
            ? (
                <div className={classes.root}>

                <div className="c-page-main-content">
                    <h3 className="p-has-title">Become a membber of Interwood Family!</h3>
                    <p className="p-has-discription">
                        Interwood look for the highest quality people to deliver the high quality products and services.
                        If you’re looking for a career opportunity that encourages creativity and rewards hard work,
                        Interwood could be just what you’ve been looking for. So if you think you have what it takes to make a
                        difference to our business, then take a look at the opportunities we have on offer and apply now.
                    </p>
                </div>
    
                <section className="listing-section">
                    <h3 className="listing-title">
                        <span> Current Openings </span>
                    </h3>
                    {/*ACTIVE CAREERS */}
                    {loading ? <LoadingIndicator global={true}></LoadingIndicator> : (error ? <h1>Error Fetching Data</h1> : (
                        <ul className='jobs-opening-list'>
                            {data.career_jobs ? data.career_jobs.map((job, index) => {
                                return (
                                   <li className='jobTab' key={index}>
                                        <JobDescription setPosition={setPosition} job={job} formReference={clickHandler}></JobDescription>
                                    </li> 
                                )
                            }): null}
                        </ul>))}
    
                </section>
    
                <section ref={formRef} id="apply-online" className='apply-online'>
                    <h3 className="apply-online-heading">
                        <span> Apply Online </span>
                    </h3>
                    <div className='form-container'>
                        <CareerApplicationForm position={position} ></CareerApplicationForm>
                    </div>
                </section>
            </div>
            ) : !loading 
            ? (<div style={{    
                display: 'flex',
                justifyContent: 'center',
                paddingTop: '65px',
                color: '#21b259'
            }}>
                <h1>No Job Found!</h1>
            </div>
            ) :  null
        }
        </>
    );
}

export default classify(defaultClasses)(Careers);
