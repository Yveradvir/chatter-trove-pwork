import Layout from "@core/components/layout";
import { Link } from "react-router-dom";
import { Transition } from "@headlessui/react";
import { useFormik } from "formik";
import { SignUpSchema, SignUpValues } from "@core/routes/auth/signup/vd";
import { Field, Input, Label, Description } from "@headlessui/react";
import clsx from "clsx";
import Fimage from "@core/components/fimage";

const SignUpPage = () => {
    const formik = useFormik({
        initialValues: {
            username: "",
            nickname: "",
            email: "",
            password: "",
            cpassword: "",
            pfp: "",
        } as SignUpValues,
        validationSchema: SignUpSchema,
        onSubmit: (values) => {
            console.log(values);
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
                                    Sign up
                                </h1>
                                <p className="mt-2 text-sm text-neutral-300">
                                    Already have an account?{" "}
                                    <Link
                                        className="bg-gradient-to-t from-teal-400 to-cyan-400 bg-clip-text text-transparent hover:underline"
                                        to="/auth/signin"
                                    >
                                        Sign in here
                                    </Link>
                                </p>
                            </div>

                            <div className="mt-5">
                                <div className="py-3 flex items-center text-xs text-neutral-300 uppercase">
                                    <div className="flex-1 border-t border-neutral-700"></div>
                                    <span className="mx-6">Or</span>
                                    <div className="flex-1 border-t border-neutral-700"></div>
                                </div>

                                <form
                                    onSubmit={formik.handleSubmit}
                                    className="space-y-6"
                                >
                                    <div className="flex gap-4">
                                        <div className="flex-4">
                                            <Fimage<SignUpValues>
                                                form="circle"
                                                name="pfp"
                                                height={64*1.5}
                                                width={64*1.5}
                                                formik={formik}
                                            />
                                        </div>
                                        <Field className="flex-1">
                                            <Label
                                                htmlFor="username"
                                                className="text-sm font-medium text-neutral-300"
                                            >
                                                Username
                                            </Label>
                                            <Description className="text-xs text-neutral-400">
                                                A unique username for your account.
                                            </Description>
                                            <Input
                                                type="text"
                                                id="username"
                                                name="username"
                                                className={clsx(
                                                    "mt-2 block w-full rounded-lg border-none bg-neutral-800 py-2 px-3 text-sm text-neutral-100",
                                                    formik.touched.username &&
                                                        formik.errors.username
                                                        ? "border-red-500 ring-1 ring-red-500"
                                                        : ""
                                                )}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.username}
                                            />
                                            {formik.touched.username &&
                                            formik.errors.username ? (
                                                <Description className="text-red-500 text-xs mt-1">
                                                    {formik.errors.username}
                                                </Description>
                                            ) : null}
                                        </Field>
                                    </div>

                                    <Field>
                                        <Label
                                            htmlFor="nickname"
                                            className="text-sm font-medium text-neutral-300"
                                        >
                                            Nickname
                                        </Label>
                                        <Description className="text-xs text-neutral-400">
                                            A non-unique name displayed to other
                                            users.
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

                                    <Field>
                                        <Label
                                            htmlFor="email"
                                            className="text-sm font-medium text-neutral-300"
                                        >
                                            Email address
                                        </Label>
                                        <Description className="text-xs text-neutral-400">
                                            Your email address used for account
                                            verification.
                                        </Description>
                                        <Input
                                            type="email"
                                            id="email"
                                            name="email"
                                            className={clsx(
                                                "mt-2 block w-full rounded-lg border-none bg-neutral-800 py-2 px-3 text-sm text-neutral-100",
                                                formik.touched.email &&
                                                    formik.errors.email
                                                    ? "border-red-500 ring-1 ring-red-500"
                                                    : ""
                                            )}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.email}
                                        />
                                        {formik.touched.email &&
                                        formik.errors.email ? (
                                            <Description className="text-red-500 text-xs mt-1">
                                                {formik.errors.email}
                                            </Description>
                                        ) : null}
                                    </Field>

                                    <div className="flex gap-4">
                                        <Field className="flex-1">
                                            <Label
                                                htmlFor="password"
                                                className="text-sm font-medium text-neutral-300"
                                            >
                                                Password
                                            </Label>
                                            <Description className="text-xs text-neutral-400">
                                                Your account password (minimum 8
                                                characters).
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

                                        <Field className="flex-1">
                                            <Label
                                                htmlFor="cpassword"
                                                className="text-sm font-medium text-neutral-300"
                                            >
                                                Confirm Password
                                            </Label>
                                            <Description className="text-xs text-neutral-400">
                                                Confirm your password by
                                                entering it again.
                                            </Description>
                                            <Input
                                                type="password"
                                                id="cpassword"
                                                name="cpassword"
                                                className={clsx(
                                                    "mt-2 block w-full rounded-lg border-none bg-neutral-800 py-2 px-3 text-sm text-neutral-100",
                                                    formik.touched.cpassword &&
                                                        formik.errors.cpassword
                                                        ? "border-red-500 ring-1 ring-red-500"
                                                        : ""
                                                )}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.cpassword}
                                            />
                                            {formik.touched.cpassword &&
                                            formik.errors.cpassword ? (
                                                <Description className="text-red-500 text-xs mt-1">
                                                    {formik.errors.cpassword}
                                                </Description>
                                            ) : null}
                                        </Field>
                                    </div>

                                    <button
                                        type="submit"
                                        className={`w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-cyan-600 text-white hover:bg-cyan-700 focus:outline-none focus:bg-cyan-700 ${
                                            !formik.isValid ||
                                            formik.isSubmitting
                                                ? "opacity-50 cursor-not-allowed"
                                                : ""
                                        }`}
                                        disabled={
                                            !formik.isValid ||
                                            formik.isSubmitting
                                        }
                                    >
                                        Sign up
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </Transition>
            </div>
        </Layout>
    );
};

export default SignUpPage;
