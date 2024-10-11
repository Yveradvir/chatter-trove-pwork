import { store } from "@core/reducers";
import { loadProfile } from "@core/reducers/slices/profile/thunks/load_profile";
import { LoadingStatus } from "@core/utils/const";

export default function AuthSigil() {
    console.group("[ Auth Sigil ]");

    const state = store.getState();
    console.log("[ Auth Sigil ]: ", state.profile);

    if (
        state.profile.loadingStatus 
        === LoadingStatus.ANotLoaded
    ) {
        store.dispatch(loadProfile());
    }

    const new_state = store.getState();
    console.log("[ Auth Sigil ]: ", new_state.profile);
    console.groupEnd();

    return new_state.profile;
}
