import { ApiError } from "@core/utils/const";
import { createSlice } from "@reduxjs/toolkit";

export const ERROR_FEATURE_KEY = "error";
export interface ErrorState {
    show: boolean
    error: ApiError | null
}

const initialState = {
    show: false,
    error: null
} as ErrorState

export const errorSlice = createSlice({
    name: ERROR_FEATURE_KEY,
    initialState: initialState,
    reducers: {
        reset: () => initialState,
        setError: (state, action) => {
            if (action.payload.status_code && action.payload.detail) {
                state.error = {
                    status_code: action.payload.status_code,
                    detail: action.payload.detail
                } as ApiError
            } else {
                state.error = action.payload.error
            }
            state.show = true
        }

    }
})


export const errorReducer = errorSlice.reducer;
export const errorActions = errorSlice.actions;