import React, { Fragment, useMemo } from 'react'; 
// import { useToasts } from '@magento/peregrine';

import { useWishListControl } from '@magento/peregrine/lib/talons/WishListControl/useWishListControl';

const WishListControl = ( props ) => {
    const { id, item } = props;
    // const [, { addToast }] = useToasts();


    const talonProps = useWishListControl({
        id,
        item
    });
    const { addItemToWishList, removeItm, removeItem , addItem } = talonProps;

//    useMemo(() => {
//        if(addItemToWishList){
//         addToast({
//             type: 'error',
//             message: 'Adding some string',
//             timeout: 3000
//         });
//        }
//     }, [addToast, userStatus]);

    let content =  addItem ?
        <div className="wishlist-button" onClick={addItemToWishList}><img src={require("../../assets/img/heart.svg")} alt="Heart" /></div>  :
        removeItm  ? 
        <div className="wishlist-button" onClick={removeItem}><img src={require("../../assets/img/heart-solid.svg")} alt="Heart" /></div>
        : null

    return(
       <Fragment>
            {content}
       </Fragment>
    )
}

export default WishListControl;