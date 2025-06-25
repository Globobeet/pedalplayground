import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cx = (...inputs: any[]) => twMerge(clsx(...inputs));
