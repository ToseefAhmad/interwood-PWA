import * as Yup from "yup";

// oneOf can be used to check;

export const JobApplicationSchema = Yup.object({
    position: Yup.string()
        .min(4, "Position Must Be Atleast 4 Characters"),
    name: Yup.string()
        .min(4, "Name Must Be Minimum 4 Characters")
        .max(25, "Name Can Be Maximum 25 Characters")
        .required("Name Is Required"),
    email: Yup.string()
        .email("Enter Valid Email")
        .required("Email Is Required"),
    contact: Yup.number()
        .min(11, "Must Be Equal To Or More Then 11 Digits")
        .required("Contact Is Required"),
    cv: Yup.string().required("CV is required"),
    expected_salary: Yup.number().min(4, 'Enter Correct Value').required("Salary is Required")
});