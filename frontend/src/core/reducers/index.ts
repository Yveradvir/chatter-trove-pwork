import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { PROFILE_FEATURE_KEY, profileReducer } from "./slices/profile";
import { CURRENT_PLANET_FEATURE_KEY, currentPlanetReducer } from "./slices/current_planet";
import { PLANET_MEMBERSHIPS_FEATURE_KEY, planetMembershipsReducer } from "./slices/planet_memberships";

export const store = configureStore({
    reducer: {
        [PROFILE_FEATURE_KEY]: profileReducer,
        [CURRENT_PLANET_FEATURE_KEY]: currentPlanetReducer,
        [PLANET_MEMBERSHIPS_FEATURE_KEY]: planetMembershipsReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: import.meta.env.DEV
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()