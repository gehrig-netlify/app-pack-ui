"use client";

import * as React from "react";
import { Dialog as DialogPrimitive, Slot } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";
import { PanelLeft } from "lucide-react";

import { cn } from "../../lib/cn";
import {
  SidebarContext,
  useIsMobile,
  useSidebar,
  type SidebarContextValue,
  type SidebarState,
} from "./sidebar-context";

/* -------------------------------------------------------------------------------------------------
 * Sidebar
 *
 * A shadcn/ui-shaped sidebar composition: `SidebarProvider` owns open/collapsed state (desktop)
 * and a separate open state for the mobile "sheet" variant (rendered via Radix `Dialog`, since a
 * mobile sidebar is functionally an overlay panel). `Sidebar` itself picks between a fixed desktop
 * layout (plain flex/absolute positioning - no Radix needed there, per the architecture note in
 * the batch brief) and the Radix `Dialog`-backed sheet based on `useIsMobile()`.
 *
 * `useSidebar` is re-exported here (its implementation lives in the internal `./sidebar-context`,
 * which is not itself exported from the package barrel) so consumers only ever import from
 * `"@netlify-labs/app-pack-ui"` for both the components and the hook.
 * ---------------------------------------------------------------------------------------------- */

export { useSidebar };
export type { SidebarContextValue, SidebarState };

const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";

/* -----------------------------------------------------------------------------------------------
 * SidebarProvider
 * -------------------------------------------------------------------------------------------- */

export interface SidebarProviderProps extends React.ComponentPropsWithoutRef<"div"> {
  /** Initial desktop open state when uncontrolled. Defaults to `true` (expanded). */
  defaultOpen?: boolean;
  /** Controlled desktop open state. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** When set, persists desktop open/collapsed state to `localStorage` under this key across reloads. */
  storageKey?: string;
}

/**
 * Provides sidebar state to `Sidebar` and every `Sidebar*` piece beneath it. Must wrap the whole
 * layout (sidebar + main content), since it renders the flex wrapper both sit inside.
 */
export const SidebarProvider = React.forwardRef<HTMLDivElement, SidebarProviderProps>(
  (
    {
      defaultOpen = true,
      open: openProp,
      onOpenChange: setOpenProp,
      storageKey,
      className,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const isMobile = useIsMobile();
    const [openMobile, setOpenMobile] = React.useState(false);

    const [internalOpen, setInternalOpen] = React.useState(() => {
      if (typeof window === "undefined" || !storageKey) return defaultOpen;
      const stored = window.localStorage.getItem(storageKey);
      return stored === null ? defaultOpen : stored === "true";
    });

    const open = openProp ?? internalOpen;

    const setOpen = React.useCallback(
      (value: boolean) => {
        if (setOpenProp) {
          setOpenProp(value);
        } else {
          setInternalOpen(value);
        }
        if (storageKey && typeof window !== "undefined") {
          window.localStorage.setItem(storageKey, String(value));
        }
      },
      [setOpenProp, storageKey],
    );

    const toggleSidebar = React.useCallback(() => {
      if (isMobile) {
        setOpenMobile((value) => !value);
      } else {
        setOpen(!open);
      }
    }, [isMobile, open, setOpen]);

    const state: SidebarState = open ? "expanded" : "collapsed";

    const contextValue = React.useMemo<SidebarContextValue>(
      () => ({ state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar }),
      [state, open, setOpen, isMobile, openMobile, toggleSidebar],
    );

    return (
      <SidebarContext.Provider value={contextValue}>
        <div
          ref={ref}
          data-slot="sidebar-wrapper"
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH,
              "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
              ...style,
            } as React.CSSProperties
          }
          className={cn("group/sidebar-wrapper flex min-h-svh w-full", className)}
          {...props}
        >
          {children}
        </div>
      </SidebarContext.Provider>
    );
  },
);
SidebarProvider.displayName = "SidebarProvider";

/* -----------------------------------------------------------------------------------------------
 * Sidebar
 * -------------------------------------------------------------------------------------------- */

