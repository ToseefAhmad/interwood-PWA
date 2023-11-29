import {gql} from '@apollo/client';

export const GET_BANNERS_SLIDERS = gql`
    query getSliders {
        getSliders{
            name
            banner_slider{
                content
                url_banner
                banner_id
                image
                title
                position
            }
        }
    }
`;
export default {
    getSliders: GET_BANNERS_SLIDERS
};
