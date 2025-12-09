const MM_TO_PX_SCALE = 2;

export function mmToPixels(mm: number): number {
  return Math.round(mm * MM_TO_PX_SCALE);
}
