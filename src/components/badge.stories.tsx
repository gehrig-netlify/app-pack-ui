import type { Story } from "@ladle/react";
import { Badge, type BadgeProps } from "./badge";

export default {
  title: "Badge",
};

const variantArgTypes = {
  variant: {
    options: ["default", "secondary", "destructive", "outline"],
    control: { type: "select" as const },
  },
};

export const Default: Story<BadgeProps> = (args) => <Badge {...args} />;
Default.args = {
  variant: "default",
  children: "Badge",
};
Default.argTypes = variantArgTypes;

export const Secondary: Story<BadgeProps> = (args) => <Badge {...args} />;
Secondary.args = {
  variant: "secondary",
  children: "Secondary",
};
Secondary.argTypes = variantArgTypes;

export const Destructive: Story<BadgeProps> = (args) => <Badge {...args} />;
Destructive.args = {
  variant: "destructive",
  children: "Destructive",
};
Destructive.argTypes = variantArgTypes;

export const Outline: Story<BadgeProps> = (args) => <Badge {...args} />;
Outline.args = {
  variant: "outline",
  children: "Outline",
};
Outline.argTypes = variantArgTypes;

export const AllStates: Story = () => (
  <div className="flex flex-col gap-6">
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-muted-foreground">Variants</p>
      <div className="flex items-center gap-3">
        <Badge variant="default">Badge</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
      </div>
    </div>
  </div>
);
