import { createAsyncThunk } from "@reduxjs/toolkit";
import { PlanetMembershipEntity } from "../state";
import { ApiError } from "@core/utils/const";
import { Rejector } from "@core/utils/rejector";
import ApiService from "@core/utils/api";
import { store } from "@core/reducers";

export const loadPlanetMemberships = createAsyncThunk<
    PlanetMembershipEntity[], 
    void,
    { rejectValue: ApiError }
>(
    "planetMemberships/load",
    async (_, thunkAPI) => {
        try {
            const response = await ApiService.get(
                `/memberships/`,
                {params: { user: store.getState().profile.entity?.id }}
            )

            if (response.status === 200) {
                return response.data 
            } else {
                return thunkAPI.rejectWithValue(Rejector.standartAxiosReject(response));
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(Rejector.standartAxiosReject(error));
        }
    }
);
