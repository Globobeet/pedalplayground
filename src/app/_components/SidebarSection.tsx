'use client';

import type { PropsWithChildren } from 'react';

import { Button, type ButtonProps } from '@/components/button';
import { Combobox, type ComboboxProps } from '@/components/combobox';
import { cx } from '@/utils';

function SidebarSection({ children, className }: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={cx('border-border flex flex-col gap-3 border-t p-5', className)}>
      {children}
    </div>
  );
}

function Title({ children, className }: PropsWithChildren<{ className?: string }>) {
  return <h3 className={cx('text-secondary text-sm font-bold', className)}>{children}</h3>;
}

function SidebarCombobox<V = string>(props: ComboboxProps<V>) {
  return <Combobox {...props} />;
}

function ActionButton({ children, className, ...props }: ButtonProps) {
  return (
    <Button variant="primary" size="sm" rounded="sm" fullWidth className={cx(className)} {...props}>
      {children}
    </Button>
  );
}

SidebarSection.Title = Title;
SidebarSection.Combobox = SidebarCombobox;
SidebarSection.Button = ActionButton;

export default SidebarSection;
