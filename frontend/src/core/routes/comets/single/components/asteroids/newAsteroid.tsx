import clsx from "clsx";
import { useFormik } from "formik";
import { AsteroidValues, createAsteroidSchema } from "./vd";
import { useState, useEffect } from "react";
import { check_error } from "@core/utils/check_fn";
import ApiService from "@core/utils/api";
import { Description, Textarea, Field, Label } from "@headlessui/react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from "@core/reducers";
import { asteroidsActions } from "@core/reducers/slices/asteroids";

const NewAsteroid: React.FC<{ comet_id: number }> = ({ comet_id }) => {
    const dispatch = useAppDispatch();
    const [globalError, setGlobalError] = useState("");
    const [visibleLabel, setVisibleLabel] = useState(false);
    const {reply, filter} = useAppSelector((state) => state.asteroids);

    const formik = useFormik({
        initialValues: {
            content: "",
            comet: comet_id,
        } as AsteroidValues,
        validationSchema: createAsteroidSchema,
        onSubmit: async (values, actions) => {
            setGlobalError("");
            actions.setSubmitting(true);

            try {
                await ApiService.post("/asteroids/", values);
                actions.resetForm();

                dispatch(asteroidsActions.change_beReady({new: false}))
                dispatch(asteroidsActions.change_filters(filter))
                dispatch(asteroidsActions.change_beReady({new: true}))
            } catch (error) {
                setGlobalError(check_error(error));
            } finally {
                actions.setSubmitting(false);
            }
        },
    });

    useEffect(() => {
        if (reply !== null) {
            setVisibleLabel(true)
        } else {
            setVisibleLabel(false)
        }

        formik.setFieldValue("content", reply + ' ' + formik.values.content)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reply])

    return (
        <div className="mt-4 scroll-snaper">
            <h1 className="text-3xl font-extrabold text-neutral-50">
                Create an Asteroid
            </h1>
            <form onSubmit={formik.handleSubmit} className="flex items-center space-x-4 mt-5">
                <Field className="flex-1">
                    {visibleLabel && (<Label>{"Do not erase 'reply: <id>.' It may make troubles with posting the asteroid"}</Label>)}
                    <Textarea
                        id="content"
                        name="content"
                        className={clsx(
                            "mt-2 block w-full rounded-lg border-none bg-neutral-800 py-2 px-3 text-sm text-neutral-100",
                            formik.touched.content && formik.errors.content
                                ? "border-red-500 ring-1 ring-red-500"
                                : ""
                        )}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.content}
                    />
                    {formik.touched.content && formik.errors.content ? (
                        <Description className="text-red-500 text-xs mt-1">
                            {formik.errors.content}
                        </Description>
                    ) : null}
                </Field>
                <button
                    type="submit"
                    className={`py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-teal-300 text-white hover:bg-teal-400 focus:outline-none focus:bg-teal-400 ${
                        !formik.isValid || formik.isSubmitting
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                    }`}
                    disabled={!formik.isValid || formik.isSubmitting}
                >
                    {formik.isSubmitting ? (
                        <ArrowPathIcon className="w-5 h-5 animate-spin" />
                    ) : (
                        "Send asteroid"
                    )}
                </button>
            </form>
            {globalError && (
                <p className="text-red-500 text-xs mt-1">{globalError}</p>
            )}
        </div>
    );
};

export default NewAsteroid;
