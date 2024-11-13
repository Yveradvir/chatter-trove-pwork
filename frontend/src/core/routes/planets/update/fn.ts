import { FormikHelpers } from "formik";
import { PlanetUpdateValues } from "./vd";
import ApiService from "@core/utils/api";
import { PlanetEntity } from "@core/reducers/slices/planets/state";

export const onSubmit = async (
    values: PlanetUpdateValues,
    actions: FormikHelpers<PlanetUpdateValues>
) => {
    const {planet, ...data } = values
    const response = await ApiService.patch(`/planets/${planet}/`, data);
    actions.setSubmitting(false);

    return response.data.id;
};

export const loadPlanet = async (
    id: number
) => {
    return (await ApiService.get(`/planets/${id}/`)).data as PlanetEntity
}