import React,{Fragment} from 'react'
import classes from "./StoreInfo.module.css";
import { FaPhoneAlt } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import {Link} from "react-router-dom";


export default function StoresInfo(props) {
    const {item}=props;
    const cityName = props.city;
    const {name, address, city, country, latitude, longitude, phone, postcode, region} = item;
  return (
        <Fragment>
            <h1 className={classes.mainlocation}>{name}</h1>
            <div class={classes.icons}><MdLocationOn size="1rem" color="#21b259"></MdLocationOn></div>
            <div class={classes.lists}>
            {address}<br></br> 
            {city}, {region} {postcode}<br></br>
            {country}
            </div>
            <ul>
                <li key={"4"}>
                    <span className={classes.icon}><FaPhoneAlt size=".8rem" color="#21b259"></FaPhoneAlt></span>
                    <span className={classes.contactInfo}>
                    {phone}
                    </span>
                </li>
            </ul>

            <Link className={classes.link} to={
                {
                    pathname: `/city/${cityName}`,
                    state: {longitude: longitude, latitude:latitude}
                }
            }>View on  Map</Link>
        </Fragment>
  )
}