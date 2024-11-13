import { FormikHelpers } from "formik";
import { CometUpdateValues } from "./vd";
import ApiService from "@core/utils/api";
import { CometEntity } from "@core/reducers/slices/comets/state";

export const onSubmit = async (
    values: CometUpdateValues,
    actions: FormikHelpers<CometUpdateValues>
) => {
    const { comet, ...body } = values
    const response = await ApiService.patch(`/comets/${comet}/`, body);
    actions.setSubmitting(false);

    return response.data.id;
};

export const loadComet = async (
    id: number
) => {
    return (await ApiService.get(`/comets/${id}/`)).data as CometEntity
}

