import ConfModal from "@core/components/confModal";
import { store, useAppSelector } from "@core/reducers";
import { cometsActions } from "@core/reducers/slices/comets";
import ApiService from "@core/utils/api";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface DeleteCometButtonProps {
    comet_id: number;
    author_id: number;
    planet_id: number;
}

const DeleteCometButton: React.FC<DeleteCometButtonProps> = ({
    comet_id,
    author_id,
    planet_id,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();
    const user = useAppSelector((state) => state.profile.entity);
    const planetMemberships = useAppSelector(
        (state) => state.planet_memberships
    );
    const receivedPlanetMembership = Object.values(
        planetMemberships.entities
    ).find((entity) => entity.planet === planet_id);
    
    const deleteComet = async (data: { password?: string }) => {
        store.dispatch(cometsActions.removeOne(comet_id))
        const response = await ApiService.delete(`/comets/${comet_id}/`, { data });
        return response.status === 204;
    };
    

    const onClick = async () => {
        if (
            user!.id === author_id &&
            user?.additionals.password_for_comet_deleting
        ) {
            setIsModalOpen(true);
            return false
        } 

        const res = await deleteComet({});
        navigate(-1)
        return res
    };

    if (user?.id === author_id || [1, 2].includes(receivedPlanetMembership!.user_role)) {

        return (
            <>
                {user?.additionals.password_for_comet_deleting
                && user!.id === author_id && (
                        <ConfModal
                            step_back={true}
                            open={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            handler={deleteComet}
                            neverCheckbox={{
                                user: user.id,
                                checkbox_api_key: "password_for_comet_deleting",
                                checkbox_api_value: false,
                                checkbox_text:
                                    "Never ask me to confirm comet deletion",
                            }}
                        />
                    )}
                <button
                    onClick={() => {onClick()}}
                    className="flex items-center hover:text-cyan-400"
                >
                    <TrashIcon className="h-5 w-5 mr-2" />
                </button>
            </>
        );
    }

    return null
};

export default DeleteCometButton;
