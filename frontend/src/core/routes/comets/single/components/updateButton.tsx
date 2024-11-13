import { useAppSelector } from "@core/reducers";
import { PencilIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const UpdateCometButton: React.FC<{
    comet_id: number,
    planet_id: number,
    author_id: number
}> = ({comet_id, planet_id, author_id}) => {
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.profile.entity);

    if (user?.id === author_id) {
        return (
            <button
                onClick={() => {
                    navigate(`/planets/${planet_id}/comets/${comet_id}/update`);
                }}
                className="flex items-center hover:text-cyan-400"
            >
                <PencilIcon className="h-5 w-5 mr-2" />
            </button>
        );
    }

    return null;
};

export default UpdateCometButton;