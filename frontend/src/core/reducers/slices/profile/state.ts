import { ApiError, LoadingStatus } from "@core/utils/const";
import { EntityId } from "@reduxjs/toolkit";

export interface AdditionalsEntity {
    user: EntityId;
    password_for_pfp_changing: boolean;
    password_for_comet_deleting: boolean;
}

export interface ProfileEntity {
    id: EntityId;
    username: string;
    nickname: string;
    tag: string;
    is_active: boolean;
    is_staff: boolean;
    is_online: boolean;
    created_at: string;
    additionals: AdditionalsEntity
}

export interface ProfileState {
    isAuthenticated: boolean;
    
    loadingStatus: LoadingStatus;
    entity: ProfileEntity | null;
    error: ApiError | null;
}


export const profileInitialState = {
    isAuthenticated: false,
    loadingStatus: LoadingStatus.ANotLoaded,
    entity: null,
    error: null
} as ProfileState;