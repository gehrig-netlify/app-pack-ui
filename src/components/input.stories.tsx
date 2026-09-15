import type { Story } from "@ladle/react";
import { ArrowUp, Search } from "lucide-react";
import { Input, type InputProps } from "./input";

export default {
  title: "Input",
};

const argTypes = {
  size: {
    options: ["sm", "md"],
    control: { type: "select" as const },
  },
};

export const Default: Story<InputProps> = (args) => <Input {...args} />;
Default.args = {
  size: "md",
  placeholder: "Search...",
};
Default.argTypes = argTypes;

export const WithIcon: Story<InputProps> = (args) => <Input {...args} />;
WithIcon.args = {
  size: "md",
  placeholder: "Search...",
  startIcon: <Search />,
};
WithIcon.argTypes = argTypes;

export const Small: Story<InputProps> = (args) => <Input {...args} />;
Small.args = {
  size: "sm",
  placeholder: "Search...",
  startIcon: <Search />,
};
Small.argTypes = argTypes;

export const Disabled: Story<InputProps> = (args) => <Input {...args} />;
Disabled.args = {
  size: "md",
  placeholder: "Search...",
  disabled: true,
  startIcon: <Search />,
};
Disabled.argTypes = argTypes;

export const AllStates: Story = () => (
  <div className="flex flex-col gap-6">
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-muted-foreground">Medium, no icon</p>
      <Input size="md" placeholder="Search..." />
    </div>
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-muted-foreground">Small, no icon</p>
      <Input size="sm" placeholder="Search..." />
    </div>
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-muted-foreground">Medium, start icon</p>
      <Input size="md" placeholder="Search..." startIcon={<Search />} />
    </div>
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-muted-foreground">Small, start icon</p>
      <Input size="sm" placeholder="Search..." startIcon={<Search />} />
    </div>
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-muted-foreground">Start and end icon</p>
      <Input size="md" placeholder="Search..." startIcon={<Search />} endIcon={<ArrowUp />} />
    </div>
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-muted-foreground">Disabled</p>
      <Input size="md" placeholder="Search..." startIcon={<Search />} disabled />
    </div>
  </div>
);
