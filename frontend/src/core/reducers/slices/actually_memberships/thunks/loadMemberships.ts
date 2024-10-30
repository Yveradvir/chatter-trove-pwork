import { CaseReducer, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ApiError, LoadingStatus } from "@core/utils/const";
import { Rejector } from "@core/utils/rejector";
import ApiService from "@core/utils/api";
import { store } from "@core/reducers";
import { actuallyMembershipsAdapter, ActuallyMembershipsEntity, ActuallyMembershipsState } from "../state";
import { ActuallyMembershipsFilterInterface } from "@core/routes/actually_memberships/components/vd";

export const loadActuallyMemberships = createAsyncThunk<
    ActuallyMembershipsEntity[],
    { filter: ActuallyMembershipsFilterInterface; page: number },
    { rejectValue: ApiError }
>("actuallyMemberships/load", async (data, thunkAPI) => {
    try {
        const response = await ApiService.get(`/planetmemberships/`, {
            params: {
                planet: store.getState().currentPlanet.entity?.id,
                page: data.page,
                [`${data.filter.for_what}${data.filter.username}`]:
                    data.filter.filter,
                ordering: data.filter.ordering,
                isActive: data.filter.isActive
            },
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

export const loadActuallyMemberships__Pending: CaseReducer<
    ActuallyMembershipsState
> = (state: ActuallyMembershipsState) => {
    state.loadingStatus = LoadingStatus.Loading;
};

export const loadActuallyMemberships__Fulfilled: CaseReducer<
    ActuallyMembershipsState,
    PayloadAction<ActuallyMembershipsEntity[]>
> = (state, action) => {
    actuallyMembershipsAdapter.setAll(state, action.payload);
    state.loadingStatus = LoadingStatus.Loaded;
    state.error = null;
};

export const loadActuallyMemberships__Rejected: CaseReducer<
    ActuallyMembershipsState,
    PayloadAction<ApiError | undefined>
> = (state, action) => {
    state.error = action.payload ?? Rejector.standartReject();
    state.loadingStatus = LoadingStatus.Error;
};
