import type { SizeProp } from '@fortawesome/fontawesome-svg-core';
import type { ForwardedRef, ForwardRefRenderFunction } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { forwardRef } from 'react';

import { cx } from '@/utils';

import { Button, ButtonProps } from '../button';

type ButtonSize = NonNullable<ButtonProps['size']>;

const ICON_SIZES: Record<ButtonSize, SizeProp> = {
  sm: 'lg',
  md: 'lg',
  lg: 'xl',
  xl: 'xl',
};

export type ButtonIconProps = Omit<ButtonProps, 'iconPosition'> & {
  iconClassName?: string;
  iconSize?: SizeProp;
  size?: ButtonSize;
};

const ButtonIconRender: ForwardRefRenderFunction<HTMLButtonElement, ButtonIconProps> = (
  {
    icon,
    iconClassName,
    iconSize,
    size = 'lg',
    variant = 'ghost',
    ghostColor,
    rounded,
    disabled,
    loading,
    fullWidth,
    className,
    children,
    ...rest
  },
  ref: ForwardedRef<HTMLButtonElement>,
) => {
  return (
    <Button
      ref={ref}
      size={size}
      variant={variant}
      ghostColor={ghostColor}
      rounded={rounded}
      disabled={disabled}
      loading={loading}
      fullWidth={fullWidth}
      className={cx(
        'px-0',
        {
          'w-9': size === 'sm',
          'w-10': size === 'md',
          'w-12': size === 'lg',
          'w-[3.25rem]': size === 'xl',
        },
        className,
      )}
      {...rest}
    >
      {!loading &&
        (icon ? (
          <FontAwesomeIcon
            icon={icon}
            fixedWidth
            size={iconSize ?? ICON_SIZES[size]}
            className={iconClassName}
          />
        ) : (
          children
        ))}
    </Button>
  );
};

export const ButtonIcon = forwardRef<HTMLButtonElement, ButtonIconProps>(ButtonIconRender);
ButtonIcon.displayName = 'ButtonIcon';
