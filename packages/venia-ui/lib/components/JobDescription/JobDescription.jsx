import React, { useState } from 'react'
import classify from '../../classify';
import RichContent from '../RichContent/richContent';
import defaultClasses from './JobDescription.module.css';

function JobDescription({ formReference, job, setPosition }) {
    const { age, experience, position_title, purpose, qualification, responsibilities, skill_set } = job;
    const [isReadMoreActive, setIsReadMoreActive] = useState(false);
    const readMoreHandler = () => {
        setIsReadMoreActive(true);
    }
    const cancelButtonHandler = () => {
        setIsReadMoreActive(false);
    }

    const handleClick = () => {
        formReference();
        setPosition(position_title);
    }

    return (
        <>
            <section className="job-description-container">
                {position_title ? <div className='position-title'>
                    <h2>Position: </h2>
                    <p>{position_title}</p>
                </div> : null}
                {experience ? <div className='experience'>
                    <h2>Experience: </h2>
                    <p>{experience}</p>
                    {!isReadMoreActive ? <p className='read-more' onClick={readMoreHandler}> Read More...</p> : null}
                </div> : null}
                {
                    isReadMoreActive ? (
                        <>
                            {qualification ? <div className='qualification'>
                                <h2>Qualification: </h2>
                                <p>{qualification}</p>
                            </div> : null}

                            <div className='description'>
                                <h2>Description: </h2>
                                <div className='details'>
                                    {purpose ? <div className='purpose'>
                                        <h3>Purpose: </h3>
                                        <p>{purpose}</p>
                                    </div> : null}
                                    {responsibilities ? <div className='responsibilities'>
                                        <h3>Responsibilities: </h3>
                                        <p className='rich-content'><RichContent html={responsibilities}></RichContent></p>
                                    </div> : null
                                    }

                                    {age ? <div className='age'>
                                        <h3>Age:</h3>
                                        <p>{age}</p>
                                    </div> : null}
                                    {skill_set ? <div className='knowledge'>
                                        <h3>Knowledge: </h3>
                                        <p>{skill_set}</p>
                                    </div> : null}
                                </div>
                            </div>


                        </>
                    ) : null
                }
            </section>
            <button onClick={()=>handleClick()} className='apply-btn'>Apply</button>

            <div className='bottom-line'>
                {isReadMoreActive ? <span onClick={cancelButtonHandler} className='cancel'>X</span> : null}
            </div>
        </>
    )
}

export default classify(defaultClasses)(JobDescription);