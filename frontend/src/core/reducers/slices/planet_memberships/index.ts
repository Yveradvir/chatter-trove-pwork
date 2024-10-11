import { createSlice } from "@reduxjs/toolkit";
import { planetMembershipsAdapter, planetMembershipsInitialState } from "./state";
import {
    loadPlanetMemberships,
    loadPlanetMemberships__Fulfilled,
    loadPlanetMemberships__Pending,
    loadPlanetMemberships__Rejected,
} from "./thunks/loadMemberships";

export const PLANET_MEMBERSHIPS_FEATURE_KEY = "planet_memberships";

const planetMembershipsSlice = createSlice({
    name: PLANET_MEMBERSHIPS_FEATURE_KEY,
    initialState: planetMembershipsInitialState,
    reducers: {
        reset: () => planetMembershipsInitialState,
        addOne: planetMembershipsAdapter.addOne,
        removeOne: planetMembershipsAdapter.removeOne
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                loadPlanetMemberships.pending,
                loadPlanetMemberships__Pending
            )
            .addCase(
                loadPlanetMemberships.fulfilled,
                loadPlanetMemberships__Fulfilled
            )
            .addCase(
                loadPlanetMemberships.rejected,
                loadPlanetMemberships__Rejected
            );
    },
});

export const planetMembershipsReducer = planetMembershipsSlice.reducer;
export const planetMembershipsActions = planetMembershipsSlice.actions;
