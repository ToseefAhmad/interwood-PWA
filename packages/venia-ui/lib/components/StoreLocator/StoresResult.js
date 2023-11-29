import React, {Fragment} from "react";
import StoreLocator from "./storeLocator";
import {Link} from "react-router-dom";

const StoresResult = (props) => {

    const {item}=props;
    const {name, address, city, country, latitude, longitude, phone, postcode, region} = item;

    return (
        <Fragment>
            <h1 className="main-location">{name}</h1>
            <ul>
                <li key={"1"}>
                    <span className="has-address">
                        {address}
                    </span>
                </li>
                <li key={"2"}>
                    <span className="region-details">
                        {city}, {region} {postcode}
                    </span>
                </li>
                <li key={"3"}>
                    <span className="has-country">
                        {country}
                    </span>
                </li>
                <li key={"4"}>
                    <span className="contact-info">
                        {phone}
                    </span>
                </li>
            </ul>

            <Link to={
                {
                    pathname: '/store-locator',
                    state: {longitude: longitude, latitude:latitude}
                }
            }>View on  Map</Link>
        </Fragment>
    )
}

export default StoresResult;
