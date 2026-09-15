"use client";

import { createContext, useContext, useEffect, useState } from "react";

/* -------------------------------------------------------------------------------------------------
 * Sidebar context (internal)
 *
 * Not exported from the package barrel - only `Sidebar`'s own files import from here (mirroring
 * how `src/components/data-table/toolbar.tsx`/`pagination.tsx`/`column-header.tsx` are internal
 * siblings of `data-table.tsx` that aren't part of the public API on their own). Holds the
 * expand/collapse + mobile-sheet-open state shared by every `Sidebar*` piece in `./sidebar.tsx`,
 * exposed to consumers only through the public `useSidebar()` re-export in `./sidebar.tsx`.
 * ---------------------------------------------------------------------------------------------- */

export type SidebarState = "expanded" | "collapsed";

export interface SidebarContextValue {
  /** `"expanded"` or `"collapsed"` - derived from `open` (desktop only; irrelevant on mobile). */
  state: SidebarState;
  /** Desktop open/collapsed state. */
  open: boolean;
  setOpen: (open: boolean) => void;
  /** Mobile "sheet" open state - the desktop `open` state is untouched while on mobile. */
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  /** Toggles `openMobile` on mobile, `open` on desktop. */
  toggleSidebar: () => void;
}

export const SidebarContext = createContext<SidebarContextValue | null>(null);

/** Reads the nearest ancestor `<SidebarProvider>`'s state. Must be called from a descendant. */
export function useSidebar(): SidebarContextValue {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a <SidebarProvider>");
  }
  return context;
}

const MOBILE_BREAKPOINT = 768;

/** `true` below `MOBILE_BREAKPOINT`px. Used by `SidebarProvider` to decide desktop vs. mobile-sheet rendering. */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < MOBILE_BREAKPOINT;
  });

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const listener = () => setIsMobile(media.matches);
    listener();
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  return isMobile;
}
