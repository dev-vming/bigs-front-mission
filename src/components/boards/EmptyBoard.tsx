export default function EmptyBoard() {
    return (
        <div className="py-80 flex flex-col items-center justify-center text-gray-600 text-sm">
            <p className="mb-2">등록된 게시물이 없습니다.</p>
            <p className="text-xs text-gray-400">새 게시물을 작성해보세요!</p>
        </div>
    );
}
