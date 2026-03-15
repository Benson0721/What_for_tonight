"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { buildRecommendationsHref } from "@/lib/filters/search-params";
import {
  budgetOptions,
  durationOptions,
  energyOptions,
  intentOptions,
  locationOptions,
  type FilterState,
} from "@/types/filters";
import { FilterChipGroup } from "@/components/plan/filter-chip-group";

type PlanFormProps = {
  initialFilters: FilterState;
};

export function PlanForm({ initialFilters }: PlanFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [draftFilters, setDraftFilters] = useState<FilterState>(initialFilters);

  function updateFilter<Key extends keyof FilterState>(
    key: Key,
    value: FilterState[Key],
  ) {
    setDraftFilters((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function handleSubmit() {
    const href = buildRecommendationsHref(draftFilters);

    startTransition(() => {
      router.push(href);
    });
  }

  return (
    <div className="space-y-6">
      <FilterChipGroup
        legend="你現在的狀態？"
        options={energyOptions}
        selectedValue={draftFilters.energy}
        onChange={(value) => updateFilter("energy", value)}
      />
      <FilterChipGroup
        legend="今晚想要什麼感覺？"
        options={intentOptions}
        selectedValue={draftFilters.intent}
        onChange={(value) => updateFilter("intent", value)}
      />
      <FilterChipGroup
        legend="預算"
        options={budgetOptions}
        selectedValue={draftFilters.budget}
        onChange={(value) => updateFilter("budget", value)}
      />
      <FilterChipGroup
        legend="時間"
        options={durationOptions}
        selectedValue={draftFilters.duration}
        onChange={(value) => updateFilter("duration", value)}
      />
      <FilterChipGroup
        legend="地點偏好"
        options={locationOptions}
        selectedValue={draftFilters.location}
        onChange={(value) => updateFilter("location", value)}
      />

        <button
          type="button"
          disabled={isPending}
          onClick={handleSubmit}
          className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[var(--color-accent)] px-5 text-sm font-semibold text-[var(--color-accent-ink)] transition disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "前往推薦中..." : "看今晚推薦"}
        </button>
    </div>
  );
}

