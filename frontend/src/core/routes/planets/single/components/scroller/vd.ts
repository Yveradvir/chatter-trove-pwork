import * as Yup from 'yup';

export interface ScrollerFilterInterface {
    filter: string;
    title: "" | "__istartswith" | "__icontains";
    ordering: "" | "-"; 
    planet: number;
}

export const scrollerFilterSchema = Yup.object({
    filter: Yup.string()
        .max(80, "Filter must be at most 80 characters")
        .required("Filter is required"),
    title: Yup.string()
        .oneOf(["", "__istartswith", "__icontains"])
        .required("Title is required"),
    ordering: Yup.string()
        .oneOf(["", "-"])
        .required("Ordering is required"),
    planet: Yup.number()
});
