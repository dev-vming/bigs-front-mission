"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api/auth";
import { useModalStore } from "@/stores/modalStore";
import SignupForm from "@/components/auth/SignupForm";

export default function SignupPage() {
    // 라우터
    const router = useRouter();
    // 모달 상태 수정
    const setModal = useModalStore((state) => state.setModal);
    // 회원가입 뮤테이션
    const signupMutation = useMutation({
        mutationFn: authApi.signup,
        retry: false,
        onSuccess: () => {
            setModal({
                open: true,
                title: "알림",
                content: "회원가입 성공! 로그인해주세요.",
            });
            router.push("/login");
        },
        onError: () => {
            setModal({
                open: true,
                title: "알림",
                content: "회원가입에 실패했습니다. 다시 시도해주세요.",
            });
        },
    });
    return (
        <div className="w-full max-w-sm">
            <h1 className="text-2xl font-bold mb-6 text-center">회원가입</h1>
            <SignupForm
                onSubmit={signupMutation.mutate}
                isPending={signupMutation.isPending}
            />
        </div>
    );
}
