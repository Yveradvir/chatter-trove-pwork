import { useAppSelector } from "@core/reducers";
import { LoadingStatus } from "@core/utils/const";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NoneIdProfilePage = () => {
    const navigate = useNavigate();
    const profile = useAppSelector((state) => state.profile);

    useEffect(() => {
        if (
            !profile.isAuthenticated ||
            [LoadingStatus.ANotLoaded, LoadingStatus.NotLoaded].includes(
                profile.loadingStatus
            ) ||
            !profile.entity
        ) {
            navigate(-1);
        } else {
            navigate(`/profile/${profile.entity.id}`);
        }
    }, [profile, navigate])

    return null;
};

export default NoneIdProfilePage;
