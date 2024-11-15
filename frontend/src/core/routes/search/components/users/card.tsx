import Tooltip from "@core/components/tooltip";
import { ProfileEntity } from "@core/reducers/slices/profile/state";
import { Link } from "react-router-dom";

interface UserCardProps {
    profile: ProfileEntity;
}


const UserCard: React.FC<UserCardProps> = ({ profile }) => {

    return (
        <div className="border border-neutral-800 p-4 rounded-md shadow-md hover:shadow-lg transition-shadow">
            <Link to={`/profile/${profile.id}`}>
                <h1 className="flex items-center">
                    <span className="text-lg font-bold">{profile.username}</span>
                    <span className="text-sm text-gray-500 ml-2">#{profile.nickname}</span>
                    {profile.is_online ? (
                            <Tooltip content="Online" placement="top">
                                <div className="ml-2 border-2 border-cyan-600 rounded-full p-1 cursor-pointer"></div>
                            </Tooltip>
                        ) : (
                            <Tooltip content="Offline" placement="top">
                                <div className="ml-2 border-2 border-red-600 rounded-full p-1 cursor-pointer"></div>
                            </Tooltip>
                    )}
                </h1>
            </Link>
        </div>
    );
};

export default UserCard;
