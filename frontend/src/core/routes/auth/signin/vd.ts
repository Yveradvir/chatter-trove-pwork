import * as Yup from 'yup';

export interface SignUpValues {
    username: string;
    nickname: string;
    email: string;
    password: string;
    cpassword: string;
    pfp: string;
}

export const SignUpSchema = Yup.object({
    username: Yup.string()
        .max(40, "Username should be no longer than 40 characters")
        .min(3, "Username must be at least 3 characters")
        .required("Username is required"),
    nickname: Yup.string()
        .max(40, "Nickname should be no longer than 40 characters")
        .min(3, "Nickname must be at least 3 characters")
        .required("Nickname is required"),
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    cpassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Field is required'),
    pfp: Yup.string()
        .nullable()
        .notRequired()
})