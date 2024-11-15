import WarnModal from "@core/components/warnModal";
import { store, useAppSelector } from "@core/reducers";
import { asteroidsActions } from "@core/reducers/slices/asteroids";
import ApiService from "@core/utils/api";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

interface DeleteAsteroidButtonProps {
    asteroid_id: number;
    author_id: number;
    planet_id: number;
}

const DeleteAsteroidButton: React.FC<DeleteAsteroidButtonProps> = ({
    asteroid_id,
    author_id,
    planet_id,
}) => {
    const [isWarnModalOpen, setIsWarnModalOpen] = useState(false);

    const user = useAppSelector((state) => state.profile.entity);
    const planetMemberships = useAppSelector(
        (state) => state.planet_memberships
    );
    const receivedPlanetMembership = Object.values(
        planetMemberships.entities
    ).find((entity) => entity.planet === planet_id);

    const deleteAsteroid = async () => {
        const res = (await ApiService.delete(`/asteroids/${asteroid_id}/`)).status === 204;
        
        if (res)
            store.dispatch(asteroidsActions.removeAll());
            store.dispatch(asteroidsActions.change_beReady({new: false}));
            store.dispatch(asteroidsActions.change_beReady({new: true}));
    
        return res;
    };

    if (user?.id === author_id || [1, 2].includes(receivedPlanetMembership!.user_role)) {
        return (
            <>
                <WarnModal
                    open={isWarnModalOpen}
                    onClose={() => setIsWarnModalOpen(false)}
                    handler={deleteAsteroid}
                />
                <button
                    onClick={() => {setIsWarnModalOpen(true)}}
                    className="flex items-center hover:text-cyan-400"
                >
                    <TrashIcon className="h-5 w-5 mr-2" />
                </button>
            </>
        );
    }

    return null;
};

export default DeleteAsteroidButton;
