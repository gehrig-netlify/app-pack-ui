import { DropdownMenu } from "radix-ui";
import type { ReactTable, RowData } from "@tanstack/react-table";
import { cn } from "../../lib/cn";
import type { DataTableFeatures } from "./features";

export interface DataTableToolbarProps<TData extends RowData> {
  table: ReactTable<DataTableFeatures, TData>;
  searchableColumnId?: string;
  searchPlaceholder?: string;
  className?: string;
}

/**
 * Search box (bound to a single column's filter value via
 * `searchableColumnId`) plus a Radix `DropdownMenu` for toggling column
 * visibility.
 */
export function DataTableToolbar<TData extends RowData>({
  table,
  searchableColumnId,
  searchPlaceholder,
  className,
}: DataTableToolbarProps<TData>) {
  const searchColumn = searchableColumnId ? table.getColumn(searchableColumnId) : undefined;
  const hideableColumns = table.getAllColumns().filter((column) => column.getCanHide());

  if (!searchColumn && hideableColumns.length === 0) {
    return null;
  }

  return (
    <div className={cn("flex items-center justify-between gap-2", className)}>
      <div className="flex-1">
        {searchColumn ? (
          <input
            type="text"
            value={(searchColumn.getFilterValue() as string | undefined) ?? ""}
            onChange={(event) => searchColumn.setFilterValue(event.target.value)}
            placeholder={searchPlaceholder ?? "Search..."}
            aria-label={searchPlaceholder ?? "Search"}
            className="h-9 w-full max-w-sm rounded-md border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
        ) : null}
      </div>
      {hideableColumns.length > 0 ? (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
              type="button"
              className="inline-flex h-9 items-center gap-1.5 rounded-md border border-input bg-background px-3 text-sm font-medium text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              View
              <ChevronDownIcon />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              align="end"
              sideOffset={4}
              className="z-50 min-w-40 overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md"
            >
              <DropdownMenu.Label className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                Toggle columns
              </DropdownMenu.Label>
              {hideableColumns.map((column) => (
                <DropdownMenu.CheckboxItem
                  key={column.id}
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(value === true)}
                  className="relative flex cursor-pointer select-none items-center gap-2 rounded-sm py-1.5 pl-7 pr-2 text-sm capitalize outline-none hover:bg-muted focus:bg-muted data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                >
                  <DropdownMenu.ItemIndicator className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                    <CheckIcon />
                  </DropdownMenu.ItemIndicator>
                  {column.id}
                </DropdownMenu.CheckboxItem>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      ) : null}
    </div>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

function CheckIcon() {
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
