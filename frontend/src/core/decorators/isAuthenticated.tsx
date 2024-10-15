import { useAppSelector } from "@core/reducers";
import { useNavigate } from "react-router-dom";

const IsAuthenticated: React.FC = () => {
    const navigate = useNavigate()
    const {isAuthenticated} = useAppSelector(state => state.profile);
    
    if (!isAuthenticated) 
        navigate("/auth/signin")

    return <></>
}

export default IsAuthenticated;