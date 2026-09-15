import type { Story } from "@ladle/react";
import { ArrowUp } from "lucide-react";
import { Button, type ButtonProps } from "./button";

export default {
  title: "Button",
};

const variantArgTypes = {
  variant: {
    options: ["primary", "outline"],
    control: { type: "select" as const },
  },
  size: {
    options: ["sm", "md", "icon"],
    control: { type: "select" as const },
  },
};

export const Primary: Story<ButtonProps> = (args) => <Button {...args} />;
Primary.args = {
  variant: "primary",
  size: "md",
  children: "Login",
};
Primary.argTypes = variantArgTypes;

export const Outline: Story<ButtonProps> = (args) => <Button {...args} />;
Outline.args = {
  variant: "outline",
  size: "md",
  children: "Login with Google",
};
Outline.argTypes = variantArgTypes;

export const Small: Story<ButtonProps> = (args) => <Button {...args} />;
Small.args = {
  variant: "outline",
  size: "sm",
  children: "Button",
};
Small.argTypes = variantArgTypes;

export const IconOnly: Story<ButtonProps> = (args) => <Button {...args} />;
IconOnly.args = {
  variant: "outline",
  size: "icon",
  "aria-label": "Scroll up",
  children: <ArrowUp />,
};
IconOnly.argTypes = variantArgTypes;

export const Disabled: Story<ButtonProps> = (args) => <Button {...args} />;
Disabled.args = {
  variant: "primary",
  size: "md",
  disabled: true,
  children: "Login",
};
Disabled.argTypes = variantArgTypes;

export const AllStates: Story = () => (
  <div className="flex flex-col gap-6">
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-muted-foreground">Primary</p>
      <div className="flex items-center gap-3">
        <Button variant="primary" size="sm">
          Button
        </Button>
        <Button variant="primary" size="md">
          Button
        </Button>
        <Button variant="primary" size="icon" aria-label="Scroll up">
          <ArrowUp />
        </Button>
      </div>
    </div>
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-muted-foreground">Outline</p>
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm">
          Button
        </Button>
        <Button variant="outline" size="md">
          Button
        </Button>
        <Button variant="outline" size="icon" aria-label="Scroll up">
          <ArrowUp />
        </Button>
      </div>
    </div>
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-muted-foreground">Disabled</p>
      <div className="flex items-center gap-3">
        <Button variant="primary" size="md" disabled>
          Login
        </Button>
        <Button variant="outline" size="md" disabled>
          Login
        </Button>
        <Button variant="outline" size="icon" aria-label="Scroll up" disabled>
          <ArrowUp />
        </Button>
      </div>
    </div>
  </div>
);
