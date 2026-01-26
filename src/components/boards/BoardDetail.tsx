"use client";

import { BoardDetailResponse } from "@/types/boards";
import CategoryBadge from "./CategoryBadge";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaPencil, FaTrashCan, FaCalendarDays } from "react-icons/fa6";
import { useModalStore } from "@/stores/modalStore";
import { boardsApi } from "@/lib/api/boards";
import { useMutation } from "@tanstack/react-query";

interface BoardDetailProps {
    board: BoardDetailResponse;
}

export default function BoardDetail({ board }: BoardDetailProps) {
    // 라우터
    const router = useRouter();

    // 모달 상태 수정
    const setModal = useModalStore((state) => state.setModal);

    // 삭제 뮤테이션
    const deleteMutation = useMutation({
        mutationFn: () => boardsApi.deleteBoard(board.id),
        onSuccess: () => {
            router.push("/boards");
        },
        onError: () => {
            setModal({
                open: true,
                title: "알림",
                content: "삭제에 실패했습니다. 다시 시도해주세요.",
            });
        },
    });

    // 수정 처리 로직
    const handleEdit = () => {
        router.push(`/boards/${board.id}/edit`);
    };

    // 삭제 처리 로직
    const handleDelete = async () => {
        setModal({
            open: true,
            title: "확인",
            content: "게시물을 삭제하시겠습니까?",
            onConfirm: () => deleteMutation.mutate(),
        });
    };

    return (
        <div className="px-4">
            {/* 헤더 영역 */}
            <div className="mb-6">
                {/* 카테고리 + 버튼 영역 */}
                <div className="flex items-center justify-between mb-4">
                    <CategoryBadge category={board.boardCategory} />

                    {/* 수정/삭제 버튼*/}
                    <div className="flex gap-2">
                        <button
                            onClick={handleEdit}
                            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded cursor-pointer"
                            title="수정"
                        >
                            <FaPencil className="w-4 h-4" />
                        </button>
                        <button
                            onClick={handleDelete}
                            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded cursor-pointer"
                            title="삭제"
                        >
                            <FaTrashCan className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* 제목 */}
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                    {board.title}
                </h2>

                {/* 작성일 */}
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <FaCalendarDays className="w-3 h-3" />
                    <time dateTime={board.createdAt}>
                        {new Date(board.createdAt).toLocaleDateString("ko-KR", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </time>
                </div>
            </div>

            {/* 구분선 */}
            <hr className="border-gray-200 mb-6" />

            {/* 본문 영역 */}
            <div className="space-y-6">
                {/* 이미지 */}
                {board.imageUrl && (
                    <div className="w-full">
                        <Image
                            src={`${process.env.NEXT_PUBLIC_API_URL}${board.imageUrl}`}
                            alt={board.title}
                            width={800}
                            height={600}
                            className="w-full h-auto rounded-lg"
                            priority
                        />
                    </div>
                )}

                {/* 본문 내용 */}
                <div className="whitespace-pre-wrap text-gray-800 leading-relaxed text-sm wrap-break-words mb-10">
                    {board.content}
                </div>
            </div>
        </div>
    );
}
