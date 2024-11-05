import Layout from "@core/components/layout";
import { errorActions } from "@core/reducers/slices/error";
import { ApiError } from "@core/utils/const";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import UserInfo from "./components/userInfo";

const ProfilePage = () => {
    const dispatch = useDispatch();
    const { user_id } = useParams<{ user_id: string }>();
    const userId = parseInt(user_id as string, 10);

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
                </main>
            </div>
        </Layout>
    );
};

export default ProfilePage;
