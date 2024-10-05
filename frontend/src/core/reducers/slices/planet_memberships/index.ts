import { createSlice } from "@reduxjs/toolkit";
import { planetMembershipsInitialState } from "./state";

export const PLANET_MEMBERSHIPS_FEATURE_KEY = "planet_memberships";

const planetMembershipsSlice = createSlice({
    name: PLANET_MEMBERSHIPS_FEATURE_KEY,
    initialState: planetMembershipsInitialState,
    reducers: {
        reset: () => planetMembershipsInitialState,        
    }
});

export const planetMembershipsReducer = planetMembershipsSlice.reducer;
export const planetMembershipsActions = planetMembershipsSlice.actions;