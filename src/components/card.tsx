import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

/* -------------------------------------------------------------------------------------------------
 * Card
 * ---------------------------------------------------------------------------------------------- */

export interface CardProps extends React.ComponentProps<"div"> {}

/** Generic container - a plain `<div>`, no Radix primitive needed. Compose with the sub-parts below. */
export function Card({ className, ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      className={cn(
        "flex flex-col gap-6 rounded-xl border border-border bg-card text-card-foreground",
        className,
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------------------------------
 * CardHeader / CardTitle / CardDescription
 * ---------------------------------------------------------------------------------------------- */

export interface CardHeaderProps extends React.ComponentProps<"div"> {}

export function CardHeader({ className, ...props }: CardHeaderProps) {
  return (
    <div data-slot="card-header" className={cn("flex flex-col gap-1.5 px-6 pt-6", className)} {...props} />
  );
}

export interface CardTitleProps extends React.ComponentProps<"div"> {}

export function CardTitle({ className, ...props }: CardTitleProps) {
  return (
    <div
      data-slot="card-title"
      className={cn("text-base font-medium leading-none text-foreground", className)}
      {...props}
    />
  );
}

export interface CardDescriptionProps extends React.ComponentProps<"p"> {}

export function CardDescription({ className, ...props }: CardDescriptionProps) {
  return (
    <p data-slot="card-description" className={cn("text-sm text-muted-foreground", className)} {...props} />
  );
}

/* -------------------------------------------------------------------------------------------------
 * CardContent / CardFooter
 * ---------------------------------------------------------------------------------------------- */

export interface CardContentProps extends React.ComponentProps<"div"> {}

export function CardContent({ className, ...props }: CardContentProps) {
  return <div data-slot="card-content" className={cn("flex flex-col gap-6 px-6", className)} {...props} />;
}

const cardFooterVariants = cva("flex gap-4", {
  variants: {
    variant: {
      /** Flush with the card body - the original, general-purpose footer. */
      default: "items-center px-6 pb-6",
      /**
       * A visually distinct action band: full-width stacked buttons on a
       * muted, bordered-off surface. Matches the Figma reference for
       * larger composite cards (e.g. a login/signup form's footer).
       */
      muted: "flex-col items-stretch gap-3 rounded-b-xl border-t border-border bg-muted/40 px-6 py-6",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface CardFooterProps extends React.ComponentProps<"div">, VariantProps<typeof cardFooterVariants> {}

export function CardFooter({ className, variant, ...props }: CardFooterProps) {
  return <div data-slot="card-footer" className={cn(cardFooterVariants({ variant }), className)} {...props} />;
}
