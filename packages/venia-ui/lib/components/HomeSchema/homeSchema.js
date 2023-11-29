import React, {useEffect} from "react";
import {useGetHomeSchema} from "@magento/peregrine/lib/talons/HomeSchema/useGetHomeSchema";
import {Helmet} from "react-helmet-async";

const HomeSchema = () => {

    const talonProps = useGetHomeSchema();
    const {data} = talonProps;

    useEffect(() => {
        if (data && data.getHomePageSchema) {
            let script;
            data.getHomePageSchema.map(item => {
                    script = item;
                    script = script.replace(/(\\r\\n|\\r|\\n)/g, '');
                    var script_tag = document.createElement('script');
                    script_tag.type = 'application/ld+json';
                    script_tag.text = script;
                    document.head.append(script_tag);
                }
            )

        }
    }, [data])
    return (
        <Helmet>
            <meta name="google-site-verification" content="QvDDs4UkTXNEe9Ex32Iw3ZacZu3-TXAat0ou7CKRrR4" />
        </Helmet>
    );

}

export default HomeSchema;
