import { faCheck, faMinus } from '@fa/classic/solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';

import { cx } from '@/utils';

const checkboxVariants = cva(
  'inline-flex items-center justify-center border-2 transition-colors disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none',
  {
    variants: {
      variant: {
        primary:
          'border-primary hover:border-primary-hover ' +
          'data-[state=checked]:bg-primary ' +
          'data-[state=checked]:border-primary ' +
          'data-[state=checked]:hover:bg-primary-hover',
      },
      size: {
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6',
      },
      rounded: {
        none: 'rounded-none',
        sm: 'rounded',
        md: 'rounded-md',
        lg: 'rounded-lg',
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      rounded: 'md',
    },
  },
);

type CheckboxVariants = VariantProps<typeof checkboxVariants>;

export interface CheckboxProps
  extends Omit<CheckboxPrimitive.CheckboxProps, 'size'>,
    CheckboxVariants {
  className?: string;
}

export const Checkbox = forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  ({ variant, size, rounded, className, ...props }, ref) => (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cx(checkboxVariants({ variant, size, rounded }), className)}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center">
        {props.checked === 'indeterminate' ? (
          <FontAwesomeIcon fixedWidth icon={faMinus} size="sm" />
        ) : (
          <FontAwesomeIcon fixedWidth icon={faCheck} size="sm" />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  ),
);

Checkbox.displayName = 'Checkbox';
