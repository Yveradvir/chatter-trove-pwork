import { HomeIcon, ChartPieIcon } from "@heroicons/react/24/outline";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { Link, useLocation } from "react-router-dom";

const routes = [
    { url: "/", title: "Home", icon: HomeIcon },
    { url: "/somethinh", title: "Something", icon: ChartPieIcon },
];

const Header = () => {
    const location = useLocation();

    return (
        <header className="bg-white shadow-sm">
            <nav className="container mx-auto flex items-center justify-between p-6">
                <Link to="/" className="flex items-center -m-1.5 p-1.5">
                    <span className="sr-only">Your Company</span>
                    <img
                        alt="Logo"
                        className="h-8 w-auto"
                    />
                </Link>
                <div className="flex items-center space-x-10 mr-10">
                    <div className="flex space-x-8 items-center">
                        {routes.map(({ url, title, icon: Icon }) => {
                            const isActive = location.pathname === url;
                            return (
                                <Link
                                    key={title}
                                    to={url}
                                    className={`flex items-center space-x-2 text-sm font-medium p-2 rounded-md transition ${
                                        isActive
                                            ? "bg-gradient-to-t from-teal-600 to-cyan-800 bg-clip-text text-transparent rounded-2xl"
                                            : "text-gray-700 hover:text-gray-900"
                                    }`}
                                >
                                    <div className={`flex items-center justify-center w-7 h-7 rounded-lg ${isActive ? "bg-gradient-to-t from-teal-600 to-cyan-800" : ""}`}>
                                        <Icon
                                            className={`h-6 w-6 ${
                                                isActive ? "text-gray-50" : "text-gray-500"
                                            }`}
                                        />
                                    </div>
                                    <span>{title}</span>
                                </Link>
                            );
                        })}

                        <Popover>
                            <PopoverButton className="text-sm font-semibold text-gray-700 hover:text-gray-900 focus:outline-none">
                                Profile
                            </PopoverButton>
                            <PopoverPanel className="mt-3 w-56 max-w-full bg-white shadow-xl rounded-lg divide-y divide-gray-200 z-10" anchor="bottom end">
                                <div className="p-3">
                                    {[
                                        { title: "Sign In", description: "For these ones who arleady registered here, welcome back!", auth: false, to: "/a/in" },
                                        { title: "Sign Up", description: "For newbie or people who wants new account. Allow you to create new account.", auth: false, to: "/a/up" },
                                    ].map(({ title, description, to }) => (
                                        <div>

                                            <Link
                                                key={title}
                                                to={to}
                                                className="block rounded-lg py-1 px-4 transition hover:bg-gray-100"
                                            >
                                                <p className="font-semibold text-gray-900">{title}</p>
                                                <p className="text-gray-500">{description}</p>
                                            </Link>
                                            <hr/>
                                        </div>
                                    ))}
                                </div>
                            </PopoverPanel>
                        </Popover>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
