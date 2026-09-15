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

const actionButton = (
  <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
    Add employee
  </button>
);

/** Every size (sm/md/lg), each shown with and without an action button. */
export const AllStates: Story = () => (
  <div className="flex flex-col gap-8">
    <div className="flex flex-col gap-3">
      <p className="text-sm font-medium text-muted-foreground">Small</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <EmptyState
          size="sm"
          title="No results found"
          description="Try adjusting your filters or search term."
        />
        <EmptyState
          size="sm"
          title="No employees yet"
          description="Add your first employee to get started."
          action={actionButton}
        />
      </div>
    </div>
    <div className="flex flex-col gap-3">
      <p className="text-sm font-medium text-muted-foreground">Medium</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <EmptyState
          size="md"
          title="No results found"
          description="Try adjusting your filters or search term."
        />
        <EmptyState
          size="md"
          title="No employees yet"
          description="Add your first employee to get started."
          action={actionButton}
        />
      </div>
    </div>
    <div className="flex flex-col gap-3">
      <p className="text-sm font-medium text-muted-foreground">Large</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <EmptyState
          size="lg"
          title="No results found"
          description="Try adjusting your filters or search term."
        />
        <EmptyState
          size="lg"
          title="No employees yet"
          description="Add your first employee to get started."
          action={actionButton}
        />
      </div>
    </div>
  </div>
);
