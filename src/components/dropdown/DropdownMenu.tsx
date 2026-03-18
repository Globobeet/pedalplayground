import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import { cx } from '@/utils';

import { useDropdownContext } from './DropdownContext';

export function Menu({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenu.Content>) {
  const { align } = useDropdownContext();

  return (
    <DropdownMenu.Portal>
      <DropdownMenu.Content
        sideOffset={4}
        align={align}
        loop
        className={cx(
          'bg-background z-50 min-w-max rounded-lg py-3 shadow-lg',
          'data-[side=bottom]:animate-slide-up-fade data-[side=top]:animate-slide-down-fade',
          className,
        )}
        {...props}
      >
        {children}
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  );
}
