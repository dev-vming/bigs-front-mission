"use client";

import { useState, useEffect, useMemo } from "react";
import { useModalStore } from "@/stores/modalStore";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function BoardForm() {
    // 라우터
    const router = useRouter();
    // 업로드한 파일
    const [file, setFile] = useState<File | null>(null);
    // 모달 상태 수정
    const setModal = useModalStore((state) => state.setModal);
    // 뒤로 가기 로직 처리
    const handleBack = () => {
        router.back();
    };

    // 미리보기 이미지
    const previewUrl = useMemo(() => {
        if (!file) return undefined;
        return URL.createObjectURL(file);
    }, [file]);

    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    return (
        <form className="grid grid-cols-1 md:grid-cols-3 gap-x-3 gap-y-4">
            {/* 제목 */}
            <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-900 mb-1">
                    제목
                </label>
                <input
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm bg-white"
                    placeholder="제목"
                />
                <p className="mt-1 min-h-4 text-xs text-red-600" />
            </div>

            {/* 카테고리 */}
            <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-900 mb-1">
                    카테고리
                </label>
                <select className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm bg-white h-9.5">
                    <option value="">선택</option>
                    <option value="free">자유</option>
                    <option value="notice">공지</option>
                </select>
                <p className="mt-1 min-h-4 text-xs text-red-600" />
            </div>

            {/* 첨부파일 */}
            <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-900 mb-1">
                    첨부파일
                </label>

                <label className="flex items-center gap-3 text-sm border rounded-md border-gray-300 cursor-pointer">
                    {/* 버튼 */}
                    <span className="rounded-md bg-gray-900 px-3 py-2 text-white">
                        파일 선택
                    </span>

                    {/* 파일명 */}
                    <span className="truncate text-gray-600">
                        {file ? file.name : "선택된 파일 없음"}
                    </span>

                    {/* 실제 input */}
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                            const selected = e.target.files?.[0];
                            if (selected) setFile(selected);
                        }}
                    />
                </label>

                {/* 이미지 미리보기 */}
                {previewUrl && (
                    <Image
                        src={previewUrl}
                        alt="미리보기"
                        width={128}
                        height={128}
                        className="mt-2 w-32 h-32 object-cover rounded-md border"
                    />
                )}

                <p className="mt-1 min-h-4 text-xs text-red-600" />
            </div>

            {/* 내용 */}
            <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-900 mb-1">
                    내용
                </label>
                <textarea
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm bg-white h-60 resize-none"
                    placeholder="내용"
                />
                <p className="mt-1 min-h-4 text-xs text-red-600" />
            </div>

            {/* 버튼 */}
            <div className="md:col-span-3 flex justify-end gap-2">
                <button
                    type="button"
                    className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 cursor-pointer"
                    onClick={() =>
                            setModal({
                                open: true,
                                title: "알림",
                                content: '작성을 취소하시겠습니까? \n 작성 중인 내용이 저장되지 않습니다.',
                                onConfirm: handleBack,
                            })
                        }
                >
                    취소
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 rounded-md bg-gray-900 text-white hover:bg-gray-800 cursor-pointer"
                >
                    완료
                </button>
            </div>
        </form>
    );
}
