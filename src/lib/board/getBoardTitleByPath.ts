export function getBoardTitleByPath(pathname: string) {
    if (pathname === "/boards") return "게시판";
    if (pathname === "/boards/new") return "게시물 등록";
    if (pathname.endsWith("/edit")) return "게시물 수정";
    return "게시물 상세";
}