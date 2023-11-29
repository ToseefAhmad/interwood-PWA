import React, { Fragment, useEffect, useMemo } from 'react'; 

import { useCompareListBlock } from '@magento/peregrine/lib/talons/CompareList/useCompareListBlock';
import classify from '../../classify';
import LoadingIndicator from '../LoadingIndicator';
import { Portal } from '../Portal';
import Item from './Item';
import defaultClasses from './compareList.css';
import { Link } from '@magento/venia-drivers';

const CompareListBlock = () => {
    const {
        dataList,
        compareListUid,
        handleOpenFilters,
        drawer,
        removeProductFromListHandler,
        dataLoading,
        closeDrawer,
        isToggle,
        setIsToggle
     } = useCompareListBlock();
     
    const itemsList = dataList.length !== 0 ? dataList.compareList.items : [];
    const toggleHandler = itemsList.length ? <button className="compare-sticky" onClick={handleOpenFilters}>
        <img src={require("../../assets/img/compare.svg")} alt="Sticky" />
    </button> : null;

    const itemsIteration = itemsList ?  itemsList.map((item) => {
                return <Item item={item} removeProductFromListHandler={removeProductFromListHandler} />
            })
        
    : null

    useMemo(() => {
        if( isToggle && itemsList.length == 0 && drawer == 'compareList')   {
            closeDrawer()
            setIsToggle(false)
        }

     }, [closeDrawer, itemsList, drawer,  isToggle, setIsToggle]);

    return (
        <Fragment>
            {toggleHandler}
            {
                drawer == 'compareList' && itemsList ?
                dataLoading ? <LoadingIndicator>{'Fetching Products...'}</LoadingIndicator> : 
                <div className="custom-modal">
                <div className="custom-modal-header">
                    <h2>Compare List</h2>
                    <button className="modal-close" onClick={handleOpenFilters}>
                        <img src={require("../../assets/img/close.svg")} alt="Heart" />
                    </button>
                </div>
                <div className="custom-modal-body">
                    <ul>
                        {itemsIteration}
                    </ul>
                </div>
                {
                    itemsList.length ? 
                    <div className="action-compare">
                        <Link to='/compare-products'>
                            Compare
                        </Link>
                    </div> : null
                }
                </div>
                : null
            }
        </Fragment>
    )

}
export default classify(defaultClasses)(CompareListBlock);