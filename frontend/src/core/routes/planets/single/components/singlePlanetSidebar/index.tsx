import { useAppSelector } from "@core/reducers";
import { useState } from "react";
import DescriptionModal from "./descriptionModal";
import JLButton from "./JLButton";

const SignlePlanetSidebar = () => {
    const { entity } = useAppSelector((state) => state.currentPlanet);
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!entity) {
        return null;
    }

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <aside className="w-80 ml-8 flex-shrink-0">
            <div className="w-64 fixed top-1/2 transform -translate-y-1/2 border-r-2 rounded-sm overflow-y-auto">
                <div className="p-6 bg-neutral-900 shadow-lg rounded-2xl">
                    <h2 className="text-3xl font-bold text-cyan-400 mb-2 break-words">
                        {entity.planetname}
                    </h2>
                    <p className="text-neutral-500 text-xl mb-6 break-words">
                        {entity.nickname}
                    </p>
                    <p className="text-neutral-500 text-sm mb-8">
                        {new Date(entity.created_at).toLocaleDateString()}
                    </p>

                    <button
                        className="w-full px-6 py-3 text-sm font-bold rounded-full bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-400 hover:to-cyan-500 text-white focus:outline-none focus:ring-2 focus:ring-teal-400 flex items-center justify-center mx-auto mb-6"
                        onClick={handleOpenModal}
                    >
                        ⓘ
                    </button>


                    <JLButton id={entity.id}/>
                </div>
            </div>

            <DescriptionModal
                open={isModalOpen}
                onClose={handleCloseModal}
                description={entity.description}
            />
        </aside>
    );
};

export default SignlePlanetSidebar;
