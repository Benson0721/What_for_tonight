"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  buildRecommendationsHref,
  type RecommendationSearchParams,
} from "@/lib/filters/search-params";

type RegenerateButtonProps = {
  currentFilters: RecommendationSearchParams;
  currentIds: string[];
};

export function RegenerateButton({
  currentFilters,
  currentIds,
}: RegenerateButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    startTransition(() => {
      const exclude = Array.from(
        new Set([...(currentFilters.exclude ?? []), ...currentIds]),
      ).slice(-9);

      router.push(
        buildRecommendationsHref({
          ...currentFilters,
          seed: (currentFilters.seed ?? 17) + 1,
          exclude,
        }),
      );
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--color-accent)] px-5 text-sm font-semibold text-[var(--color-accent-ink)] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {isPending ? "換一組中..." : "換一組推薦"}
    </button>
  );
}
