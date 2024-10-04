import { createSlice } from "@reduxjs/toolkit";
import { currentPlanetInitialState } from "./state";
import { loadCurrentPlanet, loadCurrentPlanet__Fulfilled, loadCurrentPlanet__Pending, loadCurrentPlanet__Rejected } from "./thunks/load_current_planet";

export const CURRENT_PLANET_FEATURE_KEY = "currentPlanet";


export const currentPlanetSlice = createSlice({
    name: CURRENT_PLANET_FEATURE_KEY,
    initialState: currentPlanetInitialState,
    reducers: {
        reset: () => currentPlanetInitialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadCurrentPlanet.pending, loadCurrentPlanet__Pending)
            .addCase(loadCurrentPlanet.fulfilled, loadCurrentPlanet__Fulfilled)
            .addCase(loadCurrentPlanet.rejected, loadCurrentPlanet__Rejected)
    }
});

export const currentPlanetReducer = currentPlanetSlice.reducer;
export const currentPlanetActions = currentPlanetSlice.actions;