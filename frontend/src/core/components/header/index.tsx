import { Link, useLocation } from "react-router-dom";
import ProfilePopover from "./popover.header";

const routes = [
    { url: "/", title: "Home" },
    { url: "/somethinh", title: "Something" },
];

const Header = () => {
    const location = useLocation();

    return (
        <header className="bg-white shadow-sm">
            <nav className="container mx-auto flex items-center justify-between p-6">
                <Link
                    to="/"
                    className="text-4xl flex items-center -m-1.5 p-1.5"
                >
                    <span className="bg-gradient-to-t from-teal-600 to-cyan-800 bg-clip-text text-transparent rounded-2xl">
                        Chatter
                    </span>
                    Trove
                </Link>
                <div className="flex items-center space-x-10 mr-10">
                    <div className="flex space-x-8 items-center">
                        {routes.map(({ url, title }) => {
                            const isActive = location.pathname === url;
                            return (
                                <Link
                                    key={title}
                                    to={url}
                                    className={`relative text-sm font-medium p-2 rounded-md transition duration-300 ease-in-out ${
                                        isActive
                                            ? "text-white"
                                            : "text-gray-700 hover:text-teal-600"
                                    }`}
                                >
                                    <span className="relative z-10">{title}</span>
                                    {isActive && (
                                        <span className="absolute inset-0 rounded-md bg-gradient-to-r from-teal-600 to-cyan-800"></span>
                                    )}
                                </Link>
                            );
                        })}

                        <ProfilePopover />
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
