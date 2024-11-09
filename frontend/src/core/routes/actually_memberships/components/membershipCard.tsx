import Tooltip from "@core/components/tooltip";
import { ActuallyMembershipsEntity } from "@core/reducers/slices/actually_memberships/state";
import { Link } from "react-router-dom";

interface MembershipCardProps {
    membership: ActuallyMembershipsEntity;
}

const MembershipCard: React.FC<MembershipCardProps> = ({ membership }) => {
    return (
        <div className="border border-neutral-800 p-4 rounded-md shadow-md hover:shadow-lg transition-shadow">
            <h1 className="flex items-center">
                <Link to={`profile/${membership.user}`}>
                    <span className="text-lg font-bold">
                        {membership.additionals.user.username}
                    </span>
                    <span className="text-sm text-gray-500 ml-2">
                        #{membership.additionals.user.nickname}
                    </span>
                </Link>

                {membership.additionals.user.is_online ? (
                    <Tooltip content="Online" placement="top">
                        <div className="ml-2 border-2 border-cyan-600 rounded-full p-1 cursor-pointer"></div>
                    </Tooltip>
                ) : (
                    <Tooltip content="Offline" placement="top">
                        <div className="ml-2 border-2 border-red-600 rounded-full p-1 cursor-pointer"></div>
                    </Tooltip>
                )}
            </h1>
            <div className="mt-3"></div>
        </div>
    );
};

export default MembershipCard;
