export interface User {
    username: string;
    name: string;
}

export interface JwtPayload {
    username: string;
    name: string;
    iat: number;
    exp: number;
}

export interface SignupRequest {
    username: string;
    name: string;
    password: string;
    confirmPassword: string;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
}