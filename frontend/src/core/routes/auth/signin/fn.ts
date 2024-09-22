import { FormikHelpers } from "formik";
import { SignInValues } from "./vd";
import ApiService from "@core/utils/api";

const onSubmit = async (
    values: SignInValues,
    actions: FormikHelpers<SignInValues>
) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { cpassword, ...creation_body } = values;
    await ApiService.post(
        "/jwt/token/",
        creation_body
    );

    actions.setSubmitting(false)
};

export default onSubmit;
