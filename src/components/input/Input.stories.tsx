import type { Meta, StoryObj } from '@storybook/nextjs';

import { Input, type InputProps } from './Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      table: { type: { summary: 'string' } },
    },
    state: {
      control: { type: 'radio' },
      options: ['default', 'error'],
      table: {
        type: { summary: 'default | error' },
        defaultValue: { summary: 'default' },
      },
    },
    disabled: {
      control: 'boolean',
      table: { type: { summary: 'boolean' } },
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'number', 'email', 'password'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'text' },
      },
    },
    value: {
      control: 'text',
      table: { type: { summary: 'string | number' } },
    },
    onChange: {
      action: 'changed',
      table: { disable: true },
    },
  },
} satisfies Meta<InputProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Type something…',
    state: 'default',
    disabled: false,
    type: 'text',
    value: '',
  },
};

export const Error: Story = {
  args: {
    placeholder: 'Invalid value',
    state: 'error',
    disabled: false,
    type: 'text',
    value: '',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Cannot edit',
    state: 'default',
    disabled: true,
    type: 'text',
    value: 'Read only',
  },
};

export const NumberInput: Story = {
  args: {
    placeholder: 'Enter a number',
    state: 'default',
    disabled: false,
    type: 'number',
    value: 42,
  },
};
