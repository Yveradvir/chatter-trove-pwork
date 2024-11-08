import React, { useCallback, useEffect, useState } from "react";
import { UserIdRequired } from "../types";
import { CometEntity } from "@core/reducers/slices/comets/state";
import ApiService from "@core/utils/api";
import InfiniteScroll from "react-infinite-scroll-component";
import CometCard from "@core/routes/planets/single/components/scroller/cometCard";
import { ApiError } from "@core/utils/const";
import { Rejector } from "@core/utils/rejector";

const LastCometsTab: React.FC<UserIdRequired> = ({ user_id }) => {
    const [comets, setComets] = useState<{ [id: number]: CometEntity }>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [error, setError] = useState<ApiError | null>(null);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const fetchComets = useCallback(async () => {
        setLoading(true);
        try {
            const response = await ApiService.get(
                `/comets/?ordering=-created_at&user=${user_id}&page=${page}`
            );

            if (response.data.results.length === 0) {
                setHasMore(false);
            } else {
                setComets((prevComets) => {
                    const newComets = response.data.results.reduce(
                        (
                            acc: { [key: number]: CometEntity },
                            comet: CometEntity
                        ) => {
                            acc[comet.id as number] = comet; 
                            return acc;
                        },
                        {}
                    );

                    return { ...prevComets, ...newComets };
                });

                if (!response.data.next) {
                    setHasMore(false);
                }
            }
        } catch (error) {
            setError(Rejector.standartAxiosReject(error));
        } finally {
            setLoading(false);
        }
    }, [page, user_id]);

    useEffect(() => {
        fetchComets();
    }, [user_id, page, fetchComets]);

    const loadMoreComets = () => {
        if (!loading && hasMore) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[200px] text-center text-teal-300">
                Error: {error.detail}
            </div>
        );
    }

    if (Object.keys(comets).length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[200px] text-center text-teal-300">
                No comets!
            </div>
        );
    }

    return (
        <div className="mt-4">
            <InfiniteScroll
                dataLength={Object.keys(comets).length} 
                next={loadMoreComets}
                hasMore={hasMore}
                loader={
                    <div className="flex justify-center mt-4">Loading...</div>
                }
                endMessage={
                    <p className="text-center">No more comets to load</p>
                }
            >
                <div className="space-y-4">
                    {Object.values(comets).map((comet) => (
                        <CometCard key={comet.id} comet={comet} profile_view={true} />
                    ))}
                </div>
            </InfiniteScroll>
        </div>
    );
};

export default LastCometsTab;
