import { api } from "./client";
import {
    BoardCategoryMap,
    BoardDetailResponse,
    BoardFormData,
    BoardsResponse,
    CreateBoardResponse,
} from "@/types/boards";

// formData 생성 로직
const createBoardFormData = (data: BoardFormData) => {
    const formData = new FormData();

    formData.append(
        "request",
        new Blob([JSON.stringify(data.request)], {
            type: "application/json",
        }),
    );

    if (data.file) {
        formData.append("file", data.file);
    }

    return formData;
};

export const boardsApi = {
    // 글 쓰기
    createBoard: async (data: BoardFormData): Promise<CreateBoardResponse> => {
        const formData = createBoardFormData(data);
        const response = await api.post<CreateBoardResponse>(
            "/boards",
            formData,
            {
                headers: { "Content-Type": "multipart/form-data" },
            },
        );
        return response.data;
    },

    // 글 수정
    updateBoard: async (
        data: BoardFormData,
        boardId: number,
    ): Promise<void> => {
        const formData = createBoardFormData(data);
        await api.patch(`/boards/${boardId}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
    },

    // 글 삭제
    deleteBoard: async (boardId: number): Promise<void> => {
        await api.delete(`/boards/${boardId}`);
    },

    // 글 상세조회
    getBoardDetail: async (boardId: number): Promise<BoardDetailResponse> => {
        const response = await api.get<BoardDetailResponse>(
            `/boards/${boardId}`,
        );
        return response.data;
    },

    // 글 목록조회
    getBoards: async (page: number, size: number): Promise<BoardsResponse> => {
        const response = await api.get<BoardsResponse>("/boards", {
            params: { page, size },
        });
        return response.data;
    },

    // 카테고리조회
    getCategories: async (): Promise<BoardCategoryMap> => {
        const response = await api.get<BoardCategoryMap>("/boards/categories");
        return response.data;
    },
};
