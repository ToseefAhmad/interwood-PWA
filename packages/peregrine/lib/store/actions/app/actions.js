import { createActions } from 'redux-actions';

const prefix = 'APP';
const actionTypes = [
    'TOGGLE_DRAWER',
    'SET_ONLINE',
    'SET_OFFLINE',
    'TOGGLE_SEARCH',
    'EXECUTE_SEARCH',
    'MARK_ERROR_HANDLED',
    'SET_PAGE_LOADING',
    'ADD_COMPARELIST_UID',
    'SET_CART_TRIGER_FLAG'
];

export default createActions(...actionTypes, { prefix });
