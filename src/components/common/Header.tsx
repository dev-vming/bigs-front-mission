"use client";

import { FaAngleLeft } from "react-icons/fa";
import UserMenu from "./UserMenu";
import { useModalStore } from "@/stores/modalStore";
import { useRouter } from "next/navigation";
import { FaHouse } from "react-icons/fa6";
import { useAuthStore } from "@/stores/authStore";

interface HeaderProps {
    title: string;
}

export default function Header({ title }: HeaderProps) {
    // 라우터
    const router = useRouter();
    // 현재 로그인 한 유저
    const user = useAuthStore((state) => state.user);
    // 로그아웃 로직
    const logout = useAuthStore((state) => state.logout);
    // title이 게시판인지 확인
    const isBoardList = title === "게시판";
    // title이 수정, 등록 상태인지 확인
    const isEditing = title === "게시물 수정" || title === "게시물 등록";
    // title이 상세인지 확인
    const isDetail = title === "게시물 상세";
    // 모달 상태 수정
    const setModal = useModalStore((state) => state.setModal);
    // 뒤로 가기 로직 처리
    const handleBack = () => {
        router.back();
    };
    // 홈으로 가기 로직 처리
    const handleHome = () => {
        router.push('/boards')
    }

    return (
        <header className="w-full border-b border-gray-200 bg-white">
            <div className="relative h-14 mx-auto px-4 flex items-center">
                {/* PC: 왼쪽 영역 */}
                <div className="hidden md:block p-2 cursor-pointer">
                    <FaHouse
                        className="w-5 h-5 text-gray-600 hover:text-gray-500"
                        onClick={() => {
                            if (isDetail) {
                                handleHome();
                                return;
                            }
                            if (isEditing) {
                                setModal({
                                    open: true,
                                    title: "알림",
                                    content:
                                        "작성을 취소하시겠습니까? \n 작성 중인 내용이 저장되지 않습니다.",
                                    onConfirm: handleHome,
                                });
                            }
                        }}
                    />
                </div>

                {/* MO: 왼쪽 영역 */}
                {!isBoardList && (
                    <button
                        className="p-2 md:hidden cursor-pointer"
                        onClick={() => {
                            if (isDetail) {
                                handleBack();
                                return;
                            }
                            setModal({
                                open: true,
                                title: "알림",
                                content:
                                    "작성을 취소하시겠습니까? \n 작성 중인 내용이 저장되지 않습니다.",
                                onConfirm: handleBack,
                            });
                        }}
                    >
                        <FaAngleLeft className="w-5 h-5 text-gray-500" />
                    </button>
                )}

                {/* MO: 가운데 타이틀 */}
                <h1 className="absolute left-1/2 -translate-x-1/2 text-base font-semibold md:hidden">
                    {title}
                </h1>

                {/* 오른쪽 영역 */}
                <div className="ml-auto flex items-center">
                    {/* PC: 항상 유저 아이콘 */}
                    <div className="hidden md:block p-2">
                        <UserMenu user={user} onLogout={logout} />
                    </div>

                    {/* MO: 게시판에서만 유저 아이콘 */}
                    {isBoardList && (
                        <div className="p-2 md:hidden">
                            <UserMenu user={user} onLogout={logout} />
                        </div>
                    )}

                    {/* MO: 작성/수정일 때만 완료 버튼 */}
                    {isEditing && (
                        <button className="p-2 md:hidden text-sm font-semibold text-blue-600">
                            완료
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
}
