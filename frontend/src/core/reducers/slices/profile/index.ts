import { createSlice } from "@reduxjs/toolkit";
import { profileInitialState } from "./state";
import { loadProfile, loadProfile__Fulfilled, loadProfile__Pending, loadProfile__Rejected } from "./thunks/load_profile";

export const PROFILE_FEATURE_KEY = "profile";


export const profileSlice = createSlice({
    name: PROFILE_FEATURE_KEY,
    initialState: profileInitialState,
    reducers: {
        reset: () => profileInitialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadProfile.pending, loadProfile__Pending)
            .addCase(loadProfile.fulfilled, loadProfile__Fulfilled)
            .addCase(loadProfile.rejected, loadProfile__Rejected)
    }
});

export const profileReducer = profileSlice.reducer;
export const profileActions = profileSlice.actions;