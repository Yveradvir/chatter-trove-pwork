import Layout from "@core/components/layout";
import IsAuthenticated from "@core/decorators/isAuthenticated";
import { useAppDispatch, useAppSelector } from "@core/reducers";
import { ProfileEntity } from "@core/reducers/slices/profile/state";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { CometUpdateValues, updateCometSchema } from "./vd";
import {
    Field,
    Label,
    Description,
    Input,
    Transition,
    Textarea,
} from "@headlessui/react";
import clsx from "clsx";
import SpinnerButton from "@core/components/spinnerButton";
import { useEffect, useState } from "react";
import { check_error } from "@core/utils/check_fn";
import { loadComet, onSubmit } from "./fn";
import InPlanet from "@core/decorators/inPlanet";
import { CometEntity } from "@core/reducers/slices/comets/state";
import { errorActions } from "@core/reducers/slices/error";
import { ApiError } from "@core/utils/const";
import { Rejector } from "@core/utils/rejector";

const UpdateCometPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { planet_id, comet_id } = useParams<{
        planet_id: string;
        comet_id: string;
    }>();
    const cometId = parseInt(comet_id!, 10);

    const [comet, setComet] = useState<CometEntity | null>(null);
    const [globalError, setGlobalError] = useState("");
    const user = useAppSelector(
        (state) => state.profile.entity
    ) as ProfileEntity;

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            comet: cometId,
        } as CometUpdateValues,
        validationSchema: updateCometSchema,
        onSubmit: async (values, actions) => {
            try {
                const comet_id = await onSubmit(values, actions);
                navigate(`/planets/${planet_id}/comets/${comet_id}`);
            } catch (e) {
                setGlobalError(check_error(e));
            }
        },
    });

    useEffect(() => {
        try {
            (async () => {
                const comet = await loadComet(cometId);
                setComet(comet);
            })();
        } catch (error) {
            dispatch(
                errorActions.setError({
                    error: Rejector.standartAxiosReject(error),
                })
            );
        }

        if (comet) {
            
            if (comet.user !== user.id) {
                dispatch(
                    errorActions.setError({
                        error: {
                            detail: "You're not an author",
                            status_code: 403,
                        } as ApiError,
                        to: `/planets/${planet_id}/comets/${comet_id}`,
                    })
                );
            } else {
                if (formik.values.title === "") {
                    formik.setFieldValue("title", comet.title);
                }
    
                if (formik.values.description === "") {
                    formik.setFieldValue("description", comet.description);
                }
            }
        }
    }, [comet, cometId, comet_id, dispatch, planet_id, user.id, formik]);

    return (
        <>
            <InPlanet planet_id={planet_id} strict={true} />
            <IsAuthenticated />
            <Layout>
                <div className="mx-auto max-w-2xl py-12">
                    <Transition
                        show={true}
                        appear={true}
                        enter="transition-opacity duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                    >
                        <div className="bg-neutral-900 border border-neutral-700 rounded-xl shadow-lg backdrop-blur-md">
                            <div className="p-6">
                                <div className="text-center">
                                    <h1 className="text-3xl font-extrabold text-neutral-50">
                                        Update the Comet
                                    </h1>
                                </div>
                                <form
                                    onSubmit={formik.handleSubmit}
                                    className="space-y-6 mt-5"
                                >
                                    <div className="space-y-4">
                                        <Field>
                                            <Label
                                                htmlFor="title"
                                                className="text-sm font-medium text-neutral-300"
                                            >
                                                Title
                                            </Label>
                                            <Description className="text-xs text-neutral-400">
                                                The title of your comet
                                            </Description>
                                            <Input
                                                type="text"
                                                id="title"
                                                name="title"
                                                className={clsx(
                                                    "mt-2 block w-full rounded-lg border-none bg-neutral-800 py-2 px-3 text-sm text-neutral-100 focus:ring focus:ring-neutral-500",
                                                    formik.touched.title &&
                                                        formik.errors.title
                                                        ? "ring-1 ring-red-500"
                                                        : ""
                                                )}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.title}
                                            />
                                            {formik.touched.title &&
                                            formik.errors.title ? (
                                                <Description className="text-red-500 text-xs mt-1">
                                                    {formik.errors.title}
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
                                                A brief description of your
                                                planet.
                                            </Description>
                                            <Textarea
                                                id="description"
                                                name="description"
                                                className={clsx(
                                                    "mt-2 block w-full rounded-lg border-none bg-neutral-800 py-2 px-3 text-sm text-neutral-100",
                                                    formik.touched
                                                        .description &&
                                                        formik.errors
                                                            .description
                                                        ? "border-red-500 ring-1 ring-red-500"
                                                        : ""
                                                )}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={
                                                    formik.values.description
                                                }
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
                                        text="Update Comet"
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
        </>
    );
};

export default UpdateCometPage;
