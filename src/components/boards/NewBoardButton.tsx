"use client";

import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa6";

export default function NewBoardButton() {
    // 라우터
    const router = useRouter();
    return (
        <button
            className="fixed right-6 bottom-6 z-50 p-4 rounded-full bg-gray-900 hover:bg-gray-800 cursor-pointer text-xl text-white shadow-lg"
            onClick={() => router.push("/boards/new")}
        >
            <FaPlus />
        </button>
    );
}
