import { handleActions } from 'redux-actions';

import actions from '../actions/app';

export const name = 'app';

const initialState = {
    drawer: null,
    hasBeenOffline: !navigator.onLine,
    isOnline: navigator.onLine,
    isPageLoading: false,
    overlay: false,
    pending: {},
    searchOpen: false,
    compareListUid: '',
    cartTrigerFlag : false
};

const reducerMap = {
    [actions.toggleDrawer]: (state, { payload }) => {
        return {
            ...state,
            drawer: payload,
            overlay: !!payload
        };
    },
    [actions.toggleSearch]: state => {
        return {
            ...state,
            searchOpen: !state.searchOpen
        };
    },
    [actions.setOnline]: state => {
        return {
            ...state,
            isOnline: true
        };
    },
    [actions.setOffline]: state => {
        return {
            ...state,
            isOnline: false,
            hasBeenOffline: true
        };
    },
    [actions.setPageLoading]: (state, { payload }) => {
        return {
            ...state,
            isPageLoading: !!payload
        };
    },
    [actions.addComparelistUid]: (state, { payload }) => {
        return {
            ...state,
            compareListUid: payload
        };
    },
    [actions.setCartTrigerFlag]: (state, { payload }) => {
        return {
            ...state,
            cartTrigerFlag: payload
        };
    }
};

export default handleActions(reducerMap, initialState);
