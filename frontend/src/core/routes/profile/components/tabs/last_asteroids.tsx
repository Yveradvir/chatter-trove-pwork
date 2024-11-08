import React, { useCallback, useEffect, useState } from "react";
import { UserIdRequired } from "../types";
import ApiService from "@core/utils/api";
import InfiniteScroll from "react-infinite-scroll-component";
import { ApiError } from "@core/utils/const";
import { Rejector } from "@core/utils/rejector";
import { AsteroidEntity } from "@core/reducers/slices/asteroids/state";
import AsteroidCard from "@core/routes/comets/single/components/asteroids/asteroidCard";

const LastAsteroidsTab: React.FC<UserIdRequired> = ({ user_id }) => {
    const [asteroids, setAsteroids] = useState<{ [id: number]: AsteroidEntity }>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [error, setError] = useState<ApiError | null>(null);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const fetchAsteroids = useCallback(async () => {
        setLoading(true);
        try {
            const response = await ApiService.get(
                `/asteroids/?ordering=-created_at&user=${user_id}&page=${page}`
            );

            if (response.data.results.length === 0) {
                setHasMore(false);
            } else {
                setAsteroids((prevAsteroids) => {
                    const newAsteroids = response.data.results.reduce(
                        (
                            acc: { [key: number]: AsteroidEntity },
                            comet: AsteroidEntity
                        ) => {
                            acc[comet.id as number] = comet; 
                            return acc;
                        },
                        {}
                    );

                    return { ...prevAsteroids, ...newAsteroids };
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
        fetchAsteroids();
    }, [user_id, page, fetchAsteroids]);

    const loadMoreAsteroids = () => {
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

    if (Object.keys(asteroids).length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[200px] text-center text-teal-300">
                No More Asteroids!
            </div>
        );
    }

    return (
        <div className="mt-4">
            <InfiniteScroll
                dataLength={Object.keys(asteroids).length} 
                next={loadMoreAsteroids}
                hasMore={hasMore}
                loader={
                    <div className="flex justify-center mt-4">Loading...</div>
                }
                endMessage={
                    <p className="text-center">No more Asteroids to load</p>
                }
            >
                <div className="space-y-4">
                    {Object.values(asteroids).map((asteroid) => (
                        <AsteroidCard key={asteroid.id} asteroid={asteroid} last_asteroid={true} />
                    ))}
                </div>
            </InfiniteScroll>
        </div>
    );
};

export default LastAsteroidsTab;
