import Layout from "@core/components/layout";
import { errorActions } from "@core/reducers/slices/error";
import { ApiError } from "@core/utils/const";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import UserInfo from "./components/userInfo";
import { Tab, TabGroup, TabList, TabPanels } from "@headlessui/react";

const ProfilePage = () => {
    const dispatch = useDispatch();
    const { user_id } = useParams<{ user_id: string }>();
    const userId = parseInt(user_id as string, 10);

    const categories = [
        {name: "Memberships", component: <></>},
    ]

    useEffect(() => {
        if (isNaN(userId)) {
            dispatch(
                errorActions.setError({
                    detail: "Incorect Password",
                    status_code: 404,
                } as ApiError)
            );
        }
    });

    return (
        <Layout>
            <div className="flex min-h-screen">
                <UserInfo user_id={userId} />
                <main className="flex-grow p-6 mr-4">
                    <h1 className="text-3xl font-bold">
                        Look for information here
                    </h1>

                    <TabGroup>
                        <TabList className="flex gap-4">
                            {categories.map(({ name }) => (
                                <Tab
                                    key={name}
                                    className="rounded-full py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
                                >
                                    {name}
                                </Tab>
                            ))}
                        </TabList>
                        <TabPanels className="mt-3">
                        </TabPanels>
                    </TabGroup>
                </main>
            </div>
        </Layout>
    );
};

export default ProfilePage;
