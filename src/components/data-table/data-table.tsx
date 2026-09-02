import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import {
  flexRender,
  useTable,
  type ColumnDef as TanStackColumnDef,
  type ColumnFiltersState,
  type ColumnVisibilityState,
  type PaginationState,
  type RowData,
  type RowSelectionState,
  type SortingState,
} from "@tanstack/react-table";
import { Checkbox } from "radix-ui";
import { cn } from "../../lib/cn";
import { dataTableFeatures, type DataTableFeatures } from "./features";
import { DataTableToolbar } from "./toolbar";
import { DataTablePagination } from "./pagination";

/**
 * `ColumnDef` re-exported from this module so consumers don't need
 * `@tanstack/react-table` as a direct dependency just to type their column
 * definitions.
 *
 * TanStack Table v9 changed `ColumnDef`'s generics to
 * `ColumnDef<TFeatures, TData, TValue>` (a new `TFeatures` parameter comes
 * first, driven by v9's `tableFeatures()` slot system - see `./features.ts`).
 * This alias binds `TFeatures` to this package's fixed `DataTableFeatures`
 * set so the public shape stays the familiar two-generic
 * `ColumnDef<TData, TValue>` from v8.
 */
export type ColumnDef<TData extends RowData, TValue = unknown> = TanStackColumnDef<
  DataTableFeatures,
  TData,
  TValue
>;

export interface DataTableProps<TData extends RowData, TValue> {
  /** Column definitions. See the re-exported `ColumnDef` type. */
  columns: ColumnDef<TData, TValue>[];
  /** Row data. */
  data: TData[];
  /** Column id the toolbar's search input filters against. */
  searchableColumnId?: string;
  /** Placeholder text for the search input. Defaults to `"Search..."`. */
  searchPlaceholder?: string;
  /** Enables a leading checkbox column for row selection. */
  enableRowSelection?: boolean;
  /** Called with the currently-selected row data whenever selection changes. */
  onRowSelectionChange?: (rows: TData[]) => void;
  /** Initial page size. Defaults to `10`. */
  pageSize?: number;
  /** Options shown in the "rows per page" control. Defaults to `[10, 20, 30, 50]`. */
  pageSizeOptions?: number[];
  /** Renders skeleton rows instead of `data` while `true`. */
  isLoading?: boolean;
  /** Rendered in place of the table body when `data` is empty. */
  emptyState?: ReactNode;
  /** Called with a row's data when that row is clicked. */
  onRowClick?: (row: TData) => void;
  /** Derives a stable id for each row; passed straight through to tanstack-table's `getRowId`. */
  getRowId?: (row: TData, index: number) => string;
  className?: string;
}

const DEFAULT_PAGE_SIZE_OPTIONS = [10, 20, 30, 50];

/**
 * Generic, headless-table-backed data table with client-side sorting,
 * per-column filtering (used for the toolbar search box), column visibility,
 * row selection, and pagination - all driven by `@tanstack/react-table` v9's
 * row-model pipeline (`sortedRowModel` -> `filteredRowModel` ->
 * `paginatedRowModel`, see `./features.ts`).
 */
