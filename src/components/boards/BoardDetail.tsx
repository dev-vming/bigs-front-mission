"use client";

import { BoardDetailResponse } from "@/types/boards";
import CategoryBadge from "./CategoryBadge";

export default function BoardDetail({ board }: { board: BoardDetailResponse }) {
    return (
        <div className="space-y-4">
            {/* 게시물 카테고리 영역 */}
            <CategoryBadge category={board.boardCategory} />

            {/* 게시물 제목 작성일 영역 */}
            <div className="flex items-center justify-between">
                <div className="flex gap-4 items-center">
                    <h2 className="text-xl font-bold text-gray-900">
                        {board.title}
                    </h2>
                </div>

                <p className="text-sm text-gray-500">
                    {new Date(board.createdAt).toLocaleDateString("ko-KR", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </p>
            </div>

            {/* 본문 */}
            <div className="whitespace-pre-line text-sm leading-relaxed text-gray-800">
                {board.content}
            </div>
        </div>
    );
}
