import {gql} from '@apollo/client';

export const ADD_TO_WISHLIST = gql`
    mutation AddItemToWishList($productId : Int! ){
        addToWishlist(product_id: $productId) 
    }
`;

export const REMOVE_TO_WISHLIST = gql`
    mutation removeItemFromWishList($productId : Int! ){
        removeFromWishlist(product_id: $productId) 
    }
`;


export default {
    addToWishlistMutation : ADD_TO_WISHLIST,
    removeItemFromWishList : REMOVE_TO_WISHLIST
};
