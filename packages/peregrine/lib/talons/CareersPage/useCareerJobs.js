import { gql, useQuery } from '@apollo/client';


const GET_ACTIVE_CAREERS = gql`
    query CareerJobs {
        career_jobs {
 		        position_title
                experience
                qualification
                purpose
                responsibilities
                skill_set
                age
                }
    }
`;

export const useCareerJobs = () => {
    const { loading, data, error } = useQuery(GET_ACTIVE_CAREERS, {
        fetchPolicy: "cache-and-network"
    });

    return {
        loading,
        error,
        data
    }
}
