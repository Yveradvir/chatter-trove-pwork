import { createSlice } from "@reduxjs/toolkit";
import { usersAdapter, usersInitialState } from "./state";
import {
    loadUsers,
    loadUsers__Fulfilled,
    loadUsers__Pending,
    loadUsers__Rejected,
} from "./thunks/loadUsers";

export const USERS_FEATURE_KEY = "users";

const usersSlice = createSlice({
    name: USERS_FEATURE_KEY,
    initialState: usersInitialState,
    reducers: {
        reset: () => usersInitialState,
        change_filters: (state, action) => {
            console.log(action);
            
            usersAdapter.removeAll(state)
            Object.assign(state, usersInitialState);
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
        },
        addOne: usersAdapter.addOne,
        removeOne: usersAdapter.removeOne,
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadUsers.pending, loadUsers__Pending)
            .addCase(loadUsers.fulfilled, loadUsers__Fulfilled)
            .addCase(loadUsers.rejected, loadUsers__Rejected);
    },
});

export const usersReducer = usersSlice.reducer;
export const usersActions = usersSlice.actions;
