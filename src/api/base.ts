import axios from 'axios'
import {USER_ENDPOINT} from "./userApi";
import {AuthResponse} from "./models/responseModels/UserResponse";

export const API_URL = import.meta.env.VITE_API_ENDPOINT;
export const LOGOUT_ENDPOINT = import.meta.env.VITE_LOGOUTENDPOINT;

const api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;


    return config;
});

api.interceptors.response.use((config) => config,
    async (err) => {
        const originalRequest = err.config;

        //console.log(originalRequest.url)

        if (err.response.status === 401 && originalRequest.url !== `${USER_ENDPOINT}/${LOGOUT_ENDPOINT}`) {
            try {
                console.log(`Я здесь ${err}`);

                const response = await axios.get<AuthResponse>(
                    `${API_URL}${USER_ENDPOINT}/refresh`,
                    {withCredentials: true});

                localStorage.setItem('accessToken', response.data.accessToken);

                return api.request(originalRequest);

                //return api.request(originalRequest);
            } catch (e) {
                console.log("Не авторизован");
            }
        }
    })

export default api;