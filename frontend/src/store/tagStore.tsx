// store/tagStore.ts
import { create } from 'zustand';

type TagStore = {
  selectedTags: string[];
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
  clearTags: () => void;
};

export const useTagStore = create<TagStore>((set) => ({
  selectedTags: [],
  addTag: (tag) =>
    set((state) => ({
      selectedTags: state.selectedTags.includes(tag)
        ? state.selectedTags  // 重複追加を防ぐ
        : [...state.selectedTags, tag],
    })),
  removeTag: (tag) =>
    set((state) => ({
      selectedTags: state.selectedTags.filter((t) => t !== tag),
    })),
  clearTags: () => set({ selectedTags: [] }),
}));