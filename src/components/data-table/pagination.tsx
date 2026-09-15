import type { ReactNode } from "react";
import type { ReactTable, RowData } from "@tanstack/react-table";
import { cn } from "../../lib/cn";
import type { DataTableFeatures } from "./features";

export interface DataTablePaginationProps<TData extends RowData> {
  table: ReactTable<DataTableFeatures, TData>;
  pageSizeOptions: number[];
  className?: string;
}

/**
 * Page-size select plus first/previous/next/last controls, driven by the
 * `rowPaginationFeature` state on `table`. Uses a plain native `<select>` and
 * `<button>` elements - a Radix primitive isn't warranted here since nothing
 * needs portal/overlay/roving-focus behavior beyond what native controls
 * already provide.
 */
export function DataTablePagination<TData extends RowData>({
  table,
  pageSizeOptions,
  className,
}: DataTablePaginationProps<TData>) {
  const { pageIndex, pageSize } = table.state.pagination;
  const pageCount = table.getPageCount();
  const selectedCount = table.getSelectedRowModel().rows.length;
  const totalCount = table.getFilteredRowModel().rows.length;

  return (
    <div className={cn("flex flex-col-reverse items-center justify-between gap-4 sm:flex-row", className)}>
      <div className="text-sm text-muted-foreground">
        {selectedCount > 0
          ? `${selectedCount} of ${totalCount} row(s) selected.`
          : `${totalCount} row(s) total.`}
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">Rows per page</span>
          <select
            value={pageSize}
            onChange={(event) => table.setPageSize(Number(event.target.value))}
            className="h-8 rounded-lg border border-input bg-background px-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            {pageSizeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="text-sm font-medium text-foreground">
          Page {pageCount === 0 ? 0 : pageIndex + 1} of {pageCount}
        </div>
        <div className="flex items-center gap-1">
          <PaginationButton
            label="First page"
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeftIcon />
          </PaginationButton>
          <PaginationButton
            label="Previous page"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeftIcon />
          </PaginationButton>
          <PaginationButton
            label="Next page"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRightIcon />
          </PaginationButton>
          <PaginationButton
            label="Last page"
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRightIcon />
          </PaginationButton>
        </div>
      </div>
    </div>
  );
}

function PaginationButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-input bg-background text-foreground hover:bg-muted disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
    >
      {children}
    </button>
  );
}

function iconProps() {
  return {
    "aria-hidden": true,
    viewBox: "0 0 16 16",
    className: "h-4 w-4",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
}

function ChevronLeftIcon() {
  return (
    <svg {...iconProps()}>
      <path d="M10 3l-5 5 5 5" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg {...iconProps()}>
      <path d="M6 3l5 5-5 5" />
    </svg>
  );
}

function ChevronsLeftIcon() {
  return (
    <svg {...iconProps()}>
      <path d="M11 3l-5 5 5 5M6.5 3l-5 5 5 5" />
    </svg>
  );
}

function ChevronsRightIcon() {
  return (
    <svg {...iconProps()}>
      <path d="M5 3l5 5-5 5M9.5 3l5 5-5 5" />
    </svg>
  );
}
