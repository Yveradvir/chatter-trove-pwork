import ConfModal from "@core/components/confModal";
import Layout from "@core/components/layout";
import Tooltip from "@core/components/tooltip";
import IsPrivatePlanet from "@core/decorators/isPrivatePlanet";
import { useAppDispatch, useAppSelector } from "@core/reducers";
import { errorActions } from "@core/reducers/slices/error";
import { planetMembershipsActions } from "@core/reducers/slices/planet_memberships";
import ApiService from "@core/utils/api";
import { ApiError } from "@core/utils/const";
import { useEffect, useState } from "react";
import { MdGroups } from "react-icons/md";
import { Link, useParams } from "react-router-dom";

const PlanetSettingPage = () => {
    const [isDeleteCometModalOpen, setIsDeleteCometModalOpen] = useState(false);

    const dispatch = useAppDispatch();
    const { planet_id } = useParams<{ planet_id: string }>();
    const planetId = parseInt(planet_id as string, 10);

    const planetMemberships = useAppSelector(
        (state) => state.planet_memberships
    );
    const receivedPlanetMembership = Object.values(
        planetMemberships.entities
    ).find((entity) => entity.planet === planetId);

    const is_private = useAppSelector(
        (state) => state.currentPlanet.entity?.is_private
    );

    useEffect(() => {
        if (isNaN(planetId)) {
            dispatch(
                errorActions.setError({
                    detail: "Invalid Planet ID",
                    status_code: 404,
                } as ApiError)
            );
        }
    }, [dispatch, planetId]);

    return (
        <Layout>
            <IsPrivatePlanet
                planet_id={planetId}
                is_private={is_private as boolean}
            >
                <div className="flex flex-col items-center mt-8 max-w py-12 text-center space-y-4">
                    <Link to={`/planets/${planetId}/memberships`}>
                        <button className="w-full max-w-lg px-10 py-3 font-semibold text-gray-200 bg-gradient-to-r from-gray-600 to-gray-800 rounded-lg shadow-lg hover:from-gray-700 hover:to-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-400 transition-all transform hover:scale-105">
                            <span className="flex flex-col items-center">
                                <MdGroups size={32} />
                                <span className="mt-2 text-base">Users</span>
                            </span>
                        </button>
                    </Link>
                    {receivedPlanetMembership?.user_role === 1 && (
                        <Tooltip
                            placement="top"
                            content="You're gonna lose your "
                        >
                            <button
                                className="w-full max-w-lg px-10 py-3 font-semibold text-red-200 bg-gradient-to-r from-red-600 to-red-800 rounded-lg shadow-lg hover:from-red-700 hover:to-red-900 focus:outline-none focus:ring-4 focus:ring-gray-400 transition-all transform hover:scale-105"
                                onClick={async () => {
                                    const response = await ApiService.delete(
                                        `/planetmemberships/${receivedPlanetMembership.id}/`
                                    );
                                    if (response.status === 204) {
                                        dispatch(
                                            planetMembershipsActions.removeOne(
                                                receivedPlanetMembership.id
                                            )
                                        );
                                    }
                                }}
                            >
                                <span className="flex flex-col items-center">
                                    <MdGroups size={32} />
                                    <span className="mt-2 text-base">
                                        Leave
                                    </span>
                                </span>
                            </button>
                        </Tooltip>
                    )}
                    {receivedPlanetMembership?.user_role === 2 && (
                        <>
                            <ConfModal
                                open={isDeleteCometModalOpen}
                                onClose={() => {
                                    setIsDeleteCometModalOpen(false);
                                }}
                                after_success_url="/profile/"
                                handler={async ({ password }) => {
                                    return (await ApiService.delete(
                                        `/planets/${planetId}/`,
                                        {
                                            data: {
                                                password,
                                            },
                                        }
                                    )).status === 204;
                                }}
                            />
                            <button
                                className="w-full max-w-lg px-10 py-3 font-semibold text-red-200 bg-gradient-to-r from-red-600 to-red-800 rounded-lg shadow-lg hover:from-red-700 hover:to-red-900 focus:outline-none focus:ring-4 focus:ring-gray-400 transition-all transform hover:scale-105"
                                onClick={() => {
                                    setIsDeleteCometModalOpen(true);
                                }}
                            >
                                <span className="flex flex-col items-center">
                                    <MdGroups size={32} />
                                    <span className="mt-2 text-base">
                                        Delete Planet
                                    </span>
                                </span>
                            </button>
                        </>
                    )}
                </div>
            </IsPrivatePlanet>
        </Layout>
    );
};

export default PlanetSettingPage;
