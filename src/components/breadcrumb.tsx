import * as React from "react";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "../lib/cn";

/* -------------------------------------------------------------------------------------------------
 * Breadcrumb / BreadcrumbList / BreadcrumbItem
 * ---------------------------------------------------------------------------------------------- */

export interface BreadcrumbProps extends React.ComponentProps<"nav"> {}

/** Plain `<nav>` - no Radix primitive needed. Compose with the sub-parts below. */
export function Breadcrumb(props: BreadcrumbProps) {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />;
}

export interface BreadcrumbListProps extends React.ComponentProps<"ol"> {}

export function BreadcrumbList({ className, ...props }: BreadcrumbListProps) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn("flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground sm:gap-2.5", className)}
      {...props}
    />
  );
}

export interface BreadcrumbItemProps extends React.ComponentProps<"li"> {}

export function BreadcrumbItem({ className, ...props }: BreadcrumbItemProps) {
  return (
    <li data-slot="breadcrumb-item" className={cn("inline-flex items-center gap-1.5", className)} {...props} />
  );
}

/* -------------------------------------------------------------------------------------------------
 * BreadcrumbLink / BreadcrumbPage
 * ---------------------------------------------------------------------------------------------- */

export interface BreadcrumbLinkProps extends React.ComponentProps<"a"> {}

export function BreadcrumbLink({ className, ...props }: BreadcrumbLinkProps) {
  return (
    <a
      data-slot="breadcrumb-link"
      className={cn("transition-colors hover:text-foreground", className)}
      {...props}
    />
  );
}

export interface BreadcrumbPageProps extends React.ComponentProps<"span"> {}

/** The current, non-linked page - the last item in the trail. */
export function BreadcrumbPage({ className, ...props }: BreadcrumbPageProps) {
  return (
    <span
      role="link"
      aria-disabled="true"
      aria-current="page"
      data-slot="breadcrumb-page"
      className={cn("font-normal text-foreground", className)}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------------------------------
 * BreadcrumbSeparator / BreadcrumbEllipsis
 * ---------------------------------------------------------------------------------------------- */

export interface BreadcrumbSeparatorProps extends React.ComponentProps<"li"> {}

/** Renders `children` if provided, otherwise a `ChevronRight` icon. */
export function BreadcrumbSeparator({ children, className, ...props }: BreadcrumbSeparatorProps) {
  return (
    <li
      role="presentation"
      aria-hidden="true"
      data-slot="breadcrumb-separator"
      className={cn("[&>svg]:size-3.5", className)}
      {...props}
    >
      {children ?? <ChevronRight />}
    </li>
  );
}

export interface BreadcrumbEllipsisProps extends React.ComponentProps<"span"> {}

export function BreadcrumbEllipsis({ className, ...props }: BreadcrumbEllipsisProps) {
  return (
    <span
      role="presentation"
      aria-hidden="true"
      data-slot="breadcrumb-ellipsis"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More</span>
    </span>
  );
}
