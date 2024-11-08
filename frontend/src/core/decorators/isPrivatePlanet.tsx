import JoinToPrivateModal from "@core/components/joinToPrivate";
import { useAppSelector } from "@core/reducers";
import React, { useEffect, useState } from "react";

const IsPrivatePlanet: React.FC<{
    children: React.ReactNode;
    planet_id: number;
    is_private: boolean;
}> = ({ children, planet_id, is_private }) => {
    const entities = useAppSelector(
        (state) => state.planet_memberships.entities
    );
    const isAuthenticated = useAppSelector((state) => state.profile.isAuthenticated)
    const planetmemberships = useAppSelector((state) => state.planet_memberships)
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const isMember = Object.values(planetmemberships.entities).some(
            (membership: {planet: number}) => membership.planet === planet_id
        );

        if (!isAuthenticated || (is_private && !isMember)) {
            setIsOpen(true);
        }
    }, [is_private, entities, planet_id, planetmemberships.entities, isAuthenticated]);

    return (
        <>
            <JoinToPrivateModal
                planet_id={planet_id}
                open={isOpen}
                onClose={() => setIsOpen(false)}
            />
            {!isOpen && children}
        </>
    );
};

export default IsPrivatePlanet;