export function DataTable<TData extends RowData, TValue>({
  columns,
  data,
  searchableColumnId,
  searchPlaceholder,
  enableRowSelection = false,
  onRowSelectionChange,
  pageSize = 10,
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
  isLoading = false,
  emptyState,
  onRowClick,
  getRowId,
  className,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibilityState>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  });

  const tableColumns = useMemo<ColumnDef<TData, TValue>[]>(() => {
    const withSearchFilter = withDefaultFilterFn(columns, searchableColumnId);
    return enableRowSelection
      ? [createSelectionColumn<TData>() as unknown as ColumnDef<TData, TValue>, ...withSearchFilter]
      : withSearchFilter;
  }, [columns, enableRowSelection, searchableColumnId]);

  const table = useTable({
    features: dataTableFeatures,
    // `useTable`'s `columns` option resolves its own `TValue` to `unknown`
    // (see `TableOptions_Columns`), while `DataTable` stays generic over the
    // caller-supplied `TValue`. The two are structurally compatible for every
    // concrete `TValue` a caller could supply - each column's own `header`/
    // `cell` render functions keep their original, caller-checked types -
    // but TypeScript can't verify that across an open generic, hence the cast.
    columns: tableColumns as unknown as TanStackColumnDef<DataTableFeatures, TData, unknown>[],
    data,
    state: { sorting, columnFilters, columnVisibility, rowSelection, pagination },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    enableRowSelection,
    getRowId,
  });

  useEffect(() => {
    if (!onRowSelectionChange) return;
    onRowSelectionChange(table.getSelectedRowModel().rows.map((row) => row.original));
    // Re-run only when the selection state itself changes - `table` is a new
    // object identity every render, and `onRowSelectionChange` is a
    // caller-supplied callback that shouldn't force extra re-runs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowSelection]);

  const rows = table.getRowModel().rows;
  const columnCount = tableColumns.length;

  return (
    <div className={cn("flex w-full flex-col gap-4", className)}>
      <DataTableToolbar
        table={table}
        searchableColumnId={searchableColumnId}
        searchPlaceholder={searchPlaceholder}
      />
      <div className="w-full overflow-auto rounded-md border border-border">
        <table className="w-full caption-bottom text-sm">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-border">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="h-10 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:w-10 [&:has([role=checkbox])]:pr-0"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: pageSize }).map((_, rowIndex) => (
                <tr key={`skeleton-row-${rowIndex}`} className="border-b border-border last:border-0">
                  {Array.from({ length: columnCount }).map((_, cellIndex) => (
                    <td key={`skeleton-cell-${rowIndex}-${cellIndex}`} className="p-4 align-middle">
                      <div className="h-4 w-full max-w-40 animate-pulse rounded-md bg-muted" />
                    </td>
                  ))}
                </tr>
              ))
            ) : rows.length > 0 ? (
              rows.map((row) => (
                <tr
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                  onClick={onRowClick ? () => onRowClick(row.original) : undefined}
                  className={cn(
                    "border-b border-border transition-colors last:border-0 hover:bg-muted/50 data-[state=selected]:bg-muted",
                    onRowClick && "cursor-pointer",
                  )}
                >
                  {row.getAllCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="p-4 align-middle [&:has([role=checkbox])]:w-10 [&:has([role=checkbox])]:pr-0"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columnCount} className="h-32 text-center align-middle">
                  {emptyState ?? <span className="text-sm text-muted-foreground">No results.</span>}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <DataTablePagination table={table} pageSizeOptions={pageSizeOptions} />
    </div>
  );
}

/**
 * Ensures the column matching `searchableColumnId` has a `filterFn`.
 *
 * Unlike v8 (which fell back to an auto-detected filter function whenever
 * `filterFn` was left unset), v9's `createFilteredRowModel` skips a column's
 * filter entirely when `columnDef.filterFn` is `undefined` - there is no
 * implicit default. Since the toolbar's search input drives
 * `searchableColumnId`'s filter value via `column.setFilterValue()`, that
 * column needs an explicit `filterFn` for the search box to actually filter
 * anything. This defaults it to `'auto'` (resolved against the `filterFns`
 * registered in `./features.ts`, which covers every branch of the built-in
 * auto-detection heuristic) without touching columns that already declare
 * their own `filterFn`.
 */
function withDefaultFilterFn<TData extends RowData, TValue>(
  columns: ColumnDef<TData, TValue>[],
  searchableColumnId: string | undefined,
): ColumnDef<TData, TValue>[] {
  if (!searchableColumnId) return columns;
  return columns.map((column) => {
    const columnId =
      column.id ?? ("accessorKey" in column ? String(column.accessorKey) : undefined);
    if (columnId !== searchableColumnId || column.filterFn) return column;
    return { ...column, filterFn: "auto" };
  });
}

function createSelectionColumn<TData extends RowData>(): ColumnDef<TData, unknown> {
  return {
    id: "select",
    header: ({ table }) => (
      <Checkbox.Root
        checked={
          table.getIsAllPageRowsSelected()
            ? true
            : table.getIsSomePageRowsSelected()
              ? "indeterminate"
              : false
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(value === true)}
        aria-label="Select all rows on this page"
        className={selectionCheckboxClassName}
      >
        <Checkbox.Indicator className="flex items-center justify-center text-current">
          <SelectionIcon />
        </Checkbox.Indicator>
      </Checkbox.Root>
    ),
    cell: ({ row }) => (
      <Checkbox.Root
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(value === true)}
        onClick={(event) => event.stopPropagation()}
        aria-label="Select row"
        className={selectionCheckboxClassName}
      >
        <Checkbox.Indicator className="flex items-center justify-center text-current">
          <SelectionIcon />
        </Checkbox.Indicator>
      </Checkbox.Root>
    ),
    enableSorting: false,
    enableHiding: false,
  };
}

const selectionCheckboxClassName =
  "flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground";

function SelectionIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="h-3 w-3"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.25}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3.5 8.5l3 3 6-7" />
    </svg>
  );
}
