import BoardItem from "@/components/boards/BoardItem";
import NewBoardButton from "@/components/boards/NewBoardButton";

export const metadata = {
    title: "게시판",
};

interface BoardItem {
    id: number;
    title: string;
    category: "FREE" | "NOTICE" | "QNA" | "ETC";
    createdAt: string;
}

const boards: BoardItem[] = [
    {
        id: 1,
        title: "Notice1",
        category: "NOTICE",
        createdAt: "2024-11-11T09:29:45.721114",
    },
    {
        id: 2,
        title: "Free Post",
        category: "FREE",
        createdAt: "2024-11-10T12:00:00.000Z",
    },
    {
        id: 3,
        title: "qna",
        category: "QNA",
        createdAt: "2024-11-11T09:29:45.721114",
    },
    {
        id: 4,
        title: "etc Post",
        category: "ETC",
        createdAt: "2024-11-10T12:00:00.000Z",
    },
];

export default function BoardsPage() {
    return (
        <div>
            <div className="w-full px-4 py-2 flex items-center gap-4 border-b border-gray-300 text-xs font-semibold mb-1 text-gray-500">
                <span className="w-20 shrink-0">카테고리</span>
                <span className="flex-1">제목</span>
                <span className="w-18 md:w-40 shrink-0">작성일</span>
            </div>
            {boards.map((board) => (
                <BoardItem
                    key={board.id}
                    id={board.id}
                    title={board.title}
                    category={board.category}
                    createdAt={board.createdAt}
                />
            ))}
            {/* 게시물 작성 버튼 */}
            <NewBoardButton />
        </div>
    );
}
