import { AxiosError } from "axios";
import { ApiError } from "./const";
import { check_error } from "./check_fn";

export class Rejector {        
    static standartReject(status_code: number = 500): ApiError {
        return {
            status_code: status_code,
            detail: "Something went wrong..."
        }
    }

    static standartAxiosReject(error: AxiosError | unknown): ApiError {
        if (error instanceof AxiosError && error.isAxiosError) {
            return {
                status_code: error.response?.status || 500, 
                detail: check_error(error) 
            };
        }

        return this.standartReject(); 
    }
}
