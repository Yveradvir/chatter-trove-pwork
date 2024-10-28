import { PlanetEntity } from "@core/reducers/slices/planets/state";
import { useNavigate } from "react-router-dom";

interface PlanetCardProps {
    planet: PlanetEntity;
}

const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + "...";
    }
    return text;
};

const PlanetCard: React.FC<PlanetCardProps> = ({ planet }) => {
    const navigate = useNavigate();

    return (
        <div className="border border-neutral-800 p-4 rounded-md shadow-md hover:shadow-lg transition-shadow">
            <h1>
                <span className="text-lg font-bold">{planet.planetname}</span>
                <span className="text-sm text-gray-500">#{planet.nickname}</span>
            </h1>
            <p className="text-xs text-gray-600 mt-2">{truncateText(planet.description, 100)}</p>
            <div className="mt-3">
                <button
                    className="w-full py-2 px-4 text-sm font-medium rounded-lg border border-teal-300 bg-teal-300 text-white hover:bg-teal-400 focus:outline-none focus:bg-teal-400 transition-colors"
                    onClick={() => {navigate(`/planets/${planet.id}`)}}
                >
                    Enter
                </button>
            </div>
        </div>
    );
};

export default PlanetCard;
