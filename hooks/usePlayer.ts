import { create } from "zustand";

interface PlayerStore {
  ids: string[];
  activeId?: string;
  volume: number;
  prevVolume: number;
  isRandom: boolean;
  isRepeated: boolean;
  setId: (id: string) => void;
  setIds: (ids: string[]) => void;
  reset: () => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  toggleRandom: () => void;
  toggleRepeat: () => void;
}

const usePlayer = create<PlayerStore>((set) => ({
  ids: [],
  activeId: undefined,
  volume: 0.5,
  prevVolume: 0,
  isRandom: false,
  isRepeated: false,

  setId: (id: string) => set({ activeId: id }),
  setIds: (ids: string[]) => set({ ids }),
  reset: () => set({ ids: [], activeId: undefined }),

  setVolume: (volume: number) => set({ volume }),

  toggleMute: () =>
    set((state) => {
      if (state.volume > 0) {
        return { prevVolume: state.volume, volume: 0 };
      } else {
        return { volume: state.prevVolume > 0 ? state.prevVolume : 0.5 };
      }
    }),

  toggleRandom: () => set((state) => ({ isRandom: !state.isRandom })),
  toggleRepeat: () => set((state) => ({ isRepeated: !state.isRepeated })),
}));

export default usePlayer;
