import CategoryBadge from "@/components/boards/CategoryBadge";
interface BoardItem {
    id: number;
    title: string;
    category: "FREE" | "NOTICE" | "QNA" | "ETC";
    content: string;
    createdAt: string;
    imageUrl?: string;
}

export default function BoardDetailPage() {
    const post: BoardItem = {
        id: 1,
        title: "게시물 제목입니다",
        category: "FREE",
        createdAt: "2025-01-25T10:30:00",
        content: "게시물 내용이 들어갑니다.\n줄바꿈 테스트",
    };

    return (
        <div className="space-y-4">
            {/* 게시물 카테고리 영역 */}
            <CategoryBadge category={post.category} />

            {/* 게시물 제목 작성일 영역 */}
            <div className="flex items-center justify-between">
                <div className="flex gap-4 items-center">
                    <h2 className="text-xl font-bold text-gray-900">
                        {post.title}
                    </h2>
                </div>

                <p className="text-sm text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString("ko-KR", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </p>
            </div>

            {/* 본문 */}
            <div className="whitespace-pre-line text-sm leading-relaxed text-gray-800">
                {post.content}
            </div>
        </div>
    );
}
