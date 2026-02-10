import { create } from 'zustand';

export interface Playground {
  name: string;
}

const BLANK_PLAYGROUND: Playground = {
  name: '',
};

interface PlaygroundStore {
  playground: Playground;
  updateName: (name: string) => void;
}

export const usePlaygroundStore = create<PlaygroundStore>((set) => ({
  playground: { ...BLANK_PLAYGROUND },
  updateName: (name) => set((state) => ({ playground: { ...state.playground, name } })),
}));
