import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@core/reducers";
import FilterField from "./filterField";
import { CometEntity } from "@core/reducers/slices/comets/state";
import { EntityId } from "@reduxjs/toolkit";
import { LoadingStatus } from "@core/utils/const";
import CometCard from "./CometCard";
import { loadComets } from "@core/reducers/slices/comets/thunks/loadComets";
import { cometsActions } from "@core/reducers/slices/comets";

const Scroller = () => {
    const dispatch = useAppDispatch();
    const comets = useAppSelector((state) => state.comets);

    useEffect(() => {
        dispatch(loadComets({
            filter: comets.filter,
            page: comets.page
        }));

        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >=
                document.body.offsetHeight - 100
            ) {
                if (comets.loadingStatus !== LoadingStatus.Loading) {
                    dispatch(cometsActions.change_page(comets.page + 1));
                    dispatch(loadComets({
                        filter: comets.filter,
                        page: comets.page + 1
                    })); 
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [dispatch, comets]);

    return (
        <div className="mt-4">
            <FilterField />
            <hr className="mt-2 border-neutral-700" />

            <div className="mt-4 space-y-4">
                {comets.ids.map((id: EntityId) => {
                    const comet = comets.entities[id] as CometEntity;
                    return (
                        <CometCard key={comet.id} comet={comet} />
                    );
                })}
            </div>

            {comets.loadingStatus === LoadingStatus.Loading && (
                <p>Loading comets...</p>
            )}
            {comets.error && <p>Error: {comets.error.detail}</p>}
        </div>
    );
};

export default Scroller;
