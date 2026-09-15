import * as React from "react";
import { Slot } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-primary bg-background text-foreground hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-11 px-4 text-base",
        icon: "size-9 p-0",
        "icon-sm": "size-7 rounded-md p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      // Matches the height/text-size a consumer gets when `size` is left unset - keep this the
      // most commonly-desired default, not necessarily the largest option (`md`).
      size: "sm",
    },
  },
);

export interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  /**
   * Render as the passed single child instead of a `<button>`, via Radix `Slot` - e.g. to wrap a
   * router `Link` or another Radix primitive's own trigger element while keeping Button's styling.
   */
  asChild?: boolean;
}

/**
 * Styled with `cva`; renders a plain `<button>` by default, or (with `asChild`) merges its props
 * and styling onto a single child element via Radix `Slot` instead of wrapping it. Supports a
 * square icon-only size (`size="icon"`, or `size="icon-sm"` for a more compact corner button, e.g.
 * a dialog close button); pass an `aria-label` when using either without visible text. Icons are
 * sized automatically via the `[&_svg]` selector - pass any `lucide-react` icon as a child.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, type = "button", ...props }, ref) => {
    const Comp = asChild ? Slot.Root : "button";
    return (
      <Comp
        ref={ref}
        {...(!asChild ? { type } : {})}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