export interface SidebarProps extends React.ComponentPropsWithoutRef<"div"> {
  side?: "left" | "right";
  variant?: "sidebar" | "floating" | "inset";
  /**
   * `"offcanvas"` slides fully off-screen when collapsed, `"icon"` collapses to an icon-only
   * rail, `"none"` disables collapsing entirely (always expanded, no mobile sheet).
   */
  collapsible?: "offcanvas" | "icon" | "none";
}

export const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  (
    { side = "left", variant = "sidebar", collapsible = "offcanvas", className, children, ...props },
    ref,
  ) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

    if (collapsible === "none") {
      return (
        <div
          ref={ref}
          data-slot="sidebar"
          className={cn(
            "flex h-full w-[var(--sidebar-width)] flex-col bg-sidebar text-sidebar-foreground",
            className,
          )}
          {...props}
        >
          {children}
        </div>
      );
    }

    if (isMobile) {
      return (
        <DialogPrimitive.Root open={openMobile} onOpenChange={setOpenMobile}>
          <DialogPrimitive.Portal>
            <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-foreground/20" />
            <DialogPrimitive.Content
              data-slot="sidebar"
              data-mobile="true"
              data-side={side}
              className={cn(
                "fixed inset-y-0 z-50 flex h-svh w-[var(--sidebar-width)] flex-col bg-sidebar p-0 text-sidebar-foreground outline-none",
                "[--sidebar-width:var(--sidebar-width-mobile,18rem)]",
                side === "left" ? "left-0" : "right-0",
                className,
              )}
              style={{ "--sidebar-width-mobile": SIDEBAR_WIDTH_MOBILE } as React.CSSProperties}
              onOpenAutoFocus={(event) => event.preventDefault()}
              {...props}
            >
              <DialogPrimitive.Title className="sr-only">Sidebar</DialogPrimitive.Title>
              <DialogPrimitive.Description className="sr-only">
                Site navigation
              </DialogPrimitive.Description>
              <div className="flex h-full w-full flex-col">{children}</div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
      );
    }

    return (
      <div
        data-slot="sidebar"
        data-state={state}
        data-collapsible={state === "collapsed" ? collapsible : ""}
        data-variant={variant}
        data-side={side}
        className="group peer hidden text-sidebar-foreground md:block"
      >
        {/* Layout spacer - reserves/animates the width the fixed panel below occupies. */}
        <div
          data-slot="sidebar-gap"
          className={cn(
            "relative w-[var(--sidebar-width)] bg-transparent transition-[width] duration-200 ease-linear",
            "group-data-[collapsible=offcanvas]:w-0",
            "group-data-[side=right]:rotate-180",
            variant === "floating" || variant === "inset"
              ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+1rem)]"
              : "group-data-[collapsible=icon]:w-[var(--sidebar-width-icon)]",
          )}
        />
        <div
          data-slot="sidebar-container"
          className={cn(
            "fixed inset-y-0 z-10 hidden h-svh w-[var(--sidebar-width)] transition-[left,right,width] duration-200 ease-linear md:flex",
            side === "left"
              ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
              : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
            variant === "floating" || variant === "inset"
              ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+1rem+2px)]"
              : "group-data-[collapsible=icon]:w-[var(--sidebar-width-icon)] group-data-[side=left]:border-r group-data-[side=right]:border-l border-sidebar-border",
            className,
          )}
          {...props}
        >
          <div
            data-slot="sidebar-inner"
            className={cn(
              "flex h-full w-full flex-col bg-sidebar",
              variant === "floating" && "rounded-lg border border-sidebar-border shadow-md",
            )}
          >
            {children}
          </div>
        </div>
      </div>
    );
  },
);
Sidebar.displayName = "Sidebar";

/* -----------------------------------------------------------------------------------------------
 * SidebarTrigger / SidebarRail / SidebarInset
 * -------------------------------------------------------------------------------------------- */

