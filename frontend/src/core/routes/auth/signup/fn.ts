import { FormikHelpers } from "formik";
import { SignUpValues } from "./vd";
import ApiService from "@core/utils/api";
import { store } from "@core/reducers";
import { loadProfile } from "@core/reducers/slices/profile/thunks/load_profile";
import { loadPlanetMemberships } from "@core/reducers/slices/planet_memberships/thunks/loadMemberships";

const onSubmit = async (
    values: SignUpValues,
    actions: FormikHelpers<SignUpValues>
) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { cpassword, ...creation_body } = values;
    const registration_response = await ApiService.post(
        "/accounts/",
        creation_body
    );

    if (registration_response.status === 201) {
        const token_obtain_response = await ApiService.post("/jwt/token/", {
            username: values.username,
            password: values.password,
        });

        if (token_obtain_response.status === 200 && values.pfp) {
            await store.dispatch(loadProfile());
            await store.dispatch(loadPlanetMemberships());

            const pfp_match = values.pfp.match(/^data:(.+);base64,(.*)$/);

            if (pfp_match) {
                await ApiService.post("/profile_images/", {
                    mime_type: pfp_match[1],
                    image_base64: pfp_match[2],
                    user: registration_response.data.additionals.user
                });
            }
        }

        actions.setSubmitting(false);
    }
};

export default onSubmit;
