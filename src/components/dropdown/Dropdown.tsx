'use client';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as React from 'react';

import { Context, ContextType } from './DropdownContext';
import { Menu } from './DropdownMenu';
import { MenuItem } from './DropdownMenuItem';
import { Separator } from './DropdownSeparator';
import { Trigger } from './DropdownTrigger';

export type DropdownProps = {
  align?: ContextType['align'];
} & React.ComponentProps<typeof DropdownMenu.Root>;

function Dropdown({
  align = 'center',
  defaultOpen,
  open,
  onOpenChange,
  children,
  ...props
}: DropdownProps) {
  return (
    <Context.Provider value={{ align }}>
      <DropdownMenu.Root
        modal={true}
        defaultOpen={defaultOpen}
        open={open}
        onOpenChange={onOpenChange}
        {...props}
      >
        {children}
      </DropdownMenu.Root>
    </Context.Provider>
  );
}

Dropdown.Trigger = Trigger;
Dropdown.Menu = Menu;
Dropdown.MenuItem = MenuItem;
Dropdown.Separator = Separator;

export default Dropdown;
