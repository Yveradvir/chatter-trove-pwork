import Layout from "@core/components/layout";
import { errorActions } from "@core/reducers/slices/error";
import { ApiError } from "@core/utils/const";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import UserInfo from "./components/userInfo";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import MembershipsTab from "./components/tabs/memberships";
import LastCometsTab from "./components/tabs/last_comets";
import LastAsteroidsTab from "./components/tabs/last_asteroids";

enum TabNames {
    MEMBERSHIPS = "Memberships",
    LAST_COMETS = "Last Comets",
    LAST_ASTEROIDS = "Last Asteroids",
}

const ProfilePage = () => {
    const dispatch = useDispatch();
    const { user_id } = useParams<{ user_id: string }>();
    const userId = parseInt(user_id as string, 10);

    useEffect(() => {
        if (isNaN(userId)) {
            dispatch(
                errorActions.setError({
                    detail: "Invalid User ID",
                    status_code: 404,
                } as ApiError)
            );
        }
    }, [dispatch, userId]);

    const categories = [
        { name: TabNames.MEMBERSHIPS, component: <MembershipsTab user_id={userId} /> },
        { name: TabNames.LAST_COMETS, component: <LastCometsTab user_id={userId} /> },
        { name: TabNames.LAST_ASTEROIDS, component: <LastAsteroidsTab user_id={userId} /> },
    ];

    return (
        <Layout>
            <div className="flex min-h-screen">
                <UserInfo user_id={userId} />
                <main className="flex-grow p-6 mr-4">
                    <h1 className="text-3xl font-bold">Profile Information</h1>
                    <TabGroup className="mt-4">
                        <TabList className="flex gap-4">
                            {categories.map(({ name }) => (
                                <Tab
                                    key={name}
                                    className="rounded-full py-1 px-3 text-sm font-semibold text-white focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5"
                                >
                                    {name}
                                </Tab>
                            ))}
                        </TabList>
                        <TabPanels className="mt-3">
                            {categories.map(({ component }, idx) => (
                                <TabPanel key={idx}>
                                    {component}
                                </TabPanel>
                            ))}
                        </TabPanels>
                    </TabGroup>
                    <hr className="border-neutral-600 mt-3" />
                </main>
            </div>
        </Layout>
    );
};

export default ProfilePage;
