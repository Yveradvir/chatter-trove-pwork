import * as Yup from 'yup';

export interface PlanetFilterInterface {
    filter: string;
    planetname: "" | "__istartswith" | "__icontains";
    ordering: "" | "-"; 
    isPrivate: boolean | null; //null means all
    for_what: "planetname" | "nickname" | "description";
}

export const planetFilterSchema = Yup.object({
    filter: Yup.string()
        .max(80, "Filter must be at most 80 characters")
        .nullable(),
    planetname: Yup.string()
        .oneOf(["", "__istartswith", "__icontains"])
        .required("Title is required"),
    for_what: Yup.string()
        .oneOf(["planetname", "nickname", "description"])
        .required("Select one of it"),
    ordering: Yup.string()
        .oneOf(["", "-"])
        .required("Ordering is required"),
    isPrivate: Yup.boolean()
        .nullable()
});
