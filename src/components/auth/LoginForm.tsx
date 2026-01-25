"use client";

import { useRouter } from "next/navigation";

export default function LoginForm() {
    const router = useRouter();
    return (
        <form className="space-y-2.5">
            <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                    이메일
                </label>
                <input
                    type="email"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm bg-white"
                    placeholder="이메일"
                />
                <p className="mt-1 min-h-4 text-xs text-red-600">
                    {/* 에러 메시지 */}
                </p>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                    비밀번호
                </label>
                <input
                    type="password"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm bg-white"
                    placeholder="비밀번호"
                />
                <p className="mt-1 min-h-4 text-xs text-red-600">
                    {/* 에러 메시지 */}
                </p>
            </div>

            <button
                type="submit"
                className="w-full py-3 bg-gray-900 text-white rounded-lg disabled:bg-gray-400 hover:bg-gray-800 cursor-pointer"
            >
                로그인
            </button>
            
            <div className="mt-4 text-sm flex justify-center items-center gap-1">
                <p>계정이 없으신가요?</p>
                <button
                    type="button"
                    onClick={() => router.push("/signup")}
                    className="text-blue-600 hover:text-blue-500 underline font-semibold cursor-pointer"
                >
                    회원가입
                </button>
            </div>
        </form>
    );
}