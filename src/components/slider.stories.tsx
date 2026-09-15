import type { Story } from "@ladle/react";
import { Slider, type SliderProps } from "./slider";

export default {
  title: "Slider",
};

export const Default: Story<SliderProps> = (args) => <Slider {...args} />;
Default.args = {
  defaultValue: [35],
  min: 0,
  max: 100,
  step: 1,
};

export const Range: Story<SliderProps> = (args) => <Slider {...args} />;
Range.args = {
  defaultValue: [25, 65],
  min: 0,
  max: 100,
  step: 1,
};

export const Disabled: Story<SliderProps> = (args) => <Slider {...args} />;
Disabled.args = {
  defaultValue: [35],
  min: 0,
  max: 100,
  disabled: true,
};

export const AllStates: Story<SliderProps> = () => (
  <div className="flex flex-col gap-6">
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-muted-foreground">Single value</p>
      <Slider defaultValue={[35]} min={0} max={100} step={1} />
    </div>
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-muted-foreground">Range</p>
      <Slider defaultValue={[25, 65]} min={0} max={100} step={1} />
    </div>
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-muted-foreground">Disabled</p>
      <Slider defaultValue={[35]} min={0} max={100} disabled />
    </div>
  </div>
);
