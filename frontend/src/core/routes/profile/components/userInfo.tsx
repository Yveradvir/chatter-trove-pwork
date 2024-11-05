import { useEffect, useState } from "react";
import { ProfileEntity } from "@core/reducers/slices/profile/state";
import { UserIdRequired } from "./types";
import { useAppDispatch, useAppSelector } from "@core/reducers";
import loadUser from "./fn";
import { errorActions } from "@core/reducers/slices/error";
import { ApiError } from "@core/utils/const";
import { check_error } from "@core/utils/check_fn";

const UserInfo: React.FC<UserIdRequired> = ({ user_id }) => {
    const dispatch = useAppDispatch();
    const myProfile = useAppSelector((state) => state.profile);

    const [user, setUser] = useState<ProfileEntity | null>(null);
    const [pfp, setPfp] = useState<string | null>(null);

    useEffect(() => {
        if (user_id === myProfile.entity?.id) {
            setUser(myProfile.entity);
        } else {
            (async () => {
                try {
                    const _user = await loadUser(user_id);
                    setUser(_user.user);
                    setPfp(_user.pfp);
                } catch (error) {
                    dispatch(
                        errorActions.setError({
                            detail: check_error(error),
                            status_code: 500,
                        } as ApiError)
                    );
                }
            })();
        }
    }, [dispatch, myProfile.entity, user_id]);

    if (!user) {
        return null;
    }

    return (
        <aside className="w-72 ml-4 flex-shrink-0">
            <div className="w-64 border-neutral-700 fixed top-1/2 transform -translate-y-1/2 border-r-2 rounded-sm overflow-y-auto">
                <div className="p-6 bg-neutral-900 shadow-lg rounded-2xl">
                    <img
                        src={
                            pfp ||
                            "https://i.pinimg.com/474x/81/8a/1b/818a1b89a57c2ee0fb7619b95e11aebd.jpg"
                        }
                        alt={`${user.username}'s avatar`}
                        className="w-12 h-12 rounded-full"
                    />
                    <h2 className="text-3xl font-bold text-cyan-400 mb-2 break-words">
                        {user.username}
                    </h2>
                    <p className="text-neutral-500 text-xl mb-6 break-words">
                        {user.nickname}
                    </p>
                    <p className="text-neutral-500 text-sm mb-8">
                        {new Date(user.created_at).toLocaleDateString()}
                    </p>
                </div>
            </div>
        </aside>
    );
};

export default UserInfo;
