import * as Yup from 'yup';

export interface ConfModalValues {
    password: string;
    cpassword: string;
}

export const ConfModalSchema = Yup.object({
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    cpassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Field is required'),
})