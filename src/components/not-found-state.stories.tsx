import type { Story } from "@ladle/react";
import { NotFoundState, type NotFoundStateProps } from "./not-found-state";

export default {
  title: "NotFoundState",
};

export const Default: Story<NotFoundStateProps> = (args) => (
  <NotFoundState {...args} />
);
Default.args = {
  title: "Page not found",
  description: "The page you're looking for doesn't exist or was moved.",
};

export const WithAction: Story<NotFoundStateProps> = (args) => (
  <NotFoundState {...args} />
);
WithAction.args = {
  title: "404",
  description: "We couldn't find that employee record.",
  action: (
    <a
      href="#"
      className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
    >
      Back to dashboard
    </a>
  ),
};

/**
 * `NotFoundState` only renders one visual shape (it's a thin wrapper around `EmptyState` fixed at
 * `size="lg"`), so the only meaningful axis is whether an `action` is supplied.
 */
export const AllStates: Story = () => (
  <div className="flex flex-col gap-8">
    <div className="flex flex-col gap-3">
      <p className="text-sm font-medium text-muted-foreground">Without action</p>
      <NotFoundState
        title="Page not found"
        description="The page you're looking for doesn't exist or was moved."
      />
    </div>
    <div className="flex flex-col gap-3">
      <p className="text-sm font-medium text-muted-foreground">With action</p>
      <NotFoundState
        title="404"
        description="We couldn't find that employee record."
        action={
          <a
            href="#"
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Back to dashboard
          </a>
        }
      />
    </div>
  </div>
);
