"use client";
import { useEffect } from "react";
import { useModalStore } from "@/stores/modalStore";

export default function Modal() {
    const { open, title, content, onConfirm, closeModal } = useModalStore();

    // ESC로 닫기
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeModal();
        };
        if (open) document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, [open, closeModal]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-md w-11/12 max-w-md p-6">
                {title && (
                    <h2 className="text-lg font-semibold mb-4">{title}</h2>
                )}
                {content && (
                    <div className="mb-4 whitespace-pre-line">{content}</div>
                )}
                <div className="flex justify-end gap-2">
                    <button
                        onClick={closeModal}
                        className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 cursor-pointer"
                    >
                        취소
                    </button>
                    {onConfirm && (
                        <button
                            onClick={() => {
                                onConfirm();
                                closeModal();
                            }}
                            className="px-4 py-2 rounded-md bg-gray-900 text-white hover:bg-gray-800 cursor-pointer"
                        >
                            확인
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
