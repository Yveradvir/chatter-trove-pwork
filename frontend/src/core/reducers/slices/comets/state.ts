import { createEntityAdapter, EntityState, EntityId } from "@reduxjs/toolkit";
import { ApiError, LoadingStatus } from "@core/utils/const";

import { CometValues } from "@core/routes/comets/new/vd";
import { ScrollerFilterInterface } from "@core/routes/planets/single/components/scroller/vd";

export interface CometEntity extends CometValues {
    id: EntityId;
    additionals: {
        pfp: boolean;
        user: {
            id: number;
            username: string;
            nickname: string;
        }
    }
    created_at: string;
}

export interface CometsState extends EntityState<CometEntity, EntityId> {
    loadingStatus: LoadingStatus;
    error: ApiError | null;
    page: number;
    filter: ScrollerFilterInterface;
    beReady: boolean;
    maxPages: number;
}

export const cometsAdapter = createEntityAdapter<CometEntity>();

export const cometsInitialState: CometsState = cometsAdapter.getInitialState({
    loadingStatus: LoadingStatus.ANotLoaded,
    error: null, 
    beReady: false,
    page: 1,
    maxPages: 1,
    filter: {
        filter: "",
        ordering: "",
        title: "",
        planet: null
    } as ScrollerFilterInterface
});
