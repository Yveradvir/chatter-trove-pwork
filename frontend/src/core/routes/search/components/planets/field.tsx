import clsx from "clsx";
import Switchbu from "@core/components/switchbu";
import { useAppDispatch } from "@core/reducers";
import { planetsActions } from "@core/reducers/slices/planets";
import { Form, Formik } from "formik";
import { useEffect } from "react";
import { FaDotCircle, FaEquals, FaLock, FaUnlock } from "react-icons/fa";
import { FiArrowDown, FiArrowUp, FiFilter, FiInbox } from "react-icons/fi";
import { TbStepInto } from "react-icons/tb";
import { PlanetFilterInterface, planetFilterSchema } from "./vd";

const PlanetsSearchField = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(
            planetsActions.change_beReady({
                new: true
            })
        );
    }, [dispatch]);

    return (
        <Formik
            initialValues={{
                filter: "",
                planetname: "",
                ordering: "",
                isPrivate: null,
            } as PlanetFilterInterface}
            validationSchema={planetFilterSchema}
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
                            field_name="planetname"
                            states={[
                                {
                                    tooltip: {
                                        content: "Exact match in planet name",
                                        placement: "top",
                                        children: <></>,
                                    },
                                    content: <FaEquals />,
                                    field_value: "",
                                },
                                {
                                    tooltip: {
                                        content: "Starts with in planet name",
                                        placement: "top",
                                        children: <></>,
                                    },
                                    content: <FiInbox />,
                                    field_value: "__istartswith",
                                },
                                {
                                    tooltip: {
                                        content: "Contains in planet name",
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
                        <Switchbu
                            field_name="isPrivate"
                            states={[
                                {
                                    tooltip: {
                                        content: "All",
                                        placement: "top",
                                        children: <></>,
                                    },
                                    content: <FaDotCircle />,
                                    field_value: null,
                                },
                                {
                                    tooltip: {
                                        content: "Only private",
                                        placement: "top",
                                        children: <></>,
                                    },
                                    content: <FaLock />,
                                    field_value: true,
                                },                                
                                {
                                    tooltip: {
                                        content: "Only public",
                                        placement: "top",
                                        children: <></>,
                                    },
                                    content: <FaUnlock />,
                                    field_value: false,
                                },
                            ]}
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            onClick={() => {
                                console.log(values)
                                dispatch(planetsActions.change_filters(values))
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

export default PlanetsSearchField;