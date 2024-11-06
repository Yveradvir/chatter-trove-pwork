import React, { useEffect, useState } from "react";
import { UserIdRequired } from "../types";
import { PlanetEntity } from "@core/reducers/slices/planets/state";
import ApiService from "@core/utils/api";
import { ApiError } from "@core/utils/const";
import { Rejector } from "@core/utils/rejector";
import PlanetCard from "@core/routes/search/components/planets/card";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

const MembershipsTab: React.FC<UserIdRequired> = ({ user_id }) => {
    const [error, setError] = useState<ApiError | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [planets, setPlanets] = useState<PlanetEntity[]>([]);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const response = await ApiService.get(`/planetmemberships/gmp?user=${user_id}`);
                setPlanets(response.data);
            } catch (error) {
                setError(Rejector.standartAxiosReject(error));
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [user_id]);

    if (loading)
        return (
            <div className="flex items-center justify-center min-h-[200px]">
                <ArrowPathIcon className="w-12 h-12 animate-spin text-teal-300" />
            </div>
        );

    if (error)
        return (
            <div className="flex items-center justify-center min-h-[200px] text-center text-teal-300">
                Error: {error.detail}
            </div>
        );

    if (planets.length === 0)
        return (
            <div className="flex items-center justify-center min-h-[200px] text-center text-teal-300">
                No memberships available
            </div>
        );

    return (
        <div className="mt-4 space-y-4">
            {planets.map((planet: PlanetEntity) => (
                <PlanetCard key={planet.id} planet={planet} />
            ))}
        </div>
    );
};

export default MembershipsTab;
