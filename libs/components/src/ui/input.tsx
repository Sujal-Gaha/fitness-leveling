import * as React from 'react';

import { cn } from '../lib/utils';

interface InputProps extends React.ComponentProps<'input'> {
  helperText?: React.ReactNode;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, helperText, startContent, endContent, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <div className="relative">
          {startContent ? (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{startContent}</div>
          ) : null}
          <input
            type={type}
            className={cn(
              'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
              startContent && 'pl-10',
              endContent && 'pr-10',
              helperText && 'border-destructive focus-visible:ring-destructive',
              className
            )}
            ref={ref}
            {...props}
          />
          {endContent ? (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">{endContent}</div>
          ) : null}
        </div>
        {helperText ? <p className="mt-1.5 text-sm text-destructive">{helperText}</p> : null}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
