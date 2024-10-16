import { useAppSelector } from "@core/reducers";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

const CometButton: React.FC = () => {
    const isAuthenticated = useAppSelector((state) => state.profile.isAuthenticated);

    if (!isAuthenticated) return null;

    return (
        <Link to={'comets/'}>
            <button
                className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
                <span><FiPlus/></span>
            </button>
        </Link>
    );
};

export default CometButton;
