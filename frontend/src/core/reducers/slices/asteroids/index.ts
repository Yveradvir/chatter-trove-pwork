import { createSlice } from "@reduxjs/toolkit";
import { asteroidsAdapter, asteroidsInitialState } from "./state";
import {
    loadAsteroids,
    loadAsteroids__Fulfilled,
    loadAsteroids__Pending,
    loadAsteroids__Rejected,
} from "./thunks/loadAsteroids";

export const ASTEROIDS_FEATURE_KEY = "asteroids";

const asteroidsSlice = createSlice({
    name: ASTEROIDS_FEATURE_KEY,
    initialState: asteroidsInitialState,
    reducers: {
        reset: () => asteroidsInitialState,
        reply: (state, action) => {
            if (typeof action.payload === "number") {
                state.reply = `reply: ${action.payload}.`;
            } else {
                state.reply = "";
            }
        },
        change_filters: (state, action) => {
            asteroidsAdapter.removeAll(state);
            Object.assign(state, asteroidsInitialState);
            state.filter = action.payload;
        },
        change_page: (state, action) => {
            const newPage = state.page + action.payload;
            if (newPage >= 1 && newPage <= state.maxPages) {
                state.page = newPage;
            }
        },

        change_beReady: (state, action) => {
            state.beReady = action.payload.new as boolean;
            if (action.payload.comet) {
                state.filter.comet = action.payload.comet;
            }
        },
        addOne: asteroidsAdapter.addOne,
        removeOne: asteroidsAdapter.removeOne,
        removeAll: asteroidsAdapter.removeAll,
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadAsteroids.pending, loadAsteroids__Pending)
            .addCase(loadAsteroids.fulfilled, loadAsteroids__Fulfilled)
            .addCase(loadAsteroids.rejected, loadAsteroids__Rejected);
    },
});

export const asteroidsReducer = asteroidsSlice.reducer;
export const asteroidsActions = asteroidsSlice.actions;
