import { CometEntity } from "@core/reducers/slices/comets/state";
import { FC } from "react";

const CometCard: FC<{comet: CometEntity}> = ({ comet }) => {
    return (
        <div className="p-4 bg-neutral-800 rounded-lg shadow-md mb-4">
            <h2 className="text-lg font-bold text-white">{comet.title}</h2>
            <p className="text-sm text-neutral-400">{comet.description}</p>
            <div className="text-xs text-neutral-500 mt-2">
                <span>User: {comet.user}</span> | <span>Planet: {comet.planet}</span>
            </div>
        </div>
    );
};

export default CometCard;
