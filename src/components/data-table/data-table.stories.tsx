import type { Story } from "@ladle/react";
import { useState } from "react";
import { DataTable, type ColumnDef } from "./data-table";
import { DataTableColumnHeader } from "./column-header";

interface Person {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Editor" | "Viewer";
  status: "active" | "invited" | "suspended";
}

const FIRST_NAMES = [
  "Ada",
  "Grace",
  "Alan",
  "Katherine",
  "Linus",
  "Margaret",
  "Dennis",
  "Barbara",
  "Donald",
  "Radia",
];
const LAST_NAMES = ["Lovelace", "Hopper", "Turing", "Johnson", "Torvalds", "Hamilton", "Ritchie", "Liskov", "Knuth", "Perlman"];
const ROLES: Person["role"][] = ["Admin", "Editor", "Viewer"];
const STATUSES: Person["status"][] = ["active", "invited", "suspended"];

function makePeople(count: number): Person[] {
  return Array.from({ length: count }, (_, index) => {
    const first = FIRST_NAMES[index % FIRST_NAMES.length];
    const last = LAST_NAMES[Math.floor(index / FIRST_NAMES.length) % LAST_NAMES.length];
    return {
      id: `person-${index + 1}`,
      name: `${first} ${last}`,
      email: `${first.toLowerCase()}.${last.toLowerCase()}@example.com`,
      role: ROLES[index % ROLES.length],
      status: STATUSES[index % STATUSES.length],
    };
  });
}

const people = makePeople(37);

const statusStyles: Record<Person["status"], string> = {
  active: "bg-primary/10 text-primary",
  invited: "bg-muted text-muted-foreground",
  suspended: "bg-destructive/10 text-destructive",
};

function StatusBadge({ status }: { status: Person["status"] }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}

const columns: ColumnDef<Person>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: (info) => info.getValue<string>(),
  },
  {
    accessorKey: "email",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
    cell: (info) => <span className="text-muted-foreground">{info.getValue<string>()}</span>,
  },
  {
    accessorKey: "role",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Role" />,
    cell: (info) => info.getValue<string>(),
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: (info) => <StatusBadge status={info.getValue<Person["status"]>()} />,
  },
];

/**
 * The full-featured story: search (filters the "name" column), sortable
 * headers on every column, column-visibility dropdown, row selection with a
 * live "selected rows" readout, and pagination - all wired through
 * `DataTable`'s own internal tanstack-table state. Controls below let you
 * exercise `searchPlaceholder`, `enableRowSelection`, `pageSize`, and
 * `isLoading` live.
 */
export const Default: Story<{
  searchPlaceholder: string;
  enableRowSelection: boolean;
  pageSize: number;
  isLoading: boolean;
}> = ({ searchPlaceholder, enableRowSelection, pageSize, isLoading }) => {
  const [selected, setSelected] = useState<Person[]>([]);

  return (
    <div className="flex flex-col gap-4">
      <DataTable<Person, unknown>
        columns={columns}
        data={people}
        searchableColumnId="name"
        searchPlaceholder={searchPlaceholder}
        enableRowSelection={enableRowSelection}
        onRowSelectionChange={setSelected}
        pageSize={pageSize}
        pageSizeOptions={[5, 10, 20, 37]}
        isLoading={isLoading}
        getRowId={(row) => row.id}
      />
      {enableRowSelection ? (
        <p className="text-sm text-muted-foreground">
          Selected:{" "}
          {selected.length === 0 ? "none" : selected.map((person) => person.name).join(", ")}
        </p>
      ) : null}
    </div>
  );
};

Default.args = {
  searchPlaceholder: "Search by name...",
  enableRowSelection: true,
  pageSize: 10,
  isLoading: false,
};

Default.argTypes = {
  searchPlaceholder: {
    control: { type: "text" },
  },
  enableRowSelection: {
    control: { type: "boolean" },
  },
  pageSize: {
    control: { type: "range", min: 5, max: 37, step: 1 },
    defaultValue: 10,
  },
  isLoading: {
    control: { type: "boolean" },
  },
};

/** No `data` and no custom `emptyState` - falls back to the built-in message. */
export const Empty: Story = () => (
  <DataTable<Person, unknown> columns={columns} data={[]} searchableColumnId="name" />
);

/** `isLoading` renders pulse-animated skeleton rows instead of `data`. */
export const Loading: Story = () => (
  <DataTable<Person, unknown> columns={columns} data={people} isLoading pageSize={5} />
);
