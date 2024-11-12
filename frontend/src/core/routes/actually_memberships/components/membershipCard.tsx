import Tooltip from "@core/components/tooltip";
import { ActuallyMembershipsEntity } from "@core/reducers/slices/actually_memberships/state";
import { CgCrown } from "react-icons/cg";
import { FaCrown, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

interface MembershipCardProps {
    membership: ActuallyMembershipsEntity;
}

const MembershipCard: React.FC<MembershipCardProps> = ({ membership }) => {
    const roles: { [key: number]: JSX.Element } = {
        0: (
            <Tooltip placement="top" content="User">
                <FaUser size={16}/>
            </Tooltip>
        ),
        1: (
            <Tooltip placement="top" content="Admin">
                <CgCrown size={16}/>
            </Tooltip>
        ),
        2: (
            <Tooltip placement="top" content="Owner">
                <FaCrown size={16}/>
            </Tooltip>
        ),
    };

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

                <div>
                    {roles[membership.user_role as keyof typeof roles]}
                </div>

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
