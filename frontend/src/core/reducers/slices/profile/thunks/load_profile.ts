import { createAsyncThunk, PayloadAction, CaseReducer } from "@reduxjs/toolkit";
import { ProfileEntity, ProfileState } from "../state";
import { ApiError, LoadingStatus } from "@core/utils/const";
import { Rejector } from "@core/utils/rejector";
import ApiService from "@core/utils/api";

export const loadProfile = createAsyncThunk<
    ProfileEntity,
    void,
    { rejectValue: ApiError }
>("profile/load", async (_, thunkAPI) => {
    try {
        const response = await ApiService.get("/accounts/me/");

        if (response.status === 200) {
            return response.data as ProfileEntity;
        } else {
            return thunkAPI.rejectWithValue(Rejector.standartReject());
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(Rejector.standartAxiosReject(error));
    }
});

export const loadProfile__Pending: CaseReducer<ProfileState> = (state) => {
    state.loadingStatus = LoadingStatus.Loading;
};

export const loadProfile__Fulfilled: CaseReducer<
    ProfileState,
    PayloadAction<ProfileEntity>
> = (state, action) => {
    state.entity = action.payload;
    state.loadingStatus = LoadingStatus.Loaded;
    state.error = null;
};

export const loadProfile__Rejected: CaseReducer<
    ProfileState,
    PayloadAction<ApiError | undefined>
> = (state, action) => {
    state.error = action.payload ?? Rejector.standartReject();
    state.loadingStatus = LoadingStatus.Error;
};
