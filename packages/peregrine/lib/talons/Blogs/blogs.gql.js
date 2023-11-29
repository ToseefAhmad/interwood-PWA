import {gql} from '@apollo/client';

export const GET_ALL_BLOGS = gql`
    query blogPosts {
        blogPosts{
            post_id
            image
            thumbnail
            url_key
            name
            short_description
            author_name
            author_image
            publish_date
            post_content
            meta_description
            meta_keywords
            meta_title
        }
    }
`;

export const GET_BLOG_CATEGORIES = gql`
    query blogCategories {
        blogCategories{
            category
            blogs{
                post_id
                image
                thumbnail
                url_key
                name
                short_description
                author_name
                author_image
                publish_date
                post_content
                position
                meta_description
                meta_keywords
                meta_title
            }
        }
    }
`;


export default {
    blogPosts: GET_ALL_BLOGS ,
    blogCategories:GET_BLOG_CATEGORIES
};
