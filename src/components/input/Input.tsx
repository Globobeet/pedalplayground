import { cva, type VariantProps } from 'class-variance-authority';
import React, { forwardRef } from 'react';

import { cx } from '@/utils';

const inputVariants = cva(
  [
    'bg-transparent border border-gray-700 rounded-lg px-4 py-2 w-full outline-none',
    'text-gray-50 placeholder-gray-500 transition-colors',
    'shadow-[inset_0_1px_1px_rgba(0,0,0,0.075)]',
    'hover:border-gray-600 focus:ring-0',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ].join(' '),
  {
    variants: {
      state: {
        default: [
          'focus:border-[#66afe9]',
          'focus:shadow-[inset_0_1px_1px_rgba(0,0,0,0.075),0_0_8px_rgba(102,175,233,0.6)]',
        ].join(' '),
        error: [
          'border-red-600 focus:border-red-600 hover:border-red-500',
          'focus:shadow-[inset_0_1px_1px_rgba(0,0,0,0.075),0_0_8px_rgba(220,38,38,0.6)]',
        ].join(' '),
      },
    },
    defaultVariants: {
      state: 'default',
    },
  },
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, state, disabled, type = 'text', ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      disabled={disabled}
      className={cx(inputVariants({ state }), className)}
      {...props}
    />
  ),
);

Input.displayName = 'Input';
