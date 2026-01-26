"use client";

import { ReactNode, useEffect } from "react";
import { authApi } from "@/lib/api/auth";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";

export default function AuthInitializer({ children }: { children: ReactNode }) {
    // 라우터
    const router = useRouter();

    useEffect(() => {
        const initAuth = async () => {
            const { accessToken } = useAuthStore.getState();
            const refreshToken = localStorage.getItem("refreshToken");

            // 엑세스 토큰 있으면 실행하지 않음
            if (accessToken) return;

            // 리프레시 토큰이 없는 경우는 로그아웃 처리
            if (!refreshToken) {
                useAuthStore.getState().logout();
                router.replace("/login");
                return;
            }
            
            try {
                const res = await authApi.refresh(refreshToken);
                // 토큰 갱신 성공 시에는 토큰 정보 저장
                useAuthStore
                    .getState()
                    .setToken(res.accessToken, res.refreshToken);
            } catch {
                // 토큰 갱신 실패하는 경우에도 로그아웃 처리
                useAuthStore.getState().logout();
                router.replace("/login");
            }
        };

        initAuth();
    }, []);

    return <>{children}</>;
}
