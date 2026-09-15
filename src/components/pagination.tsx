import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cva } from "class-variance-authority";
import { cn } from "../lib/cn";

/* -------------------------------------------------------------------------------------------------
 * Page range calculation
 * ---------------------------------------------------------------------------------------------- */

type PaginationItemValue = number | "ellipsis";

/**
 * Builds the list of page numbers/ellipses to render: always the first and last page, `siblingCount`
 * pages on either side of `currentPage`, and an "ellipsis" placeholder for any gap in between.
 */
function getPaginationRange(
  currentPage: number,
  totalPages: number,
  siblingCount: number,
): PaginationItemValue[] {
  const totalSlots = siblingCount * 2 + 5; // first + last + current + 2 siblings + room for both ellipses
  if (totalPages <= totalSlots) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const leftSibling = Math.max(currentPage - siblingCount, 1);
  const rightSibling = Math.min(currentPage + siblingCount, totalPages);
  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < totalPages - 1;

  if (!showLeftEllipsis && showRightEllipsis) {
    const leftCount = 3 + siblingCount * 2;
    return [...Array.from({ length: leftCount }, (_, index) => index + 1), "ellipsis", totalPages];
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    const rightCount = 3 + siblingCount * 2;
    return [
      1,
      "ellipsis",
      ...Array.from({ length: rightCount }, (_, index) => totalPages - rightCount + index + 1),
    ];
  }

  return [
    1,
    "ellipsis",
    ...Array.from({ length: rightSibling - leftSibling + 1 }, (_, index) => leftSibling + index),
    "ellipsis",
    totalPages,
  ];
}

/* -------------------------------------------------------------------------------------------------
 * Pagination
 * ---------------------------------------------------------------------------------------------- */

export interface PaginationProps extends Omit<React.ComponentProps<"nav">, "onChange"> {
  /** The current 1-indexed page. */
  currentPage: number;
  totalPages: number;
  /** Called with the next page number when prev/next or a page number is activated. */
  onPageChange: (page: number) => void;
  /** How many page numbers to show on each side of the current page. Defaults to 1. */
  siblingCount?: number;
}

/**
 * A general-purpose page-number list with prev/next controls. Plain `<nav>`/`<button>` elements -
 * no Radix primitive needed, per the reasoning in `data-table/pagination.tsx`. Unlike
 * `DataTablePagination` (which reads/writes a `@tanstack/react-table` instance directly), this is a
 * standalone, fully controlled component: pass `currentPage`/`totalPages`/`onPageChange` yourself,
 * no internal state.
 */
export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  className,
  ...props
}: PaginationProps) {
  const pages = getPaginationRange(currentPage, totalPages, siblingCount);

  return (
    <nav
      aria-label="Pagination"
      data-slot="pagination"
      className={cn("flex items-center gap-1.5", className)}
      {...props}
    >
      <PaginationArrowButton
        label="Previous page"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        <ChevronLeft className="size-4" />
      </PaginationArrowButton>

      <PaginationPageButton
        isActive={false}
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </PaginationPageButton>

      {pages.map((page, index) =>
        page === "ellipsis" ? (
          <PaginationEllipsis key={`ellipsis-${index}`} />
        ) : (
          <PaginationPageButton
            key={page}
            isActive={page === currentPage}
            aria-current={page === currentPage ? "page" : undefined}
            onClick={() => onPageChange(page)}
          >
            {page}
          </PaginationPageButton>
        ),
      )}

      <PaginationPageButton
        isActive={false}
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </PaginationPageButton>

      <PaginationArrowButton
        label="Next page"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        <ChevronRight className="size-4" />
      </PaginationArrowButton>
    </nav>
  );
}

/* -------------------------------------------------------------------------------------------------
 * Internal buttons (not exported - implementation detail of Pagination, same spirit as
 * data-table/pagination.tsx's local PaginationButton)
 * ---------------------------------------------------------------------------------------------- */

const pageButtonVariants = cva(
  "inline-flex h-9 shrink-0 items-center justify-center rounded-lg border px-3.5 text-sm transition-colors disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
  {
    variants: {
      isActive: {
        true: "border-foreground bg-background text-foreground",
        false: "border-border bg-background text-muted-foreground hover:bg-accent hover:text-accent-foreground",
      },
    },
    defaultVariants: {
      isActive: false,
    },
  },
);

function PaginationPageButton({
  isActive,
  className,
  ...props
}: React.ComponentProps<"button"> & { isActive: boolean }) {
  return <button type="button" className={cn(pageButtonVariants({ isActive }), className)} {...props} />;
}

function PaginationArrowButton({
  label,
  className,
  ...props
}: React.ComponentProps<"button"> & { label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      className={cn(
        "inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        className,
      )}
      {...props}
    />
  );
}

function PaginationEllipsis() {
  return (
    <span aria-hidden="true" className="flex size-9 items-center justify-center text-muted-foreground">
      <MoreHorizontal className="size-4" />
    </span>
  );
}
