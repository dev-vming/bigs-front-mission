"use client";

import Header from "@/components/common/Header";

export default function BoardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main className="max-w-5xl mx-auto px-4 py-6">{children}</main>
        </div>
    );
}
