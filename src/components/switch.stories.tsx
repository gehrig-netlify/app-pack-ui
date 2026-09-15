import type { Story } from "@ladle/react";
import { Switch, type SwitchProps } from "./switch";

export default {
  title: "Switch",
};

export const Off: Story<SwitchProps> = (args) => <Switch {...args} />;
Off.args = {
  size: "md",
};
Off.argTypes = {
  size: {
    options: ["sm", "md", "lg"],
    control: { type: "select" },
  },
};

export const On: Story<SwitchProps> = (args) => <Switch {...args} />;
On.args = {
  size: "md",
  defaultChecked: true,
};
On.argTypes = {
  size: {
    options: ["sm", "md", "lg"],
    control: { type: "select" },
  },
};

export const Disabled: Story<SwitchProps> = (args) => <Switch {...args} />;
Disabled.args = {
  size: "md",
  disabled: true,
};

export const DisabledOn: Story<SwitchProps> = (args) => <Switch {...args} />;
DisabledOn.args = {
  size: "md",
  defaultChecked: true,
  disabled: true,
};

export const AllStates: Story<SwitchProps> = () => (
  <div className="flex flex-col gap-6">
    {(["sm", "md", "lg"] as const).map((size) => (
      <div key={size} className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted-foreground">Size: {size}</p>
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-center gap-1">
            <Switch size={size} />
            <span className="text-xs text-muted-foreground">Off</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Switch size={size} defaultChecked />
            <span className="text-xs text-muted-foreground">On</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Switch size={size} disabled />
            <span className="text-xs text-muted-foreground">Disabled</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Switch size={size} defaultChecked disabled />
            <span className="text-xs text-muted-foreground">Disabled + On</span>
          </div>
        </div>
      </div>
    ))}
  </div>
);
