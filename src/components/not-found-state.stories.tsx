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
