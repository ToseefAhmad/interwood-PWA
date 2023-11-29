import {useLazyQuery, useMutation} from '@apollo/client';
import {useCallback, useEffect, useState} from "react";

import { useAppContext } from '../../context/app';
import { useUserContext } from '../../context/user';

import mergeOperations from "../../util/shallowMerge";
import DEFAULT_OPERATIONS from "./compareList.gql";

export const useCompareListBlock = (props) => {
    const [
        {compareListUid, drawer},
        {
            actions : {addComparelistUid},
            toggleDrawer,
            closeDrawer
        }
    ] = useAppContext();
    const [loadFilters, setLoadFilters] = useState(false);
    const [ dataList, setItemsLis ] = useState([]);
    const [ isToggle, setIsToggle ] = useState(false)



    const handleOpenFilters = useCallback(() => {
        if(drawer != 'compareList') {
            setLoadFilters(true);
            toggleDrawer('compareList');
        }else if(drawer ==  'compareList') {
            closeDrawer()
        }
    }, [setLoadFilters, toggleDrawer, drawer, closeDrawer]);

    const operations = mergeOperations(DEFAULT_OPERATIONS);
    const {
        createCompareListUidMutation,
        getCompareList,
        addProductsToCompareListMutation,
        removeItemFromComparelistMutation,
        deleteCompareListMutation,
        assignCompareListToUserMutation
    } = operations;

    const [
        { isSignedIn: isUserSignedIn }
    ] = useUserContext();

    const [ runCompareList, { data : bigData, error: dataListError, loadding: dataLoading} ] = useLazyQuery(getCompareList, {
        onCompleted : () => setIsToggle(true)
    });
    const [ runRemoveProduct , { data: removeData, loading: removeLoading }] = useMutation(removeItemFromComparelistMutation, {
        refetchQueries : [{query : getCompareList, variables : {uid : compareListUid}}]
    });
    const [ runAssignList , { data: assignData, called }] = useMutation(assignCompareListToUserMutation);

    const removeProductFromListHandler = useCallback((id) =>{
        if(id && compareListUid) {
            runRemoveProduct({
                variables : {
                    uid : compareListUid,
                    productId: id

                }
            })
            setIsToggle(true)
        }
    }, [compareListUid,  setIsToggle]);

    useEffect(() => {
        if(isUserSignedIn && compareListUid) {
            runAssignList({
                variables : {
                    uid : compareListUid
                }
            })
        }
    }, [ isUserSignedIn, compareListUid])

    useEffect(() => {
        if(assignData){
            if( assignData.assignCompareListToCustomer.result){
                const uid = assignData.assignCompareListToCustomer.compare_list.uid;
                addComparelistUid(uid)
            }
        }
    },  [assignData]);
 

    useEffect(() =>{
        if(compareListUid) {
            runCompareList({
                variables : {
                    uid : compareListUid
                }
            })
        }
    }, [
            compareListUid
        ]
    );
    useEffect(() => {
        if(bigData && compareListUid) {
            setItemsLis(bigData)
        } else {
            setItemsLis([])
        }
    }, [bigData, compareListUid])

    return {
        removeProductFromListHandler,
        compareListUid,
        dataList,
        handleOpenFilters,
        drawer,
        dataLoading,
        closeDrawer,
        isToggle,
        setIsToggle,
        loader : dataLoading || removeLoading
    };
};
