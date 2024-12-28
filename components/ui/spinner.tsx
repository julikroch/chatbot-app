import type { HTMLAttributes } from 'react';
import { cn } from '@/common/utils';

interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
};

export function Spinner({ className, size, ...props }: SpinnerProps) {
  return (
    <div
      className={cn(
        'animate-spin rounded-full border-4 border-t-4 border-gray-200 border-t-primary',
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  );
}
