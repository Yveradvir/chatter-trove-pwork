import { createEntityAdapter, EntityState, EntityId } from "@reduxjs/toolkit";
import { ApiError, LoadingStatus } from "@core/utils/const";

import { PlanetValues } from "@core/routes/planets/new/vd";
import { PlanetFilterInterface } from "@core/routes/search/components/planets/vd";

export interface PlanetEntity extends PlanetValues {
    id: EntityId;
}

export interface PlanetsState extends EntityState<PlanetEntity, EntityId> {
    loadingStatus: LoadingStatus;
    error: ApiError | null;
    page: number;
    filter: PlanetFilterInterface;
    beReady: boolean;
    maxPages: number;
}

export const planetsAdapter = createEntityAdapter<PlanetEntity>();

export const planetsInitialState: PlanetsState = planetsAdapter.getInitialState({
    loadingStatus: LoadingStatus.ANotLoaded,
    error: null, 
    beReady: false,
    page: 1,
    maxPages: 1,
    filter: {
        filter: "",
        ordering: "",
        planetname: "",
        isPrivate: null,
    } as PlanetFilterInterface
});
