import { memo } from 'react';

import { mmToPixels } from '@/utils/mmToPixels';

import type { PedalboardNodeData } from './types';

function PedalboardNode({ data }: { data: PedalboardNodeData }) {
  const width = mmToPixels(data.width);
  const height = mmToPixels(data.height);

  return (
    <div
      className="bg-background rounded-lg border-2 border-green-500 p-3 shadow-md transition-colors"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <div className="mb-1 text-xs font-semibold tracking-wide text-green-600 uppercase dark:text-green-400">
        Board
      </div>
      <div className="text-sm font-bold">{data.name}</div>
      {data.brandName && (
        <div className="text-muted-foreground mt-0.5 text-xs">{data.brandName}</div>
      )}
      <div className="text-muted-foreground mt-2 text-xs">
        {data.width} × {data.height} mm
      </div>
    </div>
  );
}

export default memo(PedalboardNode);
