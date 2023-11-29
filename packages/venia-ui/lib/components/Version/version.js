import React, { Fragment, useEffect, useState, useCallback, useMemo } from "react";
import { useApolloClient } from '@apollo/client';
import { CachePersistor } from 'apollo-cache-persist';

import { clearStore } from '@magento/peregrine/lib/Apollo/clearStore';

import { useVersion } from "@magento/peregrine/lib/talons/Version/useVersion";
import Popup from "reactjs-popup";


const Version = () => {

    const version = 'v19';
    const [reload, setReload] = useState(false);
    const [cache, setCache] = useState(false)

    const talonProps = useVersion();
    const { data } = talonProps;

    useEffect(() => {
        if (data && data.PwaVersion && data.PwaVersion != version) {
            setReload(true);
        }
    }, [data, setReload]);

    const handleCache = () => {
        setCache(true);
        // const client = useApolloClient();
        // const persistor = new CachePersistor();
        // clearStore(client, persistor);
        // window.location.reload();

    }

    useMemo((async) => {

        if (reload) {

            const client = useApolloClient();
            const persistor = new CachePersistor({
                cache: client.cache,
                storage: window.localStorage,
            });
            // async() => {
            //     await client.clearStore();
            //     window.location.reload();
            // };
            // const client = useApolloClient();
            // const persistor = new CachePersistor();
            clearStore(client, persistor);
            // window.location.reload();
            if ('caches' in window) {
                caches.keys().then((names) => {
                    // Delete all the cache files
                    names.forEach(name => {
                        caches.delete(name);
                    })
                });

                // Makes sure the page reloads. Changes are only visible after you refresh.
                window.location.reload();
                setReload(false);

            }
        };


    }, [reload, setReload])

    //     <div className="modal">
    //     <Popup
    //         repositionOnResize={true}
    //         lockScroll={true}
    //         offsetX={900}
    //         offsetY={460}
    //         position={"center center"}
    //         open={false}
    //         modal
    //         nested>{
    //         close => (
    //             <div className="modal-content-custom modal-data-reload">
    //                 <div className="modal-body">
    //                     <h3>New App Version  Is Available</h3>
    //                     {/* <p>Click on Reload button for updated data.</p> */}
    //                     <button className="btn btn-modal"  onClick={handleCache}>Reload</button>
    //                 </div>
    //             </div>
    //         )
    //     }
    //     </Popup>
    // </div>
    return (
        <Fragment>

        </Fragment>
    )
}

export default Version;
