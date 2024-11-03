import * as Yup from 'yup';

export interface AsteroidValues {
    content: string;
    comet: number;
}

export const createAsteroidSchema = Yup.object({
    content: Yup.string()
        .max(4000, "Content should be no longer than 4000 characters")
        .min(3, "Content name must be at least 3 characters")
        .required("Content is required")
})

export const asteroidFilterSchema = Yup.object({
    reply: Yup.number()
        .nullable(),
    ordering: Yup.string()
        .oneOf(["", "-"])
        .required("Ordering is required"),
})