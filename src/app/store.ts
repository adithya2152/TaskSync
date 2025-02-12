import { create } from "zustand";
import { persist } from "zustand/middleware";

type ThemeState = {
  mode: "light" | "dark";
  toggleTheme: () => void;
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: "light", // Default mode
      toggleTheme: () =>
        set((state) => ({ mode: state.mode === "light" ? "dark" : "light" })),
    }),
    { name: "theme-storage" } // Key for localStorage
  )
);
