import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@core/reducers";
import { errorActions } from "@core/reducers/slices/error";
import { ProfileEntity } from "@core/reducers/slices/profile/state";
import { ApiError } from "@core/utils/const";
import { PlanetMembershipEntity } from "@core/reducers/slices/planet_memberships/state";

interface InPlanetI {
    planet_id: string | undefined;
    children?: null | React.ReactNode;
    strict: boolean;
}

const InPlanet: React.FC<InPlanetI> = ({ planet_id, strict, children = null }) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.profile.entity) as ProfileEntity;
    const planetmemberships = useAppSelector((state) => state.planet_memberships);

    useEffect(() => {
        if (!planet_id || Number.isNaN(Number(planet_id))) {
            dispatch(
                errorActions.setError({
                    error: {
                        detail: "Invalid or missing planet ID",
                        status_code: 500,
                    } as ApiError,
                    to: "/",
                })
            );
        } 

        const isMember = Object.values(planetmemberships.entities).some(
            (membership: PlanetMembershipEntity) => membership.planet === parseInt(planet_id!, 10)
        );

        if (!isMember && strict) {
            dispatch(
                errorActions.setError({
                    error: {
                        detail: "Forbidden. You should be a member of this planet.",
                        status_code: 403,
                    } as ApiError,
                    to: -1,
                })
            );
        }
    }, [planet_id, user, planetmemberships, strict, dispatch]);

    return <>{children}</>;
};

export default InPlanet;
