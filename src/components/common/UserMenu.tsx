"use client";

import { useModalStore } from "@/stores/modalStore";
import { useEffect, useRef, useState } from "react";
import { FaUser } from "react-icons/fa";

interface UserMenuProps {
    name: string;
    email: string;
}

export default function UserMenu({ name, email }: UserMenuProps) {
    // 모달 상태 수정
    const setModal = useModalStore((state) => state.setModal);
    // 팝업 열림 닫힘 상태
    const [open, setOpen] = useState(false);
    // 컴포넌트 영역 ref
    const containerRef = useRef<HTMLDivElement>(null);

    // 로그아웃 로직 처리
    const handleLogout = () => {
        console.log("로그아웃");
    };

    // 외부 클릭 시 닫힘 처리
    useEffect(() => {
        if (!open) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);

    return (
        <div ref={containerRef} className="relative">
            {/* 버튼 영역 */}
            <button
                onClick={() => setOpen((v) => !v)}
                className="p-2 cursor-pointer"
            >
                <FaUser className="w-5 h-5 text-gray-600 hover:text-gray-500" />
            </button>

            {/* 유저 정보 및 로그아웃 영역 */}
            {open && (
                <div className="absolute right-0 top-full mt-2 z-50">
                    <div className="w-56 rounded-lg border border-gray-200 bg-white shadow-md">
                        <div className="px-4 py-3 border-b border-gray-100">
                            <p className="text-sm font-medium text-gray-900">
                                {name}
                            </p>
                            <p className="text-xs text-gray-500">{email}</p>
                        </div>
                        <button
                            onClick={() =>
                                setModal({
                                    open: true,
                                    title: "알림",
                                    content: "로그아웃 하시겠습니까?",
                                    onConfirm: handleLogout,
                                })
                            }
                            className="w-full px-4 py-2 text-sm text-center text-red-600 hover:bg-gray-50 cursor-pointer"
                        >
                            로그아웃
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
