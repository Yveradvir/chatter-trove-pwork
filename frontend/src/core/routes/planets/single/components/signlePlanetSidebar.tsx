import { Menu, MenuButton, Transition } from "@headlessui/react";
import { Fragment } from "react/jsx-runtime";

const SignlePlanetSidebar = () => {
    return (
        <aside className="w-80 pl-8 flex-shrink-1">
            <div className="p-4">
                <h2 className="text-lg font-semibold">Sidebar</h2>
                <Menu as="div" className="relative mt-6">
                    <MenuButton className="w-full bg-gray-700 p-2 rounded-md">
                        Menu
                    </MenuButton>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        className={`${
                                            active ? "bg-gray-100" : ""
                                        } block px-4 py-2 text-gray-700`}
                                        href="/#"
                                    >
                                        Dashboard
                                    </a>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        className={`${
                                            active ? "bg-gray-100" : ""
                                        } block px-4 py-2 text-gray-700`}
                                        href="/#"
                                    >
                                        Settings
                                    </a>
                                )}
                            </Menu.Item>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </aside>
    );
};

export default SignlePlanetSidebar;
