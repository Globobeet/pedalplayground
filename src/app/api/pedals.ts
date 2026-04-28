import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { brand, media, pedal, pedalboard } from '@/db/schema';

import type { ComboGroup } from '@/components/combobox';

export interface ItemDetail {
  id: number;
  name: string;
  brandName: string;
  imageUrl: string;
  width: number;
  height: number;
}

function groupByBrand(
  rows: {
    id: number;
    name: string;
    width: number;
    height: number;
    brandName: string | null;
    imageUrl: string | null;
  }[],
): ComboGroup<ItemDetail>[] {
  const groups = new Map<string, ComboGroup<ItemDetail>>();

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

export async function getPedalsGroupedByBrand(): Promise<ComboGroup<ItemDetail>[]> {
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

  return groupByBrand(rows);
}

export async function getPedalboardsGroupedByBrand(): Promise<ComboGroup<ItemDetail>[]> {
  const rows = await db
    .select({
      id: pedalboard.id,
      name: pedalboard.name,
      width: pedalboard.width,
      height: pedalboard.height,
      brandName: brand.name,
      imageUrl: media.url,
    })
    .from(pedalboard)
    .leftJoin(brand, eq(pedalboard.brandId, brand.id))
    .leftJoin(media, eq(pedalboard.imageId, media.id))
    .orderBy(brand.name, pedalboard.name);

  return groupByBrand(rows);
}
