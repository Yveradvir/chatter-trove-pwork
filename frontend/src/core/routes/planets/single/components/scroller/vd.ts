import * as Yup from 'yup';

export interface ScrollerFilterInterface {
    filter: string;
    title: "" | "istartswith";
    ordering: "" | "-"; 
}

export const scrollerFilterSchema = Yup.object({
    filter: Yup.string()
        .max(40, "Filter must be at most 40 characters")
        .required("Filter is required"),
    title: Yup.string()
        .oneOf(["", "istartswith"])
        .required("Title is required"),
    ordering: Yup.string()
        .oneOf(["", "-"])
        .required("Ordering is required"),
});
