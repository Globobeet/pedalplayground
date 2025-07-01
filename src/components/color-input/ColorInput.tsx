import { forwardRef } from 'react';

import { cx } from '@/utils';

import { Input, type InputProps } from '../input';

export interface ColorInputProps extends Omit<InputProps, 'type'> {}

export const ColorInput = forwardRef<HTMLInputElement, ColorInputProps>(
  ({ value, onChange, disabled, className, ...rest }, ref) => (
    <div className={cx('group relative', className)}>
      <div
        className={cx(
          'relative flex items-center rounded-lg border border-gray-700',
          'shadow-[inset_0_1px_1px_rgba(0,0,0,0.075)]',
          'focus-within:border-[#66afe9]',
          'focus-within:shadow-[inset_0_1px_1px_rgba(0,0,0,0.075),0_0_8px_rgba(102,175,233,0.6)]',
        )}
      >
        <Input
          {...rest}
          ref={ref}
          type="text"
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder="#rrggbb"
          className="pr-12"
        />

        <div
          className={cx(
            'absolute inset-y-0 right-0 flex items-center justify-center',
            'border-l border-gray-700 px-2',
            'group-focus-within:border-l-[#66afe9]',
            'group-focus-within:shadow-[inset_0_1px_1px_rgba(0,0,0,0.075),0_0_8px_rgba(102,175,233,0.6)]',
          )}
        >
          <input
            type="color"
            value={value as string}
            onChange={onChange}
            disabled={disabled}
            className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
          />
          <span
            style={{ backgroundColor: value as string }}
            className="pointer-events-none size-6 rounded-full border border-gray-600"
          />
        </div>
      </div>
    </div>
  ),
);
