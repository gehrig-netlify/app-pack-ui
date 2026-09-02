import type { ReactNode } from "react";
import { EmptyState } from "./empty-state";

export interface NotFoundStateProps {
  title?: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function NotFoundState({
  title = "Page not found",
  description = "The page you're looking for doesn't exist or was moved.",
  action,
  className,
}: NotFoundStateProps) {
  return (
    <EmptyState
      title={title}
      description={description}
      action={action}
      size="lg"
      className={className}
    />
  );
}
