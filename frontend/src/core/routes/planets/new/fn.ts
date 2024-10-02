import { FormikHelpers } from "formik";
import { CreatePlanetValues } from "./vd";
import ApiService from "@core/utils/api";

const onSubmit = async (
    values: CreatePlanetValues,
    actions: FormikHelpers<CreatePlanetValues>
) => {
    const response = await ApiService.post("/planets/", values);
    actions.setSubmitting(false);

    return response.data.id;
};

export default onSubmit;
