import { ApiError, LoadingStatus } from "@core/utils/const";
import { createEntityAdapter, EntityId, EntityState } from "@reduxjs/toolkit";

export interface PlanetMembershipEntity {
    id: EntityId;
    planet: number;
    user: number;

    user_role: number;
    created_at: string;
};

export interface PlanetMembershipsState extends EntityState<PlanetMembershipEntity, EntityId> {
    ids: EntityId[];
    loading: LoadingStatus;
    error: ApiError | null;
}

export const planetMembershipsAdapter = createEntityAdapter<PlanetMembershipEntity>();
export const planetMembershipsInitialState = planetMembershipsAdapter.getInitialState({
    ids: [],
    loading: LoadingStatus.ANotLoaded,
    error: null,
});