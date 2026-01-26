"use client";

import { useRouter } from "next/navigation";
import CategoryBadge from "@/components/boards/CategoryBadge";
import { BoardItem } from "@/types/boards";

export default function Board({
    id,
    title,
    category,
    createdAt,
}: BoardItem) {
    // 라우터
    const router = useRouter();

    // 게시물 클릭 로직 처리
    const handleClick = () => {
        router.push(`/boards/${id}`);
    };

    return (
        <div
            className="w-full py-3 flex items-center gap-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
            onClick={handleClick}
        >
            {/* 카테고리 */}
            <span className="w-20 shrink-0">
                <CategoryBadge category={category} />
            </span>

            {/* 제목 */}
            <span className="flex-1 truncate text-sm text-gray-900">
                {title}
            </span>

            {/* 날짜 */}
            <span className="w-18 md:w-40 shrink-0 text-sm text-gray-500">
                {/* MO: 날짜 */}
                <span className="md:hidden">
                    {new Date(createdAt).toLocaleDateString("ko-KR", {
                        year: "2-digit",
                        month: "2-digit",
                        day: "2-digit",
                    })}
                </span>

                {/* PC: 날짜 + 시간 */}
                <span className="hidden md:inline">
                    {new Date(createdAt).toLocaleDateString("ko-KR", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </span>
            </span>
        </div>
    );
}
