import {makeAutoObservable} from "mobx";
import {User} from "../api/models/types/User";
import UserApi, {USER_ENDPOINT} from "../api/userApi";
import axios, {AxiosError} from "axios";
import {AuthResponse} from "../api/models/responseModels/UserResponse";
import {API_URL} from "../api/base";
import {isExpired} from "react-jwt";

export default class Store {
    constructor() {
        makeAutoObservable(this)
    }

    currentUser: User = null

    isLoading = true

    setUser(user: User) {
        this.currentUser = user;
    }

    setLoading(isLoading: boolean) {
        this.isLoading = isLoading;
    }

    async LoginAsync(login: string, password: string): Promise<{ user: User, isSuccess: boolean, error?: string }> {
        try {

            const response = await UserApi.LoginAsync(login, password);

            this.setUser(response.data.user)
            localStorage.setItem('accessToken', response.data.accessToken)
            this.setLoading(false);

            return {
                user: response.data.user,
                isSuccess: true,
            }

        } catch (e: unknown) {

            return {
                user: null,
                isSuccess: false,
                error: `Неправильный логин или пароль!`
            }

        } finally {
            this.setLoading(false)
        }
    }

    async Logout(): Promise<{ isSuccess: boolean, error?: string }> {
        try {
            await UserApi.LogoutAsync();

            this.setUser(null)
            localStorage.removeItem('accessToken')

            this.setLoading(false);

        } catch (e: unknown) {

            console.log(e);

            if (e instanceof AxiosError) {
                return {
                    isSuccess: false,
                    error: e.message
                }
            }

            return {
                isSuccess: false,
                error: `Caught an error while login: ${e}`
            }

        } finally {
            this.setLoading(false)
        }
    }

    async RefreshToken(): Promise<{ isSuccess: boolean, error?: string }> {
        try {

            const response = await axios.get<AuthResponse>(API_URL + USER_ENDPOINT + '/refresh',
                {withCredentials: true})

            this.setUser(response.data.user)
            localStorage.setItem('accessToken', response.data.accessToken)
            this.setLoading(false);

        } catch (e: unknown) {

            console.log(e);

            if (e instanceof AxiosError) {
                return {
                    isSuccess: false,
                    error: e.message
                }
            }

            return {
                isSuccess: false,
                error: `Caught an error while login: ${e}`
            }
        } finally {
            this.setLoading(false)
        }
    }

    async CheckAuth(): Promise<boolean> {
        try {

            const token = localStorage.getItem('accessToken');

            if (!token) {
                const res = await this.RefreshToken();

                return res.isSuccess;
            }

            const expired = isExpired(token);

            if (expired) {

                const res = await this.RefreshToken();

                return res.isSuccess;
            }

            const response = await UserApi.WhoAmIAsync('token')

            console.log(response.data)

            this.setUser(response.data)

            this.setLoading(false)

            return true

        } catch (e: unknown) {

            console.log(e);

            return false;

        } finally {

            this.setLoading(false)

        }
    }
}