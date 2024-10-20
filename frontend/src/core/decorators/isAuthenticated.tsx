import { useAppSelector } from "@core/reducers";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const IsAuthenticated: React.FC = () => {
    const navigate = useNavigate()
    const {isAuthenticated} = useAppSelector(state => state.profile);
    
    useEffect(() => {
        if (!isAuthenticated)
            navigate("/auth/signin")
    }, [isAuthenticated, navigate])

    return <></>
}

export default IsAuthenticated;