export enum LoadingStatus {
    ANotLoaded, //absolutely not loaded: loading even didnt start
    NotLoaded,
    Loading,
    Loaded,
    Error
}

export type ApiError = {
    detail: string,
    status_code: number
}