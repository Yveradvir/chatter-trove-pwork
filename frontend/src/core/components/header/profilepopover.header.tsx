import {
    Popover,
    PopoverButton,
    PopoverPanel,
    Transition,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { Fragment } from "react";
import ApiService from "@core/utils/api";
import { check_auth } from "@core/utils/check_fn";
import { store } from "@core/reducers";
import { profileActions } from "@core/reducers/slices/profile";

const ProfilePopover = () => {
    const navigate = useNavigate();

    const logOutFunction = async () => {
        const response = await ApiService.delete("/jwt/token/blacklist/");
        
        if (response.status === 204) 
            await store.dispatch(profileActions.reset());
            navigate("/");
    };

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
                                <span>Profile</span>
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
                                <PopoverPanel className="absolute z-10 mt-5 w-56 max-w-xs -translate-x-1/2 transform left-1/2 sm:px-0">
                                    <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5 bg-neutral-800">
                                        <div className="p-4">
                                            {[
                                                {
                                                    title: "Sign In",
                                                    description:
                                                        "For those who already registered, welcome back!",
                                                    to: "/auth/signin",
                                                },
                                                {
                                                    title: "Sign Up",
                                                    description:
                                                        "Create a new account if you're new here.",
                                                    to: "/auth/signup",
                                                },
                                                {
                                                    title: "Search Profiles",
                                                    description: 
                                                        "Discover and explore various profiles.",
                                                    to: "/search?find=users"
                                                }
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
                                            {check_auth() && (
                                                <Link
                                                    to={"/"}
                                                    className="block rounded-md p-3 transition duration-150 ease-in-out hover:bg-neutral-700"
                                                    onClick={() => logOutFunction()}
                                                >
                                                    <p className="text-sm font-semibold text-red-300">
                                                        Log Out
                                                    </p>
                                                </Link>
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

export default ProfilePopover;
