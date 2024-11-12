import { createEntityAdapter, EntityState, EntityId } from "@reduxjs/toolkit";
import { ApiError, LoadingStatus } from "@core/utils/const";
import { PlanetMembershipEntity } from "../planet_memberships/state";
import { ActuallyMembershipsFilterInterface } from "@core/routes/actually_memberships/components/vd";

export interface ActuallyMembershipsEntity extends PlanetMembershipEntity {
    additionals: {
        user: {
            nickname: string;
            username: string;
            id: number;
            is_online: boolean;
        }
    }
} 

export interface ActuallyMembershipsState extends EntityState<ActuallyMembershipsEntity, EntityId> {
    loadingStatus: LoadingStatus;
    error: ApiError | null;
    page: number;
    filter: ActuallyMembershipsFilterInterface;
    beReady: boolean;
    maxPages: number;
}

export const actuallyMembershipsAdapter = createEntityAdapter<ActuallyMembershipsEntity>();

export const actuallyMembershipsInitialState: ActuallyMembershipsState = actuallyMembershipsAdapter.getInitialState({
    loadingStatus: LoadingStatus.ANotLoaded,
    error: null, 
    beReady: false,
    page: 1,
    maxPages: 1,
    filter: {
        filter: "",
        for_what: "username",
        username: "",
        isActive: null,
        ordering: "-user_role"
    } as ActuallyMembershipsFilterInterface
});
