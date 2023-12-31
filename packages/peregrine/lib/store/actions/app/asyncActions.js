import actions from './actions';

export const toggleDrawer = name => async dispatch =>
    dispatch(actions.toggleDrawer(name));

export const closeDrawer = () => async dispatch =>
    dispatch(actions.toggleDrawer(null));

// export const addCompareListUid = () => async dispatch =>
//     dispatch(actions.addCompareListUid(value));

/** @deprecated */
export const toggleSearch = () => async dispatch =>
    dispatch(actions.toggleSearch());

