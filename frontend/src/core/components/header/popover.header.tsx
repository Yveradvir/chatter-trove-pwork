import { Popover, PopoverButton, PopoverPanel, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { Fragment } from "react";

const ProfilePopover = () => {
    return (
        <div className="relative">
            <Popover className="relative">
                {({ open }) => (
                    <>
                        <PopoverButton
                            className={`
                                ${open ? 'text-teal-700' : 'text-gray-700'}
                                group inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold transition duration-150 ease-in-out
                                hover:text-cyan-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500`}
                        >
                            <span>Profile</span>
                            <ChevronDownIcon
                                className={`${open ? 'rotate-180 text-cyan-800' : 'text-gray-500'} 
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
                            <PopoverPanel className="absolute z-10 mt-3 w-56 max-w-xs -translate-x-1/2 transform left-1/2 sm:px-0">
                                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
                                    <div className="bg-white p-4">
                                        {[
                                            {
                                                title: "Sign In",
                                                description: "For those who already registered, welcome back!",
                                                to: "/a/in",
                                            },
                                            {
                                                title: "Sign Up",
                                                description: "Create a new account if you're new here.",
                                                to: "/a/up",
                                            },
                                        ].map(({ title, description, to }) => (
                                            <Link
                                                key={title}
                                                to={to}
                                                className="block rounded-md p-3 transition duration-150 ease-in-out hover:bg-gray-50"
                                            >
                                                <p className="text-sm font-semibold text-gray-900">{title}</p>
                                                <p className="text-sm text-gray-500">{description}</p>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </PopoverPanel>
                        </Transition>
                    </>
                )}
            </Popover>
        </div>
    );
};

export default ProfilePopover;
