"use client";

import * as React from "react";
import { RadioGroup as RadioGroupPrimitive } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/cn";

export interface RadioGroupProps extends React.ComponentProps<typeof RadioGroupPrimitive.Root> {}

/** A Radix `RadioGroup.Root` — arranges `RadioGroupItem`s in a vertical stack by default. */
export const RadioGroup = React.forwardRef<React.ComponentRef<typeof RadioGroupPrimitive.Root>, RadioGroupProps>(
  ({ className, ...props }, ref) => (
    <RadioGroupPrimitive.Root
      ref={ref}
      data-slot="radio-group"
      className={cn("flex flex-col gap-3", className)}
      {...props}
    />
  ),
);
RadioGroup.displayName = "RadioGroup";

const radioGroupItemVariants = cva(
  "peer aspect-square shrink-0 rounded-full border border-input shadow-xs outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-primary",
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

export interface RadioGroupItemProps
  extends React.ComponentProps<typeof RadioGroupPrimitive.Item>,
    VariantProps<typeof radioGroupItemVariants> {}

/** A single Radix `RadioGroup.Item` + `RadioGroup.Indicator` (a filled dot on the current `--color-primary`). */
export const RadioGroupItem = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className, size, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    data-slot="radio-group-item"
    className={cn(radioGroupItemVariants({ size }), className)}
    {...props}
  >
    <RadioGroupPrimitive.Indicator
      data-slot="radio-group-indicator"
      className="relative flex size-full items-center justify-center after:block after:size-[45%] after:rounded-full after:bg-primary"
    />
  </RadioGroupPrimitive.Item>
));
RadioGroupItem.displayName = "RadioGroupItem";
