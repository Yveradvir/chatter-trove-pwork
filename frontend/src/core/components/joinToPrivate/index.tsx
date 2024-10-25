import { FormikHelpers, useFormik } from "formik";
import { Transition } from "@headlessui/react";
import clsx from "clsx";
import { Field, Input, Label, Description } from "@headlessui/react";
import SpinnerButton from "../spinnerButton";
import { JoinToPrivateSchema, JoinToPrivateValues } from "./vd";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { check_error } from "@core/utils/check_fn";
import ReactDOM from "react-dom";
import ApiService from "@core/utils/api";

interface JoinToPrivateModalI {
    open: boolean;
    onClose: () => void;
    planet_id: number;
}

const JoinToPrivateModal: React.FC<JoinToPrivateModalI> = ({
    open,
    onClose,
    planet_id,
}) => {
    const [globalError, setGlobalError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (!open) {
            setGlobalError("");
        }
    }, [open]);

    const formik = useFormik({
        initialValues: {
            password: "",
        } as JoinToPrivateValues,
        validationSchema: JoinToPrivateSchema,
        onSubmit: async (
            values: JoinToPrivateValues,
            actions: FormikHelpers<JoinToPrivateValues>
        ) => {
            actions.setSubmitting(true);
            try {
                await ApiService.post("/planetmemberships/", {
                    password: values.password,
                    user_role: 0,
                });
                await actions.resetForm();
                navigate(`/planets/${planet_id}`);
            } catch (error) {
                setGlobalError(check_error(error));
            } finally {
                actions.setSubmitting(false);
                onClose();
            }
        },
    });

    return ReactDOM.createPortal(
        <Transition
            show={open}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
                <div className="bg-neutral-900 p-6 rounded-xl shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-bold text-neutral-50 mb-4">
                        Planet is private. You should enter first
                    </h2>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="space-y-4">
                            <Field>
                                <Label
                                    htmlFor="password"
                                    className="text-sm font-medium text-neutral-300"
                                >
                                    Password
                                </Label>
                                <Description className="text-xs text-neutral-400">
                                    Password of this planet.
                                </Description>
                                <Input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className={clsx(
                                        "mt-2 block w-full rounded-lg bg-neutral-800 py-2 px-3 text-sm text-neutral-100",
                                        formik.touched.password && formik.errors.password
                                            ? "border-red-500 ring-1 ring-red-500"
                                            : ""
                                    )}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                />
                                {formik.touched.password && formik.errors.password && (
                                    <Description className="text-red-500 text-xs mt-1">
                                        {formik.errors.password}
                                    </Description>
                                )}
                            </Field>
                        </div>
                        <div className="mt-6 flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 rounded-md text-sm bg-neutral-700 text-neutral-300 hover:bg-neutral-600"
                            >
                                Cancel
                            </button>
                            <SpinnerButton
                                isSubmitting={formik.isSubmitting}
                                isValid={formik.isValid}
                                text="Confirm"
                            />
                            {globalError && (
                                <p className="text-red-500 text-xs mt-1">
                                    {globalError}
                                </p>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </Transition>,
        document.body
    );
};

export default JoinToPrivateModal;
