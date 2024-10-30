import * as Yup from 'yup';

export interface ActuallyMembershipsFilterInterface {
    filter: string;
    username: "" | "__istartswith" | "__icontains";
    ordering: string; 
    isActive: boolean | null; 
    for_what: "username" | "nickname";
}

export const planetFilterSchema = Yup.object({
    filter: Yup.string()
        .max(80, "Filter must be at most 80 characters")
        .nullable(),
    username: Yup.string()
        .oneOf(["", "__istartswith", "__icontains"])
        .required("Title is required"),
    for_what: Yup.string()
        .oneOf(["planetname", "nickname"])
        .required("Select one of it"),
    ordering: Yup.string()
        .required("Ordering is required"),
    isActive: Yup.boolean()
        .nullable()
});
