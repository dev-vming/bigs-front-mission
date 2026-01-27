"use client";

import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useRouter, useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import BoardForm from "@/components/boards/BoardForm";
import { boardsApi } from "@/lib/api/boards";
import { BoardFormValues } from "@/schemas/boardScema";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ErrorMessage from "@/components/common/ErrorMessage";

export default function BoardEditPage() {
    // 라우터
    const router = useRouter();
    // 게시물 id
    const params = useParams();
    const boardId = Number(params.id);
    // 쿼리 클라이언트
    const queryClient = useQueryClient();

    // 기존 글 데이터 불러오기
    const { data, isLoading, refetch } = useQuery({
        queryKey: ["board", boardId],
        queryFn: () => boardsApi.getBoardDetail(boardId),
        enabled: !isNaN(boardId),
    });

    // 글 수정 뮤테이션
    const updateBoardMutation = useMutation({
        mutationFn: ({ values }: { values: BoardFormValues }) =>
            boardsApi.updateBoard(
                {
                    request: {
                        title: values.title,
                        content: values.content,
                        category: values.category,
                    },
                    file: values.file,
                },
                boardId,
            ),
        onSuccess: () => {
            router.replace(`/boards/${boardId}`);
        },
    });

    const handleUpdateBoard = (values: BoardFormValues) => {
        updateBoardMutation.mutate({ values });
    };

    if (isLoading) return <LoadingSpinner />;
    if (!data)
        return (
            <ErrorMessage
                message="기존 데이터를 불러오는 데 실패했습니다. 다시 시도해주세요."
                onRetry={refetch}
            />
        );

    // form 초기값 세팅
    const defaultValues: BoardFormValues = {
        title: data.title,
        content: data.content,
        category: data.boardCategory,
        file: undefined,
    };

    return (
        <BoardForm
            onSubmit={handleUpdateBoard}
            isPending={updateBoardMutation.isPending}
            defaultValues={defaultValues}
            defaultImageUrl={data.imageUrl}
        />
    );
}
