"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import BoardForm from "@/components/boards/BoardForm";
import { boardsApi } from "@/lib/api/boards";
import { BoardFormValues } from "@/schemas/boardScema";
import { useModalStore } from "@/stores/modalStore";

export default function BoardNewPage() {
    // 라우터
    const router = useRouter();
    // 모달 상태 수정
    const setModal = useModalStore((state) => state.setModal);

    // 글작성 뮤테이션
    const createBoardMutation = useMutation({
        mutationFn: boardsApi.createBoard,
        onSuccess: (data) => {
            router.replace(`/boards/${data.id}`);
        },
        onError: (error) => {
            if (error.message) {
                setModal({
                    open: true,
                    title: "알림",
                    content: `${error.message}`,
                });
            }
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
