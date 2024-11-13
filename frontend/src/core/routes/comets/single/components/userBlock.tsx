import Tooltip from "@core/components/tooltip";
import { CometEntity } from "@core/reducers/slices/comets/state";
import ApiService from "@core/utils/api";
import { useEffect, useState } from "react";
import { GiAsteroid } from "react-icons/gi";
import DeleteCometButton from "./deleteButton";
import UpdateCometButton from "./updateButton";

interface UserBlockI {
    comet: CometEntity;
}

const UserBlock: React.FC<UserBlockI> = ({ comet }) => {
    const [pfp, setPfp] = useState<string | null>(null);

    const swipeTo = () => {
        const element =
            document.body.getElementsByClassName("scroll-snaper")[0];
        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has("swipe")) {
            swipeTo();
        }
    }, []);

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

    return (
        <div className="flex flex-col mt-8 rounded-lg">
            <div className="flex items-center space-x-3">
                <img
                    src={
                        pfp ||
                        "https://i.pinimg.com/474x/81/8a/1b/818a1b89a57c2ee0fb7619b95e11aebd.jpg"
                    }
                    alt={`${comet.additionals.user.username}'s avatar`}
                    className="w-12 h-12 rounded-full"
                />
                <div className="flex flex-col">
                    <div className="flex">
                        <span className="text-white font-bold">
                            {comet.additionals.user.username}
                        </span>
                        <span className="text-neutral-400">
                            #{comet.additionals.user.nickname}
                        </span>
                    </div>
                    <span className="text-gray-500 text-sm">
                        {new Date(comet.created_at).toLocaleDateString()}
                    </span>
                </div>
                <Tooltip content="Go to asteroids" placement="top">
                    <div
                        className="flex items-center hover:text-cyan-400"
                        onClick={swipeTo}
                    >
                        {comet.additionals.asteroids}
                        <GiAsteroid size={32} />
                    </div>
                </Tooltip>
                <DeleteCometButton
                    author_id={comet.user}
                    comet_id={parseInt(comet.id as string, 10)}
                    planet_id={comet.planet}
                />
                <UpdateCometButton
                    author_id={comet.user}
                    comet_id={parseInt(comet.id as string, 10)}
                    planet_id={comet.planet}
                />
            </div>
            <hr className="border-neutral-600 mt-3" />
        </div>
    );
};

export default UserBlock;
