import { createSlice } from "@reduxjs/toolkit";
import { planetsAdapter, planetsInitialState } from "./state";
import {
    loadPlanets,
    loadPlanets__Fulfilled,
    loadPlanets__Pending,
    loadPlanets__Rejected,
} from "./thunks/loadPlanets";

export const PLANETS_FEATURE_KEY = "planets";

const planetsSlice = createSlice({
    name: PLANETS_FEATURE_KEY,
    initialState: planetsInitialState,
    reducers: {
        reset: () => planetsInitialState,
        change_filters: (state, action) => {
            planetsAdapter.removeAll(state)
            Object.assign(state, planetsInitialState);
            state.filter = action.payload;
        },
        change_page: (state, action) => {
            state.page = action.payload;
        },
        change_beReady: (state, action) => {
            state.beReady = action.payload.new as boolean;
        },
        addOne: planetsAdapter.addOne,
        removeOne: planetsAdapter.removeOne,
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadPlanets.pending, loadPlanets__Pending)
            .addCase(loadPlanets.fulfilled, loadPlanets__Fulfilled)
            .addCase(loadPlanets.rejected, loadPlanets__Rejected);
    },
});

export const planetsReducer = planetsSlice.reducer;
export const planetsActions = planetsSlice.actions;
