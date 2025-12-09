'use client';

import { Background, Controls, MiniMap, ReactFlow, useNodesState } from '@xyflow/react';
import { useMemo } from 'react';

import { mockNodes } from './mockData';
import PedalboardNode from './PedalboardNode';
import PedalNode from './PedalNode';

export default function Canvas() {
  const nodeTypes = useMemo(
    () => ({
      pedal: PedalNode,
      pedalboard: PedalboardNode,
    }),
    [],
  );

  const [nodes, , onNodesChange] = useNodesState(mockNodes);

  return (
    <div className="flex flex-1 items-center justify-center">
      <ReactFlow
        nodes={nodes}
        edges={[]}
        onNodesChange={onNodesChange}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.2}
        maxZoom={2}
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}
