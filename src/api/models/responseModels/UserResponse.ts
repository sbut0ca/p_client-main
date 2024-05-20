import {User} from "../types/User";

export interface DeleteUserResponse {
    isSuccess: boolean,
    user: User
}

export interface UpdateUserResponse {
    isChanged: boolean,
    user: User
}

export interface AuthResponse {
    accessToken: string
    refreshToken: string
    user: User
}