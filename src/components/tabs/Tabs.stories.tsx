import type { Meta, StoryObj } from '@storybook/nextjs';

import { Tabs, TabsContent, TabsList, TabsTrigger } from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    defaultValue: {
      control: 'text',
      table: { type: { summary: 'string' } },
    },
    orientation: {
      control: { type: 'radio' },
      options: ['horizontal', 'vertical'],
      table: {
        type: { summary: '"horizontal" | "vertical"' },
        defaultValue: { summary: 'horizontal' },
      },
    },
    onValueChange: {
      action: 'valueChanged',
      table: { disable: true },
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: 'pedalboard',
    orientation: 'horizontal',
  },
  render: ({ ...args }) => (
    <div className="bg-[#201f22] p-4">
      <Tabs {...args}>
        <TabsList>
          <TabsTrigger value="pedalboard">Pedalboard</TabsTrigger>
          <TabsTrigger value="pedal">Pedal</TabsTrigger>
        </TabsList>

        <TabsContent value="pedalboard">
          <p>Settings Pedalboard</p>
        </TabsContent>
        <TabsContent value="pedal">
          <p>Settings Pedal</p>
        </TabsContent>
      </Tabs>
    </div>
  ),
};

export const Vertical: Story = {
  args: {
    defaultValue: 'pedalboard',
    orientation: 'vertical',
  },
  render: ({ ...args }) => (
    <div className="bg-[#201f22] p-4">
      <Tabs {...args}>
        <TabsList className="flex flex-col">
          <TabsTrigger value="pedalboard">Pedalboard</TabsTrigger>
          <TabsTrigger value="pedal">Pedal</TabsTrigger>
        </TabsList>

        <TabsContent value="pedalboard">
          <p>Settings Pedalboard</p>
        </TabsContent>
        <TabsContent value="pedal">
          <p>Settings Pedal</p>
        </TabsContent>
      </Tabs>
    </div>
  ),
};
