import React, {Fragment, useEffect, useState} from "react";

import {useSearchStores} from "@magento/peregrine/lib/talons/StoreLocator/useSearchStores";
import StoresResult from "./StoresResult";
import LoadingIndicator from "../LoadingIndicator";

const SearchStores=()=>{

    const [key,setKey]=useState(" ");
    const [fetchError, setError] = useState("");
    const [dataLoading, setDataLoading] = useState(false);
    const [stores, setStores] = useState([]);

    const handleKey=(e)=>{
        setKey(e.target.value);
    }

    const talonProps=useSearchStores(key);

    const {data,error,loading}=talonProps;

    useEffect(() => {
        if (loading) {
            setDataLoading(loading)
        } else if (error) {
            setError(error.message)
        } else if (data) {
            setError("");
            setDataLoading(false);
            setStores([...data.searchStores]);
        }
    }, [data,error,loading])

    let content = null;
    if (dataLoading) {
        content = <LoadingIndicator>{'Loading Stores'}</LoadingIndicator>;
    } else if (fetchError) {
        content = <div><h1> Data Fetching Error: {fetchError}</h1></div>
    } else if (stores.length) {
        content = <div>
            {
                stores.map((store, idx) => {
                    return <StoresResult
                        key={idx}
                        item={store}
                    />;
                })
            }
        </div>;
    }


    return (
        <Fragment>
            <div className="block-header">
                <div className="block-form-group">
                    <input type="text" placeholder="Enter your desired location" value={key} onChange={handleKey}/>
                    <i class="icon-search-3"></i>
                </div>
            </div>
            <div className="search-content">
                {content}
            </div>
        </Fragment>
    )

}

export default SearchStores;
