"use client";

import BoardDetail from "@/components/boards/BoardDetail";
import { boardsApi } from "@/lib/api/boards";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ErrorMessage from "@/components/common/ErrorMessage";

export default function BoardDetailPage() {
    // 게시물 id
    const params = useParams();
    const boardId = Number(params.id);

    const { data, isLoading, isError, isFetching,refetch } = useQuery({
        queryKey: ["board", boardId],
        queryFn: () => boardsApi.getBoardDetail(boardId),
        enabled: !isNaN(boardId),
    });

    if (isLoading || isFetching) return <LoadingSpinner />;
    if (isError || !data)
        return (
            <ErrorMessage
                message="게시물을 불러오는 데 실패했습니다."
                onRetry={refetch}
            />
        );

    return <BoardDetail board={data} />;
}
