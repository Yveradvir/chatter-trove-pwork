import { createEntityAdapter, EntityState, EntityId } from "@reduxjs/toolkit";
import { ApiError, LoadingStatus } from "@core/utils/const";

export interface PlanetMembershipEntity {
    id: EntityId;
    planet: number;
    user: number;
    user_role: number;
    created_at: string;
}

export interface PlanetMembershipsState extends EntityState<PlanetMembershipEntity, EntityId> {
    loadingStatus: LoadingStatus;
    error: ApiError | null;
}

export const planetMembershipsAdapter = createEntityAdapter<PlanetMembershipEntity>();

export const planetMembershipsInitialState: PlanetMembershipsState = planetMembershipsAdapter.getInitialState({
    loadingStatus: LoadingStatus.ANotLoaded,
    error: null, 
});
