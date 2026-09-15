"use client";

import * as React from "react";

import { cn } from "../lib/cn";

/* -------------------------------------------------------------------------------------------------
 * Questionnaire
 *
 * A single-select "question card" step, per the Figma reference: a "Question X of Y" progress
 * label, a title/description pair, a list of selectable answer option cards (each with an optional
 * detail line and a letter badge), and Back/Next actions.
 *
 * Selection is implemented with native `<input type="radio">` inputs (visually hidden, the whole
 * card is the `<label>`) rather than a Radix primitive - a plain native radio group already gives
 * correct `role="radiogroup"`/keyboard semantics for free, and nothing here needs portal, overlay,
 * or roving-tabindex behavior beyond what the browser provides (same rationale `DataTablePagination`
 * documents for sticking with plain elements). If a future revision needs an accordion-like
 * expand/collapse per option, compose this package's own `Accordion` around each option instead of
 * reaching for a new primitive.
 * ---------------------------------------------------------------------------------------------- */

export interface QuestionnaireOption {
  /** Stable value submitted when this option is selected. */
  value: string;
  /** Primary label, e.g. "Answer option 1". */
  label: string;
  /** Optional supporting detail line rendered under the label. */
  description?: string;
  /** Optional short badge rendered at the trailing edge (e.g. "A"). Defaults to A/B/C/... by index. */
  badge?: string;
  disabled?: boolean;
}

export interface QuestionnaireProps {
  /** 1-based index of the current question, e.g. `1` in "Question 1 of 3". */
  questionNumber: number;
  /** Total number of questions, e.g. `3` in "Question 1 of 3". */
  totalQuestions: number;
  /** Question title, e.g. "What would you like to build next?". */
  title: string;
  /** Optional supporting copy under the title, e.g. "Select from the options below". */
  description?: string;
  options: QuestionnaireOption[];
  /** Controlled selected option value. */
  value?: string;
  /** Uncontrolled initial selected option value. */
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Name applied to the underlying radio inputs. Auto-generated via `useId` if omitted. */
  name?: string;
  onBack?: () => void;
  onNext?: () => void;
  backLabel?: string;
  nextLabel?: string;
  backDisabled?: boolean;
  nextDisabled?: boolean;
  /** Hides the Back/Next action row entirely (e.g. for a read-only summary view). */
  hideActions?: boolean;
  className?: string;
}

function badgeForIndex(index: number): string {
  return String.fromCharCode(65 + (index % 26));
}

export function Questionnaire({
  questionNumber,
  totalQuestions,
  title,
  description,
  options,
  value,
  defaultValue,
  onValueChange,
  name,
  onBack,
  onNext,
  backLabel = "Back",
  nextLabel = "Next",
  backDisabled = false,
  nextDisabled = false,
  hideActions = false,
  className,
}: QuestionnaireProps) {
  const generatedName = React.useId();
  const groupName = name ?? generatedName;

  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = React.useState<string | undefined>(defaultValue);
  const selectedValue = isControlled ? value : internalValue;

  const handleChange = (nextValue: string) => {
    if (!isControlled) {
      setInternalValue(nextValue);
    }
    onValueChange?.(nextValue);
  };

  return (
    <div data-slot="questionnaire" className={cn("flex w-full max-w-[500px] flex-col gap-8", className)}>
      <div className="flex flex-col gap-7">
        <p className="text-sm text-muted-foreground">
          Question {questionNumber} of {totalQuestions}
        </p>
        <div className="flex flex-col gap-4">
          <p className="text-base font-medium text-foreground">{title}</p>
          {description ? <p className="text-base text-muted-foreground">{description}</p> : null}
        </div>
      </div>

      <div role="radiogroup" aria-label={title} className="flex w-full flex-col gap-6">
        {options.map((option, index) => {
          const inputId = `${groupName}-${option.value}`;
          const checked = selectedValue === option.value;
          return (
            <label
              key={option.value}
              htmlFor={inputId}
              data-slot="questionnaire-option"
              data-state={checked ? "checked" : "unchecked"}
              className={cn(
                "flex w-full cursor-pointer items-start justify-between gap-4 rounded-[10px] border border-border px-3.5 pb-[22px] pt-3.5 transition-colors",
                "hover:bg-accent/50",
                "has-[:checked]:bg-muted",
                option.disabled && "cursor-not-allowed opacity-50 hover:bg-transparent",
              )}
            >
              <div className="flex flex-col items-start gap-2.5">
                <div className="flex items-center gap-2.5">
                  <input
                    id={inputId}
                    type="radio"
                    name={groupName}
                    value={option.value}
                    checked={checked}
                    disabled={option.disabled}
                    onChange={() => handleChange(option.value)}
                    className="size-[18px] shrink-0 accent-foreground disabled:cursor-not-allowed"
                  />
                  <span className="text-base font-medium text-foreground">{option.label}</span>
                </div>
                {option.description ? (
                  <span className="pl-[26px] text-base text-foreground">{option.description}</span>
                ) : null}
              </div>
              <span className="flex shrink-0 items-center justify-center rounded-[4px] border border-border bg-background p-1.5 text-sm text-muted-foreground">
                {option.badge ?? badgeForIndex(index)}
              </span>
            </label>
          );
        })}
      </div>

      {hideActions ? null : (
        <div className="flex w-full items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            disabled={backDisabled}
            className="rounded-[10px] border border-foreground bg-background px-3.5 py-4 text-base text-foreground disabled:cursor-not-allowed disabled:opacity-50"
          >
            {backLabel}
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={nextDisabled}
            className="rounded-[10px] bg-primary px-3.5 py-4 text-base text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
          >
            {nextLabel}
          </button>
        </div>
      )}
    </div>
  );
}
