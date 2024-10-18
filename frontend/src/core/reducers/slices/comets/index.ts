import { createSlice } from "@reduxjs/toolkit";
import { cometsAdapter, cometsInitialState } from "./state";
import {
    loadComets,
    loadComets__Fulfilled,
    loadComets__Pending,
    loadComets__Rejected,
} from "./thunks/loadComets";

export const COMETS_FEATURE_KEY = "comets";

const cometsSlice = createSlice({
    name: COMETS_FEATURE_KEY,
    initialState: cometsInitialState,
    reducers: {
        reset: () => cometsInitialState,
        change_filters: (state, action) => {
            Object.assign(state, cometsInitialState);
            state.filter = action.payload;
        },
        change_page: (state, action) => {
            state.page = action.payload;
        },
        addOne: cometsAdapter.addOne,
        removeOne: cometsAdapter.removeOne,
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadComets.pending, loadComets__Pending)
            .addCase(loadComets.fulfilled, loadComets__Fulfilled)
            .addCase(loadComets.rejected, loadComets__Rejected);
    },
});

export const cometsReducer = cometsSlice.reducer;
export const cometsActions = cometsSlice.actions;
