import type { HTMLAttributes } from 'react';
import { cn } from '@/common/utils';

interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {}

export function Spinner({ className, ...props }: SpinnerProps) {
  return (
    <div
      className={cn(
        'animate-spin rounded-full border-4 border-t-4 border-gray-200 border-t-primary h-8 w-8',
        className,
      )}
      {...props}
    />
  );
}
