import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "@/stores/authStore";
import { authApi } from "./auth";

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// 실패한 요청을 저장하는 큐의 타입
interface FailedRequest {
    resolve: (token: string) => void;
    reject: (error: AxiosError) => void;
}

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (token: string | null, error?: AxiosError) => {
    failedQueue.forEach((req) => {
        if (token) {
            req.resolve(token);
        } else {
            req.reject(error || new axios.AxiosError("Token refresh failed"));
        }
    });
    failedQueue = [];
};

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
    (error) => {
        return Promise.reject(error);
    },
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

        // 이미 리프레시 중이면 큐에 추가
        if (isRefreshing) {
            return new Promise<string>((resolve, reject) => {
                failedQueue.push({
                    resolve: (token: string) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        resolve(api(originalRequest));
                    },
                    reject,
                });
            });
        }

        isRefreshing = true;

        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
            // 리프레시 토큰이 없으면 로그아웃
            useAuthStore.getState().logout();
            processQueue(null, error);
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

            // 대기 중인 요청들 처리
            processQueue(newAccessToken);

            // 원래 요청 재시도
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return api(originalRequest);
        } catch (refreshError) {
            // 리프레시 실패 시 로그아웃
            processQueue(null, refreshError as AxiosError);
            useAuthStore.getState().logout();

            if (typeof window !== "undefined") {
                window.location.href = "/login";
            }

            return Promise.reject(refreshError);
        } finally {
            isRefreshing = false;
        }
    },
);
