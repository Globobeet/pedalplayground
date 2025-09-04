import type { Meta, StoryObj } from '@storybook/nextjs';

import { faFileExport, faSave } from '@fa/classic/solid';
import React from 'react';

import { Button } from '../button';
import Dropdown from './Dropdown';

const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  argTypes: {
    defaultOpen: { control: 'boolean' },
    align: {
      control: { type: 'radio' },
      options: ['start', 'center', 'end'],
      table: { defaultValue: { summary: 'start' } },
    },
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: { defaultOpen: false, align: 'start' },
  render: ({ ...args }) => (
    <div className="flex h-64 items-center justify-center">
      <Dropdown {...args}>
        <Dropdown.Trigger>
          <Button size="sm">Click me!</Button>
        </Dropdown.Trigger>

        <Dropdown.Menu>
          <Dropdown.MenuItem icon={faSave}>Save</Dropdown.MenuItem>
          <Dropdown.Separator />

          <Dropdown.MenuItem icon={faFileExport} iconPlacement="right">
            Export
          </Dropdown.MenuItem>
          <Dropdown.Separator />

          <Dropdown.MenuItem closeOnSelect={false}>
            <label className="flex w-full items-center gap-2">
              <input type="checkbox" defaultChecked className="accent-white" />
              Stay open
            </label>
          </Dropdown.MenuItem>
          <Dropdown.Separator />

          <Dropdown.MenuItem closeOnSelect={false}>
            <label className="flex w-full items-center justify-between gap-2">
              Canvas scale
              <input
                type="number"
                defaultValue={10}
                className="w-20 rounded bg-gray-800 px-2 py-1 text-right"
              />
            </label>
          </Dropdown.MenuItem>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  ),
};

export const FixedTopRight: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <div className="relative h-64 border border-dashed">
        <Button
          size="sm"
          onClick={() => setOpen((o) => !o)}
          className="absolute top-4 left-1/2 -translate-x-1/2"
        >
          Toggle menu
        </Button>

        <Dropdown open={open} onOpenChange={setOpen}>
          <Dropdown.Trigger>
            <div className="pointer-events-none absolute top-0 right-5 h-0 w-0" />
          </Dropdown.Trigger>

          <Dropdown.Menu side="bottom" align="end">
            <Dropdown.MenuItem icon={faSave}>Top-right item 1</Dropdown.MenuItem>
            <Dropdown.MenuItem icon={faFileExport}>Top-right item 2</Dropdown.MenuItem>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  },
};

export const Alignments: Story = {
  render: () => (
    <div className="flex h-64 items-start gap-8">
      {(['start', 'center', 'end'] as const).map((align) => (
        <Dropdown key={align} align={align}>
          <Dropdown.Trigger>
            <Button size="sm">{align}</Button>
          </Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.MenuItem icon={faSave}>First</Dropdown.MenuItem>
            <Dropdown.MenuItem icon={faFileExport}>Second</Dropdown.MenuItem>
          </Dropdown.Menu>
        </Dropdown>
      ))}
    </div>
  ),
};
