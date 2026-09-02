import type { HTMLAttributes } from "react";
import type { Column, RowData } from "@tanstack/react-table";
import { cn } from "../../lib/cn";
import type { DataTableFeatures } from "./features";

export interface DataTableColumnHeaderProps<TData extends RowData, TValue>
  extends HTMLAttributes<HTMLDivElement> {
  column: Column<DataTableFeatures, TData, TValue>;
  title: string;
}

/**
 * Sortable header cell. Plain `<button>` (no Radix primitive needed here) that
 * toggles sort state via `column.getToggleSortingHandler()` and reflects the
 * current direction through `aria-sort` for assistive tech.
 */
export function DataTableColumnHeader<TData extends RowData, TValue>({
  column,
  title,
  className,
  ...props
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return (
      <div
        className={cn("px-4 py-2 text-sm font-medium text-muted-foreground", className)}
        {...props}
      >
        {title}
      </div>
    );
  }

  const sorted = column.getIsSorted();

  return (
    <button
      type="button"
      onClick={column.getToggleSortingHandler()}
      aria-sort={sorted === "asc" ? "ascending" : sorted === "desc" ? "descending" : "none"}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        className,
      )}
    >
      {title}
      <SortIcon direction={sorted} />
    </button>
  );
}

function SortIcon({ direction }: { direction: false | "asc" | "desc" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className={cn("h-3.5 w-3.5 shrink-0", direction ? "opacity-100" : "opacity-40")}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {direction === "desc" ? (
        <path d="M4 6l4 4 4-4" />
      ) : direction === "asc" ? (
        <path d="M4 10l4-4 4 4" />
      ) : (
        <>
          <path d="M4 6.5l4-3 4 3" />
          <path d="M4 9.5l4 3 4-3" />
        </>
      )}
    </svg>
  );
}
