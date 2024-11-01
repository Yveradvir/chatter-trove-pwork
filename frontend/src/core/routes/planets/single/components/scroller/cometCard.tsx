import { CometEntity } from "@core/reducers/slices/comets/state";
import ApiService from "@core/utils/api";
import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CometCard: FC<{ comet: CometEntity }> = ({ comet }) => {
    const [pfp, setPfp] = useState<string | null>(null);

    useEffect(() => {
        if (comet.additionals.pfp) {
            (async () => {
                try {
                    const response = await ApiService.get(
                        `/profile_images/?user=${comet.additionals.user.id}`
                    );
                    setPfp(response.data.results[0]?.image);
                } catch (error) {
                    console.error("Failed to load profile image:", error);
                }
            })();
        }
    }, [comet.additionals.pfp, comet.additionals.user.id]);

    const truncateDescription = (description: string) => {
        return description.length > 100 ? `${description.substring(0, 100)}...` : description;
    };

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
            <p className="text-sm text-neutral-400">{truncateDescription(comet.description)}</p>
            <Link to={`comets/${comet.id}`}>
                <button
                    className="bottom-6 right-6 bg-gradient-to-t from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-bold py-3 px-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                    <span>Check Comet</span>
                </button>
            </Link>
        </div>
    );
};

export default CometCard;
