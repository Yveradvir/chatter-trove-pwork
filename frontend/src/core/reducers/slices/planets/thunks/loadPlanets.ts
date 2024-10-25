import { CaseReducer, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { PlanetEntity, PlanetsState, planetsAdapter } from "../state";
import { ApiError, LoadingStatus } from "@core/utils/const";
import { Rejector } from "@core/utils/rejector";
import ApiService from "@core/utils/api";
import { PlanetFilterInterface } from "@core/routes/search/components/planets/vd";

export const loadPlanets = createAsyncThunk<
    {count: number, results: PlanetEntity[]},
    {filter: PlanetFilterInterface, page: number},
    { rejectValue: ApiError }
>("planets/load", async (data, thunkAPI) => {
    try {
        const response = await ApiService.get(`/planets/`, {
            params: {
                isPrivate: data.filter.isPrivate,
                page: data.page, 
                [`${data.filter.for_what}${data.filter.planetname}`]: data.filter.filter,
                ordering: `${data.filter.ordering}created_at`
            },
        });

        if (response.status === 200) {
            return response.data;
        } else {
            return thunkAPI.rejectWithValue(
                Rejector.standartAxiosReject(response)
            );
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(Rejector.standartAxiosReject(error));
    }
});

export const loadPlanets__Pending: CaseReducer<PlanetsState> = (
    state: PlanetsState
) => {
    state.loadingStatus = LoadingStatus.Loading;
};

export const loadPlanets__Fulfilled: CaseReducer<
    PlanetsState,
    PayloadAction<{count: number, results: PlanetEntity[]}>
> = (state, action) => {
    planetsAdapter.addMany(state, action.payload.results);
    
    state.loadingStatus = LoadingStatus.Loaded;
    state.error = null;
    state.maxPages = Math.floor(action.payload.count % 5);
};

export const loadPlanets__Rejected: CaseReducer<
    PlanetsState,
    PayloadAction<ApiError | undefined>
> = (state, action) => {
    state.error = action.payload ?? Rejector.standartReject();
    state.loadingStatus = LoadingStatus.Error;
};
