import { ApiError, LoadingStatus } from "@core/utils/const";
import { PlanetEntity } from "../planets/state";

export interface CurrentPlanetState {    
    loadingStatus: LoadingStatus;
    entity: PlanetEntity | null;
    error: ApiError | null;
}

export const currentPlanetInitialState = {
    loadingStatus: LoadingStatus.ANotLoaded,
    entity: null,
    error: null
} as CurrentPlanetState;