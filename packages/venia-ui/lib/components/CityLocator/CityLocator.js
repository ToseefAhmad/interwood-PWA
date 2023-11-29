import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import BestSeller from '../BestSeller/bestSeller';
import classes from './CityLocator.module.css';
import { Helmet } from 'react-helmet-async';
import { Title } from '../Head';
import coordinates from './cityCoordinates';
import { PageContent } from './PageContent';
import { useStoreLocator } from '@magento/peregrine/lib/talons/StoreLocator/useStoreLocator';
import cityWiseMetaDescription from './cityMetaData';
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow
} from '@react-google-maps/api';
import LoadingIndicator, { fullPageLoadingIndicator } from '../LoadingIndicator';

const CityLocator = () => {

    const params = useParams();
    const [city, setCity] = useState(params.cityName);

    const [apiKey, setApiKey] = useState(
        'AIzaSyA3_pVkCUJwqRExMITDYRtuRZiW-i6Q6yA'
    );

    const [isProductLoaded, setIsProductLoaded] = useState(false);
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyA3_pVkCUJwqRExMITDYRtuRZiW-i6Q6yA',
    });

    const cityObjectWithCoordinates = coordinates.find(cordinate => cordinate.cityName === capitalizeFirstLetter(city));
    const [cityCoordinate, setCityCoordinate] = useState(cityObjectWithCoordinates);
    const StoresTalons = useStoreLocator();
    const {
        data,
        error,
        loading,
    } = StoresTalons;
    const [stores, setStores] = useState(data?.getAllStores || []);
    const [selected, setSelected] = useState(null);
    const particularCityStores = stores.filter(
        store => store.city === capitalizeFirstLetter(city)
    );
    const [markers, setMarkers] = useState(particularCityStores);


    useEffect(() => {
        if(data !== undefined) {
            setStores(data.getAllStores);
        }
    }, [data]);

    useEffect(() => {
        setCity(params.cityName);
        const particularCityStores = stores.filter(
            store => store.city === capitalizeFirstLetter(city)
        );
        setMarkers(particularCityStores);
        const cityObjectWithCoordinates = coordinates.find(cordinate => cordinate.cityName === capitalizeFirstLetter(city));
        setCityCoordinate(cityObjectWithCoordinates);
    }, [params.cityName, city])

    useEffect(() => {
        const particularCityStores = stores.filter(
            store => store.city === capitalizeFirstLetter(params.cityName)
        );
        setMarkers(particularCityStores);
    }, [stores]);


    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const cityMetaData = cityWiseMetaDescription.find(
        city => city.name === capitalizeFirstLetter(params.cityName)
    );

    if (!cityMetaData) {
        return <Redirect to="/page-not-found" />;
    }


    let metaTitle = `Beautify your Space with Luxurious Furniture in ${capitalizeFirstLetter(city)} by Interwood`;

    const mapStyles = {
        height: '600px',
        width: '100%'
    };
    const center = {
        lat: cityCoordinate.lat,
        lng: cityCoordinate.lng
    };

    const options = {
        disableDefaultUI: true,
        zoomControl: true,
        mapTypeControl: false,
        fullscreenControl: false,
        suppressMarkers: true
    }
    return (
        <>
            <Title>{metaTitle}</Title>
            <Helmet>
                <meta name="tite" content={metaTitle} />
                <meta name="description" content={cityMetaData.description} />
            </Helmet>
            <div>
                <h1 className={classes.CityName}>{metaTitle}</h1>
                <p className={classes.BestSellingText}>
                    {cityMetaData.description}
                </p>
                <BestSeller
                    productLoaded={setIsProductLoaded}
                    categoryId={26}
                    heading="Bedroom"
                    city={params.cityName}
                />
                <BestSeller
                    productLoaded={setIsProductLoaded}
                    categoryId={46}
                    heading="Decor"
                    city={params.cityName}
                />
                <BestSeller
                    productLoaded={setIsProductLoaded}
                    categoryId={33}
                    heading="Living"
                    city={params.cityName}
                />
                <PageContent city={capitalizeFirstLetter(params.cityName)} />
                <section className={classes.storeLocation}>
                    <div className={classes.storeLocationRightBlock}>
                        {isLoaded ? <GoogleMap options={options} mapContainerStyle={mapStyles} zoom={10} center={center} >
                            {markers ? markers.map((marker) => {
                                return <Marker key={marker.address} onClick={() => setSelected(marker)} position={{ lat: marker.latitude, lng: marker.longitude }}>
                                </Marker>
                            }) : null}
                            {selected ? <InfoWindow onCloseClick={() => setSelected(null)} position={{ lat: selected.latitude, lng: selected.longitude }}>
                                <div>
                                    <p>{selected.name}</p>
                                    <p>{selected.phone}</p>
                                    <p>{selected.address}</p>
                                    <p>{selected.city}</p>
                                    <p>{selected.region}</p>
                                    <p>{selected.country}</p>
                                    <p>{selected.postcode}</p>
                                    <p>{selected.schedule}</p>
                                </div>
                            </InfoWindow> : null}
                        </GoogleMap> : "Loading Map"}
                    </div>
                </section>
                {
                    isProductLoaded ? fullPageLoadingIndicator : null
                }
            </div >
        </>
    );
};
export default CityLocator;
