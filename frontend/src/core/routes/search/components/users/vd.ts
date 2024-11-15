import * as Yup from 'yup';

export interface UsersFilterInterface {
    filter: string;
    username: "" | "__istartswith" | "__icontains";
    ordering: string; 
    isOnline: boolean | null; //null means all
    for_what: "username" | "nickname";
}

export const usersFilterSchema = Yup.object({
    filter: Yup.string()
        .max(80, "Filter must be at most 80 characters")
        .nullable(),
    username: Yup.string()
        .oneOf(["", "__istartswith", "__icontains"])
        .required("Title is required"),
    for_what: Yup.string()
        .required("Select one of it"),
    ordering: Yup.string()
        .required("Ordering is required"),
    isOnline: Yup.boolean()
        .nullable()
});
