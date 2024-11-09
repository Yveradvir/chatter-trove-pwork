import { useAppDispatch, useAppSelector } from "@core/reducers";
import { planetsActions } from "@core/reducers/slices/planets";
import { LoadingStatus } from "@core/utils/const";
import { EntityId } from "@reduxjs/toolkit";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import MembershipCard from "./membershipCard";
import { ActuallyMembershipsEntity } from "@core/reducers/slices/actually_memberships/state";
import { loadActuallyMemberships } from "@core/reducers/slices/actually_memberships/thunks/loadMemberships";

const ActuallyMembershipsScroller = () => {
    const dispatch = useAppDispatch();
    const { beReady, filter, page, loadingStatus, ids, entities, maxPages } = useAppSelector((state) => state.actually_memberships);

    useEffect(() => {
        if (beReady) {
            dispatch(loadActuallyMemberships({ filter, page }));
        }
    }, [dispatch, beReady, filter, page]);

    const loadMorePlanets = () => {
        if (loadingStatus !== LoadingStatus.Loading) {
            dispatch(planetsActions.change_page(page + 1));
        }
    };

    return (
        <div className="mt-4">
            <hr className="border-neutral-800"/>
            <InfiniteScroll
                dataLength={ids.length}
                next={loadMorePlanets}
                hasMore={
                    loadingStatus !== LoadingStatus.Loading 
                    && ids.length > 0 
                    && page === maxPages
                }
                loader={<p>Loading memberships...</p>}
                endMessage={<p className="text-3xl mt-4 font-bold tracking-tight text-cyan-300">
                    Congrats! It's finish.
                </p>}
            >
                <div className="mt-4 space-y-4">
                    {ids.map((id: EntityId) => {
                        const membership = entities[id] as ActuallyMembershipsEntity;
                        return <MembershipCard key={id as string} membership={membership} />
                    })}
                </div>
            </InfiniteScroll>
        </div>
    );
};

export default ActuallyMembershipsScroller;
