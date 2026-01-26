"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import BoardForm from "@/components/boards/BoardForm";
import { boardsApi } from "@/lib/api/boards";
import { BoardFormValues } from "@/schemas/boardScema";

export default function BoardNewPage() {
    // 라우터
    const router = useRouter();

    // 글작성 뮤테이션
    const createBoardMutation = useMutation({
        mutationFn: boardsApi.createBoard,
        onSuccess: (data) => {
            router.replace(`/boards/${data.id}`);
        },
    });

    const handleCreateBoard = (values: BoardFormValues) => {
        createBoardMutation.mutate({
            request: {
                title: values.title,
                content: values.content,
                category: values.category,
            },
            file: values.file,
        });
    };
    return (
        <div>
            <BoardForm
                onSubmit={handleCreateBoard}
                isPending={createBoardMutation.isPending}
            />
        </div>
    );
}
