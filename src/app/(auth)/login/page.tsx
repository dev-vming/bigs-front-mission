"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api/auth";
import LoginForm from "@/components/auth/LoginForm";
import { useAuthStore } from "@/stores/authStore";
import { useModalStore } from "@/stores/modalStore";

export default function LoginPage() {
    // 라우터
    const router = useRouter();
    // 토큰 저장
    const setToken = useAuthStore((state) => state.setToken);
    // 모달 상태 수정
    const setModal = useModalStore((state) => state.setModal);

    // 로그인 뮤테이션
    const loginMutation = useMutation({
        mutationFn: authApi.login,
        retry: false,
        onSuccess: (data) => {
            setToken(data.accessToken, data.refreshToken);
            router.replace("/boards");
        },
        onError: () => {
            setModal({
                open: true,
                title: "알림",
                content:
                    "이메일 혹은 비밀번호가 올바르지 않습니다.",
            });
        },
    });

    return (
        <div className="w-full max-w-sm">
            <h1 className="text-2xl font-bold mb-6 text-center">로그인</h1>
            <LoginForm
                onSubmit={loginMutation.mutate}
                isPending={loginMutation.isPending}
            />
        </div>
    );
}
