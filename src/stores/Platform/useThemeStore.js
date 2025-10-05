import { create } from "zustand";

export const useThemeStore = create((set, get) => ({
  platformLink: "https://example.com/subscribe",
  themes: [],
  selectedThemeKey: null,

  hydrate: (themes, platformLink) =>
    set((state) => {
      const list = Array.isArray(themes) ? themes : [];
      const keepSelection =
        state.selectedThemeKey && list.some(t => t.key === state.selectedThemeKey);
      return {
        themes: list,
        platformLink: platformLink ?? state.platformLink,
        selectedThemeKey: keepSelection ? state.selectedThemeKey : (list[0]?.key ?? null),
      };
    }),

  setSelectedThemeByKey: (key) => {
    const exists = get().themes.some((t) => t.key === key);
    set({ selectedThemeKey: exists ? key : get().themes[0]?.key || null });
  },
}));

export const useSelectedTheme = () =>
  useThemeStore((s) => s.themes.find((t) => t.key === s.selectedThemeKey) || null);
