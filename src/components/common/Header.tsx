"use client";

import { FaAngleLeft } from "react-icons/fa";
import UserMenu from "./UserMenu";

interface HeaderProps {
    title: string;
}

export default function Header({ title }: HeaderProps) {
    // title이 게시판인지 확인
    const isBoardList = title === "게시판";
    // title이 수정, 등록 상태인지 확인
    const isEditing = title === "게시물 수정" || title === "게시물 등록";

    return (
        <header className="w-full border-b border-gray-200 bg-white">
            <div className="relative h-14 mx-auto px-4 flex items-center">
                {/* 왼쪽 영역 (모바일 전용 뒤로가기) */}
                {!isBoardList && (
                    <button className="p-2 md:hidden">
                        <FaAngleLeft className="w-5 h-5 text-gray-500" />
                    </button>
                )}

                {/* 가운데 타이틀 (모바일 전용, 게시판 제외) */}
                {!isBoardList && (
                    <h1 className="absolute left-1/2 -translate-x-1/2 text-base font-semibold md:hidden">
                        {title}
                    </h1>
                )}

                {/* 오른쪽 영역 */}
                <div className="ml-auto flex items-center">
                    {/* PC: 항상 유저 아이콘 */}
                    <div className="hidden md:block p-2">
                        <UserMenu name="개발자" email="email@test.com" />
                    </div>

                    {/* 모바일: 게시판에서만 유저 아이콘 */}
                    {isBoardList && (
                        <div className="p-2 md:hidden">
                            <UserMenu name="개발자" email="email@test.com" />
                        </div>
                    )}
                    
                    {/* 모바일: 작성/수정일 때만 완료 버튼 */}
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
