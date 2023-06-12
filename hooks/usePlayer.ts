import { create } from 'zustand';

interface PlayerStore {
  ids: string[];
  activeId?: string;
  volume:number;
  isRandom:boolean;
  isRepeated:boolean;
  setId: (id: string) => void;
  setIds: (ids: string[]) => void;
  reset: () => void;
  setVolume: (volume: number) => void;
  setIsRandom:(isRandom:boolean)=>void;
  setIsRepeated:(isRepeated:boolean)=>void;

}

const usePlayer = create<PlayerStore>((set) => ({
  ids: [],
  activeId: undefined,
  volume:0.5,
  isRandom:false,
  isRepeated:false,
  setId: (id: string) => set({ activeId: id }),
  setIds: (ids: string[]) => set({ ids }),
  reset: () => set({ ids: [], activeId: undefined }),
  setVolume: (volume:number) => set({ volume:volume }),
  setIsRandom:(isRandom:boolean)=>set({isRandom:!isRandom}),
  setIsRepeated:(isRepeated:boolean)=>set({isRepeated:!isRepeated})
}));

export default usePlayer;