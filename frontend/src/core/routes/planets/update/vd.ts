import * as Yup from 'yup';

export interface PlanetUpdateValues {
    planetname: string;
    nickname: string;
    description: string;
    planet: number;
}

export const updatePlanetSchema = Yup.object({
    planetname: Yup.string()
        .max(40, "Planet name should be no longer than 40 characters")
        .min(3, "Planet name must be at least 3 characters")
        .required("Planet name is required"),
    nickname: Yup.string()
        .max(80, "Nickname should be no longer than 80 characters")
        .min(3, "Nickname name must be at least 3 characters")
        .required("Nickname is required"),
    description: Yup.string()
        .max(2000, "Description of the planet should be no longer thab 2000 symbols")
        .min(20, "Description of the planet should be at least 20 symbols"),
    planet: Yup.number()
});
