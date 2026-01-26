"use client";

import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { boardsApi } from "@/lib/api/boards";
import Board from "@/components/boards/Board";
import NewBoardButton from "@/components/boards/NewBoardButton";
import EmptyBoard from "@/components/boards/EmptyBoard";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ErrorMessage from "@/components/common/ErrorMessage";

export default function BoardsPage() {
    // params
    const searchParams = useSearchParams();
    // page 기본 값은 0
    const page = Number(searchParams.get("page") ?? 0);
    const size = 10;

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ["boards", page],
        queryFn: () => boardsApi.getBoards(page, size),
        placeholderData: (previousData) => previousData,
        enabled: page !== undefined && !isNaN(page),
    });

    if (isLoading) return <LoadingSpinner />;
    if (isError || !data)
        return (
            <ErrorMessage
                message="게시물을 불러오는 데 실패했습니다."
                onRetry={refetch}
            />
        );

    return (
        <div>
            {/* 게시판 헤더 영역 */}
            <div className="w-full py-2 flex items-center gap-4 border-b border-gray-300 text-xs font-semibold mb-1 text-gray-500">
                <span className="w-20 shrink-0">카테고리</span>
                <span className="flex-1">제목</span>
                <span className="w-18 md:w-40 shrink-0">작성일</span>
            </div>
            {/* 게시물 영역 */}
            {data.content.map((board) => (
                <Board
                    key={board.id}
                    id={board.id}
                    title={board.title}
                    category={board.category}
                    createdAt={board.createdAt}
                />
            ))}
            {/* 게시판 데이터가 없을 때 보여줄 영역 */}
            {data.empty && <EmptyBoard />}
            {/* 게시물 작성 버튼 */}
            <NewBoardButton />
        </div>
    );
}
