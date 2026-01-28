"use client";

import Header from "@/components/common/Header";
import Modal from "@/components/common/Modal";
import { getBoardTitleByPath } from "@/lib/board/getBoardTitleByPath";
import { usePathname } from "next/navigation";
import AuthInitializer from "../AuthInitializer";

export default function BoardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // 현재 path 이름
    const pathname = usePathname();

    // path 이름 기반 title
    const title = getBoardTitleByPath(pathname);

    return (
        <AuthInitializer>
            <div className="min-h-dvh bg-white">
                <Header title={title} />
                <main className="max-w-5xl mx-auto px-4 py-6">
                    <h1 className="hidden md:block text-2xl font-bold mb-6">
                        {title}
                    </h1>
                    {children}
                </main>
                <Modal />
            </div>
        </AuthInitializer>
    );
}
