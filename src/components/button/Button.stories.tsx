import type { Meta, StoryObj } from '@storybook/nextjs';

import { faGlobe } from '@fa/classic/solid';

import { Button, type ButtonProps } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
    },
    loading: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    fullWidth: {
      control: 'boolean',
    },
    icon: {
      control: false,
      table: {
        type: { summary: 'IconProp' },
      },
    },
    iconClassName: {
      control: 'text',
    },
    iconPosition: {
      control: { type: 'radio' },
      options: ['left', 'right'],
      table: { defaultValue: { summary: 'left' } },
    },
    rounded: {
      control: { type: 'radio' },
      options: ['none', 'sm', 'md', 'lg', 'full'],
      table: { defaultValue: { summary: 'lg' } },
    },
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg', 'xl'],
      table: { defaultValue: { summary: 'lg' } },
    },
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary', 'ghost'],
      table: { defaultValue: { summary: 'primary' } },
    },
  },
} satisfies Meta<ButtonProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
};

export const Variants: Story = {
  render: ({ ...args }) => (
    <div className="flex flex-col gap-4">
      <Button {...args} variant="primary">
        Primary (default)
      </Button>
      <Button {...args} variant="secondary">
        Secondary
      </Button>
      <Button {...args} variant="ghost">
        Ghost
      </Button>
      <Button {...args} variant="red">
        Red
      </Button>
    </div>
  ),
  args: {
    children: 'Button',
  },
};

export const Sizes: Story = {
  args: {
    variant: 'primary',
  },
  render: ({ ...args }) => (
    <div className="flex flex-col gap-4">
      <Button {...args} size="sm">
        Button Small
      </Button>
      <Button {...args} size="md">
        Button Medium
      </Button>
      <Button {...args} size="lg">
        Button Large
      </Button>
      <Button {...args} size="xl">
        Button XLarge
      </Button>
    </div>
  ),
};

export const Radiuses: Story = {
  render: ({ ...args }) => (
    <div className="flex flex-col gap-4">
      <Button {...args} rounded="none">
        None
      </Button>
      <Button {...args} rounded="sm">
        Small
      </Button>
      <Button {...args} rounded="md">
        Medium
      </Button>
      <Button {...args} rounded="lg">
        Large
      </Button>
      <Button {...args} rounded="full">
        Full
      </Button>
    </div>
  ),
  args: {
    variant: 'primary',
    children: 'Button',
  },
};

export const WithIcon: Story = {
  args: {
    children: 'With Icon',
    icon: faGlobe,
    iconPosition: 'left',
    variant: 'primary',
  },
};

export const States: Story = {
  render: ({ ...args }) => (
    <div className="flex flex-col gap-4">
      <Button {...args} loading>
        Loading...
      </Button>
      <Button {...args} disabled>
        Disabled
      </Button>
      <Button {...args} fullWidth>
        Full Width
      </Button>
    </div>
  ),
  args: {
    children: 'Button',
    variant: 'primary',
  },
};

export const GhostVariants: Story = {
  render: ({ ...args }) => (
    <div className="flex flex-col gap-4">
      <Button {...args} variant="ghost">
        Ghost Default
      </Button>

      <Button {...args} variant="ghost" ghostColor="red">
        Ghost Red
      </Button>
    </div>
  ),
  args: {
    children: 'Button',
  },
};
