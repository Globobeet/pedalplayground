import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cva, type VariantProps } from 'class-variance-authority';
import { ComponentRef, forwardRef } from 'react';

import { cx } from '@/utils';

const tabsTriggerStyles = cva(
  'flex-1 text-center px-3 py-1 text-sm font-medium text-white transition-colors focus:outline-none ' +
    'border border-transparent rounded-sm bg-transparent hover:bg-gray-50/10',
  {
    variants: {
      variant: {
        default:
          'data-[state=active]:bg-[#27262a] ' +
          'data-[state=active]:border-white/0 ' +
          'data-[state=active]:shadow-sm',
      },
    },
    defaultVariants: { variant: 'default' },
  },
);

export const Tabs = TabsPrimitive.Root;

export const TabsList = forwardRef<
  ComponentRef<typeof TabsPrimitive.List>,
  TabsPrimitive.TabsListProps
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cx(
      'flex rounded-sm bg-black/20 p-0.5 shadow-[0_1px_0_rgba(255,255,255,0.04)]',
      className,
    )}
    {...props}
  />
));
TabsList.displayName = 'TabsList';

export interface TabsTriggerProps
  extends TabsPrimitive.TabsTriggerProps,
    VariantProps<typeof tabsTriggerStyles> {
  className?: string;
}
export const TabsTrigger = forwardRef<ComponentRef<typeof TabsPrimitive.Trigger>, TabsTriggerProps>(
  ({ variant, className, ...props }, ref) => (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cx(tabsTriggerStyles({ variant }), className)}
      {...props}
    />
  ),
);
TabsTrigger.displayName = 'TabsTrigger';

export const TabsContent = forwardRef<
  ComponentRef<typeof TabsPrimitive.Content>,
  TabsPrimitive.TabsContentProps
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content ref={ref} className={cx('mt-4', className)} {...props} />
));
TabsContent.displayName = 'TabsContent';
