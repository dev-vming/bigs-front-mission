import NewBoardButton from "@/components/boards/NewBoardButton";

export const metadata = {
    title: "게시판",
};

export default function BoardsPage() {
    
    return (
        <div>
            게시판 페이지
            {/* 게시물 작성 버튼 */}
            <NewBoardButton />
        </div>
    );
}
