import { asteroidsActions } from "@core/reducers/slices/asteroids";
import { AsteroidEntity } from "@core/reducers/slices/asteroids/state";
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";

interface AsteroidCardProps {
    asteroid: AsteroidEntity;
}

const AsteroidCard: React.FC<AsteroidCardProps> = ({ asteroid }) => {
    const dispatch = useDispatch();

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
            <p className="flex text-sm text-gray-200 mt-2">{asteroid.content}</p>
            <div className="mt-3 flex items-center">
                <button 
                    onClick={() => {dispatch(asteroidsActions.reply(asteroid.id))}}
                    className="flex items-center text-gray-400 hover:text-gray-200 transition-colors"
                >
                    <ChatBubbleLeftIcon className="h-5 w-5 mr-1" />
                    <span className="text-sm">Reply</span>
                </button>
            </div>
        </div>
    );
};

export default AsteroidCard;
