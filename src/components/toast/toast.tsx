"use client";

import * as React from "react";
import { Toast as ToastPrimitive } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";

import { cn } from "../../lib/cn";
import { useToast, toast } from "./use-toast";

export { useToast, toast };
export type { ToasterToast, ToastInput, ToastHandle, ToastVariant } from "./use-toast";

/* -------------------------------------------------------------------------------------------------
 * Toaster / ToastAction
 *
 * Built on Radix `Toast.Provider/Viewport/Root/Title/Description/Action/Close`. Mount a single
 * `<Toaster />` once near the root of an app (it renders its own `Toast.Provider` + `Viewport`),
 * then call the standalone `toast()` function (from `./use-toast`) anywhere to enqueue one - see
 * `toast.stories.tsx` for a button wired up this way.
 * ---------------------------------------------------------------------------------------------- */

const toastVariants = cva(
  "pointer-events-auto relative flex w-full items-center justify-between gap-4 overflow-hidden rounded-[10px] border p-4 shadow-lg",
  {
    variants: {
      variant: {
        default: "border-border bg-background text-foreground",
        destructive: "border-destructive bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastPrimitive.Provider swipeDirection="right">
      {toasts.map(({ id, title, description, action, variant, open, onOpenChange }) => (
        <ToastPrimitive.Root
          key={id}
          open={open}
          onOpenChange={onOpenChange}
          className={cn(
            toastVariants({ variant }),
            "data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none",
          )}
        >
          <div className="grid gap-2">
            {title ? (
              <ToastPrimitive.Title className="text-base font-medium leading-none">
                {title}
              </ToastPrimitive.Title>
            ) : null}
            {description ? (
              <ToastPrimitive.Description className="text-sm opacity-90">
                {description}
              </ToastPrimitive.Description>
            ) : null}
          </div>
          {action}
          <ToastPrimitive.Close
            aria-label="Close"
            className="absolute right-2 top-2 rounded-md p-1 opacity-60 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <X className="size-4" />
          </ToastPrimitive.Close>
        </ToastPrimitive.Root>
      ))}
      <ToastPrimitive.Viewport className="fixed bottom-0 right-0 z-[100] m-0 flex w-full max-w-[420px] list-none flex-col gap-2 p-6 outline-none" />
    </ToastPrimitive.Provider>
  );
}

export interface ToastActionProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Action>,
    VariantProps<typeof toastActionVariants> {}

const toastActionVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-md border px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-input bg-background text-foreground hover:bg-muted",
        destructive:
          "border-destructive-foreground/30 bg-transparent text-destructive-foreground hover:bg-destructive-foreground/10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

/** A styled `Toast.Action`. Pass one as a toast's `action` (e.g. `toast({ action: <ToastAction altText="Undo">Undo</ToastAction> })`). */
export const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Action>,
  ToastActionProps
>(({ className, variant, ...props }, ref) => (
  <ToastPrimitive.Action
    ref={ref}
    data-slot="toast-action"
    className={cn(toastActionVariants({ variant }), className)}
    {...props}
  />
));
ToastAction.displayName = "ToastAction";
