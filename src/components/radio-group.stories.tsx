import type { Story } from "@ladle/react";
import { RadioGroup, RadioGroupItem, type RadioGroupProps } from "./radio-group";

export default {
  title: "RadioGroup",
};

function OptionRow({ id, value, label, size }: { id: string; value: string; label: string; size?: "sm" | "md" | "lg" }) {
  return (
    <div className="flex items-center gap-2.5">
      <RadioGroupItem id={id} value={value} size={size} />
      <label htmlFor={id} className="text-sm text-foreground">
        {label}
      </label>
    </div>
  );
}

export const Default: Story<RadioGroupProps> = (args) => (
  <RadioGroup {...args}>
    <OptionRow id="radio-default-1" value="option-1" label="Option 1" />
    <OptionRow id="radio-default-2" value="option-2" label="Option 2" />
    <OptionRow id="radio-default-3" value="option-3" label="Option 3" />
  </RadioGroup>
);
Default.args = {
  defaultValue: "option-3",
};

export const Sizes: Story<RadioGroupProps> = (args) => (
  <RadioGroup {...args}>
    <OptionRow id="radio-sm" value="sm" label="Small" size="sm" />
    <OptionRow id="radio-md" value="md" label="Medium" size="md" />
    <OptionRow id="radio-lg" value="lg" label="Large" size="lg" />
  </RadioGroup>
);
Sizes.args = {
  defaultValue: "md",
};

export const Disabled: Story<RadioGroupProps> = (args) => (
  <RadioGroup {...args}>
    <OptionRow id="radio-disabled-1" value="option-1" label="Option 1" />
    <OptionRow id="radio-disabled-2" value="option-2" label="Option 2" />
  </RadioGroup>
);
Disabled.args = {
  defaultValue: "option-1",
  disabled: true,
};

export const AllStates: Story = () => (
  <div className="flex flex-col gap-6">
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-muted-foreground">Default group (option 3 selected)</p>
      <RadioGroup defaultValue="option-3">
        <OptionRow id="all-default-1" value="option-1" label="Option 1" />
        <OptionRow id="all-default-2" value="option-2" label="Option 2" />
        <OptionRow id="all-default-3" value="option-3" label="Option 3" />
      </RadioGroup>
    </div>
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-muted-foreground">Sizes: sm / md / lg</p>
      <RadioGroup defaultValue="md">
        <OptionRow id="all-sm" value="sm" label="Small" size="sm" />
        <OptionRow id="all-md" value="md" label="Medium" size="md" />
        <OptionRow id="all-lg" value="lg" label="Large" size="lg" />
      </RadioGroup>
    </div>
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-muted-foreground">Disabled group</p>
      <RadioGroup defaultValue="option-1" disabled>
        <OptionRow id="all-disabled-1" value="option-1" label="Option 1" />
        <OptionRow id="all-disabled-2" value="option-2" label="Option 2" />
      </RadioGroup>
    </div>
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-muted-foreground">Single disabled item within an enabled group</p>
      <RadioGroup defaultValue="option-1">
        <OptionRow id="all-mixed-1" value="option-1" label="Option 1" />
        <div className="flex items-center gap-2.5">
          <RadioGroupItem id="all-mixed-2" value="option-2" disabled />
          <label htmlFor="all-mixed-2" className="text-sm text-foreground opacity-50">
            Option 2 (disabled)
          </label>
        </div>
      </RadioGroup>
    </div>
  </div>
);
