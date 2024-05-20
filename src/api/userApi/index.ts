import {AxiosResponse} from "axios";
import {User} from "../models/types/User";
import api from "../base";
import {AuthResponse, DeleteUserResponse, UpdateUserResponse} from "../models/responseModels/UserResponse";

export const USER_ENDPOINT = import.meta.env.VITE_USER_ENDPOINT;

export default class UserApi {
    static async GetAllAsync(): Promise<AxiosResponse<User[]>> {
        return await api.get<User[]>(USER_ENDPOINT + '/getAll');
    }

    static async GetByIdAsync(userId: string): Promise<AxiosResponse<User>> {
        return await api.get<User>(USER_ENDPOINT + '/getById/' + userId);
    }

    static async GetByLoginAsync(login: string): Promise<AxiosResponse<User>> {
        return await api.get<User>(USER_ENDPOINT + '/getByLogin/' + login);
    }

    static async AddUserAsync(login: string, password: string, username: string, roleId: string): Promise<AxiosResponse<User>> {
        return await api.post<User>(USER_ENDPOINT + '/addUser', {
            login: login,
            password: password,
            username: username,
            roleId: roleId
        });
    }

    static async DeleteUserByIdAsync(userId: string): Promise<AxiosResponse<DeleteUserResponse>> {
        return await api.delete<DeleteUserResponse>(USER_ENDPOINT + '/deleteUserById/' + userId);
    }

    static async DeleteUserByLoginAsync(login: string): Promise<AxiosResponse<DeleteUserResponse>> {
        return await api.delete<DeleteUserResponse>(USER_ENDPOINT + '/deleteUserByLogin/' + login);
    }

    static async UpdateUserAsync(userId: string, login?: string, password?: string, username?: string, roleId?: string): Promise<AxiosResponse<UpdateUserResponse>> {
        return await api.put<UpdateUserResponse>(USER_ENDPOINT + '/updateUser', {
            id: userId,
            login: login ?? "",
            password: password ?? "",
            username: username ?? "",
            roleId: roleId ?? ""
        });
    }

    static async LoginAsync(login: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return api.post<AuthResponse>(USER_ENDPOINT + '/login', {
            login: login,
            password: password
        })
    }

    static async LogoutAsync() : Promise<AxiosResponse<boolean>> {
        return api.get(USER_ENDPOINT + '/logout')
    }

    static async WhoAmIAsync(method: 'token' | 'refresh'): Promise<AxiosResponse<User>> {
        if (method === 'token') {
            return api.get<User>(USER_ENDPOINT + '/who?fromToken=true',)
        }

        return api.get<User>(USER_ENDPOINT + '/who?fromRefresh=true')
    }
}