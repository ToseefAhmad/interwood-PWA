import React, {Fragment, useEffect, useState} from "react";

import{ fullPageLoadingIndicator } from "../LoadingIndicator";

import {useInstagram} from "@magento/peregrine/lib/talons/Instagram/useInstagram";
import InstagramFeed  from 'react-ig-feed'

const Instagram=()=>{

    const [fetchError, setError] = useState("");
    const [dataLoading, setDataLoading] = useState(false);
    const [instaId, setInstaId] = useState();

    const talonProps=useInstagram();
    const {data,error,loading}=talonProps;

    useEffect(() => {
        if (loading) {
            setDataLoading(loading)
        } else if (error) {
            setError(error.message)
        } else if (data) {
            setError("");
            setDataLoading(false);
            setInstaId(data.instaId);
        }
    }, [data,error,loading])

    let content = null;
    if (dataLoading) {
        content = fullPageLoadingIndicator;
    } else if (fetchError) {
        content = <div><h1> Data Fetching Error: {fetchError}</h1></div>
    } else if (instaId) {
        content=<InstagramFeed token={instaId}  counter="10"/>;
    }

    return (
        <Fragment>
                {content}
        </Fragment>
    )
}

export default Instagram;
