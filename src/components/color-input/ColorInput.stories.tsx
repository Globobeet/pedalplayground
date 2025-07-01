import type { Meta, StoryObj } from '@storybook/nextjs';

import { ColorInput, type ColorInputProps } from './ColorInput';

const meta = {
  title: 'Components/ColorInput',
  component: ColorInput,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'color',
      table: { type: { summary: 'string' } },
    },
    disabled: {
      control: 'boolean',
      table: { type: { summary: 'boolean' } },
    },
    onChange: {
      action: 'changed',
      table: { disable: true },
    },
  },
} satisfies Meta<ColorInputProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: '#41c74d',
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    value: '#41c74d',
    disabled: true,
  },
};
