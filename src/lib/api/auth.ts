import { api } from "./client";
import {
    SignupRequest,
    LoginRequest,
    AuthResponse,
} from "@/types/auth";

export const authApi = {
    // 회원가입
    signup: async (data: SignupRequest): Promise<void> => {
        await api.post("/auth/signup", data);
    },

    // 로그인
    login: async (data: LoginRequest): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>("/auth/signin", data);
        return response.data;
    },

    // 토큰 갱신
    refresh: async (refreshToken: string): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>("/auth/refresh", {
            refreshToken,
        });
        return response.data;
    },
};
