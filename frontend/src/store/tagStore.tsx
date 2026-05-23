import { create } from 'zustand';

type TagStore = {
    selectedTags: string[];
    addTag: (tag: string) => void;
    clearTags: () => void;
};

export const useTagStore = create<TagStore>((set) => ({
    selectedTags: [],
    addTag: (tag) =>
        set((state) => ({
            selectedTags: state.selectedTags.includes(tag)
                ? state.selectedTags.filter((t) => t !== tag)  // ← .filter に変更
                : [...state.selectedTags, tag]
        })),
    clearTags: () => set({ selectedTags: [] }),
}));