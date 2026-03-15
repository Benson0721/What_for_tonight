"use client";

import type { FilterOption } from "@/types/filters";

type FilterChipGroupProps<T extends string> = {
  legend: string;
  options: FilterOption<T>[];
  selectedValue?: T;
  onChange: (value?: T) => void;
};

export function FilterChipGroup<T extends string>({
  legend,
  options,
  selectedValue,
  onChange,
}: FilterChipGroupProps<T>) {
  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-medium text-[rgba(245,238,233,0.92)]">
        {legend}
      </legend>
      <div className="flex flex-wrap gap-3">
        {options.map((option) => {
          const isSelected = option.value === selectedValue;

          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onChange(isSelected ? undefined : option.value)}
              className={`min-h-11 rounded-full border px-4 text-sm transition ${
                isSelected
                  ? "border-[rgba(245,238,233,0.65)] bg-[rgba(245,238,233,0.16)] text-white"
                  : "border-[var(--color-border)] bg-[var(--color-panel-strong)] text-[var(--color-muted)]"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

