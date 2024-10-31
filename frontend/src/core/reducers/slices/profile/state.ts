import { ApiError, LoadingStatus } from "@core/utils/const";
import { EntityId } from "@reduxjs/toolkit";

export interface AdditionalsEntity {
    user: EntityId;
    is_verified: boolean;
    password_for_pfp_changing: boolean;
}

export interface ProfileEntity {
    id: EntityId;
    username: string;
    nickname: string;
    email: string;
    tag: string;
    is_active: boolean;
    is_staff: boolean;
    is_online: boolean;
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