import { useAppSelector } from "@core/reducers";
import { Fragment, useState } from "react";

const SignlePlanetSidebar = () => {
    const { entity } = useAppSelector(state => state.currentPlanet);
    const [isExpanded, setIsExpanded] = useState(false);

    if (!entity) {
        return null;
    }

    const handleToggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    const truncatedDescription =
        entity.description.length > 200
            ? entity.description.slice(0, 200) + "..."
            : entity.description;

    return (
        <aside className="w-80 ml-8 flex-shrink-0">
            <div className="h-screen fixed top-36">
                <div className="p-6 bg-neutral-800 shadow-lg rounded-lg">
                    <h2 className="text-xl font-bold text-white mb-4">Planet Details</h2>
                    <div className="mb-4">
                        <h3 className="font-medium text-gray-300">Planet Name:</h3>
                        <p className="text-gray-200 break-words">{entity.planetname}</p>
                    </div>
                    <div className="mb-4">
                        <h3 className="font-medium text-gray-300">Nickname:</h3>
                        <p className="text-gray-200 break-words">{entity.nickname}</p>
                    </div>
                    <div className="mb-4">
                        <h3 className="font-medium text-gray-300">Description:</h3>
                        <p className="text-gray-200 break-words">
                            {isExpanded ? entity.description : truncatedDescription}
                            {entity.description.length > 200 && (
                                <button
                                    className="text-blue-400 font-semibold ml-2 hover:underline"
                                    onClick={handleToggleDescription}
                                >
                                    {isExpanded ? "Show less" : "Show more"}
                                </button>
                            )}
                        </p>
                    </div>
                    <div className="mb-4">
                        <h3 className="font-medium text-gray-300">Created At:</h3>
                        <p className="text-gray-200 break-words">{new Date(entity.created_at).toLocaleDateString()}</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default SignlePlanetSidebar;
