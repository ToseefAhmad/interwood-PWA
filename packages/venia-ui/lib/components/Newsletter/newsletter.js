import React, {useState, useEffect, Fragment} from 'react';

import Button from '../Button';
import {Form} from 'informed';

import defaultClasses from '../Footer/footer.css';
import {useNewsletter} from "@magento/peregrine/lib/talons/Newsletter/useNewsletter";

const Newsletter = () => {

    const [email, setEmail] = useState();
    const [status,setStatus]=useState('');

    const handleEmail=(e)=>{
        setEmail(e.target.value);
    }

    const talonProps = useNewsletter({
        email:email
    });
    const {
        handleSubmit,
        data
    } = talonProps;


    useEffect(() => {
        if (data && data.loading) {
            setStatus("Sending your request...");

        } else if (data && data.error) {
            setStatus(data && data.error.message);
        } else if (data && data.data) {
            setStatus( "Thank you for your subscription.");
        }

    }, [data])

    const handleFormSubmit=()=>{
        handleSubmit();
    }
    return (
        <Fragment>
            <Form className="form subscribe" onSubmit={handleFormSubmit}>
                <div>
                    <div className="field newsletter">
                        <label className="label" htmlFor="footer_newsletter">
                            <span>Sign Up for Our Newsletter:</span>
                        </label>
                        <div className="control">
                            <input
                                type="text"
                                placeholder="Email here"
                                onChange={handleEmail}
                                required={true}
                            />
                        </div>
                    </div>
                    <div className="actions">
                        <Button  className="action subscribe primary" priority="high" title="Subscribe" type="submit"> <span>Go!</span> </Button>
                    </div>
                </div>

                <div className={defaultClasses['status']}>
                    {status}
                </div>

            </Form>

        </Fragment>
    );
}
export default Newsletter;
