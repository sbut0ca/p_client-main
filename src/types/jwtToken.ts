export interface JwtTokenPayload {
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string,
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string,
    expiresIn: string;
    exp: number;
}

export interface JwtTokenExpired {
    expiresIn: string;
    exp: number;
}