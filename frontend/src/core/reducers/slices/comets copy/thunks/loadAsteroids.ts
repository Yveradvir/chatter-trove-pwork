import { CaseReducer, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ApiError, LoadingStatus } from "@core/utils/const";
import { Rejector } from "@core/utils/rejector";
import ApiService from "@core/utils/api";
import { AsteroidEntity, AsteroidFilters, asteroidsAdapter, AsteroidsState } from "../state";

export const loadAsteroids = createAsyncThunk<
    {count: number, results: AsteroidEntity[]},
    {filter: AsteroidFilters, page: number},
    { rejectValue: ApiError }
>("asteroids/load", async (data, thunkAPI) => {
    try {
        const response = await ApiService.get(`/asteroids/`, {
            params: {
                comet: data.filter.comet,
                page: data.page, 
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

export const loadAsteroids__Pending: CaseReducer<AsteroidsState> = (
    state: AsteroidsState
) => {
    state.loadingStatus = LoadingStatus.Loading;
};

export const loadAsteroids__Fulfilled: CaseReducer<
    AsteroidsState,
    PayloadAction<{count: number, results: AsteroidEntity[]}>
> = (state, action) => {    
    asteroidsAdapter.addMany(state, action.payload.results);
    
    state.loadingStatus = LoadingStatus.Loaded;
    state.error = null;
    state.maxPages = Math.floor(action.payload.count % 5);
};

export const loadAsteroids__Rejected: CaseReducer<
    AsteroidsState,
    PayloadAction<ApiError | undefined>
> = (state, action) => {
    state.error = action.payload ?? Rejector.standartReject();
    state.loadingStatus = LoadingStatus.Error;
};