export const SidebarTrigger = React.forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<"button">>(
  ({ className, onClick, ...props }, ref) => {
    const { toggleSidebar } = useSidebar();
    return (
      <button
        ref={ref}
        type="button"
        data-slot="sidebar-trigger"
        aria-label="Toggle sidebar"
        className={cn(
          "inline-flex size-7 items-center justify-center rounded-md text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sidebar-ring",
          className,
        )}
        onClick={(event) => {
          onClick?.(event);
          toggleSidebar();
        }}
        {...props}
      >
        <PanelLeft className="size-4" />
        <span className="sr-only">Toggle Sidebar</span>
      </button>
    );
  },
);
SidebarTrigger.displayName = "SidebarTrigger";

/** A thin, click-to-toggle strip along the sidebar's edge - an alternative affordance to `SidebarTrigger`. */
export const SidebarRail = React.forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<"button">>(
  ({ className, ...props }, ref) => {
    const { toggleSidebar } = useSidebar();
    return (
      <button
        ref={ref}
        data-slot="sidebar-rail"
        type="button"
        aria-label="Toggle Sidebar"
        title="Toggle Sidebar"
        tabIndex={-1}
        onClick={toggleSidebar}
        className={cn(
          "absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 cursor-col-resize transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-px after:bg-transparent hover:after:bg-sidebar-border group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex",
          className,
        )}
        {...props}
      />
    );
  },
);
SidebarRail.displayName = "SidebarRail";

/** The main-content wrapper. Only needed alongside `variant="inset"` (adds the inset margin/rounding). */
export const SidebarInset = React.forwardRef<HTMLElement, React.ComponentPropsWithoutRef<"main">>(
  ({ className, ...props }, ref) => (
    <main
      ref={ref}
      data-slot="sidebar-inset"
      className={cn(
        "relative flex w-full flex-1 flex-col bg-background",
        "md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm",
        className,
      )}
      {...props}
    />
  ),
);
SidebarInset.displayName = "SidebarInset";

/* -----------------------------------------------------------------------------------------------
 * Structural sections: Header / Footer / Content / Separator / Group
 * -------------------------------------------------------------------------------------------- */

export const SidebarHeader = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div ref={ref} data-slot="sidebar-header" className={cn("flex flex-col gap-2 p-2", className)} {...props} />
  ),
);
SidebarHeader.displayName = "SidebarHeader";

export const SidebarFooter = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div ref={ref} data-slot="sidebar-footer" className={cn("flex flex-col gap-2 p-2", className)} {...props} />
  ),
);
SidebarFooter.displayName = "SidebarFooter";

export const SidebarContent = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="sidebar-content"
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className,
      )}
      {...props}
    />
  ),
);
SidebarContent.displayName = "SidebarContent";

export const SidebarSeparator = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="sidebar-separator"
      className={cn("mx-2 h-px bg-sidebar-border", className)}
      {...props}
    />
  ),
);
SidebarSeparator.displayName = "SidebarSeparator";

export const SidebarGroup = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="sidebar-group"
      className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
      {...props}
    />
  ),
);
SidebarGroup.displayName = "SidebarGroup";

export const SidebarGroupLabel = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="sidebar-group-label"
      className={cn(
        "flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none transition-[margin,opacity] duration-200 ease-linear",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        className,
      )}
      {...props}
    />
  ),
);
SidebarGroupLabel.displayName = "SidebarGroupLabel";

export const SidebarGroupContent = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div ref={ref} data-slot="sidebar-group-content" className={cn("w-full text-sm", className)} {...props} />
  ),
);
SidebarGroupContent.displayName = "SidebarGroupContent";

/* -----------------------------------------------------------------------------------------------
 * Menu: SidebarMenu / SidebarMenuItem / SidebarMenuButton / SidebarMenuSub*
 * -------------------------------------------------------------------------------------------- */

export const SidebarMenu = React.forwardRef<HTMLUListElement, React.ComponentPropsWithoutRef<"ul">>(
  ({ className, ...props }, ref) => (
    <ul
      ref={ref}
      data-slot="sidebar-menu"
      className={cn("flex w-full min-w-0 flex-col gap-1", className)}
      {...props}
    />
  ),
);
SidebarMenu.displayName = "SidebarMenu";

