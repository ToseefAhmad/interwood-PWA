import { gql, useQuery } from '@apollo/client';

const GETSALEPOPUP = gql`
    query promotionsPopUpBox{
        promotionsPopUpBox{
            title
            image
            url
            days
            description
        }
}`;

export const useSalePopUp = () => {
    const { data } = useQuery(GETSALEPOPUP,{fetchPolicy: 'network-only' });

    return {
        data
    }
};
