import { getUserFromToken } from "@/utils/jwt";
import { create } from "zustand";

interface AuthState {
  token: string | null;
  user: { name: string; role: string } | null;
  login: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,

  login: (token) => {
    const decoded = getUserFromToken(token);
    set({
      token,
      user: decoded ? { name: decoded.name, role: decoded.role } : null,
    });
  },

  logout: () => set({ token: null, user: null }),
}));
