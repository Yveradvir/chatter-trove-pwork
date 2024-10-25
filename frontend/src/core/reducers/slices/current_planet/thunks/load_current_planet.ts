import { createAsyncThunk, PayloadAction, CaseReducer } from "@reduxjs/toolkit";
import { CurrentPlanetState } from "../state";
import { ApiError, LoadingStatus } from "@core/utils/const";
import { Rejector } from "@core/utils/rejector";
import ApiService from "@core/utils/api";
import { PlanetEntity } from "../../planets/state";

export const loadCurrentPlanet = createAsyncThunk<
    PlanetEntity,
    number,
    { rejectValue: ApiError }
>("currentPlanetId/load", async (currentPlanetId, thunkAPI) => {
    try {
        const response = await ApiService.get(`/planets/${currentPlanetId}`);

        if (response.status === 200) {
            return response.data as PlanetEntity;
        } else {
            return thunkAPI.rejectWithValue(Rejector.standartAxiosReject(response));
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(Rejector.standartAxiosReject(error));
    }
});

export const loadCurrentPlanet__Pending: CaseReducer<CurrentPlanetState> = (
    state
) => {
    state.loadingStatus = LoadingStatus.Loading;
};

export const loadCurrentPlanet__Fulfilled: CaseReducer<
    CurrentPlanetState,
    PayloadAction<PlanetEntity>
> = (state, action) => {
    state.entity = action.payload;
    state.loadingStatus = LoadingStatus.Loaded;
    state.error = null;
};

export const loadCurrentPlanet__Rejected: CaseReducer<
    CurrentPlanetState,
    PayloadAction<ApiError | undefined>
> = (state, action) => {
    state.error = action.payload ?? Rejector.standartReject();
    state.loadingStatus = LoadingStatus.Error;
};
