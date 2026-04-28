'use client';

import { useMemo, useState } from 'react';

import type { ItemDetail } from '@/app/api/pedals';
import type { ComboGroup } from '@/components/combobox';

import { usePlaygroundStore } from '@/store/playground';

import SidebarSection from './SidebarSection';

interface AddPedalboardSectionProps {
  options: ComboGroup<ItemDetail>[];
}

export default function AddPedalboardSection({ options }: AddPedalboardSectionProps) {
  const addItem = usePlaygroundStore((s) => s.addItem);
  const [selectedId, setSelectedId] = useState<string>();

  const allOptions = useMemo(() => options.flatMap((g) => g.options), [options]);

  const handleAdd = () => {
    if (!selectedId) return;

    const option = allOptions.find((o) => o.id === selectedId);

    if (!option) return;

    const { id, ...rest } = option.value;

    addItem({ itemId: id, type: 'pedalboard', ...rest });
  };

  return (
    <SidebarSection>
      <SidebarSection.Title>Add a Pedalboard</SidebarSection.Title>
      <SidebarSection.Combobox
        options={options}
        onChange={setSelectedId}
        placeholder="Search for pedalboards"
      />
      <SidebarSection.Button disabled={!selectedId} onClick={handleAdd}>
        Add a Pedalboard
      </SidebarSection.Button>
    </SidebarSection>
  );
}
