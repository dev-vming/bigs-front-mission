import { create } from "zustand";

interface ModalState {
    open: boolean;
    title?: string;
    content?: string;
    onConfirm?: () => void;
    setModal: (modal: {
        open: boolean;
        title?: string;
        content?: string;
        onConfirm?: () => void;
    }) => void;
    closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
    open: false,
    title: undefined,
    content: undefined,
    onConfirm: undefined,
    setModal: ({ open, title, content, onConfirm }) =>
        set({ open, title, content, onConfirm }),
    closeModal: () => set({ open: false }),
}));
