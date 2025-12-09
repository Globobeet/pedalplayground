import type { CanvasNode } from './types';

export const mockNodes: CanvasNode[] = [
  {
    id: 'pedal-1',
    type: 'pedal',
    position: { x: 100, y: 150 },
    data: {
      name: 'DS-1 Distortion',
      brandName: 'Boss',
      width: 73,
      height: 129,
      imageId: 1,
      brandId: 1,
      url: null,
    },
  },
  {
    id: 'pedal-2',
    type: 'pedal',
    position: { x: 250, y: 150 },
    data: {
      name: 'Ditto Looper',
      brandName: 'TC Electronic',
      width: 53,
      height: 53,
      imageId: 2,
      brandId: 2,
      url: null,
    },
  },
  {
    id: 'pedal-3',
    type: 'pedal',
    position: { x: 400, y: 150 },
    data: {
      name: 'Big Muff π',
      brandName: 'Electro-Harmonix',
      width: 70,
      height: 115,
      imageId: 3,
      brandId: 3,
      url: null,
    },
  },
  {
    id: 'pedal-4',
    type: 'pedal',
    position: { x: 550, y: 150 },
    data: {
      name: 'Timeline',
      brandName: 'Strymon',
      width: 146,
      height: 121,
      imageId: 4,
      brandId: 4,
      url: null,
    },
  },
  {
    id: 'board-1',
    type: 'pedalboard',
    position: { x: 100, y: 350 },
    data: {
      name: 'Classic Jr',
      brandName: 'Pedaltrain',
      width: 457,
      height: 318,
      imageId: 5,
      brandId: 5,
      url: null,
    },
  },
];
