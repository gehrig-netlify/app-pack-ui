import { useState } from "react";
import type { Story } from "@ladle/react";
import { Pagination, type PaginationProps } from "./pagination";

export default {
  title: "Pagination",
};

export const Default: Story<PaginationProps> = (args) => <Pagination {...args} />;
Default.args = {
  currentPage: 1,
  totalPages: 5,
  onPageChange: () => {},
};

export const MiddlePage: Story<PaginationProps> = (args) => <Pagination {...args} />;
MiddlePage.args = {
  currentPage: 2,
  totalPages: 5,
  onPageChange: () => {},
};

export const ManyPagesWithEllipsis: Story<PaginationProps> = (args) => <Pagination {...args} />;
ManyPagesWithEllipsis.args = {
  currentPage: 8,
  totalPages: 20,
  siblingCount: 1,
  onPageChange: () => {},
};

/** A fully working, interactive demo - `Pagination` is controlled, so the story owns the page state. */
export const Interactive: Story<PaginationProps> = (args) => {
  const [page, setPage] = useState(args.currentPage ?? 1);
  return <Pagination {...args} currentPage={page} onPageChange={setPage} />;
};
Interactive.args = {
  currentPage: 1,
  totalPages: 6,
};

function PaginationExample({
  initialPage,
  totalPages,
  siblingCount,
}: {
  initialPage: number;
  totalPages: number;
  siblingCount?: number;
}) {
  const [page, setPage] = useState(initialPage);
  return (
    <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} siblingCount={siblingCount} />
  );
}

export const AllStates: Story<PaginationProps> = () => (
  <div className="flex flex-col gap-6">
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-muted-foreground">First page</p>
      <PaginationExample initialPage={1} totalPages={5} />
    </div>
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-muted-foreground">Middle page, with ellipsis</p>
      <PaginationExample initialPage={8} totalPages={20} />
    </div>
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-muted-foreground">Last page</p>
      <PaginationExample initialPage={5} totalPages={5} />
    </div>
  </div>
);
