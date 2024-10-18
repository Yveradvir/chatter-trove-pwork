import { createEntityAdapter, EntityState, EntityId } from "@reduxjs/toolkit";
import { ApiError, LoadingStatus } from "@core/utils/const";

import { CometValues } from "@core/routes/comets/new/vd";
import { ScrollerFilterInterface } from "@core/routes/planets/single/components/scroller/vd";

export interface CometEntity extends CometValues {
    id: EntityId;
}

export interface CometsState extends EntityState<CometEntity, EntityId> {
    loadingStatus: LoadingStatus;
    error: ApiError | null;
    page: number;
    filter: ScrollerFilterInterface;
}

export const cometsAdapter = createEntityAdapter<CometEntity>();

export const cometsInitialState: CometsState = cometsAdapter.getInitialState({
    loadingStatus: LoadingStatus.ANotLoaded,
    error: null, 
    page: 1,
    filter: {
        filter: "",
        ordering: "",
        title: "",
        planet: -1
    } as ScrollerFilterInterface
});
