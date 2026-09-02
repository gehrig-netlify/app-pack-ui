import {
  columnFilteringFeature,
  columnVisibilityFeature,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFn_arrIncludes,
  filterFn_equals,
  filterFn_inDateRange,
  filterFn_includesString,
  filterFn_inNumberRange,
  filterFn_weakEquals,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  tableFeatures,
} from "@tanstack/react-table";

/**
 * The fixed set of TanStack Table v9 features every `DataTable` instance in
 * this package is built with.
 *
 * v9 replaced v8's "everything bundled" table with an opt-in
 * `tableFeatures()` "slot" system: each feature (sorting, filtering,
 * visibility, selection, pagination, ...) must be explicitly registered,
 * along with the row-model factories and named filter/sort function
 * registries it needs, so unused features can be tree-shaken out of a
 * consumer's bundle. Since `DataTable` always needs the same feature set
 * regardless of what a consumer's columns look like, that set is declared
 * once here (module scope, per the TanStack docs' recommendation) and shared
 * by `data-table.tsx`, `toolbar.tsx`, `pagination.tsx`, and
 * `column-header.tsx` - this also keeps the resulting `TFeatures` type
 * parameter consistent across all of them.
 *
 * The `filterFns` registered here cover every branch of the built-in
 * `column.getAutoFilterFn()` heuristic (string/number/boolean/array/date/
 * fallback) so that consumer columns work with the default `filterFn: 'auto'`
 * without needing to opt into a specific filter function themselves.
 */
export const dataTableFeatures = tableFeatures({
  rowSortingFeature,
  columnFilteringFeature,
  columnVisibilityFeature,
  rowSelectionFeature,
  rowPaginationFeature,
  sortedRowModel: createSortedRowModel(),
  filteredRowModel: createFilteredRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  filterFns: {
    includesString: filterFn_includesString,
    inNumberRange: filterFn_inNumberRange,
    equals: filterFn_equals,
    weakEquals: filterFn_weakEquals,
    arrIncludes: filterFn_arrIncludes,
    inDateRange: filterFn_inDateRange,
  },
});

export type DataTableFeatures = typeof dataTableFeatures;
