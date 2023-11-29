import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { useStoreLocator } from '@magento/peregrine/lib/talons/StoreLocator/useStoreLocator';
import { useWindowSize, useToasts } from '@magento/peregrine';

import LoadingIndicator from '../LoadingIndicator';
import Stores from './Stores';
import classify from '../../classify';
import defaultClass from './stores.css';
import { Title } from '../Head';
import {
    GoogleMap,
    LoadScript,
    Marker,
    InfoWindow
} from '@react-google-maps/api';
import SearchStores from './SearchStores';

const google = window.google;
const StoreLocator = () => {
    const [fetchError, setError] = useState('');
    const [dataLoading, setDataLoading] = useState(false);
    const [stores, setStores] = useState([]);
    const [apiKey, setApiKey] = useState(
        'AIzaSyA3_pVkCUJwqRExMITDYRtuRZiW-i6Q6yA'
    );
    const [defaultLat, setDefaultLat] = useState(51.4935057);
    const [defaultLng, setDefaultLng] = useState(-0.1506621);
    const StoresTalons = useStoreLocator();
    const [selected, setSelected] = useState({});
    const [locations, setLocations] = useState([]);
    const onSelect = item => {
        setSelected(item);
    };
    const mapStyles = {
        height: '400px',
        width: '100%'
    };

    const windowSize = useWindowSize();
    const isMobile = windowSize.innerWidth <= 960;

    useMemo(() => {
        if (history.state && history.state.state !== undefined && isMobile) {
            window.scrollTo({
                left: 0,
                top: 475,
                behavior: 'smooth'
            });
        }
    }, [history.state, isMobile]);

    let defaultCenter;
    if (
        history.state &&
        history.state.state &&
        history.state.state.latitude &&
        history.state.state.longitude
    ) {
        const latitude = history.state.state.latitude;
        const longitude = history.state.state.longitude;
        defaultCenter = {
            lat: latitude,
            lng: longitude
        };
    } else {
        defaultCenter = {
            lat: defaultLat,
            lng: defaultLng
        };
    }
    const [currentPosition, setCurrentPosition] = useState({});
    const success = position => {
        const currentPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        setCurrentPosition(currentPosition);
    };
    const onMarkerDragEnd = e => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        setCurrentPosition({ lat, lng });
    };
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success);
    });
    const {
        data,
        error,
        loading,
        mapsData,
        mapsError,
        mapsLoading
    } = StoresTalons;
    useEffect(() => {
        if (loading || mapsLoading) {
            setDataLoading(true);
        } else if (error) {
            setError(error.message);
        } else if (mapsError) {
            setError(mapsError.message);
        } else if (data) {
            setError('');
            setDataLoading(false);
            setStores([...data.getAllStores]);
            let len = data.getAllStores.length;
            setLocations([{}, {}, {}, {}, {}]);
        }
        if (mapsData && mapsData.getMapsData) {
            if (mapsData.getMapsData.apiKey) {
                setApiKey(mapsData.getMapsData.apiKey);
            }
            if (mapsData.getMapsData.latitude) {
                setDefaultLat(mapsData.getMapsData.latitude);
            }
            if (mapsData.getMapsData.longitude) {
                setDefaultLng(mapsData.getMapsData.longitude);
            }
        }
    }, [data, error, loading, mapsLoading, mapsError, mapsData]);
    let content = null;
    if (dataLoading) {
        content = <LoadingIndicator>{'Loading Stores'}</LoadingIndicator>;
    } else if (fetchError) {
        content = (
            <div>
                <h1> Data Fetching Error: {fetchError}</h1>
            </div>
        );
    } else if (stores.length) {
        let inc = 0;
        content = (
            <div>
                {stores.map((store, idx) => {
                    return (
                        <Stores
                            key={idx}
                            index={inc++}
                            item={store}
                            locations={locations}
                        />
                    );
                })}
            </div>
        );
    }
    return (
        <Fragment>
            <Title>
                {`Store Locator`} - {STORE_NAME}
            </Title>
            <div className="page-has-title">
                <div className="title-header">
                    <h2>
                        <span>STORE</span> LOCATOR
                    </h2>
                </div>
            </div>
            <section className="store-locator-area">
                <div className="store-locator-left-block">
                    {content}
                    <SearchStores />
                </div>

                <div className="store-locator-right-block">
                    <LoadScript googleMapsApiKey={apiKey}>
                        <GoogleMap
                            google={google}
                            mapContainerStyle={mapStyles}
                            zoom={13}
                            center={defaultCenter}
                        >
                            {locations
                                ? locations.map(item => {
                                    return (
                                        <Marker
                                            key={item.name}
                                            position={item.location}
                                            onClick={() => onSelect(item)}
                                        />
                                    );
                                })
                                : null}
                            {selected.location && (
                                <InfoWindow
                                    position={selected.location}
                                    clickable={true}
                                    onCloseClick={() => setSelected({})}
                                >
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
                                </InfoWindow>
                            )}
                            {currentPosition.lat ? (
                                <Marker
                                    position={currentPosition}
                                    onDragEnd={e => onMarkerDragEnd(e)}
                                    draggable={true}
                                />
                            ) : null}
                        </GoogleMap>
                    </LoadScript>
                </div>
            </section>
        </Fragment>
    );
};
export default classify(defaultClass)(StoreLocator);
