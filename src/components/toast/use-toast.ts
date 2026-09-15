"use client";

import * as React from "react";

/* -------------------------------------------------------------------------------------------------
 * Toast store
 *
 * A small, framework-agnostic module-level store (no Next.js dependency), following the same
 * "plain module state + subscriber list" shape as `ThemeProvider`/`useTheme`
 * (`src/components/theme-provider.tsx`) - except here the state lives outside React entirely
 * (rather than in a Provider's `useState`) so that the standalone `toast()` function can push a
 * new toast from anywhere in an app (an event handler, a fetch callback, outside any component
 * tree) without needing access to a hook or context. `useToast()` subscribes a component (in
 * practice, just `Toaster`) to that external state via `useSyncExternalStore`.
 *
 * Behavior:
 *  - Each `toast()` call is capped at `TOAST_LIMIT` visible toasts (oldest dropped first), so a
 *    burst of calls doesn't paper the screen.
 *  - Each toast auto-dismisses after `duration` ms (default `DEFAULT_TOAST_DURATION`), unless
 *    `duration: Infinity` is passed.
 *  - "Dismiss" first flips `open: false` (letting `Toast.Root`'s own exit animation play) and only
 *    removes the toast from the store `TOAST_REMOVE_DELAY` ms later. Radix's own swipe-to-dismiss /
 *    Escape handling calls back through the same `onOpenChange` -> `dismiss()` path, so every
 *    dismissal route converges here.
 * ---------------------------------------------------------------------------------------------- */

export type ToastVariant = "default" | "destructive";

export interface ToasterToast {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** Typically a `<ToastAction>` (see `./toast.tsx`). */
  action?: React.ReactNode;
  variant?: ToastVariant;
  /** Milliseconds before this toast auto-dismisses. `Infinity` disables auto-dismiss. */
  duration?: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export type ToastInput = Omit<ToasterToast, "id" | "open" | "onOpenChange">;

const TOAST_LIMIT = 3;
const DEFAULT_TOAST_DURATION = 5000;
const TOAST_REMOVE_DELAY = 300;

type Action =
  | { type: "ADD_TOAST"; toast: ToasterToast }
  | { type: "DISMISS_TOAST"; toastId?: string }
  | { type: "REMOVE_TOAST"; toastId?: string };

interface State {
  toasts: ToasterToast[];
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_TOAST":
      return { toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT) };

    case "DISMISS_TOAST": {
      const { toastId } = action;
      return {
        toasts: state.toasts.map((toast) =>
          toast.id === toastId || toastId === undefined ? { ...toast, open: false } : toast,
        ),
      };
    }

    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return { toasts: [] };
      }
      return { toasts: state.toasts.filter((toast) => toast.id !== action.toastId) };
  }
}

let memoryState: State = { toasts: [] };
const listeners = new Set<(state: State) => void>();
const autoDismissTimeouts = new Map<string, ReturnType<typeof setTimeout>>();
const removeTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => listener(memoryState));
}

function clearTimeoutFor(map: Map<string, ReturnType<typeof setTimeout>>, id: string) {
  const existing = map.get(id);
  if (existing) {
    clearTimeout(existing);
    map.delete(id);
  }
}

function scheduleRemove(id: string) {
  clearTimeoutFor(removeTimeouts, id);
  removeTimeouts.set(
    id,
    setTimeout(() => {
      removeTimeouts.delete(id);
      dispatch({ type: "REMOVE_TOAST", toastId: id });
    }, TOAST_REMOVE_DELAY),
  );
}

function dismiss(toastId?: string) {
  dispatch({ type: "DISMISS_TOAST", toastId });
  if (toastId) {
    clearTimeoutFor(autoDismissTimeouts, toastId);
    scheduleRemove(toastId);
  } else {
    memoryState.toasts.forEach((toast) => {
      clearTimeoutFor(autoDismissTimeouts, toast.id);
      scheduleRemove(toast.id);
    });
  }
}

let nextId = 0;
function generateId() {
  nextId = (nextId + 1) % Number.MAX_SAFE_INTEGER;
  return nextId.toString();
}

export interface ToastHandle {
  id: string;
  dismiss: () => void;
  update: (toast: ToastInput) => void;
}

/**
 * Enqueues a toast. Can be called from anywhere - a click handler, a promise `.then()`, an
 * imported utility - not just from inside a React component. Returns a handle to imperatively
 * `update()` or `dismiss()` that specific toast later (e.g. to move a "Saving..." toast to
 * "Saved").
 */
export function toast(input: ToastInput): ToastHandle {
  const id = generateId();

  const update = (next: ToastInput) =>
    dispatch({ type: "ADD_TOAST", toast: { ...next, id, open: true, onOpenChange } });

  function onOpenChange(open: boolean) {
    if (!open) dismiss(id);
  }

  dispatch({
    type: "ADD_TOAST",
    toast: { ...input, id, open: true, onOpenChange },
  });

  const duration = input.duration ?? DEFAULT_TOAST_DURATION;
  if (duration !== Infinity) {
    autoDismissTimeouts.set(
      id,
      setTimeout(() => dismiss(id), duration),
    );
  }

  return { id, dismiss: () => dismiss(id), update };
}

/**
 * Subscribes the calling component to the toast store. `Toaster` (`./toast.tsx`) is the intended
 * consumer - render one `<Toaster />` near the root of an app, then call the standalone `toast()`
 * function from anywhere to trigger one.
 */
export function useToast() {
  const state = React.useSyncExternalStore(
    (onStoreChange) => {
      listeners.add(onStoreChange);
      return () => listeners.delete(onStoreChange);
    },
    () => memoryState,
    () => memoryState,
  );

  return {
    toasts: state.toasts,
    toast,
    dismiss,
  };
}
