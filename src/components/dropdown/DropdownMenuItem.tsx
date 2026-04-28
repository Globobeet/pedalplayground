import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import type { PropsWithChildren } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import React from 'react';

import { cx } from '@/utils';

export type MenuItemProps<E extends React.ElementType = 'div'> = PropsWithChildren<{
  as?: E;
  closeOnSelect?: boolean;
  icon?: IconProp;
  iconClassName?: string;
  iconPlacement?: 'left' | 'right';
}> &
  React.ComponentProps<E>;

export function MenuItem<E extends React.ElementType = 'div'>({
  as,
  children,
  closeOnSelect = true,
  icon,
  iconClassName,
  iconPlacement = 'left',
  className,
  ...props
}: MenuItemProps<E>) {
  const Component = as ?? 'div';

  const handleSelect = React.useCallback<
    NonNullable<React.ComponentProps<typeof DropdownMenu.Item>['onSelect']>
  >(
    (e) => {
      if (!closeOnSelect) e.preventDefault();
    },
    [closeOnSelect],
  );

  return (
    <DropdownMenu.Item asChild onSelect={handleSelect}>
      <Component
        className={cx(
          'w-full cursor-pointer px-4 py-1.5 text-sm leading-none font-medium transition-colors',
          'hover:bg-foreground focus:bg-foreground flex items-center gap-3',
          { 'flex-row-reverse': iconPlacement === 'right' },
          className,
        )}
        {...props}
      >
        {icon && (
          <FontAwesomeIcon icon={icon} fixedWidth className={cx('shrink-0', iconClassName)} />
        )}
        <span className="flex-1">{children}</span>
      </Component>
    </DropdownMenu.Item>
  );
}
