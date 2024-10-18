import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@core/reducers";
import FilterField from "./filterField";
import { CometEntity } from "@core/reducers/slices/comets/state";
import { EntityId } from "@reduxjs/toolkit";
import { LoadingStatus } from "@core/utils/const";
import CometCard from "./cometCard";
import { loadComets } from "@core/reducers/slices/comets/thunks/loadComets";
import { cometsActions } from "@core/reducers/slices/comets";
import InfiniteScroll from "react-infinite-scroll-component";

const Scroller = () => {
    const dispatch = useAppDispatch();
    const { beReady, filter, page, loadingStatus, ids, entities, error } = useAppSelector((state) => state.comets);

    useEffect(() => {
        if (beReady) {
            dispatch(loadComets({ filter, page }));
        }
    }, [dispatch, beReady, filter, page]);

    const loadMoreComets = () => {
        if (loadingStatus !== LoadingStatus.Loading) {
            dispatch(cometsActions.change_page(page + 1));
        }
    };

    return (
        <div className="mt-4">
            <FilterField />
            <hr className="mt-2 border-neutral-700" />

            <InfiniteScroll
                dataLength={ids.length}
                next={loadMoreComets}
                hasMore={loadingStatus !== LoadingStatus.Loading && ids.length > 0}
                loader={<p>Loading comets...</p>}
            >
                <div className="mt-4 space-y-4">
                    {ids.map((id: EntityId) => {
                        const comet = entities[id] as CometEntity;
                        return <CometCard key={comet.id} comet={comet} />;
                    })}
                </div>
            </InfiniteScroll>

            {error && <p>Error: {error.detail}</p>}
        </div>
    );
};

export default Scroller;
