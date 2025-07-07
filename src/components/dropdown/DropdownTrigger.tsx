import type { PropsWithChildren } from 'react';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import { useDropdownContext } from './DropdownContext';

export function Trigger({ children }: PropsWithChildren) {
  useDropdownContext();
  return <DropdownMenu.Trigger asChild>{children}</DropdownMenu.Trigger>;
}
