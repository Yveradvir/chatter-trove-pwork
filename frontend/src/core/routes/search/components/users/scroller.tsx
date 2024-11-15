import { useAppDispatch, useAppSelector } from "@core/reducers";
import { LoadingStatus } from "@core/utils/const";
import { EntityId } from "@reduxjs/toolkit";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { ProfileEntity } from "@core/reducers/slices/profile/state";
import UserCard from "./card";
import { loadUsers } from "@core/reducers/slices/users/thunks/loadUsers";
import { usersActions } from "@core/reducers/slices/users";

const UsersSearchScroller = () => {
    const dispatch = useAppDispatch();
    const { beReady, filter, page, loadingStatus, ids, entities, maxPages } = useAppSelector((state) => state.users);

    useEffect(() => {
        if (beReady) {
            dispatch(loadUsers({ filter, page }));
        }
    }, [dispatch, beReady, filter, page]);

    const loadMoreUsers = () => {
        if (loadingStatus !== LoadingStatus.Loading) {
            dispatch(usersActions.change_page(page + 1));
        }
    };

    return (
        <div className="mt-4">
            <hr className="border-neutral-800"/>
            <InfiniteScroll
                dataLength={ids.length}
                next={loadMoreUsers}
                hasMore={
                    loadingStatus !== LoadingStatus.Loading 
                    && ids.length > 0 
                    && page === maxPages
                }
                loader={<p>Loading planets...</p>}
                endMessage={<p className="text-3xl mt-4 font-bold tracking-tight text-cyan-300">
                    Congrats! It's finish.
                </p>}
            >
                <div className="mt-4 space-y-4">
                    {ids.map((id: EntityId) => {
                        const profile = entities[id] as ProfileEntity;
                        return <UserCard key={id as string} profile={profile} />
                    })}
                </div>
            </InfiniteScroll>
        </div>
    );
};

export default UsersSearchScroller;
