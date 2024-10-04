import { ApiError, LoadingStatus } from "@core/utils/const";
import { EntityId } from "@reduxjs/toolkit";

export interface CurrentPlanetEntity {
    id: EntityId;
    planetname: string;
    nickname: string;
    description: string;
    created_at: string;
}

export interface CurrentPlanetState {    
    loadingStatus: LoadingStatus;
    entity: CurrentPlanetEntity | null;
    error: ApiError | null;
}


export const currentPlanetInitialState = {
    loadingStatus: LoadingStatus.ANotLoaded,
    entity: null,
    error: null
} as CurrentPlanetState;