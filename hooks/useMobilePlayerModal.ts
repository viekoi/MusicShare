import { create } from 'zustand';

interface MobilePlayerModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useMobilePlayerModal = create<MobilePlayerModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useMobilePlayerModal;