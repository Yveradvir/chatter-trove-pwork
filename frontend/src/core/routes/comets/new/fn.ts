import { FormikHelpers } from "formik";
import { CometValues } from "./vd";
import ApiService from "@core/utils/api";

const onSubmit = async (
    values: CometValues,
    actions: FormikHelpers<CometValues>
) => {
    const response = await ApiService.post("/comets/", values);
    actions.setSubmitting(false);

    return response.data.id;
};

export default onSubmit;
