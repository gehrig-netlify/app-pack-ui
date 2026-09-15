"use client";

import * as React from "react";
import { Slider as SliderPrimitive } from "radix-ui";

import { cn } from "../lib/cn";

export interface SliderProps extends React.ComponentProps<typeof SliderPrimitive.Root> {}

/**
 * A Radix `Slider.Root` (track + range + one thumb per value). Fully controlled/uncontrolled per
 * Radix's own `value`/`defaultValue` props — pass an array of length > 1 for a range slider and a
 * thumb is rendered for each value.
 */
export const Slider = React.forwardRef<React.ComponentRef<typeof SliderPrimitive.Root>, SliderProps>(
  ({ className, defaultValue, value, min = 0, max = 100, ...props }, ref) => {
    const values = value ?? defaultValue ?? [min];

    return (
      <SliderPrimitive.Root
        ref={ref}
        data-slot="slider"
        defaultValue={defaultValue}
        value={value}
        min={min}
        max={max}
        className={cn(
          "relative flex w-full touch-none select-none items-center data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
          className,
        )}
        {...props}
      >
        <SliderPrimitive.Track
          data-slot="slider-track"
          className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-muted"
        >
          <SliderPrimitive.Range data-slot="slider-range" className="absolute h-full bg-primary" />
        </SliderPrimitive.Track>
        {values.map((_, index) => (
          <SliderPrimitive.Thumb
            key={index}
            data-slot="slider-thumb"
            className="block size-4 shrink-0 rounded-full border-2 border-primary bg-background shadow-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          />
        ))}
      </SliderPrimitive.Root>
    );
  },
);
Slider.displayName = "Slider";
