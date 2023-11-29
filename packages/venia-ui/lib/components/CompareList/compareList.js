import React, { useMemo } from 'react';

import {useCompareList} from '@magento/peregrine/lib/talons/CompareList/useCompareList';
import { useToasts } from '@magento/peregrine';

const CompareList = (props) => {
    const { productId } = props;
    const talons = useCompareList({
        productId 
    })
    const {
        createUidHandler,
        addProductsHandler,
        compareListUid,
        errors,
        addError
    } = talons;
    const [, { addToast }] = useToasts();
    
    useMemo(() => {
        if(addError) {
            addToast({
                type: 'error',
                message:'Not allowed to add more than 3 products to compare list',
                timeout: 3000
            });
        }
    }, [addToast, addError]);
    
    return(
        <div className="wishlist-button">
            {
                compareListUid.length === 0 || errors ?
                <img src={require("../../assets/img/compare.svg")} alt="Compare" onClick={createUidHandler}/>
                :
                <img src={require("../../assets/img/compare.svg")} alt="Compare" onClick={addProductsHandler}/>

            }
        </div>
    );
}

export default CompareList;