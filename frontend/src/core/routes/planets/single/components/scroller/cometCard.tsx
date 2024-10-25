import { CometEntity } from "@core/reducers/slices/comets/state";
import ApiService from "@core/utils/api";
import { FC, useEffect, useState } from "react";

const CometCard: FC<{ comet: CometEntity }> = ({ comet }) => {
    const [pfp, setPfp] = useState<string | null>(null);

    useEffect(() => {
        if (comet.additionals.pfp) {
            (async () => {
                try {
                    const response = await ApiService.get(
                        `/profile_images/?user=${comet.additionals.user.id}`
                    );
                    console.log(response);
                    
                    setPfp(response.data.results[0].image);
                } catch (error) {
                    console.error("Failed to load profile image:", error);
                }
            })();
        }
    }, [comet.additionals.pfp, comet.additionals.user.id]);

    return (
        <div className="p-4 bg-neutral-800 rounded-lg shadow-md mb-4">
            <div className="flex items-center mb-3">
                <img
                    src={pfp || "https://i.pinimg.com/474x/81/8a/1b/818a1b89a57c2ee0fb7619b95e11aebd.jpg"} 
                    alt={`${comet.additionals.user.username}'s avatar`}
                    className="w-12 h-12 rounded-full mr-3"
                />
                <div>
                    <h1>
                        <span className="text-lg font-bold">{comet.additionals.user.username}</span>
                        <span className="text-sm text-gray-500">#{comet.additionals.user.nickname}</span>
                    </h1>
                </div>
            </div>
            <h2 className="text-lg font-bold text-white">{comet.title}</h2>
            <p className="text-sm text-neutral-400">{comet.description}</p>
            <div className="text-xs text-neutral-500 mt-2">
                <span>User: {comet.user}</span> | <span>Planet: {comet.planet}</span>
            </div>
        </div>
    );
};

export default CometCard;
