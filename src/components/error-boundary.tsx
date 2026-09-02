import type { ComponentType, ReactNode } from "react";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";
import { EmptyState } from "./empty-state";

export interface AppErrorBoundaryProps {
  children: ReactNode;
  fallback?: ComponentType<{ error: unknown; resetErrorBoundary: () => void }>;
  onError?: (error: unknown, info: { componentStack: string }) => void;
  onReset?: () => void;
}

function DefaultFallback({ resetErrorBoundary }: FallbackProps) {
  return (
    <EmptyState
      title="Something went wrong"
      description="An unexpected error occurred. Try again, or contact support if it keeps happening."
      size="lg"
      action={
        <button
          type="button"
          onClick={resetErrorBoundary}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Try again
        </button>
      }
    />
  );
}

export function AppErrorBoundary({
  children,
  fallback: FallbackComponent = DefaultFallback,
  onError,
  onReset,
}: AppErrorBoundaryProps) {
  return (
    <ErrorBoundary
      FallbackComponent={FallbackComponent}
      onError={(error, info) =>
        onError?.(error, { componentStack: info.componentStack ?? "" })
      }
      onReset={onReset}
    >
      {children}
    </ErrorBoundary>
  );
}
