import type { Story } from "@ladle/react";
import { Skeleton } from "./skeleton";

export default {
  title: "Skeleton",
};

export const Default: Story<{ width: number; height: number }> = (args) => (
  <Skeleton style={{ width: args.width, height: args.height }} />
);
Default.args = {
  width: 240,
  height: 20,
};
Default.argTypes = {
  width: { control: { type: "range", min: 40, max: 480, step: 8 } },
  height: { control: { type: "range", min: 8, max: 200, step: 4 } },
};

export const CardSkeleton: Story = () => (
  <div className="flex flex-col gap-3 rounded-lg border border-border p-4">
    <Skeleton className="h-6 w-1/3" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-5/6" />
    <Skeleton className="h-4 w-2/3" />
  </div>
);
