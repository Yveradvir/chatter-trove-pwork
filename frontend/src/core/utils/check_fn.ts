import { store } from "@core/reducers";
import { AxiosError } from "axios";

interface ErrorResponse {
    detail?: string;
    message?: string;
    errors?: Array<{ message?: string } | string>;
    error?: string;
    non_field_errors?: Array<string>;
    [key: string]: unknown;
}

export function check_error(error: AxiosError<ErrorResponse> | unknown): string {
    if (error instanceof AxiosError) {
        if (error.response) {
            const data = error.response.data;

            if (data?.detail) {
                return data.detail;
            }

            if (data?.message) {
                return data.message;
            }

            if (Array.isArray(data?.errors)) {
                return data.errors
                    .map((err: { message: string }) =>
                        typeof err === 'string' ? err : err.message || err
                    )
                    .join(', ');
            }

            if (data?.error) {
                return data.error;
            }

            if (Array.isArray(data?.non_field_errors)) {
                return data.non_field_errors.join(', ');
            }

            const fieldErrors = Object.keys(data)
                .filter(key => key !== 'detail' && key !== 'non_field_errors')
                .map(key => `${key}: ${Array.isArray(data[key]) ? data[key].join(', ') : data[key]}`)
                .join(', ');

            if (fieldErrors) {
                return fieldErrors;
            }
        } else if (error.request) {
            return "No response received from the server.";
        } else {
            return `Request error: ${error.message}`;
        }
    }

    return "Something went wrong.";
}

export function check_auth() {
    return store.getState().profile.isAuthenticated
}