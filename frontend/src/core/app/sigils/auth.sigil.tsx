import { store } from "@core/reducers";
import { loadProfile } from "@core/reducers/slices/profile/thunks/load_profile";
import { LoadingStatus } from "@core/utils/const";
import { useEffect } from "react";

const AuthSigil = () => {
    useEffect(() => {
        console.group("[ Auth Sigil ]");

        const state = store.getState();
        console.log("[ Auth Sigil ]: ", state.profile);

        if (state.profile.loadingStatus === LoadingStatus.ANotLoaded) {
            store.dispatch(loadProfile());
        }
        
        console.log("[ Auth Sigil ]: ", state.profile);
        console.groupEnd();
    }, []);

    return null;
};

export default AuthSigil;
