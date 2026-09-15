"use client";

import * as React from "react";
import { NavigationMenu as NavigationMenuPrimitive } from "radix-ui";
import { ChevronDown } from "lucide-react";

import { cn } from "../lib/cn";

/* -------------------------------------------------------------------------------------------------
 * Navigation
 *
 * A styled wrapper around Radix `NavigationMenu`, for a top-level "File / Edit / View / History"
 * style navigation bar whose items can either link directly (`NavigationMenuLink`) or open a
 * dropdown panel (`NavigationMenuTrigger` + `NavigationMenuContent`), per the Figma reference.
 * ---------------------------------------------------------------------------------------------- */

export interface NavigationProps
  extends React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root> {}

export const Navigation = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  NavigationProps
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    data-slot="navigation"
    className={cn("relative z-10 flex max-w-max flex-1 items-center justify-center", className)}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
));
Navigation.displayName = "Navigation";

export const NavigationList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    data-slot="navigation-list"
    className={cn(
      "group flex flex-1 list-none items-center justify-center gap-1 rounded-md border border-border bg-background p-1",
      className,
    )}
    {...props}
  />
));
NavigationList.displayName = "NavigationList";

export const NavigationItem = NavigationMenuPrimitive.Item;

const triggerStyles =
  "group inline-flex h-9 w-max items-center justify-center gap-1.5 rounded-md bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted focus:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-muted";

export const NavigationTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    data-slot="navigation-trigger"
    className={cn(triggerStyles, className)}
    {...props}
  >
    {children}
    <ChevronDown
      className="relative top-px size-3 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180"
      aria-hidden="true"
    />
  </NavigationMenuPrimitive.Trigger>
));
NavigationTrigger.displayName = "NavigationTrigger";

export const NavigationContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    data-slot="navigation-content"
    className={cn(
      "left-0 top-0 w-full rounded-md border border-border bg-popover p-2 text-popover-foreground shadow-md md:absolute md:w-max",
      className,
    )}
    {...props}
  />
));
NavigationContent.displayName = "NavigationContent";

export const NavigationLink = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Link>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Link>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Link
    ref={ref}
    data-slot="navigation-link"
    className={cn(
      "flex select-none flex-col gap-1 rounded-sm p-2 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[active=true]:bg-accent/50",
      className,
    )}
    {...props}
  />
));
NavigationLink.displayName = "NavigationLink";

export const NavigationIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    data-slot="navigation-indicator"
    className={cn(
      "top-full z-10 flex h-1.5 items-end justify-center overflow-hidden",
      className,
    )}
    {...props}
  >
    <div className="relative top-[60%] size-2 rotate-45 rounded-tl-sm bg-border" />
  </NavigationMenuPrimitive.Indicator>
));
NavigationIndicator.displayName = "NavigationIndicator";

export const NavigationViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className="absolute left-0 top-full flex justify-center">
    <NavigationMenuPrimitive.Viewport
      ref={ref}
      data-slot="navigation-viewport"
      className={cn(
        "relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-md md:w-[var(--radix-navigation-menu-viewport-width)]",
        className,
      )}
      {...props}
    />
  </div>
));
NavigationViewport.displayName = "NavigationViewport";

// Internal alias used by `Navigation` so consumers don't have to remember to render the viewport
// themselves - it's still exported (as `NavigationViewport`) for anyone who wants to place it
// manually instead.
function NavigationMenuViewport(props: React.ComponentPropsWithoutRef<typeof NavigationViewport>) {
  return <NavigationViewport {...props} />;
}
