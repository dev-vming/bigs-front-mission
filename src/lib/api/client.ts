import axios, {
    AxiosError,
    InternalAxiosRequestConfig,
} from "axios";
import { useAuthStore } from "@/stores/authStore";
import { authApi } from "./auth";

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Request 인터셉터: 토큰 자동 첨부
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const accessToken = useAuthStore.getState().accessToken;

        // 인증 API는 토큰 불필요
        if (config.url?.includes("/auth/")) {
            return config;
        }

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => Promise.reject(error),
);

// Response 인터셉터: 401 에러 시 토큰 갱신
api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
            _retry?: boolean;
        };
        
        // 401이 아니거나, 인증 API 자체의 에러면 그냥 reject
        if (
            error.response?.status !== 401 ||
            originalRequest.url?.includes("/auth/")
        ) {
            return Promise.reject(error);
        }

        // 이미 재시도한 요청이면 reject
        if (originalRequest._retry) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
            // 리프레시 토큰이 없으면 로그아웃
            useAuthStore.getState().logout();
            if (typeof window !== "undefined") {
                window.location.href = "/login";
            }

            return Promise.reject(error);
        }

        try {
            // 리프레시 토큰으로 새 액세스 토큰 발급
            const response = await authApi.refresh(refreshToken);
            const {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
            } = response;

            // 새 토큰 저장
            useAuthStore.getState().setToken(newAccessToken, newRefreshToken);


            // 새로운 토큰 담은 기존 요청 리턴
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

            return api(originalRequest);
        } catch (refreshError) {
            // 리프레시 실패 시 로그아웃
            useAuthStore.getState().logout();

            if (typeof window !== "undefined") {
                window.location.href = "/login";
            }

            return Promise.reject(refreshError);
        }
    },
);