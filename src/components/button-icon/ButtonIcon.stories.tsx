import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import type { Meta, StoryObj } from '@storybook/nextjs';

import { faCoffee } from '@fa/classic/solid';

import { ButtonIcon, type ButtonIconProps } from './ButtonIcon';

const meta = {
  title: 'Components/ButtonIcon',
  component: ButtonIcon,
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: false,
      table: {
        type: { summary: 'IconProp' },
      },
    },
    iconClassName: {
      control: 'text',
    },
    iconSize: {
      control: { type: 'radio' },
      options: ['xs', 'sm', '1x', 'lg', 'xl', '2x', '3x'],
      table: {
        defaultValue: { summary: 'lg' },
        type: { summary: 'SizeProp' },
      },
    },
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg', 'xl'],
      table: {
        defaultValue: { summary: 'lg' },
      },
    },
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary', 'ghost', 'red'],
      table: {
        defaultValue: { summary: 'ghost' },
      },
    },
    ghostColor: {
      control: { type: 'radio' },
      options: ['default', 'red'],
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    rounded: {
      control: { type: 'radio' },
      options: ['none', 'sm', 'md', 'lg', 'full'],
      table: {
        defaultValue: { summary: 'lg' },
      },
    },
    disabled: {
      control: 'boolean',
    },
    loading: {
      control: 'boolean',
    },
    fullWidth: {
      control: 'boolean',
    },
  },
} satisfies Meta<ButtonIconProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    icon: faCoffee as IconProp,
    size: 'lg',
    variant: 'primary',
  },
};

export const Variants: Story = {
  render: ({ ...args }) => (
    <div className="flex flex-col gap-4">
      <ButtonIcon {...args} variant="primary" />
      <ButtonIcon {...args} variant="secondary" />
      <ButtonIcon {...args} variant="ghost" />
      <ButtonIcon {...args} variant="red" />
    </div>
  ),
  args: {
    icon: faCoffee,
    size: 'lg',
  },
};

export const Sizes: Story = {
  render: ({ ...args }) => (
    <div className="flex flex-col gap-4">
      <ButtonIcon size="sm" {...args} />
      <ButtonIcon size="md" {...args} />
      <ButtonIcon size="lg" {...args} />
      <ButtonIcon size="xl" {...args} />
    </div>
  ),
  args: {
    icon: faCoffee,
    variant: 'primary',
  },
};

export const Radiuses: Story = {
  render: ({ ...args }) => (
    <div className="flex flex-col gap-4">
      <ButtonIcon
        icon={args.icon}
        size={args.size}
        variant={args.variant}
        rounded="none"
        {...args}
      />
      <ButtonIcon rounded="sm" {...args} />
      <ButtonIcon rounded="md" {...args} />
      <ButtonIcon rounded="lg" {...args} />
      <ButtonIcon
        icon={args.icon}
        size={args.size}
        variant={args.variant}
        rounded="full"
        {...args}
      />
    </div>
  ),
  args: {
    icon: faCoffee,
    size: 'lg',
    variant: 'primary',
  },
};

export const States: Story = {
  render: ({ ...args }) => (
    <div className="flex flex-col gap-4">
      <ButtonIcon loading {...args} />
      <ButtonIcon disabled {...args} />
      <ButtonIcon fullWidth {...args} />
    </div>
  ),
  args: {
    icon: faCoffee,
    size: 'lg',
    variant: 'primary',
  },
};
