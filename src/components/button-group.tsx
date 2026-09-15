import * as React from "react";
import { cn } from "../lib/cn";

export interface ButtonGroupProps extends React.ComponentProps<"div"> {}

/**
 * Layout wrapper that renders a row of `Button`s joined into a single visual unit: shared border
 * radius only at the group's two ends, with adjacent borders collapsed via a negative margin. A
 * plain `<div role="group">` - no Radix primitive needed, per the reasoning in
 * `data-table/pagination.tsx`.
 */
export function ButtonGroup({ className, children, ...props }: ButtonGroupProps) {
  const items = React.Children.toArray(children) as React.ReactElement<{
    className?: string;
  }>[];

  return (
    <div role="group" className={cn("inline-flex items-center", className)} {...props}>
      {items.map((child, index) => {
        if (!React.isValidElement(child)) {
          return child;
        }
        const isFirst = index === 0;
        const isLast = index === items.length - 1;
        return React.cloneElement(child, {
          key: child.key ?? index,
          className: cn(
            child.props.className,
            "rounded-none focus-visible:relative focus-visible:z-10",
            isFirst && "rounded-l-lg",
            isLast && "rounded-r-lg",
            !isFirst && "-ml-px",
          ),
        });
      })}
    </div>
  );
}
