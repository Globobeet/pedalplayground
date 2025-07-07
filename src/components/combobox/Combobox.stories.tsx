import type { Meta, StoryObj } from '@storybook/nextjs';

import { useState } from 'react';

import { Combobox } from './Combobox';

const FLAT = [
  { id: '1', value: 'scuzz', label: 'KHDK Scuzz Box' },
  { id: '2', value: 'paranorm', label: 'KHDK Paranormal' },
  { id: '3', value: 'ian', label: 'Scott Ian SGT D' },
];

const GROUPED = [
  {
    groupLabel: 'KHDK',
    options: [
      { id: 'k1', value: 'scuzz', label: 'Scuzz Box' },
      { id: 'k2', value: 'paranorm', label: 'Paranormal' },
      { id: 'k3', value: 'unicorn', label: 'Unicorn Blood 2' },
    ],
  },
  {
    groupLabel: 'KMA Audio',
    options: [
      { id: 'a1', value: 'kma', label: 'Machines' },
      { id: 'a2', value: 'kma-ab', label: 'AB/Y' },
    ],
  },
  { id: 'solo', value: 'misc', label: 'No-group single' },
];

const meta = {
  title: 'Components/Combobox',
  component: Combobox,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    options: { control: false },
    value: { control: false },
    onChange: { control: false },
  },
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: { placeholder: 'Select pedal…' },
  render: ({ ...args }) => {
    const [value, setValue] = useState<string>('1');
    return <Combobox {...args} options={FLAT} value={value} onChange={setValue} />;
  },
};

export const WithGroups: Story = {
  args: { placeholder: 'Choose effect…' },
  render: ({ ...args }) => {
    const [value, setValue] = useState<string>('k1');
    return <Combobox {...args} options={GROUPED} value={value} onChange={setValue} />;
  },
};
