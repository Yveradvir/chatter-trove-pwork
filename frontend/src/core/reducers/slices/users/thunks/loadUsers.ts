import { CaseReducer, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ApiError, LoadingStatus } from "@core/utils/const";
import { Rejector } from "@core/utils/rejector";
import ApiService from "@core/utils/api";
import { ProfileEntity } from "../../profile/state";
import { UsersFilterInterface } from "@core/routes/search/components/users/vd";
import { usersAdapter, UserState } from "../state";

export const loadUsers = createAsyncThunk<
    {count: number, results: ProfileEntity[]},
    {filter: UsersFilterInterface, page: number},
    { rejectValue: ApiError }
>("users/load", async (data, thunkAPI) => {
    try {
        const response = await ApiService.get(`/accounts/`, {
            params: {
                is_online: data.filter.isOnline,
                page: data.page, 
                [`${data.filter.for_what}${data.filter.username}`]: data.filter.filter,
                ordering: data.filter.ordering+'created_at'
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

export const loadUsers__Pending: CaseReducer<UserState> = (
    state: UserState
) => {
    state.loadingStatus = LoadingStatus.Loading;
};

export const loadUsers__Fulfilled: CaseReducer<
    UserState,
    PayloadAction<{count: number, results: ProfileEntity[]}>
> = (state, action) => {
    usersAdapter.addMany(state, action.payload.results);
    
    state.loadingStatus = LoadingStatus.Loaded;
    state.error = null;
    state.maxPages = Math.floor(action.payload.count % 5);
};

export const loadUsers__Rejected: CaseReducer<
    UserState,
    PayloadAction<ApiError | undefined>
> = (state, action) => {
    state.error = action.payload ?? Rejector.standartReject();
    state.loadingStatus = LoadingStatus.Error;
};
