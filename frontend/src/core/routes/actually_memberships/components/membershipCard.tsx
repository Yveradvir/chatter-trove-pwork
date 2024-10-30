import { ActuallyMembershipsEntity } from "@core/reducers/slices/actually_memberships/state";

interface MembershipCardProps {
    membership: ActuallyMembershipsEntity;
}

const MembershipCard: React.FC<MembershipCardProps> = ({ membership }) => {

    return (
        <div className="border border-neutral-800 p-4 rounded-md shadow-md hover:shadow-lg transition-shadow">
            <h1 className="flex items-center">
                <span className="text-lg font-bold">{membership.additionals.user.username}</span>
                <span className="text-sm text-gray-500 ml-2">#{membership.additionals.user.nickname}</span>
            </h1>
            <div className="mt-3">

            </div>
        </div>
    );
};

export default MembershipCard;
