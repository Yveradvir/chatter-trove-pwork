import { FormikHelpers, useFormik } from "formik";
import { Transition } from "@headlessui/react";
import clsx from "clsx";
import { Field, Input, Label, Description } from "@headlessui/react";
import SpinnerButton from "../spinnerButton";
import { ConfModalSchema, ConfModalValues } from "./vd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import neverCheckboxFunction from "./fn";
import { check_error } from "@core/utils/check_fn";
import ReactDOM from "react-dom";

interface ConfModalI {
    open: boolean;
    onClose: () => void;
    handler: (data: { password: string; [key: string]: unknown }) => void;
    after_success_url?: string;
    neverCheckbox?: {
        checkbox_api_key: string;
        checkbox_api_value: unknown;
        checkbox_text: string;
    };
}

const ConfModal: React.FC<ConfModalI> = ({
    open,
    onClose,
    handler,
    after_success_url,
    neverCheckbox,
}) => {
    const [globalError, setGlobalError] = useState("");
    const [isNeverChecked, setIsNeverChecked] = useState(false);
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            password: "",
            cpassword: "",
        } as ConfModalValues,
        validationSchema: ConfModalSchema,
        onSubmit: async (
            values: ConfModalValues,
            actions: FormikHelpers<ConfModalValues>
        ) => {
            try {
                const data: { password: string } = {
                    password: values.password,
                };
                handler(data);
                if (neverCheckbox && isNeverChecked)
                    neverCheckboxFunction(
                        neverCheckbox.checkbox_api_key,
                        neverCheckbox.checkbox_api_value
                    );

                actions.setSubmitting(false);
                onClose();
                actions.resetForm();
                if (after_success_url) navigate(after_success_url);
            } catch (error) {
                setGlobalError(check_error(error));
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
                        Confirm Action
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
                                    Your account password (minimum 8 characters).
                                </Description>
                                <Input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className={clsx(
                                        "mt-2 block w-full rounded-lg bg-neutral-800 py-2 px-3 text-sm text-neutral-100",
                                        formik.touched.password &&
                                            formik.errors.password
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

                            <Field>
                                <Label
                                    htmlFor="cpassword"
                                    className="text-sm font-medium text-neutral-300"
                                >
                                    Confirm Password
                                </Label>
                                <Description className="text-xs text-neutral-400">
                                    Confirm your password by entering it again.
                                </Description>
                                <Input
                                    type="password"
                                    id="cpassword"
                                    name="cpassword"
                                    className={clsx(
                                        "mt-2 block w-full rounded-lg bg-neutral-800 py-2 px-3 text-sm text-neutral-100",
                                        formik.touched.cpassword &&
                                            formik.errors.cpassword
                                            ? "border-red-500 ring-1 ring-red-500"
                                            : ""
                                    )}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.cpassword}
                                />
                                {formik.touched.cpassword && formik.errors.cpassword && (
                                    <Description className="text-red-500 text-xs mt-1">
                                        {formik.errors.cpassword}
                                    </Description>
                                )}
                            </Field>

                            {neverCheckbox && (
                                <Field className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="never"
                                        checked={isNeverChecked}
                                        onChange={(e) =>
                                            setIsNeverChecked(e.target.checked)
                                        }
                                        className="h-4 w-4 text-teal-300 border-gray-300 rounded focus:ring-teal-300"
                                    />
                                    <Label
                                        htmlFor="never"
                                        className="ml-2 text-sm text-neutral-300"
                                    >
                                        {neverCheckbox.checkbox_text}
                                    </Label>
                                </Field>
                            )}
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

export default ConfModal;
