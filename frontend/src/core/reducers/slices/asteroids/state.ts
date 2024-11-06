import { createEntityAdapter, EntityState, EntityId } from "@reduxjs/toolkit";
import { ApiError, LoadingStatus } from "@core/utils/const";

import { AsteroidValues } from "@core/routes/comets/single/components/asteroids/vd";

export interface AsteroidEntity extends AsteroidValues {
    id: EntityId;
    additionals: {
        user: {
            id: number;
            username: string;
            nickname: string;
        },
        planet: number;
    }
    user: number;
    reply_at: number | null; 
    created_at: string;
}

export interface AsteroidFilters {
    comet: number;
    reply: number | null | string;
    ordering: "" | "-";
}

export interface AsteroidsState extends EntityState<AsteroidEntity, EntityId> {
    loadingStatus: LoadingStatus;
    error: ApiError | null;
    page: number;
    filter: AsteroidFilters;
    beReady: boolean;
    maxPages: number;
    reply: string;
}

export const asteroidsAdapter = createEntityAdapter<AsteroidEntity>();

export const asteroidsInitialState: AsteroidsState = asteroidsAdapter.getInitialState({
    loadingStatus: LoadingStatus.ANotLoaded,
    error: null, 
    beReady: false,
    page: 1,
    maxPages: 1,
    filter: {
        comet: 0,
        ordering: "-",
        reply: null
    } as AsteroidFilters,
    reply: ""
});
