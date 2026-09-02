import { useEffect, type ReactElement, type ReactNode } from "react";
import { Skeleton } from "./skeleton";

export interface ProtectedRouteProps {
  isAuthenticated: boolean;
  isLoading?: boolean;
  children: ReactNode;
  loadingFallback?: ReactNode;
  unauthenticatedFallback?: ReactNode;
  onUnauthenticated?: () => void;
}

/**
 * Auth-provider-agnostic and routing-library-agnostic: it never redirects
 * itself. The consumer's router glue calls `onUnauthenticated` to navigate.
 */
export function ProtectedRoute({
  isAuthenticated,
  isLoading = false,
  children,
  loadingFallback,
  unauthenticatedFallback = null,
  onUnauthenticated,
}: ProtectedRouteProps): ReactElement | null {
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      onUnauthenticated?.();
    }
  }, [isLoading, isAuthenticated, onUnauthenticated]);

  if (isLoading) {
    return (
      <>
        {loadingFallback ?? (
          <div className="flex flex-col gap-3 p-6">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        )}
      </>
    );
  }

  if (!isAuthenticated) {
    return <>{unauthenticatedFallback}</>;
  }

  return <>{children}</>;
}
