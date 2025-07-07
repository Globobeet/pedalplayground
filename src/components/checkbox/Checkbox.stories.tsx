import type { Meta, StoryObj } from '@storybook/nextjs';

import { Checkbox, type CheckboxProps } from './Checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary'],
      table: { defaultValue: { summary: 'primary' } },
    },
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
      table: { defaultValue: { summary: 'md' } },
    },
    rounded: {
      control: { type: 'radio' },
      options: ['none', 'sm', 'md', 'lg', 'full'],
      table: { defaultValue: { summary: 'md' } },
    },
    defaultChecked: {
      control: 'select',
      options: [true, false, 'indeterminate'],
      table: {
        type: { summary: 'boolean | "indeterminate"' },
      },
    },
    checked: {
      control: 'select',
      options: [true, false, 'indeterminate'],
      table: {
        type: { summary: 'boolean | "indeterminate"' },
      },
    },
    disabled: {
      control: 'boolean',
      table: { type: { summary: 'boolean' } },
    },
    name: {
      control: 'text',
      table: { type: { summary: 'string' } },
    },
    onCheckedChange: {
      table: {
        type: { summary: '(checked?: boolean | "indeterminate") => void' },
      },
      control: false,
    },
  },
} satisfies Meta<CheckboxProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'agree',
    defaultChecked: false,
    variant: 'primary',
    size: 'md',
    rounded: 'md',
  },
};

export const Variants: Story = {
  args: { defaultChecked: false, size: 'md', rounded: 'md' },
  render: ({ ...args }) => (
    <div className="flex gap-4">
      <label className="flex items-center gap-2">
        <Checkbox {...args} variant="primary" />
        <span>Primary</span>
      </label>
    </div>
  ),
};

export const Sizes: Story = {
  args: { defaultChecked: true, variant: 'primary', rounded: 'md' },
  render: ({ ...args }) => (
    <div className="flex items-center gap-4">
      <label className="flex items-center gap-2">
        <Checkbox {...args} size="sm" />
        <span>Small</span>
      </label>
      <label className="flex items-center gap-2">
        <Checkbox {...args} size="md" />
        <span>Medium</span>
      </label>
      <label className="flex items-center gap-2">
        <Checkbox {...args} size="lg" />
        <span>Large</span>
      </label>
    </div>
  ),
};

export const RoundedCorners: Story = {
  args: { defaultChecked: true, variant: 'primary', size: 'md' },
  render: ({ ...args }) => (
    <div className="flex items-center gap-4">
      <label className="flex items-center gap-2">
        <Checkbox {...args} rounded="none" />
        <span>None</span>
      </label>
      <label className="flex items-center gap-2">
        <Checkbox {...args} rounded="sm" />
        <span>Small</span>
      </label>
      <label className="flex items-center gap-2">
        <Checkbox {...args} rounded="md" />
        <span>Medium</span>
      </label>
      <label className="flex items-center gap-2">
        <Checkbox {...args} rounded="lg" />
        <span>Large</span>
      </label>
      <label className="flex items-center gap-2">
        <Checkbox {...args} rounded="full" />
        <span>Full</span>
      </label>
    </div>
  ),
};

export const States: Story = {
  args: { variant: 'primary', size: 'md', rounded: 'md' },
  render: ({ ...args }) => (
    <div className="flex flex-col gap-4">
      <label className="flex items-center gap-2">
        <Checkbox {...args} defaultChecked={false} />
        <span>Unchecked</span>
      </label>
      <label className="flex items-center gap-2">
        <Checkbox {...args} defaultChecked={true} />
        <span>Checked</span>
      </label>
      <label className="flex items-center gap-2">
        <Checkbox {...args} defaultChecked="indeterminate" />
        <span>Indeterminate</span>
      </label>
      <label className="flex items-center gap-2">
        <Checkbox {...args} disabled />
        <span>Disabled</span>
      </label>
    </div>
  ),
};
