'use client';

import { useMemo, useState } from 'react';

import type { PedalDetail } from '@/app/api/pedals';
import type { ComboGroup } from '@/components/combobox';

import { usePlaygroundStore } from '@/store/playground';

import SidebarSection from './SidebarSection';

interface AddPedalSectionProps {
  options: ComboGroup<PedalDetail>[];
}

export default function AddPedalSection({ options }: AddPedalSectionProps) {
  const addPedal = usePlaygroundStore((s) => s.addPedal);
  const [selectedId, setSelectedId] = useState<string>();

  const allOptions = useMemo(() => options.flatMap((g) => g.options), [options]);

  const handleAdd = () => {
    if (!selectedId) return;

    const option = allOptions.find((o) => o.id === selectedId);

    if (!option) return;

    const detail = option.value;

    addPedal({
      pedalId: detail.id,
      name: detail.name,
      brandName: detail.brandName,
      imageUrl: detail.imageUrl,
      width: detail.width,
      height: detail.height,
    });
  };

  return (
    <SidebarSection>
      <SidebarSection.Title>Add a Pedal</SidebarSection.Title>
      <SidebarSection.Combobox
        options={options}
        onChange={setSelectedId}
        placeholder="Search for pedals"
      />
      <SidebarSection.Button disabled={!selectedId} onClick={handleAdd}>
        Add a Pedal
      </SidebarSection.Button>
    </SidebarSection>
  );
}
