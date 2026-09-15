import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

/* -------------------------------------------------------------------------------------------------
 * Item
 * ---------------------------------------------------------------------------------------------- */

const itemVariants = cva(
  "group/item flex w-full items-center rounded-lg border text-sm transition-colors",
  {
    variants: {
      variant: {
        default: "border-border",
        muted: "border-transparent bg-muted",
        ghost: "border-transparent",
      },
      size: {
        default: "gap-4 p-4",
        sm: "gap-3 p-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ItemProps extends React.ComponentProps<"div">, VariantProps<typeof itemVariants> {}

/** Plain `<div>` styled with `cva` - no Radix primitive needed. Compose with the sub-parts below. */
export function Item({ className, variant, size, ...props }: ItemProps) {
  return <div data-slot="item" className={cn(itemVariants({ variant, size }), className)} {...props} />;
}

/* -------------------------------------------------------------------------------------------------
 * ItemMedia / ItemContent
 * ---------------------------------------------------------------------------------------------- */

export interface ItemMediaProps extends React.ComponentProps<"div"> {}

/** Wraps a leading icon or avatar. Sizes any `lucide-react` icon passed as a child. */
export function ItemMedia({ className, ...props }: ItemMediaProps) {
  return (
    <div
      data-slot="item-media"
      className={cn("flex shrink-0 items-center justify-center text-foreground [&_svg]:size-[26px]", className)}
      {...props}
    />
  );
}

export interface ItemContentProps extends React.ComponentProps<"div"> {}

export function ItemContent({ className, ...props }: ItemContentProps) {
  return <div data-slot="item-content" className={cn("flex flex-1 flex-col gap-1", className)} {...props} />;
}

/* -------------------------------------------------------------------------------------------------
 * ItemTitle / ItemDescription / ItemActions
 * ---------------------------------------------------------------------------------------------- */

export interface ItemTitleProps extends React.ComponentProps<"p"> {}

export function ItemTitle({ className, ...props }: ItemTitleProps) {
  return (
    <p data-slot="item-title" className={cn("text-sm font-medium leading-tight text-foreground", className)} {...props} />
  );
}

export interface ItemDescriptionProps extends React.ComponentProps<"p"> {}

export function ItemDescription({ className, ...props }: ItemDescriptionProps) {
  return <p data-slot="item-description" className={cn("text-sm text-muted-foreground", className)} {...props} />;
}

export interface ItemActionsProps extends React.ComponentProps<"div"> {}

export function ItemActions({ className, ...props }: ItemActionsProps) {
  return (
    <div data-slot="item-actions" className={cn("ml-auto flex shrink-0 items-center gap-2", className)} {...props} />
  );
}

export { itemVariants };
