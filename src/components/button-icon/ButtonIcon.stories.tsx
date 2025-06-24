import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import type { Meta, StoryObj } from '@storybook/nextjs';

import { faCoffee } from '@fortawesome/free-solid-svg-icons';

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
  render: ({ icon, size, ...args }) => (
    <div className="flex flex-col gap-4">
      <ButtonIcon icon={icon} {...args} variant="primary" size={size} />
      <ButtonIcon icon={icon} {...args} variant="secondary" size={size} />
      <ButtonIcon icon={icon} {...args} variant="ghost" size={size} />
      <ButtonIcon icon={icon} {...args} variant="red" size={size} />
    </div>
  ),
  args: {
    icon: faCoffee,
    size: 'lg',
  },
};

export const Sizes: Story = {
  render: ({ icon, variant, ...args }) => (
    <div className="flex flex-col gap-4">
      <ButtonIcon icon={icon} variant={variant} size="sm" {...args} />
      <ButtonIcon icon={icon} variant={variant} size="md" {...args} />
      <ButtonIcon icon={icon} variant={variant} size="lg" {...args} />
      <ButtonIcon icon={icon} variant={variant} size="xl" {...args} />
    </div>
  ),
  args: {
    icon: faCoffee,
    variant: 'primary',
  },
};

export const Radiuses: Story = {
  render: ({ icon, size, variant, ...args }) => (
    <div className="flex flex-col gap-4">
      <ButtonIcon icon={icon} size={size} variant={variant} rounded="none" {...args} />
      <ButtonIcon icon={icon} size={size} variant={variant} rounded="sm" {...args} />
      <ButtonIcon icon={icon} size={size} variant={variant} rounded="md" {...args} />
      <ButtonIcon icon={icon} size={size} variant={variant} rounded="lg" {...args} />
      <ButtonIcon icon={icon} size={size} variant={variant} rounded="full" {...args} />
    </div>
  ),
  args: {
    icon: faCoffee,
    size: 'lg',
    variant: 'primary',
  },
};

export const States: Story = {
  render: ({ icon, size, variant, ...args }) => (
    <div className="flex flex-col gap-4">
      <ButtonIcon icon={icon} size={size} variant={variant} loading {...args} />
      <ButtonIcon icon={icon} size={size} variant={variant} disabled {...args} />
      <ButtonIcon icon={icon} size={size} variant={variant} fullWidth {...args} />
    </div>
  ),
  args: {
    icon: faCoffee,
    size: 'lg',
    variant: 'primary',
  },
};
