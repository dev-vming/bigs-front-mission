"use client";

import { useQuery } from "@tanstack/react-query";
import { boardsApi } from "@/lib/api/boards";

export const useBoardCategories = () => {
    return useQuery({
        queryKey: ["boards", "categories"],
        queryFn: boardsApi.getCategories,
        staleTime: Infinity,
        gcTime: Infinity,
    });
};
