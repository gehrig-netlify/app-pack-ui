import type { Story } from "@ladle/react";
import { Checkbox, CheckboxLabel, type CheckboxProps, type CheckboxLabelProps } from "./checkbox";

export default {
  title: "Checkbox",
};

export const Default: Story<CheckboxProps> = (args) => <Checkbox {...args} />;
Default.args = {
  size: "md",
};
Default.argTypes = {
  size: {
    options: ["sm", "md", "lg"],
    control: { type: "select" },
  },
};

export const Checked: Story<CheckboxProps> = (args) => <Checkbox {...args} />;
Checked.args = {
  size: "md",
  defaultChecked: true,
};
Checked.argTypes = {
  size: {
    options: ["sm", "md", "lg"],
    control: { type: "select" },
  },
};

export const Indeterminate: Story<CheckboxProps> = (args) => <Checkbox {...args} />;
Indeterminate.args = {
  size: "md",
  checked: "indeterminate",
};

export const Disabled: Story<CheckboxProps> = (args) => <Checkbox {...args} />;
Disabled.args = {
  size: "md",
  disabled: true,
};

export const WithLabel: Story<CheckboxLabelProps> = (args) => <CheckboxLabel {...args} />;
WithLabel.args = {
  label: "Accept terms and conditions",
  size: "md",
};
WithLabel.argTypes = {
  size: {
    options: ["sm", "md", "lg"],
    control: { type: "select" },
  },
};

export const WithDescription: Story<CheckboxLabelProps> = (args) => <CheckboxLabel {...args} />;
WithDescription.args = {
  label: "Enable notifications",
  description: "By clicking this checkbox, you agree to the terms.",
  size: "md",
};

export const DisabledWithLabel: Story<CheckboxLabelProps> = (args) => <CheckboxLabel {...args} />;
DisabledWithLabel.args = {
  label: "Accept terms and conditions",
  disabled: true,
};

export const AllStates: Story = () => (
  <div className="flex flex-col gap-6">
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-muted-foreground">Plain checkbox, by size</p>
      <div className="flex items-center gap-3">
        <Checkbox size="sm" />
        <Checkbox size="md" />
        <Checkbox size="lg" />
      </div>
    </div>
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-muted-foreground">Checked</p>
      <div className="flex items-center gap-3">
        <Checkbox size="sm" defaultChecked />
        <Checkbox size="md" defaultChecked />
        <Checkbox size="lg" defaultChecked />
      </div>
    </div>
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-muted-foreground">Indeterminate</p>
      <Checkbox size="md" checked="indeterminate" />
    </div>
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-muted-foreground">Disabled (unchecked / checked)</p>
      <div className="flex items-center gap-3">
        <Checkbox size="md" disabled />
        <Checkbox size="md" disabled defaultChecked />
      </div>
    </div>
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-muted-foreground">With label</p>
      <CheckboxLabel label="Accept terms and conditions" size="md" />
    </div>
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-muted-foreground">With label and description</p>
      <CheckboxLabel
        label="Enable notifications"
        description="By clicking this checkbox, you agree to the terms."
        size="md"
      />
    </div>
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-muted-foreground">Disabled with label</p>
      <CheckboxLabel label="Accept terms and conditions" size="md" disabled />
    </div>
  </div>
);
