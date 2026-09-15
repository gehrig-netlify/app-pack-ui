import type { Story } from "@ladle/react";
import { ArrowUp } from "lucide-react";
import { Button, type ButtonProps } from "./button";

export default {
  title: "Button",
};

const variantArgTypes = {
  variant: {
    options: ["primary", "secondary", "destructive", "outline", "ghost", "link"],
    control: { type: "select" as const },
  },
  size: {
    options: ["sm", "md", "icon", "icon-sm"],
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

export const Secondary: Story<ButtonProps> = (args) => <Button {...args} />;
Secondary.args = {
  variant: "secondary",
  size: "md",
  children: "Button",
};
Secondary.argTypes = variantArgTypes;

export const Destructive: Story<ButtonProps> = (args) => <Button {...args} />;
Destructive.args = {
  variant: "destructive",
  size: "md",
  children: "Delete",
};
Destructive.argTypes = variantArgTypes;

export const Ghost: Story<ButtonProps> = (args) => <Button {...args} />;
Ghost.args = {
  variant: "ghost",
  size: "md",
  children: "Button",
};
Ghost.argTypes = variantArgTypes;

export const Link: Story<ButtonProps> = (args) => <Button {...args} />;
Link.args = {
  variant: "link",
  size: "md",
  children: "Button",
};
Link.argTypes = variantArgTypes;

export const AsChild: Story = () => (
  <Button asChild variant="outline" size="md">
    <a href="#">I render as an &lt;a&gt;, not a &lt;button&gt;</a>
  </Button>
);

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

export const IconSmall: Story<ButtonProps> = (args) => <Button {...args} />;
IconSmall.args = {
  variant: "ghost",
  size: "icon-sm",
  "aria-label": "Close",
  children: <ArrowUp />,
};
IconSmall.argTypes = variantArgTypes;

export const Disabled: Story<ButtonProps> = (args) => <Button {...args} />;
Disabled.args = {
  variant: "primary",
  size: "md",
  disabled: true,
  children: "Login",
};
Disabled.argTypes = variantArgTypes;

const VARIANTS = ["primary", "secondary", "destructive", "outline", "ghost", "link"] as const;

export const AllStates: Story = () => (
  <div className="flex flex-col gap-6">
    {VARIANTS.map((variant) => (
      <div key={variant} className="flex flex-col gap-2">
        <p className="text-sm font-medium capitalize text-muted-foreground">{variant}</p>
        <div className="flex items-center gap-3">
          <Button variant={variant} size="sm">
            Button
          </Button>
          <Button variant={variant} size="md">
            Button
          </Button>
          <Button variant={variant} size="icon" aria-label="Scroll up">
            <ArrowUp />
          </Button>
          <Button variant={variant} size="icon-sm" aria-label="Scroll up">
            <ArrowUp />
          </Button>
        </div>
      </div>
    ))}
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
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-muted-foreground">
        asChild (renders an &lt;a&gt;, not a &lt;button&gt;)
      </p>
      <Button asChild variant="outline" size="md">
        <a href="#">Link-styled-as-Button</a>
      </Button>
    </div>
  </div>
);
