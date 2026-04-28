import { create } from 'zustand';

export interface BoardItem {
  instanceId: string;
  itemId: number;
  type: 'pedal' | 'pedalboard';
  name: string;
  brandName: string;
  imageUrl: string;
  width: number;
  height: number;
  positionX: number;
  positionY: number;
  rotation: number;
}

export type NewBoardItem = Omit<BoardItem, 'instanceId' | 'positionX' | 'positionY' | 'rotation'>;

export interface Playground {
  name: string;
  items: BoardItem[];
}

const BLANK_PLAYGROUND: Playground = {
  name: '',
  items: [],
};

interface PlaygroundStore {
  playground: Playground;
  updateName: (name: string) => void;
  addItem: (item: NewBoardItem) => void;
  removeItem: (instanceId: string) => void;
}

export const usePlaygroundStore = create<PlaygroundStore>((set) => ({
  playground: { ...BLANK_PLAYGROUND },
  updateName: (name) => set((state) => ({ playground: { ...state.playground, name } })),
  addItem: (item) =>
    set((state) => ({
      playground: {
        ...state.playground,
        items: [
          ...state.playground.items,
          {
            ...item,
            instanceId: crypto.randomUUID(),
            positionX: 0,
            positionY: 0,
            rotation: 0,
          },
        ],
      },
    })),
  removeItem: (instanceId) =>
    set((state) => ({
      playground: {
        ...state.playground,
        items: state.playground.items.filter((i) => i.instanceId !== instanceId),
      },
    })),
}));
