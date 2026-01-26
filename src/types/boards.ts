export type BoardCategory = "NOTICE" | "FREE" | "QNA" | "ETC";

export interface BoardRequest {
    title: string;
    content: string;
    category: BoardCategory;
}

export interface BoardFormData {
    request: BoardRequest;
    file?: File | undefined;
}

export interface CreateBoardResponse {
    id: number;
}

export interface BoardDetailResponse {
    id: number;
    title: string;
    content: string;
    boardCategory: BoardCategory;
    imageUrl: string | null;
    createdAt: string;
}

export interface BoardItem {
    id: number;
    title: string;
    category: BoardCategory;
    createdAt: string;
}

export interface Pageable {
    pageNumber: number;
    pageSize: number;
    offset: number;
    sort: Sort;
    unpaged: boolean;
    paged: boolean;
}

export interface Sort {
    unsorted: boolean;
    sorted: boolean;
    empty: boolean;
}

export interface BoardsResponse {
    content: BoardItem[];
    pageable: Pageable;
    totalPages: number;
    totalElements: number;
    last: boolean;
    numberOfElements: number;
    size: number;
    number: number;
    sort: Sort;
    first: boolean;
    empty: boolean;
}

export type BoardCategoryMap = Record<BoardCategory, string>;
