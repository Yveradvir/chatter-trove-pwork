import { AsteroidEntity } from "@core/reducers/slices/asteroids/state";

interface AsteroidCardProps {
    asteroid: AsteroidEntity;
}

const AsteroidCard: React.FC<AsteroidCardProps> = ({ asteroid }) => {
    return (
        <div className="border border-neutral-800 p-4 rounded-md shadow-md hover:shadow-lg transition-shadow">
            <h1 className="flex items-center">
                <span className="text-lg font-bold">
                    {asteroid.additionals.user.username}
                </span>
                <span className="text-sm text-gray-500 ml-2">
                    #{asteroid.additionals.user.nickname}
                </span>
            </h1>
            <p className="flex text-xs text-gray-600 mt-2"></p>
            <div className="mt-3 flex items-center"></div>
        </div>
    );
};

export default AsteroidCard;
