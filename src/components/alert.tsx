import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

/* -------------------------------------------------------------------------------------------------
 * Alert
 * ---------------------------------------------------------------------------------------------- */

const alertVariants = cva(
  "relative grid w-full grid-cols-[0_1fr] items-start gap-x-3 gap-y-1 rounded-lg border border-border px-4 py-3 text-sm has-[>svg]:grid-cols-[auto_1fr] [&>svg]:size-5 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive: "border-destructive/50 bg-card text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface AlertProps extends React.ComponentProps<"div">, VariantProps<typeof alertVariants> {}

/**
 * Plain `<div role="alert">` styled with `cva` - no Radix primitive needed. Pass any `lucide-react`
 * icon as the first child; the grid layout collapses to a single column when no icon is present.
 */
export function Alert({ className, variant, ...props }: AlertProps) {
  return <div role="alert" data-slot="alert" className={cn(alertVariants({ variant }), className)} {...props} />;
}

/* -------------------------------------------------------------------------------------------------
 * AlertTitle / AlertDescription
 * ---------------------------------------------------------------------------------------------- */

export interface AlertTitleProps extends React.ComponentProps<"div"> {}

export function AlertTitle({ className, ...props }: AlertTitleProps) {
  return (
    <div
      data-slot="alert-title"
      className={cn("col-start-2 font-medium leading-none tracking-tight", className)}
      {...props}
    />
  );
}

export interface AlertDescriptionProps extends React.ComponentProps<"div"> {}

export function AlertDescription({ className, ...props }: AlertDescriptionProps) {
  return (
    <div
      data-slot="alert-description"
      className={cn("col-start-2 text-sm text-muted-foreground [&_p]:leading-relaxed", className)}
      {...props}
    />
  );
}

export { alertVariants };
