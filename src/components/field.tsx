"use client";

import * as React from "react";
import { cn } from "../lib/cn";

/* -------------------------------------------------------------------------------------------------
 * Field context
 *
 * Field is the framework-agnostic sibling of `Form`'s `FormItem`/`FormLabel`/`FormControl`/
 * `FormMessage` (see form.tsx) - it wires up the same id/aria plumbing (one generated id shared by
 * the label, control, description, and error message) but has no dependency on `react-hook-form`.
 * Use it for any label+control+message grouping outside of a `<Form>` - a search box, a filter
 * control, a settings toggle, etc.
 * ---------------------------------------------------------------------------------------------- */

interface FieldContextValue {
  id: string;
  invalid: boolean;
}

const FieldContext = React.createContext<FieldContextValue | null>(null);

function useField(): FieldContextValue {
  const context = React.useContext(FieldContext);
  if (!context) {
    throw new Error("FieldLabel/FieldControl/FieldDescription/FieldError must be used within a <Field>");
  }
  return context;
}

/* -------------------------------------------------------------------------------------------------
 * Field
 * ---------------------------------------------------------------------------------------------- */

export interface FieldProps extends React.ComponentProps<"div"> {
  /** Marks the field as invalid - styles `FieldLabel` as destructive and sets `aria-invalid` on `FieldControl`'s child. */
  invalid?: boolean;
}

/** Groups a label, control, and description/error message for a single field. Generates the shared `id` they use. */
export function Field({ invalid = false, className, ...props }: FieldProps) {
  const id = React.useId();

  return (
    <FieldContext.Provider value={{ id, invalid }}>
      <div data-slot="field" className={cn("grid gap-2", className)} {...props} />
    </FieldContext.Provider>
  );
}

/* -------------------------------------------------------------------------------------------------
 * FieldLabel / FieldControl
 * ---------------------------------------------------------------------------------------------- */

export interface FieldLabelProps extends React.ComponentProps<"label"> {}

/** A plain `<label htmlFor>` - no Radix primitive needed. Styled for the field's invalid state. */
export function FieldLabel({ className, ...props }: FieldLabelProps) {
  const { id, invalid } = useField();

  return (
    <label
      data-slot="field-label"
      data-invalid={invalid}
      htmlFor={id}
      className={cn("text-sm font-medium leading-none data-[invalid=true]:text-destructive", className)}
      {...props}
    />
  );
}

export interface FieldControlProps {
  /**
   * A single control element (e.g. `<input>`, `<select>`, `<textarea>`, or a consumer-supplied
   * component that forwards these props to one). Its `id`, `aria-invalid`, and `aria-describedby`
   * are wired up automatically via `React.cloneElement`.
   */
  children: React.ReactElement<any>;
}

/**
 * Wires the field's generated id and aria attributes onto its single child element. This package
 * does not ship `Input`/`Select`/etc. atoms - bring your own and wrap them in `FieldControl`.
 */
export function FieldControl({ children }: FieldControlProps) {
  const { id, invalid } = useField();

  return React.cloneElement(children, {
    id,
    "aria-invalid": invalid,
    "aria-describedby": `${id}-description ${id}-error`,
  });
}

/* -------------------------------------------------------------------------------------------------
 * FieldDescription / FieldError
 * ---------------------------------------------------------------------------------------------- */

export interface FieldDescriptionProps extends React.ComponentProps<"p"> {}

/** Static hint text shown below the control, regardless of validity. */
export function FieldDescription({ className, ...props }: FieldDescriptionProps) {
  const { id } = useField();

  return (
    <p
      data-slot="field-description"
      id={`${id}-description`}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export interface FieldErrorProps extends React.ComponentProps<"p"> {}

/** Validation error text - only render this when the field is actually invalid. */
export function FieldError({ className, ...props }: FieldErrorProps) {
  const { id } = useField();

  return (
    <p
      data-slot="field-error"
      id={`${id}-error`}
      role="alert"
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    />
  );
}
