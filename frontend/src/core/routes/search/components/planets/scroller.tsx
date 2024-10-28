import { useAppDispatch, useAppSelector } from "@core/reducers";
import { planetsActions } from "@core/reducers/slices/planets";
import { PlanetEntity } from "@core/reducers/slices/planets/state";
import { loadPlanets } from "@core/reducers/slices/planets/thunks/loadPlanets";
import { LoadingStatus } from "@core/utils/const";
import { EntityId } from "@reduxjs/toolkit";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PlanetCard from "./card";

const PlanetsSearchScroller = () => {
    const dispatch = useAppDispatch();
    const { beReady, filter, page, loadingStatus, ids, entities, maxPages } = useAppSelector((state) => state.planets);

    useEffect(() => {
        if (beReady) {
            dispatch(loadPlanets({ filter, page }));
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
                loader={<p>Loading planets...</p>}
                endMessage={<p className="text-3xl mt-4 font-bold tracking-tight text-cyan-300">
                    Congrats! It's finish.
                </p>}
            >
                <div className="mt-4 space-y-4">
                    {ids.map((id: EntityId) => {
                        const planet = entities[id] as PlanetEntity;
                        return <PlanetCard key={id as string} planet={planet} />
                    })}
                </div>
            </InfiniteScroll>
        </div>
    );
};

export default PlanetsSearchScroller;
