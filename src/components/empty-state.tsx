import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import { cn } from "../lib/cn";

const emptyStateVariants = cva(
  "flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border text-center",
  {
    variants: {
      size: {
        sm: "p-6",
        md: "p-10",
        lg: "p-16",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export interface EmptyStateProps extends VariantProps<typeof emptyStateVariants> {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  size,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn(emptyStateVariants({ size }), className)} role="status">
      {icon ? (
        <div className="text-muted-foreground [&_svg]:size-10" aria-hidden="true">
          {icon}
        </div>
      ) : null}
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-foreground">{title}</p>
        {description ? (
          <p className="text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  );
}
