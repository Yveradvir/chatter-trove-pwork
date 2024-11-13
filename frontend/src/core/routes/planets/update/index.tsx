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
import { useEffect, useState } from "react";
import { updatePlanetSchema, PlanetUpdateValues } from "./vd";
import { loadPlanet, onSubmit } from "./fn";
import SpinnerButton from "@core/components/spinnerButton";
import { check_error } from "@core/utils/check_fn";
import { useNavigate, useParams } from "react-router-dom";
import { PlanetEntity } from "@core/reducers/slices/planets/state";
import { useAppDispatch, useAppSelector } from "@core/reducers";
import { errorActions } from "@core/reducers/slices/error";
import { ApiError } from "@core/utils/const";
import { Rejector } from "@core/utils/rejector";

const UpdatePlanetPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { planet_id } = useParams<{ planet_id: string }>();
    const planetId = parseInt(planet_id!, 10);
    const [planet, setPlanet] = useState<PlanetEntity>();
    const [globalError, setGlobalError] = useState("");

    const planetMemberships = useAppSelector(
        (state) => state.planet_memberships
    );
    const receivedPlanetMembership = Object.values(
        planetMemberships.entities
    ).find((entity) => entity.planet === planetId);

    const formik = useFormik({
        initialValues: {
            planetname: "",
            nickname: "",
            description: "",
            planet: planetId,
        } as PlanetUpdateValues,
        validationSchema: updatePlanetSchema,
        onSubmit: async (values, actions) => {
            try {
                const planet_id = await onSubmit(values, actions);

                navigate(`/planets/${planet_id}`);
            } catch (e) {
                setGlobalError(check_error(e));
            }
        },
    });

    useEffect(() => {
        try {
            (async () => {
                setPlanet(await loadPlanet(planetId))
            })()
        } catch (error) {
            dispatch(
                errorActions.setError({
                    error: Rejector.standartAxiosReject(error),
                })
            );
        }

        if (planet) {
            if (receivedPlanetMembership?.user_role !== 2) {
                dispatch(
                    errorActions.setError({
                        error: {
                            status_code: 403,
                            detail: "You aren't an admin of planet",
                        } as ApiError,
                    })
                );
            } else {
                ["planetname", "nickname", "description"].forEach(element => {
                    if (formik.values[element as keyof PlanetUpdateValues] === "") {
                        formik.setFieldValue(element, planet[element as keyof PlanetEntity])
                    }
                });
            }
        }
    }, [dispatch, formik, planet, planetId, receivedPlanetMembership?.user_role]);

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
                                    Update the Planet
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
                                    text="Update Planet"
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

export default UpdatePlanetPage;
