import { create } from 'zustand';

type SearchStore = {
  text: string;
  selectedTags: string[];
  setText: (text: string) => void;
  addTag: (tag: string) => void;
};

export const useSearchStore = create<SearchStore>((set) => ({
  text: '',
  selectedTags: [],
  setText: (text) => set({ text }),
  addTag: (tag) => set((state) => ({
    selectedTags: state.selectedTags.includes(tag)
      ? state.selectedTags.filter((t) => t !== tag)
      : [...state.selectedTags, tag],
  })),
}));