import { createEntityAdapter, EntityState, EntityId } from "@reduxjs/toolkit";
import { ApiError, LoadingStatus } from "@core/utils/const";

import { ProfileEntity } from "../profile/state";
import { UsersFilterInterface } from "@core/routes/search/components/users/vd";

export interface UserState extends EntityState<ProfileEntity, EntityId> {
    loadingStatus: LoadingStatus;
    error: ApiError | null;
    page: number;
    filter: UsersFilterInterface;
    beReady: boolean;
    maxPages: number;
}

export const usersAdapter = createEntityAdapter<ProfileEntity>();

export const usersInitialState: UserState = usersAdapter.getInitialState({
    loadingStatus: LoadingStatus.ANotLoaded,
    error: null, 
    beReady: false,
    page: 1,
    maxPages: 1,
    filter: {
        for_what: "username",
        filter: "",
        username: "",
        ordering: "-",
        isOnline: null,
    } as UsersFilterInterface
});
