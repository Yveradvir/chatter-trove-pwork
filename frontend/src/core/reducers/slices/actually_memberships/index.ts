import { createSlice } from "@reduxjs/toolkit";
import {
    actuallyMembershipsAdapter,
    actuallyMembershipsInitialState,
} from "./state";
import {
    loadActuallyMemberships,
    loadActuallyMemberships__Fulfilled,
    loadActuallyMemberships__Pending,
    loadActuallyMemberships__Rejected,
} from "./thunks/loadMemberships";

export const ACTUALLY_MEMBERSHIPS_FEATURE_KEY = "actually_memberships";

const actuallyMembershipsSlice = createSlice({
    name: ACTUALLY_MEMBERSHIPS_FEATURE_KEY,
    initialState: actuallyMembershipsInitialState,
    reducers: {
        reset: () => actuallyMembershipsInitialState,
        change_filters: (state, action) => {
            actuallyMembershipsAdapter.removeAll(state);
            Object.assign(state, actuallyMembershipsInitialState);
            state.filter = action.payload;
        },
        change_page: (state, action) => {
            state.page = action.payload;
        },
        change_beReady: (state, action) => {
            state.beReady = action.payload.new as boolean;
        },
        addOne: actuallyMembershipsAdapter.addOne,
        removeOne: actuallyMembershipsAdapter.removeOne,
        removeAll: actuallyMembershipsAdapter.removeAll,
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                loadActuallyMemberships.pending,
                loadActuallyMemberships__Pending
            )
            .addCase(
                loadActuallyMemberships.fulfilled,
                loadActuallyMemberships__Fulfilled
            )
            .addCase(
                loadActuallyMemberships.rejected,
                loadActuallyMemberships__Rejected
            );
    },
});

export const actuallyMembershipsReducer = actuallyMembershipsSlice.reducer;
export const actuallyMembershipsActions = actuallyMembershipsSlice.actions;
