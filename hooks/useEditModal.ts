import { Song } from "@/types";
import { create } from "zustand";

interface EditModalStore {
  data: Song | null;
  isOpen: boolean;
  onOpen: (data: Song) => void;
  onClose: () => void;
}

const useEditModal = create<EditModalStore>((set) => ({
  data: null,
  isOpen: false,
  onOpen: (data: Song) => set({ isOpen: true, data }),
  onClose: () => set({ isOpen: false, data: null }),
}));

export default useEditModal;
