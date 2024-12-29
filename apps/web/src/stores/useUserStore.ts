import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  user: {
    id?: string | number;
    name?: string;
    username?: string;
    email?: string;
    phoneNumber?: string;
    avatar?: string;
  } | null;
  setUser: (user: UserState["user"]) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user-storage", // unique name for localStorage key
    },
  ),
);
