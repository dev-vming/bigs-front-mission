"use client";

import BoardDetail from "@/components/boards/BoardDetail";
import { boardsApi } from "@/lib/api/boards";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ErrorMessage from "@/components/common/ErrorMessage";
import { useRouter } from "next/navigation";

export default function BoardDetailPage() {
    // 라우터
    const router = useRouter();
    // 게시물 id
    const params = useParams();
    const boardId = Number(params.id);

    // 홈으로 가기 로직 처리
    const handleHome = () => {
        router.push("/boards");
    };

    const { data, isLoading, isError, error, isFetching, refetch } = useQuery({
        queryKey: ["board", boardId],
        queryFn: () => boardsApi.getBoardDetail(boardId),
        enabled: !isNaN(boardId),
    });

    if (isLoading || isFetching) return <LoadingSpinner />;
    if (isError || !data)
        return (
            <ErrorMessage
                message={
                    error?.message
                        ? error?.message
                        : "게시물을 불러오는 데 실패했습니다."
                }
                {...(error?.message
                    ? { onHome: handleHome }
                    : { onRetry: refetch })}
            />
        );

    return <BoardDetail board={data} />;
}
