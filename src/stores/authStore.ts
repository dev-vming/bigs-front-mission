import { create } from "zustand";
import { jwtDecode } from "jwt-decode";
import { User, JwtPayload } from "@/types/auth";

interface AuthState {
    accessToken: string | null;
    user: User | null;
    setToken: (accessToken: string, refreshToken: string) => void;
    logout: () => void;
    isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
    accessToken: null,
    refreshToken: null,
    user: null,

    // 로그인
    setToken: (accessToken: string, refreshToken: string) => {
        const decoded = jwtDecode<JwtPayload>(accessToken);
        set({
            accessToken,
            user: {
                username: decoded.username,
                name: decoded.name,
            },
        });
        localStorage.setItem("refreshToken", refreshToken);
    },

    // 로그아웃
    logout: () => {
        set({ accessToken: null, user: null });
        localStorage.clear();
    },

    isAuthenticated: () => {
        return !!get().accessToken;
    },
}));
