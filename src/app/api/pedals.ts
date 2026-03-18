import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { brand, media, pedal } from '@/db/schema';

import type { ComboGroup } from '@/components/combobox';

export interface PedalDetail {
  id: number;
  name: string;
  brandName: string;
  imageUrl: string;
  width: number;
  height: number;
}

export async function getPedalsGroupedByBrand(): Promise<ComboGroup<PedalDetail>[]> {
  const rows = await db
    .select({
      id: pedal.id,
      name: pedal.name,
      width: pedal.width,
      height: pedal.height,
      brandName: brand.name,
      imageUrl: media.url,
    })
    .from(pedal)
    .leftJoin(brand, eq(pedal.brandId, brand.id))
    .leftJoin(media, eq(pedal.imageId, media.id))
    .orderBy(brand.name, pedal.name);

  const groups = new Map<string, ComboGroup<PedalDetail>>();

  for (const row of rows) {
    const groupName = row.brandName ?? 'Other';

    if (!groups.has(groupName)) {
      groups.set(groupName, { groupLabel: groupName, options: [] });
    }

    groups.get(groupName)!.options.push({
      id: String(row.id),
      label: row.name,
      value: {
        id: row.id,
        name: row.name,
        brandName: groupName,
        imageUrl: row.imageUrl ?? '',
        width: row.width,
        height: row.height,
      },
    });
  }

  return Array.from(groups.values());
}
