"use client";

import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { boardsApi } from "@/lib/api/boards";
import Board from "@/components/boards/Board";
import NewBoardButton from "@/components/boards/NewBoardButton";
import EmptyBoard from "@/components/boards/EmptyBoard";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ErrorMessage from "@/components/common/ErrorMessage";
import Pagination from "@/components/boards/Pagination";

export default function BoardsPage() {
    // params
    const searchParams = useSearchParams();
    // 페이지네이션 표시용 (1부터 시작)
    const displayPage = Number(searchParams.get("page") ?? 1);
    // API 요청용 (0부터 시작)
    const page = displayPage - 1; 
    const size = 12;

    const { data, isLoading, isFetching ,isError, refetch } = useQuery({
        queryKey: ["boards", page],
        queryFn: () => boardsApi.getBoards(page, size),
        enabled: page >= 0 && !isNaN(page),
    });

    if (isLoading || isFetching) return <LoadingSpinner />;
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
            
            {/* 페이지네이션 영역 */}
            <Pagination
                currentPage={displayPage}
                totalPages={data.totalPages}
                isFirst={data.first}
                isLast={data.last}
                size={size}
            />
            
            {/* 게시물 작성 버튼 */}
            <NewBoardButton />
        </div>
    );
}