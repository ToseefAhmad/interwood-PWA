import {useLazyQuery, useMutation} from '@apollo/client';
import {useCallback, useEffect, useState} from "react";
import { useHistory } from 'react-router';

import { useAppContext } from '../../context/app';
import { useUserContext } from '../../context/user';

import mergeOperations from "../../util/shallowMerge";
import DEFAULT_OPERATIONS from "./compareList.gql";

export const useCompareList = (props) => {
    const { productId } = props;
    const [
        {compareListUid, drawer},
        {
            actions : {addComparelistUid},
            toggleDrawer,
            closeDrawer
        }
    ] = useAppContext();
    const [ itemsList, setItemsLis ] = useState([]);
    const history = useHistory();
    const urlPath = history.location.pathname;

    const operations = mergeOperations(DEFAULT_OPERATIONS);
    const {
        createCompareListUidMutation,
        getCompareList,
        addProductsToCompareListMutation,
    } = operations;

    const [
        { isSignedIn: isUserSignedIn }
    ] = useUserContext();

    const [runCreateMutation, { data , error }] = useMutation(createCompareListUidMutation, {
        onCompleted : () => {
            if(urlPath != '/compare-products'){
                toggleDrawer('compareList')
            }
        }
    });
    // const [ runCompareList, { data : dataList, errors: dataListError, loadding: dataLoading} ] = useLazyQuery(getCompareList,{
    //     fetchPolicy : 'no-cache'
    // });
    const [ runAddProducts, { data: dataProducts, error : addError}] = useMutation(addProductsToCompareListMutation , {
        refetchQueries : [{query : getCompareList, variables : {uid : compareListUid}}],
        onCompleted : () => {
            if(urlPath != '/compare-products'){
                toggleDrawer('compareList')
            }
        }
    });
    // const [ runRemoveProduct , { data: removeData }] = useMutation(removeItemFromComparelistMutation);
    // const [ runAssignList , { data: assignData }] = useMutation(assignCompareListToUserMutation);

    const createUidHandler = useCallback(() => {
        if(!compareListUid) {
            runCreateMutation({
                variables : {
                    productsList : [productId]
                }
            })
        }
    },[ productId, compareListUid]);

    useEffect(() => {
        if(!compareListUid && data) {
            const uid = data.createCompareList.uid;
            addComparelistUid(uid);
        }
    }, [data, compareListUid]);


    const addProductsHandler = useCallback(() => {
        if(compareListUid) {
            runAddProducts({
                variables : {
                    uid : compareListUid,
                    productId : [productId]
                }
            })
        }
    }, [compareListUid, productId, toggleDrawer]);

    // const removeProductFromListHandler = useCallback((id) =>{
    //     if(id && compareListUid) {
    //         runRemoveProduct({
    //             variables : {
    //                 uid : compareListUid,

    //             }
    //         })
    //     }
    // }, [compareListUid]);

    // useEffect(() => {
    //     if(isUserSignedIn && compareListUid) {
    //         runAssignList({
    //             variables : {
    //                 uid : compareListUid
    //             }
    //         })
    //     }
    // }, [ isUserSignedIn, compareListUid])

    // useEffect(() =>{
    //     if(compareListUid) {
    //         runCompareList({
    //             variables : {
    //                 uid : compareListUid
    //             }
    //         })
    //     }
    // }, [
    //         compareListUid,
    //         data,
    //         productId,
    //         dataProducts,
    //         removeData,
    //         assignData
    //     ]
    // );
    
    return {
        createUidHandler,
        addProductsHandler,
        compareListUid,
        errors : error,
        addError
    };
};
