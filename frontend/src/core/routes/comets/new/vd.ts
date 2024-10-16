import * as Yup from 'yup';

export interface CometValues {
    title: string;
    description: string;
    user: number;
    planet: number;
}

export const createCometSchema = Yup.object({
    title: Yup.string()
        .max(80, "Planet name should be no longer than 80 characters")
        .min(3, "Planet name must be at least 3 characters")
        .required("Planet name is required"),
    description: Yup.string()
        .max(6000, "Description of the planet should be no longer thab 6000 symbols")
        .min(20, "Description of the planet should be at least 20 symbols"),
    user: Yup.number(),
    planet: Yup.number()
})
