import type { Pedal, Pedalboard } from '@/db/types';
import type { Node } from '@xyflow/react';

export type PedalNodeData = Omit<Pedal, 'id'> & {
  brandName?: string;
};

export type PedalboardNodeData = Omit<Pedalboard, 'id'> & {
  brandName?: string;
};

export type NodeData = PedalNodeData | PedalboardNodeData;

export type PedalNode = Node<PedalNodeData, 'pedal'>;
export type PedalboardNode = Node<PedalboardNodeData, 'pedalboard'>;
export type CanvasNode = PedalNode | PedalboardNode;
