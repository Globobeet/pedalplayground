import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ComponentPropsWithoutRef } from 'react';

export function Separator(props: ComponentPropsWithoutRef<typeof DropdownMenu.Separator>) {
  return <DropdownMenu.Separator className="h-px bg-white/20" {...props} />;
}
