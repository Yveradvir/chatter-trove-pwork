import { CaseReducer, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { CometEntity, CometsState, cometsAdapter } from "../state";
import { ApiError, LoadingStatus } from "@core/utils/const";
import { Rejector } from "@core/utils/rejector";
import ApiService from "@core/utils/api";
import { ScrollerFilterInterface } from "@core/routes/planets/single/components/scroller/vd";

export const loadComets = createAsyncThunk<
    {count: number, results: CometEntity[]},
    {filter: ScrollerFilterInterface, page: number},
    { rejectValue: ApiError }
>("comets/load", async (data, thunkAPI) => {
    try {
        const response = await ApiService.get(`/comets/`, {
            params: {
                planet: data.filter.planet,
                page: data.page, 
                [`title${data.filter.title}`]: data.filter.filter,
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

export const loadComets__Pending: CaseReducer<CometsState> = (
    state: CometsState
) => {
    state.loadingStatus = LoadingStatus.Loading;
};

export const loadComets__Fulfilled: CaseReducer<
    CometsState,
    PayloadAction<{count: number, results: CometEntity[]}>
> = (state, action) => {
    cometsAdapter.setAll(state, action.payload.results);
    
    state.loadingStatus = LoadingStatus.Loaded;
    state.error = null;
    state.maxPages = Math.floor(action.payload.count % 5);
};

export const loadComets__Rejected: CaseReducer<
    CometsState,
    PayloadAction<ApiError | undefined>
> = (state, action) => {
    state.error = action.payload ?? Rejector.standartReject();
    state.loadingStatus = LoadingStatus.Error;
};
