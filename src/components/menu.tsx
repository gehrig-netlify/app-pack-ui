"use client";

import * as React from "react";
import { DropdownMenu as MenuPrimitive } from "radix-ui";
import { Check, ChevronRight, Circle } from "lucide-react";

import { cn } from "../lib/cn";

/* -------------------------------------------------------------------------------------------------
 * Menu
 *
 * A generic dropdown/menu component built on Radix `DropdownMenu`. Not tied to any specific
 * toolbar or trigger shape - use it for a "File / Edit / View" style menu bar, a context menu
 * triggered from a button, an actions kebab, etc. Mirrors `DataTableToolbar`'s internal use of
 * `DropdownMenu` (see `src/components/data-table/toolbar.tsx`) but exposes the full primitive set
 * as the public API instead of a single baked-in toolbar.
 * ---------------------------------------------------------------------------------------------- */

export const Menu = MenuPrimitive.Root;
export type MenuProps = React.ComponentPropsWithoutRef<typeof MenuPrimitive.Root>;

export const MenuTrigger = MenuPrimitive.Trigger;
export const MenuGroup = MenuPrimitive.Group;
export const MenuPortal = MenuPrimitive.Portal;
export const MenuSub = MenuPrimitive.Sub;
export const MenuRadioGroup = MenuPrimitive.RadioGroup;

export interface MenuContentProps extends React.ComponentPropsWithoutRef<typeof MenuPrimitive.Content> {}

export const MenuContent = React.forwardRef<
  React.ElementRef<typeof MenuPrimitive.Content>,
  MenuContentProps
>(({ className, sideOffset = 4, ...props }, ref) => (
  <MenuPrimitive.Portal>
    <MenuPrimitive.Content
      ref={ref}
      data-slot="menu-content"
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-40 overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md",
        className,
      )}
      {...props}
    />
  </MenuPrimitive.Portal>
));
MenuContent.displayName = "MenuContent";

export interface MenuItemProps extends React.ComponentPropsWithoutRef<typeof MenuPrimitive.Item> {
  inset?: boolean;
  variant?: "default" | "destructive";
}

export const MenuItem = React.forwardRef<React.ElementRef<typeof MenuPrimitive.Item>, MenuItemProps>(
  ({ className, inset, variant = "default", ...props }, ref) => (
    <MenuPrimitive.Item
      ref={ref}
      data-slot="menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors",
        "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        "data-[inset=true]:pl-8",
        "data-[variant=destructive]:text-destructive data-[variant=destructive]:hover:bg-destructive/10 data-[variant=destructive]:focus:bg-destructive/10",
        className,
      )}
      {...props}
    />
  ),
);
MenuItem.displayName = "MenuItem";

export interface MenuCheckboxItemProps
  extends React.ComponentPropsWithoutRef<typeof MenuPrimitive.CheckboxItem> {}

export const MenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof MenuPrimitive.CheckboxItem>,
  MenuCheckboxItemProps
>(({ className, children, checked, ...props }, ref) => (
  <MenuPrimitive.CheckboxItem
    ref={ref}
    data-slot="menu-checkbox-item"
    checked={checked}
    className={cn(
      "relative flex cursor-pointer select-none items-center gap-2 rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors",
      "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex size-3.5 items-center justify-center">
      <MenuPrimitive.ItemIndicator>
        <Check className="size-4" />
      </MenuPrimitive.ItemIndicator>
    </span>
    {children}
  </MenuPrimitive.CheckboxItem>
));
MenuCheckboxItem.displayName = "MenuCheckboxItem";

export interface MenuRadioItemProps
  extends React.ComponentPropsWithoutRef<typeof MenuPrimitive.RadioItem> {}

export const MenuRadioItem = React.forwardRef<
  React.ElementRef<typeof MenuPrimitive.RadioItem>,
  MenuRadioItemProps
>(({ className, children, ...props }, ref) => (
  <MenuPrimitive.RadioItem
    ref={ref}
    data-slot="menu-radio-item"
    className={cn(
      "relative flex cursor-pointer select-none items-center gap-2 rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors",
      "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex size-3.5 items-center justify-center">
      <MenuPrimitive.ItemIndicator>
        <Circle className="size-2 fill-current" />
      </MenuPrimitive.ItemIndicator>
    </span>
    {children}
  </MenuPrimitive.RadioItem>
));
MenuRadioItem.displayName = "MenuRadioItem";

export interface MenuLabelProps extends React.ComponentPropsWithoutRef<typeof MenuPrimitive.Label> {
  inset?: boolean;
}

export const MenuLabel = React.forwardRef<React.ElementRef<typeof MenuPrimitive.Label>, MenuLabelProps>(
  ({ className, inset, ...props }, ref) => (
    <MenuPrimitive.Label
      ref={ref}
      data-slot="menu-label"
      data-inset={inset}
      className={cn(
        "px-2 py-1.5 text-xs font-medium text-muted-foreground data-[inset=true]:pl-8",
        className,
      )}
      {...props}
    />
  ),
);
MenuLabel.displayName = "MenuLabel";

export interface MenuSeparatorProps
  extends React.ComponentPropsWithoutRef<typeof MenuPrimitive.Separator> {}

export const MenuSeparator = React.forwardRef<
  React.ElementRef<typeof MenuPrimitive.Separator>,
  MenuSeparatorProps
>(({ className, ...props }, ref) => (
  <MenuPrimitive.Separator
    ref={ref}
    data-slot="menu-separator"
    className={cn("-mx-1 my-1 h-px bg-border", className)}
    {...props}
  />
));
MenuSeparator.displayName = "MenuSeparator";

export function MenuShortcut({ className, ...props }: React.ComponentPropsWithoutRef<"span">) {
  return (
    <span
      data-slot="menu-shortcut"
      className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)}
      {...props}
    />
  );
}

export interface MenuSubTriggerProps
  extends React.ComponentPropsWithoutRef<typeof MenuPrimitive.SubTrigger> {
  inset?: boolean;
}

export const MenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof MenuPrimitive.SubTrigger>,
  MenuSubTriggerProps
>(({ className, inset, children, ...props }, ref) => (
  <MenuPrimitive.SubTrigger
    ref={ref}
    data-slot="menu-sub-trigger"
    data-inset={inset}
    className={cn(
      "flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none",
      "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
      "data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      "data-[inset=true]:pl-8",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto size-4" />
  </MenuPrimitive.SubTrigger>
));
MenuSubTrigger.displayName = "MenuSubTrigger";

export interface MenuSubContentProps
  extends React.ComponentPropsWithoutRef<typeof MenuPrimitive.SubContent> {}

export const MenuSubContent = React.forwardRef<
  React.ElementRef<typeof MenuPrimitive.SubContent>,
  MenuSubContentProps
>(({ className, ...props }, ref) => (
  <MenuPrimitive.SubContent
    ref={ref}
    data-slot="menu-sub-content"
    className={cn(
      "z-50 min-w-32 overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-lg",
      className,
    )}
    {...props}
  />
));
MenuSubContent.displayName = "MenuSubContent";
