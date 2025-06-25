import type { IconProp, SizeProp } from '@fortawesome/fontawesome-svg-core';
import type { ButtonHTMLAttributes, ForwardedRef } from 'react';

import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';

import { cx } from '@/utils';

const buttonVariants = cva(
  'transition-all w-fit inline-flex items-center justify-center h-fit font-bold duration-150 disabled:pointer-events-none disabled:opacity-50 text-base active:scale-95',
  {
    variants: {
      fullWidth: {
        true: 'w-full',
      },
      iconPosition: {
        left: 'flex-row',
        right: 'flex-row-reverse',
      },
      rounded: {
        none: 'rounded-none',
        sm: 'rounded',
        md: 'rounded-md',
        lg: 'rounded-lg',
        full: 'rounded-full',
      },
      size: {
        lg: 'h-12 gap-2 px-5', // desk/mob 48
        md: 'h-10 gap-2 px-4', // desk/mob 40
        sm: 'h-9 gap-1.5 px-4 text-sm', // desk /mob 36
        xl: 'h-[3.25rem] gap-3 px-16', // desk 56, mob 52
      },
      ghostColor: {
        default: 'text-white hover:bg-gray-50 hover:text-gray-300',
        red: 'text-red-400 hover:bg-red-50 hover:text-red-400',
      },
      variant: {
        primary: 'bg-[#5c62fc] hover:bg-[#2a32fb] text-white',
        secondary: 'bg-white hover:bg-gray-200 text-gray-700',
        ghost: 'bg-transparent',
        red: 'bg-[#bc0913] hover:bg-red-800 text-white',
      },
    },
    defaultVariants: {
      rounded: 'lg',
      size: 'lg',
      variant: 'primary',
      ghostColor: 'default',
    },
    compoundVariants: [
      {
        variant: 'ghost',
        ghostColor: 'red',
        class: 'text-red-400 hover:bg-red-500/50',
      },
    ],
  },
);

type ButtonVariants = VariantProps<typeof buttonVariants>;
type GhostColors = 'red';

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size'>,
    ButtonVariants {
  loading?: boolean;
  icon?: IconProp;
  iconClassName?: string;
  ghostColor?: GhostColors;
}

const ICON_SIZES: Record<NonNullable<ButtonVariants['size']>, SizeProp> = {
  sm: 'sm',
  md: '1x',
  lg: 'lg',
  xl: 'xl',
};

export const Button = forwardRef(
  (
    {
      children,
      className,
      loading = false,
      icon,
      iconClassName,
      fullWidth,
      iconPosition,
      rounded,
      size,
      variant,
      disabled,
      ghostColor,
      ...rest
    }: ButtonProps,
    ref: ForwardedRef<HTMLButtonElement>,
  ) => {
    const isDisabled = disabled || loading;
    const iconToShow = loading ? faCircleNotch : icon;
    const actualSize = size ?? 'lg';

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cx(
          buttonVariants({
            fullWidth,
            iconPosition,
            rounded,
            size,
            variant,
            ghostColor,
          }),
          className,
        )}
        {...rest}
      >
        {iconToShow && (
          <FontAwesomeIcon
            className={cx('h-4 w-4 shrink-0', iconClassName)}
            fixedWidth
            icon={iconToShow}
            size={ICON_SIZES[actualSize]}
            spin={loading}
          />
        )}
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
