import { FormikHelpers } from "formik";
import { SignUpValues } from "./vd";
import ApiService from "@core/utils/api";

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
            username: values.nickname,
            password: values.password,
        });

        if (token_obtain_response.status === 200 && values.pfp) {
            const pfp_match = values.pfp.match(/^data:(.+);base64,(.*)$/);

            if (pfp_match) {
                await ApiService.post("/profile_images/", {
                    mime_type: pfp_match[1],
                    image_base64: pfp_match[2],
                });
            }
        }

        actions.setSubmitting(false);
    }
};

export default onSubmit;
