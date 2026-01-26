"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";

export default function RootPage() {
    const router = useRouter();
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated());

    useEffect(() => {
        if (isAuthenticated) {
            router.replace("/boards");
        } else {
            router.replace("/login");
        }
    }, [isAuthenticated, router]);

    return null;
}
