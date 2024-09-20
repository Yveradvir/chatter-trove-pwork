import axios from "axios";

export const ApiService = axios.create({
    baseURL: import.meta.env.VITE_API, withCredentials: true
})

ApiService.interceptors.request.use(
    request => {
        if (import.meta.env.DEV) console.log("[ ApiService:request::use#fulfilled > ", request);
        
        return request
    },
    async error => {
        if (import.meta.env.DEV) console.error("[ LaunchedAxi:request::use#rejected > ", error);
        return Promise.reject(error)
    }
);

ApiService.interceptors.response.use(
    async response => {
        if (import.meta.env.DEV) console.log("[ ApiService:response::use#fulfilled > ", response);
        
        return response
    },
    async error => {
        if (import.meta.env.DEV) console.error("[ ApiService:response::use#rejected > ", error);

        return Promise.reject(error)        
    }
);

export default ApiService;