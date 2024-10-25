import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import { FiFilter, FiArrowUp, FiArrowDown, FiInbox } from "react-icons/fi";
import clsx from "clsx";
import Switchbu from "@core/components/switchbu";
import { scrollerFilterSchema } from "./vd";
import { TbStepInto } from "react-icons/tb";
import { FaEquals } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { cometsActions } from "@core/reducers/slices/comets";
import { useAppDispatch } from "@core/reducers";

const FilterField: React.FC = () => {
    const dispatch = useAppDispatch();
    const { planet_id } = useParams<{ planet_id: string }>();

    useEffect(() => {
        dispatch(
            cometsActions.change_beReady({
                new: true,
                planet: parseInt(planet_id as string, 10),
            })
        );
    }, [planet_id, dispatch]);

    return (
        <Formik
            initialValues={{
                filter: "",
                title: "",
                ordering: "",
                planet: parseInt(planet_id as string, 10),
            }}
            validationSchema={scrollerFilterSchema}
            onSubmit={() => {}}
        >
            {({ handleChange, handleBlur, values, touched, errors }) => (
                <Form className="flex items-center gap-4">
                    <div className="flex-1">
                        <input
                            type="text"
                            id="filter"
                            name="filter"
                            placeholder="Filter Text"
                            className={clsx(
                                "block w-full rounded-lg border-none bg-neutral-800 py-2 px-3 text-sm text-neutral-100",
                                touched.filter && errors.filter ? "border-red-500 ring-1 ring-red-500" : ""
                            )}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.filter}
                            aria-label="Filter Text"
                        />
                        {touched.filter && errors.filter && (
                            <p className="text-red-500 text-xs mt-1">{errors.filter}</p>
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        <Switchbu
                            field_name="title"
                            states={[
                                {
                                    tooltip: {
                                        content: "Exact match in title",
                                        placement: "top",
                                        children: <></>,
                                    },
                                    content: <FaEquals />,
                                    field_value: "",
                                },
                                {
                                    tooltip: {
                                        content: "Starts with in title",
                                        placement: "top",
                                        children: <></>,
                                    },
                                    content: <FiInbox />,
                                    field_value: "__istartswith",
                                },
                                {
                                    tooltip: {
                                        content: "Contains in title",
                                        placement: "top",
                                        children: <></>,
                                    },
                                    content: <TbStepInto />,
                                    field_value: "__icontains",
                                },
                            ]}
                        />

                        <Switchbu
                            field_name="ordering"
                            states={[
                                {
                                    tooltip: {
                                        content: "Ascending order",
                                        placement: "top",
                                        children: <></>,
                                    },
                                    content: <FiArrowUp />,
                                    field_value: "",
                                },
                                {
                                    tooltip: {
                                        content: "Descending order",
                                        placement: "top",
                                        children: <></>,
                                    },
                                    content: <FiArrowDown />,
                                    field_value: "-",
                                },
                            ]}
                        />
                    </div>
                    <input type="hidden" name="planet" value={values.planet} />
                    <div>
                        <button
                            type="submit"
                            onClick={() => {
                                dispatch(cometsActions.change_beReady({new: false}))
                                dispatch(cometsActions.change_filters(values))
                                dispatch(cometsActions.change_beReady({new: true}))
                            }}
                            className="px-4 py-2 flex items-center space-x-2 text-white rounded-md bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700"
                        >
                            <FiFilter />
                            <span>Apply</span>
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default FilterField;
