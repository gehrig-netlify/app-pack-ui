import type { Story } from "@ladle/react";
import { EmptyState, type EmptyStateProps } from "./empty-state";

export default {
  title: "EmptyState",
};

export const Default: Story<EmptyStateProps> = (args) => <EmptyState {...args} />;
Default.args = {
  title: "No results found",
  description: "Try adjusting your filters or search term.",
  size: "md",
};
Default.argTypes = {
  size: {
    options: ["sm", "md", "lg"],
    control: { type: "select" },
  },
};

export const WithAction: Story<EmptyStateProps> = (args) => <EmptyState {...args} />;
WithAction.args = {
  title: "No employees yet",
  description: "Add your first employee to get started.",
  size: "lg",
  action: (
    <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
      Add employee
    </button>
  ),
};
