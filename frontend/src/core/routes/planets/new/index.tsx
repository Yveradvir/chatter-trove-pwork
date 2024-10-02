import Layout from "@core/components/layout";
import { useFormik } from "formik";
import {
    Field,
    Input,
    Label,
    Description,
    Transition,
    Textarea,
} from "@headlessui/react";
import clsx from "clsx";
import { useState } from "react";
import { createPlanetSchema, CreatePlanetValues } from "./vd";
import onSubmit from "./fn";
import SpinnerButton from "@core/components/spinnerButton";
import { check_error } from "@core/utils/check_fn";
import { useNavigate } from "react-router-dom";

const NewPlanetPage = () => {
    const navigate = useNavigate();
    const [globalError, setGlobalError] = useState("");

    const formik = useFormik({
        initialValues: {
            planetname: "",
            nickname: "",
            password: "",
            description: "",
        } as CreatePlanetValues,
        validationSchema: createPlanetSchema,
        onSubmit: async (values, actions) => {
            try {
                const planet_id = await onSubmit(values, actions);

                navigate(`/planets/${planet_id}`)
            } catch (e) {
                setGlobalError(check_error(e));
            }
        },
    });

    return (
        <Layout>
            <div className="mx-auto max-w-2xl py-12">
                <Transition
                    show={true}
                    appear={true}
                    enter="transition-opacity duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                >
                    <div className="bg-transparent border border-neutral-900 rounded-xl shadow-lg backdrop-blur-md">
                        <div className="p-6">
                            <div className="text-center">
                                <h1 className="text-3xl font-extrabold text-neutral-50">
                                    Create New Planet
                                </h1>
                            </div>

                            <form
                                onSubmit={formik.handleSubmit}
                                className="space-y-6 mt-5"
                            >
                                <div className="flex gap-4">
                                    <Field className="flex-1">
                                        <Label
                                            htmlFor="planetname"
                                            className="text-sm font-medium text-neutral-300"
                                        >
                                            Planet Name
                                        </Label>
                                        <Description className="text-xs text-neutral-400">
                                            The unique name of your planet.
                                        </Description>
                                        <Input
                                            type="text"
                                            id="planetname"
                                            name="planetname"
                                            className={clsx(
                                                "mt-2 block w-full rounded-lg border-none bg-neutral-800 py-2 px-3 text-sm text-neutral-100",
                                                formik.touched.planetname &&
                                                    formik.errors.planetname
                                                    ? "border-red-500 ring-1 ring-red-500"
                                                    : ""
                                            )}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.planetname}
                                        />
                                        {formik.touched.planetname &&
                                        formik.errors.planetname ? (
                                            <Description className="text-red-500 text-xs mt-1">
                                                {formik.errors.planetname}
                                            </Description>
                                        ) : null}
                                    </Field>
                                </div>

                                <div className="flex gap-4">
                                    <Field className="flex-1">
                                        <Label
                                            htmlFor="nickname"
                                            className="text-sm font-medium text-neutral-300"
                                        >
                                            Nickname
                                        </Label>
                                        <Description className="text-xs text-neutral-400">
                                            A non-unique nickname for your
                                            planet.
                                        </Description>
                                        <Input
                                            type="text"
                                            id="nickname"
                                            name="nickname"
                                            className={clsx(
                                                "mt-2 block w-full rounded-lg border-none bg-neutral-800 py-2 px-3 text-sm text-neutral-100",
                                                formik.touched.nickname &&
                                                    formik.errors.nickname
                                                    ? "border-red-500 ring-1 ring-red-500"
                                                    : ""
                                            )}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.nickname}
                                        />
                                        {formik.touched.nickname &&
                                        formik.errors.nickname ? (
                                            <Description className="text-red-500 text-xs mt-1">
                                                {formik.errors.nickname}
                                            </Description>
                                        ) : null}
                                    </Field>
                                </div>

                                <div className="flex gap-4">
                                    <Field className="flex-1">
                                        <Label
                                            htmlFor="password"
                                            className="text-sm font-medium text-neutral-300"
                                        >
                                            Password (Optional)
                                        </Label>
                                        <Description className="text-xs text-neutral-400">
                                            Set a password to make the planet
                                            private.
                                        </Description>
                                        <Input
                                            type="password"
                                            id="password"
                                            name="password"
                                            className={clsx(
                                                "mt-2 block w-full rounded-lg border-none bg-neutral-800 py-2 px-3 text-sm text-neutral-100",
                                                formik.touched.password &&
                                                    formik.errors.password
                                                    ? "border-red-500 ring-1 ring-red-500"
                                                    : ""
                                            )}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.password}
                                        />
                                        {formik.touched.password &&
                                        formik.errors.password ? (
                                            <Description className="text-red-500 text-xs mt-1">
                                                {formik.errors.password}
                                            </Description>
                                        ) : null}
                                    </Field>
                                </div>

                                <div className="flex gap-4">
                                    <Field className="flex-1">
                                        <Label
                                            htmlFor="description"
                                            className="text-sm font-medium text-neutral-300"
                                        >
                                            Description
                                        </Label>
                                        <Description className="text-xs text-neutral-400">
                                            A brief description of your planet.
                                        </Description>
                                        <Textarea
                                            id="description"
                                            name="description"
                                            className={clsx(
                                                "mt-2 block w-full rounded-lg border-none bg-neutral-800 py-2 px-3 text-sm text-neutral-100",
                                                formik.touched.description &&
                                                    formik.errors.description
                                                    ? "border-red-500 ring-1 ring-red-500"
                                                    : ""
                                            )}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.description}
                                        />
                                        {formik.touched.description &&
                                        formik.errors.description ? (
                                            <Description className="text-red-500 text-xs mt-1">
                                                {formik.errors.description}
                                            </Description>
                                        ) : null}
                                    </Field>
                                </div>

                                <SpinnerButton
                                    text="Create Planet"
                                    isValid={formik.isValid}
                                    isSubmitting={formik.isSubmitting}
                                />
                                {globalError && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {globalError}
                                    </p>
                                )}
                            </form>
                        </div>
                    </div>
                </Transition>
            </div>
        </Layout>
    );
};

export default NewPlanetPage;
