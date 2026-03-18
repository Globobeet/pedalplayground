import { create } from 'zustand';

export interface Pedal {
  instanceId: string;
  pedalId: number;
  name: string;
  brandName: string;
  imageUrl: string;
  width: number;
  height: number;
  positionX: number;
  positionY: number;
  rotation: number;
}

export interface Playground {
  name: string;
  pedals: Pedal[];
}

const BLANK_PLAYGROUND: Playground = {
  name: '',
  pedals: [],
};

interface PlaygroundStore {
  playground: Playground;
  updateName: (name: string) => void;
  addPedal: (pedal: Omit<Pedal, 'instanceId' | 'positionX' | 'positionY' | 'rotation'>) => void;
  removePedal: (instanceId: string) => void;
}

export const usePlaygroundStore = create<PlaygroundStore>((set) => ({
  playground: { ...BLANK_PLAYGROUND },
  updateName: (name) => set((state) => ({ playground: { ...state.playground, name } })),
  addPedal: (pedal) =>
    set((state) => ({
      playground: {
        ...state.playground,
        pedals: [
          ...state.playground.pedals,
          {
            ...pedal,
            instanceId: crypto.randomUUID(),
            positionX: 0,
            positionY: 0,
            rotation: 0,
          },
        ],
      },
    })),
  removePedal: (instanceId) =>
    set((state) => ({
      playground: {
        ...state.playground,
        pedals: state.playground.pedals.filter((p) => p.instanceId !== instanceId),
      },
    })),
}));
