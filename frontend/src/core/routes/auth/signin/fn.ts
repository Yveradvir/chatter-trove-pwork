import { FormikHelpers } from "formik";
import { SignInValues } from "./vd";
import ApiService from "@core/utils/api";
import { store } from "@core/reducers";
import { loadProfile } from "@core/reducers/slices/profile/thunks/load_profile";

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
    
    await store.dispatch(loadProfile());

    actions.setSubmitting(false)
};

export default onSubmit;
