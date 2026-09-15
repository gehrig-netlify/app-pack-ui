"use client";

import * as React from "react";
import { Checkbox as CheckboxPrimitive, Label as LabelPrimitive } from "radix-ui";
import { Check } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/cn";

const checkboxVariants = cva(
  "peer inline-flex shrink-0 items-center justify-center rounded-sm border border-input text-primary-foreground shadow-xs outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary",
  {
    variants: {
      size: {
        sm: "size-4",
        md: "size-[18px]",
        lg: "size-5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export interface CheckboxProps
  extends React.ComponentProps<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof checkboxVariants> {}

/** A single Radix `Checkbox.Root` + `Checkbox.Indicator` pair. Supports `checked`, `"indeterminate"`, and `disabled`. */
export const Checkbox = React.forwardRef<React.ComponentRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  ({ className, size, ...props }, ref) => (
    <CheckboxPrimitive.Root
      ref={ref}
      data-slot="checkbox"
      className={cn(checkboxVariants({ size }), className)}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current"
      >
        <Check className="size-full p-px" strokeWidth={3} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  ),
);
Checkbox.displayName = "Checkbox";

export interface CheckboxLabelProps extends CheckboxProps {
  /** Primary label text rendered next to the checkbox, via Radix `Label.Root`. */
  label: React.ReactNode;
  /** Optional helper/description text rendered below the label (see the Figma "checkbox card" variant). */
  description?: React.ReactNode;
  /** Props forwarded to the underlying `Label.Root`. */
  labelProps?: React.ComponentProps<typeof LabelPrimitive.Root>;
  /** className applied to the outer wrapping element. */
  containerClassName?: string;
}

/**
 * Pairs a `Checkbox` with a Radix `Label.Root` (and optional description text), matching the
 * Figma "Checkbox/Label" component. Generates and wires an `id`/`htmlFor` pair when one isn't
 * supplied.
 */
export const CheckboxLabel = React.forwardRef<React.ComponentRef<typeof CheckboxPrimitive.Root>, CheckboxLabelProps>(
  ({ label, description, labelProps, containerClassName, id, className, size, disabled, ...props }, ref) => {
    const generatedId = React.useId();
    const checkboxId = id ?? generatedId;

    return (
      <div data-slot="checkbox-label" className={cn("flex flex-col gap-1", containerClassName)}>
        <div className="flex items-center gap-2.5">
          <Checkbox ref={ref} id={checkboxId} size={size} disabled={disabled} className={className} {...props} />
          <LabelPrimitive.Root
            data-slot="checkbox-label-text"
            htmlFor={checkboxId}
            className={cn(
              "text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
              disabled && "cursor-not-allowed opacity-70",
            )}
            {...labelProps}
          >
            {label}
          </LabelPrimitive.Root>
        </div>
        {description ? (
          <p data-slot="checkbox-description" className="pl-7 text-sm text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
    );
  },
);
CheckboxLabel.displayName = "CheckboxLabel";
