import * as Yup from 'yup';

export interface SignInValues {
    username: string;
    password: string;
    cpassword: string;
}

export const SignInSchema = Yup.object({
    username: Yup.string()
        .max(40, "Username should be no longer than 40 characters")
        .min(3, "Username must be at least 3 characters")
        .required("Username is required"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    cpassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Field is required'),
})