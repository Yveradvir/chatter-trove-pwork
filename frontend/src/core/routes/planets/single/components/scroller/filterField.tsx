import { Switch } from "@headlessui/react";
import { Field, Form, useFormik } from "formik";
import clsx from "clsx";

const FilterField = () => {
    const formik = useFormik({
        initialValues: {
            filter: "",
            strict_filter: false,
            partial_match: false,
            ordering: true,
        },
        onSubmit: (values) => console.log(values)
    });

    return (
        <div></div>
    );
};

export default FilterField;
