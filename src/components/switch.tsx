"use client";

import * as React from "react";
import { Switch as SwitchPrimitive } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/cn";

/*
 * NOTE: the Figma "Switch" frame (node 39:3417) is a rough mockup that literally reuses checkbox
 * iconography (square boxes) as a design placeholder for an on/off toggle — it isn't a real
 * switch. That art is not reproduced here; this implements a real Radix `Switch.Root` (a sliding
 * pill-shaped track with a circular thumb that animates between positions), which is the
 * accessible, idiomatic control the mockup was actually gesturing at.
 */

const switchVariants = cva(
  "peer inline-flex shrink-0 items-center rounded-full border border-transparent p-0.5 shadow-xs outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
  {
    variants: {
      size: {
        sm: "h-5 w-9",
        md: "h-[26px] w-[46px]",
        lg: "h-7 w-12",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const switchThumbVariants = cva(
  "pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=unchecked]:translate-x-0",
  {
    variants: {
      size: {
        sm: "size-4 data-[state=checked]:translate-x-4",
        md: "size-[22px] data-[state=checked]:translate-x-5",
        lg: "size-6 data-[state=checked]:translate-x-5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export interface SwitchProps
  extends React.ComponentProps<typeof SwitchPrimitive.Root>,
    VariantProps<typeof switchVariants> {}

/** A Radix `Switch.Root` + `Switch.Thumb` — a sliding on/off toggle (not checkbox art; see file note). */
export const Switch = React.forwardRef<React.ComponentRef<typeof SwitchPrimitive.Root>, SwitchProps>(
  ({ className, size, ...props }, ref) => (
    <SwitchPrimitive.Root
      ref={ref}
      data-slot="switch"
      className={cn(switchVariants({ size }), className)}
      {...props}
    >
      <SwitchPrimitive.Thumb data-slot="switch-thumb" className={cn(switchThumbVariants({ size }))} />
    </SwitchPrimitive.Root>
  ),
);
Switch.displayName = "Switch";
