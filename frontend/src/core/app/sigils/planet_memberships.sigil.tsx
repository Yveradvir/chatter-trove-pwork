import { store } from "@core/reducers";
import { loadPlanetMemberships } from "@core/reducers/slices/planet_memberships/thunks/loadMemberships";
import { LoadingStatus } from "@core/utils/const";

export default function PlanetMembershipsSigil() {
    console.group("[ PlanetMemberships Sigil ]");

    const state = store.getState();
    console.log("[ PlanetMemberships Sigil ]: ", state.planet_memberships);

    if (
        state.planet_memberships.loadingStatus 
        === LoadingStatus.ANotLoaded
    ) {
        store.dispatch(loadPlanetMemberships());
    }

    const new_state = store.getState();
    console.log("[ PlanetMemberships Sigil ]: ", new_state.planet_memberships);
    console.groupEnd();

    return new_state.profile;
}