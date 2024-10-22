import {
    Popover,
    PopoverButton,
    PopoverPanel,
    Transition,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { Fragment } from "react";

const PlanetPopover = () => {
    return (
        <>
            <div className="relative">
                <Popover className="relative">
                    {({ open }) => (
                        <>
                            <PopoverButton
                                className={`
                                text-teal-300
                                group inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold transition duration-150 ease-in-out
                                hover:text-cyan-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500`}
                            >
                                <span>Planets</span>
                                <ChevronDownIcon
                                    className={`${
                                        open
                                            ? "rotate-180 text-cyan-300"
                                            : "text-gray-500"
                                    } 
                                    ml-2 h-5 w-5 transition duration-300 ease-in-out`}
                                    aria-hidden="true"
                                />
                            </PopoverButton>

                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-1"
                            >
                                <PopoverPanel className="absolute z-10 mt-5 w-96 max-w-xs -translate-x-1/2 transform left-1/2 sm:px-0">
                                    <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5 bg-neutral-800">
                                        <div className="p-4">
                                            {[
                                                {
                                                    title: "Create new planet",
                                                    description: "Start a new discussion space on the platform. A 'planet' functions like a forum where you can share posts, interact with others, and explore various topics with your community.",
                                                    to: "/planets/",
                                                },
                                                {
                                                    title: "Search planets",
                                                    description: "Discover and explore various planets (forums) created by the community. Use filters to find topics that interest you and join the conversation.",
                                                    to: "/search?find=planets",                                                    
                                                },
                                            ].map(
                                                ({
                                                    title,
                                                    description,
                                                    to,
                                                }) => (
                                                    <Link
                                                        key={title}
                                                        to={to}
                                                        className="block rounded-md p-3 transition duration-150 ease-in-out hover:bg-neutral-700"
                                                    >
                                                        <p className="text-sm font-semibold text-teal-300">
                                                            {title}
                                                        </p>
                                                        <p className="text-sm text-gray-400">
                                                            {description}
                                                        </p>
                                                    </Link>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </PopoverPanel>
                            </Transition>
                        </>
                    )}
                </Popover>
            </div>
        </>
    );
};

export default PlanetPopover;
