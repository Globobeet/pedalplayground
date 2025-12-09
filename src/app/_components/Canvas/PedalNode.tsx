import { memo } from 'react';

import { mmToPixels } from '@/utils/mmToPixels';

import type { PedalNodeData } from './types';

function PedalNode({ data }: { data: PedalNodeData }) {
  const width = mmToPixels(data.width);
  const height = mmToPixels(data.height);

  return (
    <div
      className="bg-background rounded-lg border-2 border-blue-500 p-2 shadow-md transition-colors"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <div className="text-xs font-bold">{data.name}</div>
      {data.brandName && (
        <div className="text-muted-foreground mt-0.5 text-xs">{data.brandName}</div>
      )}
      <div className="text-muted-foreground mt-1 text-xs">
        {data.width} × {data.height} mm
      </div>
    </div>
  );
}

export default memo(PedalNode);
