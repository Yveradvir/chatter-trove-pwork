import { FormikHelpers } from "formik";
import { PlanetValues } from "./vd";
import ApiService from "@core/utils/api";

const onSubmit = async (
    values: PlanetValues,
    actions: FormikHelpers<PlanetValues>
) => {
    const response = await ApiService.post("/planets/", values);
    actions.setSubmitting(false);

    return response.data.id;
};

export default onSubmit;
