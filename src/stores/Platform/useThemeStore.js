import { create } from "zustand";
import themesJson from "@/data/platform-3-4.json";

export const useThemeStore = create((set, get) => ({
  platformLink: "https://example.com/subscribe",
  themes: themesJson,
  selectedThemeKey: themesJson[0]?.key || null,

  setSelectedThemeByKey: (key) => {
    const exists = get().themes.some((t) => t.key === key);
    set({ selectedThemeKey: exists ? key : get().themes[0]?.key || null });
  }
}));

export const useSelectedTheme = () =>
  useThemeStore((s) => s.themes.find((t) => t.key === s.selectedThemeKey) || null);
