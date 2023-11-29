import React, {useEffect} from "react";
import {useGetCategorySchema} from "@magento/peregrine/lib/talons/CategorySchema/useGetCategorySchema";

const CategorySchema = (props) => {

    const {category_id}=props;
    const talonProps = useGetCategorySchema({category_id});
    const {data} = talonProps;

    useEffect(() => {
        if (data && data.getCategoryPageSchema) {
            let script;
            script = data.getCategoryPageSchema;
            script = script.replace(/(\\r\\n|\\r|\\n)/g, '');
            var script_tag = document.createElement('script');
            script_tag.type = 'application/ld+json';
            script_tag.text = script;
            document.head.append(script_tag);
        }

    }, [data])
    return null;

}

export default CategorySchema;
