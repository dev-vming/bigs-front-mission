"use client";

import { useRouter } from "next/navigation";
import {
    FaChevronLeft,
    FaChevronRight,
    FaAnglesLeft,
    FaAnglesRight,
} from "react-icons/fa6";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    isFirst: boolean;
    isLast: boolean;
    size: number;
}

export default function Pagination({
    currentPage,
    totalPages,
    isFirst,
    isLast,
    size,
}: PaginationProps) {
    // 라우터
    const router = useRouter();

    // 페이지 변경 로직 처리
    const handlePageChange = (currentPage: number) => {
        const params = new URLSearchParams();
        params.set("page", currentPage.toString());
        params.set("size", size.toString());
        router.push(`?${params.toString()}`, { scroll: false });
    };

    // 표시할 페이지 번호들 계산
    const getPageNumbers = () => {
        const pages: number[] = [];
        // 최대 표시 페이지 개수
        const maxVisible = 5; 

        if (totalPages <= maxVisible) {
            // 전체 페이지가 5개 이하면 모두 표시
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // 현재 페이지 기준으로 앞뒤 2개씩 표시
            let start = Math.max(1, currentPage - 2);
            let end = Math.min(totalPages, currentPage + 2);

            // 앞쪽에 여유가 있으면 뒤로 더 채움
            if (end - start < maxVisible - 1) {
                if (start === 1) {
                    end = Math.min(totalPages, start + maxVisible - 1);
                } else {
                    start = Math.max(1, end - maxVisible + 1);
                }
            }

            // 페이지들 추가
            for (let i = start; i <= end; i++) {
                pages.push(i);
            }
        }

        return pages;
    };

    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-center gap-2 mt-8 mb-4">
            {/* 맨 처음 버튼 */}
            <button
                onClick={() => handlePageChange(1)}
                disabled={isFirst}
                className={`
                    flex items-center justify-center w-9 h-9 rounded-md
                    ${
                        isFirst
                            ? "text-gray-300 cursor-not-allowed bg-gray-50"
                            : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                    }
                `}
            >
                <FaAnglesLeft className="text-sm" />
            </button>

            {/* 이전 버튼 */}
            <button
                onClick={() => handlePageChange(currentPage-1)}
                disabled={isFirst}
                className={`
                    flex items-center justify-center w-9 h-9 rounded-md
                    ${
                        isFirst
                            ? "text-gray-300 cursor-not-allowed bg-gray-50"
                            : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                    }
                `}
            >
                <FaChevronLeft className="text-sm" />
            </button>

            {/* 페이지 번호들 */}
            {getPageNumbers().map((pageNumber) => {
                const isActive = pageNumber === currentPage;

                return (
                    <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={`
                            flex items-center justify-center w-9 h-9 rounded-md text-sm font-medium cursor-pointer
                            ${
                                isActive
                                    ? "bg-gray-900 text-white"
                                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            }
                        `}
                    >
                        {pageNumber}
                    </button>
                );
            })}

            {/* 다음 버튼 */}
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={isLast}
                className={`
                    flex items-center justify-center w-9 h-9 rounded-md
                    ${
                        isLast
                            ? "text-gray-300 cursor-not-allowed bg-gray-50"
                            : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                    }
                `}
            >
                <FaChevronRight className="text-sm" />
            </button>

            {/* 맨 마지막 버튼 */}
            <button
                onClick={() => handlePageChange(totalPages)}
                disabled={isLast}
                className={`
                    flex items-center justify-center w-9 h-9 rounded-md
                    ${
                        isLast
                            ? "text-gray-300 cursor-not-allowed bg-gray-50"
                            : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                    }
                `}
            >
                <FaAnglesRight className="text-sm" />
            </button>
        </div>
    );
}