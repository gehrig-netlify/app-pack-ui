import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

const inputVariants = cva(
  "flex w-full items-center gap-2 rounded-lg border border-input bg-background px-3 text-foreground transition-colors focus-within:ring-1 focus-within:ring-ring has-[input:disabled]:cursor-not-allowed has-[input:disabled]:opacity-50",
  {
    variants: {
      size: {
        sm: "h-9 text-sm",
        md: "h-11 text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export interface InputProps
  extends Omit<React.ComponentProps<"input">, "size">,
    VariantProps<typeof inputVariants> {
  /** Icon (or other node) rendered before the text, e.g. a `lucide-react` search icon. */
  startIcon?: React.ReactNode;
  /** Icon (or other node) rendered after the text. */
  endIcon?: React.ReactNode;
  /** className applied to the outer bordered wrapper instead of the `<input>` itself. */
  wrapperClassName?: string;
}

/**
 * Plain `<input>` (wrapped in a `<div>` so icon slots can sit inside the same bordered field) -
 * no Radix primitive needed, per the reasoning in `data-table/pagination.tsx`. `ref` forwards to
 * the underlying `<input>` element so consumers can focus it directly.
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, wrapperClassName, size, startIcon, endIcon, ...props }, ref) => {
    return (
      <div className={cn(inputVariants({ size }), wrapperClassName)}>
        {startIcon ? (
          <span className="flex shrink-0 items-center text-muted-foreground [&_svg]:size-5">
            {startIcon}
          </span>
        ) : null}
        <input
          ref={ref}
          className={cn(
            "w-full flex-1 bg-transparent text-foreground outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed",
            className,
          )}
          {...props}
        />
        {endIcon ? (
          <span className="flex shrink-0 items-center text-muted-foreground [&_svg]:size-5">
            {endIcon}
          </span>
        ) : null}
      </div>
    );
  },
);
Input.displayName = "Input";
