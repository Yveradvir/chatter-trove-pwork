import { ProfileEntity } from "@core/reducers/slices/profile/state";
import ApiService from "@core/utils/api"

const loadUser = async (user_id: number) => {
    const response = await ApiService.get(`/accounts/${user_id}`)
    const pfp_response = await ApiService.get(
        `/profile_images/?user=${user_id}`
    );

    return {
        user: response.data as ProfileEntity,
        pfp: pfp_response.data.results[0]?.image
    };
}

export default loadUser;