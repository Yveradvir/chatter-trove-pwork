import { useAppDispatch, useAppSelector } from "@core/reducers";
import { profileActions } from "@core/reducers/slices/profile";
import ApiService from "@core/utils/api";
import { useEffect } from "react";

const SetOnlineDecorator: React.FC<{children: React.ReactNode}> = ({children}) => {
    const profile = useAppSelector((state) => state.profile)
    const dispatch = useAppDispatch()
    useEffect(() => {
        const connectSocket = async () => {
            console.group("Websocket Activity decorator")
            console.log("Connection is starting...")
            const token = (await ApiService.get("/mine/access/")).data.token
            const socket = new WebSocket(`ws://localhost:4300/ws/activity/?token=${token}`);
            console.log("Connection has started...")
            
            console.groupEnd()
            return () => socket.close();
        };

        if (profile.isAuthenticated) 
            connectSocket();
            dispatch(profileActions.turnOnline());
    }, [profile, dispatch])

    return children
}

export default SetOnlineDecorator;