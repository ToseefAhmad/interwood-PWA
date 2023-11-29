import { gql } from '@apollo/client';

export const FORM_SUBMISSION = gql`
    mutation FormSubmission($name: String!, $email: String!, $job_title: String!, $phone: String!, $expected_salary:String!, $file_content: String!, $file_name: String!) {
        ApplyFormSubmit(input: { name: $name, email: $email, job_title: $job_title, phone: $phone, expected_salary: $expected_salary, file_content: $file_content, file_name: $file_name }){
            success_message
        }
    }
`;