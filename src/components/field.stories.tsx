import type { Story } from "@ladle/react";
import { Field, FieldLabel, FieldControl, FieldDescription, FieldError, type FieldProps } from "./field";
import { CheckboxLabel } from "./checkbox";

export default {
  title: "Field",
};

export const Default: Story<FieldProps> = (args) => (
  <Field {...args} className="w-[320px]">
    <FieldLabel>Name on Card</FieldLabel>
    <FieldControl>
      <input
        type="text"
        placeholder="Ada Lovelace"
        className="h-11 w-full rounded-md border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground"
      />
    </FieldControl>
  </Field>
);

export const WithDescription: Story<FieldProps> = (args) => (
  <Field {...args} className="w-[320px]">
    <FieldLabel>Card Number</FieldLabel>
    <FieldControl>
      <input
        type="text"
        placeholder="1234 5678 9012 3456"
        className="h-11 w-full rounded-md border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground"
      />
    </FieldControl>
    <FieldDescription>Enter your 16-digit card number</FieldDescription>
  </Field>
);

export const Invalid: Story<FieldProps> = (args) => (
  <Field {...args} className="w-[320px]">
    <FieldLabel>Card Number</FieldLabel>
    <FieldControl>
      <input
        type="text"
        defaultValue="1234"
        className="h-11 w-full rounded-md border border-destructive bg-background px-4 text-sm text-foreground"
      />
    </FieldControl>
    <FieldError>Enter a valid 16-digit card number.</FieldError>
  </Field>
);
Invalid.args = {
  invalid: true,
};

/**
 * `Field` doesn't require `FieldLabel` - a control that already pairs its own label (like the
 * package's `CheckboxLabel`) can skip straight to `FieldControl`.
 */
export const WithCheckbox: Story<FieldProps> = (args) => (
  <Field {...args} className="w-[320px]">
    <FieldControl>
      <CheckboxLabel label="Same as shipping address" defaultChecked />
    </FieldControl>
  </Field>
);

/** Valid and `invalid` states side by side. */
export const AllStates: Story = () => (
  <div className="flex flex-col gap-6 sm:flex-row">
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-muted-foreground">Valid</p>
      <Field className="w-[320px]">
        <FieldLabel>Card Number</FieldLabel>
        <FieldControl>
          <input
            type="text"
            placeholder="1234 5678 9012 3456"
            className="h-11 w-full rounded-md border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground"
          />
        </FieldControl>
        <FieldDescription>Enter your 16-digit card number</FieldDescription>
      </Field>
    </div>
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-muted-foreground">Invalid</p>
      <Field invalid className="w-[320px]">
        <FieldLabel>Card Number</FieldLabel>
        <FieldControl>
          <input
            type="text"
            defaultValue="1234"
            className="h-11 w-full rounded-md border border-destructive bg-background px-4 text-sm text-foreground"
          />
        </FieldControl>
        <FieldError>Enter a valid 16-digit card number.</FieldError>
      </Field>
    </div>
  </div>
);
