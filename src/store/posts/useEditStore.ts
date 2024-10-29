import { create } from "zustand";

interface EditStore {
  isEditing: boolean;
  startEditing: () => void;
  stopEditing: () => void;
}

export const useEditStore = create<EditStore>((set) => ({
  isEditing: false,
  startEditing: () => set({ isEditing: true }),
  stopEditing: () => set({ isEditing: false }),
}));
