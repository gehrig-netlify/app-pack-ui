import type { Story } from "@ladle/react";
import { Progress, type ProgressProps } from "./progress";

export default {
  title: "Progress",
};

export const Default: Story<ProgressProps> = (args) => <Progress {...args} />;
Default.args = {
  value: 35,
};

export const Empty: Story<ProgressProps> = (args) => <Progress {...args} />;
Empty.args = {
  value: 0,
};

export const Complete: Story<ProgressProps> = (args) => <Progress {...args} />;
Complete.args = {
  value: 100,
};

export const AllStates: Story<ProgressProps> = () => (
  <div className="flex flex-col gap-6">
    {[0, 33, 66, 100].map((value) => (
      <div key={value} className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted-foreground">Value: {value}</p>
        <Progress value={value} />
      </div>
    ))}
  </div>
);
