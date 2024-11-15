import * as Yup from 'yup';

export interface CometUpdateValues {
    title: string;
    description: string;
    comet: number;
}

export const updateCometSchema = Yup.object({
    title: Yup.string()
        .max(80, "Comet's name should be no longer than 80 characters")
        .min(3, "Comet's name must be at least 3 characters")
        .required("Comet's name is required"),
    description: Yup.string()
        .max(40000, "Description of the comet should be no longer thab 40 000 symbols")
        .min(20, "Description of the comet should be at least 20 symbols"),
    comet: Yup.number()
})