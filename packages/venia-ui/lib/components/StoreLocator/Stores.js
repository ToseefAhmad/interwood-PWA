import React, {Fragment} from "react";

const Stores = (props) => {

    const {item,locations,index} = props;

    const {name, address, city, country, latitude, longitude, phone, postcode, region, schedule} = item;
    locations[index]= {
        name: name,
        address: address,
        city: city,
        country: country,
        phone: phone,
        postcode: postcode,
        region: region,
        schedule: schedule,
        location: {
            lat: latitude,
            lng: longitude
        },
    };
    return (
        <Fragment>

        </Fragment>
    );
}
export default Stores;
