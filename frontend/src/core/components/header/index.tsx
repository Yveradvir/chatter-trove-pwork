import { Link, useLocation } from "react-router-dom";
import ProfilePopover from "./profilepopover.header";

const routes = [
    { url: "/", title: "Home" },
    { url: "/something", title: "Something" },
];

const Header = () => {
    const location = useLocation();

    return (
        <header className="sticky top-4 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full">
            <nav
                className="backdrop-blur-sm bg-opacity-70 relative max-w-5xl w-full bg-neutral-800 rounded-2xl py-3 px-5 md:flex md:items-center md:justify-between mx-2 lg:mx-auto"
                aria-label="Global"
            >
                <div className="flex items-center justify-between">
                    <Link
                        to="/"
                        className="flex-none rounded-md text-xl font-semibold focus:outline-none focus:opacity-80"
                        aria-label="Home"
                    >
                        <span className="bg-gradient-to-t from-teal-300 to-cyan-300 bg-clip-text text-transparent">Chatter</span>Trove
                    </Link>
                </div>

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
                                            ? "text-neutral-900"
                                            : "text-teal-300 hover:text-cyan-300"
                                    }`}
                                >
                                    <span className="relative z-10">
                                        {title}
                                    </span>
                                    {isActive && (
                                        <span className="absolute inset-0 rounded-md bg-gradient-to-r from-teal-300 to-cyan-300"></span>
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
