import {useQuery} from '@apollo/client';

import mergeOperations from "../../util/shallowMerge";
import DEFAULT_OPERATIONS from "./recentlyViewed.gql";
import {useCookies} from "react-cookie";

export const useRecentlyViewed = () => {

    const operations = mergeOperations(DEFAULT_OPERATIONS);

    let visitor_id=null;

    const [cookies] = useCookies();

    if(cookies['visitor_id'])
    {
        visitor_id=cookies['visitor_id'];
    }

    const {getRecentlyViewed} = operations;

    const {data, error, loading} = useQuery(getRecentlyViewed,
                {
                    fetchPolicy: 'no-cache',
                    variables: {visitor_id:visitor_id}
        });

    return {
        data,
        error,
        loading
    };
};
