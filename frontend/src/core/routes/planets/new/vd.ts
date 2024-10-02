import * as Yup from 'yup';

export interface CreatePlanetValues {
    planetname: string;
    nickname: string;
    password: string;
    description: string;
}

export const createPlanetSchema = Yup.object({
    planetname: Yup.string()
        .max(40, "Planet name should be no longer than 40 characters")
        .min(3, "Planet name must be at least 3 characters")
        .required("Planet name is required"),
    nickname: Yup.string()
        .max(80, "Nickname should be no longer than 80 characters")
        .required("Nickname is required"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .notRequired(),
    description: Yup.string()
        .max(2000, "Description of the planet should be no longer thab 2000 symbols")
        .min(20, "Description of the planet should be at least 20 symbols")
});
