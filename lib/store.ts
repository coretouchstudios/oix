import { create } from "zustand";

export const useAppStore = create((set) => ({
  workspace: null,
  setWorkspace: (ws: any) => set({ workspace: ws }),
}));