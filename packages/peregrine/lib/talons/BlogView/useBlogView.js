import { useQuery, gql } from "@apollo/client";


const Blog_View = gql`
query BlogPostById($id: Int!){
        blogPostsById( post_id: $id)
        {
            post_id
            name
            short_description
            image
            url_key
            author_name
            author_image
            publish_date
            post_content
            thumbnail
            position
            meta_title
            meta_description
            meta_keywords
        }
    }
`;

export const useBlogView = (props) => {
    const intId = parseInt(props);
    const { data, loading, error } = useQuery(Blog_View, {
        fetchPolicy:'cache-and-network',
        variables: {
            id: intId
        }
    });

    return {
        data,
        loading,
        error
    }
}