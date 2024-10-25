import * as Yup from 'yup';

export interface JoinToPrivateValues {
    password: string;
}

export const JoinToPrivateSchema = Yup.object({
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
})