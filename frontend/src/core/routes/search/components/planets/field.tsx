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
import { IoPlanetSharp } from "react-icons/io5";
import { GiPlanetCore } from "react-icons/gi";
import { RiPlanetLine } from "react-icons/ri";

const PlanetsSearchField = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(planetsActions.change_beReady({ new: true }));
    }, [dispatch]);

    return (
        <Formik
            initialValues={
                {
                    for_what: "planetname",
                    filter: "",
                    planetname: "",
                    ordering: "-created_at",
                    isPrivate: null,
                } as PlanetFilterInterface
            }
            validationSchema={planetFilterSchema}
            onSubmit={() => {}}
        >
            {({ handleChange, handleBlur, values, touched, errors }) => (
                <Form className="space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="flex-1">
                            <input
                                type="text"
                                id="filter"
                                name="filter"
                                placeholder="Filter Text"
                                className={clsx(
                                    "block w-full rounded-lg border-none bg-neutral-800 py-2 px-3 text-sm text-neutral-100",
                                    touched.filter && errors.filter
                                        ? "border-red-500 ring-1 ring-red-500"
                                        : ""
                                )}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.filter}
                                aria-label="Filter Text"
                            />
                            {touched.filter && errors.filter && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.filter}
                                </p>
                            )}
                        </div>
                        <button
                            type="submit"
                            onClick={() => {                                
                                dispatch(
                                    planetsActions.change_beReady({
                                        new: false,
                                    })
                                );
                                dispatch(planetsActions.change_filters(values));
                                dispatch(
                                    planetsActions.change_beReady({ new: true })
                                );
                            }}
                            className="px-4 py-2 flex items-center space-x-2 text-white rounded-md bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700"
                        >
                            <FiFilter />
                            <span>Apply</span>
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4 items-center">
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
                            field_name="for_what"
                            states={[
                                {
                                    tooltip: {
                                        content: "For PlanetName (unique name)",
                                        placement: "top",
                                        children: <></>,
                                    },
                                    content: <IoPlanetSharp />,
                                    field_value: "planetname",
                                },
                                {
                                    tooltip: {
                                        content:
                                            "For planet nickname (non-unique name)",
                                        placement: "top",
                                        children: <></>,
                                    },
                                    content: <RiPlanetLine />,
                                    field_value: "nickname",
                                },
                                {
                                    tooltip: {
                                        content: "For description",
                                        placement: "top",
                                        children: <></>,
                                    },
                                    content: <GiPlanetCore />,
                                    field_value: "description",
                                },
                            ]}
                        />
                        <Switchbu
                            field_name="ordering"
                            states={[
                                {
                                    tooltip: {
                                        content: "Newest",
                                        placement: "top",
                                        children: <></>,
                                    },
                                    content: <FiArrowDown />,
                                    field_value: "-created_at",
                                },
                                {
                                    tooltip: {
                                        content: "Oldest",
                                        placement: "top",
                                        children: <></>,
                                    },
                                    content: <FiArrowUp />,
                                    field_value: "created_at",
                                },
                                {
                                    tooltip: {
                                        content: "More Popularity",
                                        placement: "top",
                                        children: <></>,
                                    },
                                    content: <FiArrowDown />,
                                    field_value: "-popularity",
                                },
                                {
                                    tooltip: {
                                        content: "Less popularity",
                                        placement: "top",
                                        children: <></>,
                                    },
                                    content: <FiArrowUp />,
                                    field_value: "popularity",
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
                </Form>
            )}
        </Formik>
    );
};

export default PlanetsSearchField;
