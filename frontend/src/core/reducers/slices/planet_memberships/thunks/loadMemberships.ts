import { CaseReducer, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
    PlanetMembershipEntity,
    planetMembershipsAdapter,
    PlanetMembershipsState,
} from "../state";
import { ApiError, LoadingStatus } from "@core/utils/const";
import { Rejector } from "@core/utils/rejector";
import ApiService from "@core/utils/api";
import { store } from "@core/reducers";

export const loadPlanetMemberships = createAsyncThunk<
    PlanetMembershipEntity[],
    void,
    { rejectValue: ApiError }
>("planetMemberships/load", async (_, thunkAPI) => {
    try {
        const response = await ApiService.get(`/planetmemberships/`, {
            params: { user: store.getState().profile.entity?.id },
        });

        if (response.status === 200) {
            return response.data.results;
        } else {
            return thunkAPI.rejectWithValue(
                Rejector.standartAxiosReject(response)
            );
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(Rejector.standartAxiosReject(error));
    }
});

export const loadPlanetMemberships__Pending: CaseReducer<PlanetMembershipsState> = (
    state: PlanetMembershipsState
) => {
    state.loadingStatus = LoadingStatus.Loading;
};

export const loadPlanetMemberships__Fulfilled: CaseReducer<
    PlanetMembershipsState,
    PayloadAction<PlanetMembershipEntity[]>
> = (state, action) => {
    planetMembershipsAdapter.setAll(state, action.payload);
    state.loadingStatus = LoadingStatus.Loaded;
    state.error = null;
};

export const loadPlanetMemberships__Rejected: CaseReducer<
    PlanetMembershipsState,
    PayloadAction<ApiError | undefined>
> = (state, action) => {
    state.error = action.payload ?? Rejector.standartReject();
    state.loadingStatus = LoadingStatus.Error;
};
