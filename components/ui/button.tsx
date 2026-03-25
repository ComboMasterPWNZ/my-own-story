'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[2rem] font-bold transition-all duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 shadow-button active:shadow-none active:translate-y-[2px]",
  {
    variants: {
      variant: {
        primary: "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-light)] hover:shadow-lg",
        secondary: "border-2 border-[var(--color-primary)] text-[var(--color-primary)] bg-transparent shadow-none active:translate-y-0 hover:bg-[var(--color-primary)]/5",
        ghost: "bg-transparent text-[var(--color-text)] shadow-none active:translate-y-0 hover:bg-[var(--color-text)]/5",
        outline: "border-4 border-[var(--color-primary)] text-[var(--color-primary)] bg-transparent shadow-none active:translate-y-0 active:scale-95",
      },
      size: {
        sm: "h-auto px-4 py-2 text-sm",
        md: "h-auto px-6 py-3 text-base",
        lg: "h-auto px-8 py-4 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  theme?: any;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, children, ...props }, ref) => {
    console.log(`Button rendered. variant: ${variant}, size: ${size}, loading: ${loading}, disabled: ${loading || props.disabled}`);
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="opacity-0">{children}</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