export const SidebarMenuItem = React.forwardRef<HTMLLIElement, React.ComponentPropsWithoutRef<"li">>(
  ({ className, ...props }, ref) => (
    <li
      ref={ref}
      data-slot="sidebar-menu-item"
      className={cn("group/menu-item relative", className)}
      {...props}
    />
  ),
);
SidebarMenuItem.displayName = "SidebarMenuItem";

const sidebarMenuButtonVariants = cva(
  cn(
    "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm text-sidebar-foreground outline-none transition-[width,height,padding]",
    "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
    "focus-visible:ring-1 focus-visible:ring-sidebar-ring",
    "disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50",
    "data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground",
    "group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-2",
    "[&>svg]:size-4 [&>svg]:shrink-0",
    // Label text must be a <span> child (not a bare text node) so it can be targeted here -
    // `overflow-hidden` alone only clips it mid-word at the icon-rail width, it doesn't hide it.
    "[&>span]:truncate group-data-[collapsible=icon]:[&>span]:hidden",
  ),
  {
    variants: {
      variant: {
        default: "",
        outline: "border border-sidebar-border bg-background shadow-sm",
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

/**
 * Pass children as an icon element followed by a `<span>` label (e.g. `<Home /><span>Home</span>`),
 * not a bare text node - the icon-rail (`collapsible="icon"`) state hides the label via a `[&>span]`
 * selector, which can only target real elements, not raw text.
 */
export interface SidebarMenuButtonProps
  extends React.ComponentPropsWithoutRef<"button">,
    VariantProps<typeof sidebarMenuButtonVariants> {
  /** Render as the passed single child (e.g. an `<a>`) instead of a `<button>`, via Radix `Slot`. */
  asChild?: boolean;
  isActive?: boolean;
}

export const SidebarMenuButton = React.forwardRef<HTMLButtonElement, SidebarMenuButtonProps>(
  ({ asChild = false, isActive = false, variant, size, className, ...props }, ref) => {
    const Comp = asChild ? Slot.Root : "button";
    return (
      <Comp
        ref={ref}
        data-slot="sidebar-menu-button"
        data-active={isActive}
        className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);
SidebarMenuButton.displayName = "SidebarMenuButton";

/** Indented submenu list rendered under a `SidebarMenuItem` (see the "Products" group in the Figma reference). */
export const SidebarMenuSub = React.forwardRef<HTMLUListElement, React.ComponentPropsWithoutRef<"ul">>(
  ({ className, ...props }, ref) => (
    <ul
      ref={ref}
      data-slot="sidebar-menu-sub"
      className={cn(
        "mx-3.5 flex min-w-0 flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  ),
);
SidebarMenuSub.displayName = "SidebarMenuSub";

export const SidebarMenuSubItem = React.forwardRef<HTMLLIElement, React.ComponentPropsWithoutRef<"li">>(
  ({ className, ...props }, ref) => (
    <li
      ref={ref}
      data-slot="sidebar-menu-sub-item"
      className={cn("group/menu-sub-item relative", className)}
      {...props}
    />
  ),
);
SidebarMenuSubItem.displayName = "SidebarMenuSubItem";

export interface SidebarMenuSubButtonProps extends React.ComponentPropsWithoutRef<"a"> {
  asChild?: boolean;
  isActive?: boolean;
}

export const SidebarMenuSubButton = React.forwardRef<HTMLAnchorElement, SidebarMenuSubButtonProps>(
  ({ asChild = false, isActive = false, className, ...props }, ref) => {
    const Comp = asChild ? Slot.Root : "a";
    return (
      <Comp
        ref={ref}
        data-slot="sidebar-menu-sub-button"
        data-active={isActive}
        className={cn(
          "flex h-7 min-w-0 items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none",
          "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
          "focus-visible:ring-1 focus-visible:ring-sidebar-ring",
          "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
          "group-data-[collapsible=icon]:hidden",
          className,
        )}
        {...props}
      />
    );
  },
);
SidebarMenuSubButton.displayName = "SidebarMenuSubButton";
