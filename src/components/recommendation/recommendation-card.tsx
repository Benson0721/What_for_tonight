import Link from "next/link";
import { FavoriteButton } from "@/components/recommendation/favorite-button";
import type { RecommendationViewModel } from "@/types/recommendation";

type RecommendationCardProps = {
  recommendation: RecommendationViewModel;
  selectionHref: string;
};

export function RecommendationCard({
  recommendation,
  selectionHref,
}: RecommendationCardProps) {
  return (
    <article className="flex h-full min-h-[34rem] flex-col rounded-[28px] border border-[var(--color-border)] bg-[var(--color-panel-strong)] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.18)]">
      <div className="flex flex-wrap gap-2">
        <span className="rounded-full bg-[rgba(255,255,255,0.08)] px-3 py-1 text-xs text-[var(--color-accent)]">
          {recommendation.categoryLabel}
        </span>
        {recommendation.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs text-[var(--color-muted)]"
          >
            {tag}
          </span>
        ))}
      </div>

      <h2 className="mt-4 text-xl leading-8 font-semibold">{recommendation.title}</h2>
      <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
        {recommendation.shortDescription}
      </p>

      <dl className="mt-4 grid grid-cols-3 gap-3 text-left text-xs text-[var(--color-muted)]">
        <div className="rounded-2xl border border-[var(--color-border)] bg-[rgba(255,255,255,0.04)] p-3">
          <dt className="text-[10px] uppercase tracking-[0.16em]">時間</dt>
          <dd className="mt-2 text-sm text-white">{recommendation.timeLabel}</dd>
        </div>
        <div className="rounded-2xl border border-[var(--color-border)] bg-[rgba(255,255,255,0.04)] p-3">
          <dt className="text-[10px] uppercase tracking-[0.16em]">預算</dt>
          <dd className="mt-2 text-sm text-white">{recommendation.budgetLabel}</dd>
        </div>
        <div className="rounded-2xl border border-[var(--color-border)] bg-[rgba(255,255,255,0.04)] p-3">
          <dt className="text-[10px] uppercase tracking-[0.16em]">地點</dt>
          <dd className="mt-2 text-sm text-white">{recommendation.locationLabel}</dd>
        </div>
      </dl>

      <div className="mt-4 rounded-2xl border border-[rgba(245,238,233,0.12)] bg-[rgba(255,255,255,0.04)] p-4">
        <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-accent)]">
          為什麼推薦給你
        </p>
        <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
          {recommendation.reasonText}
        </p>
      </div>

      <div className="mt-auto pt-5 flex flex-col gap-3">
        <Link
          href={selectionHref}
          className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[var(--color-accent)] px-5 text-sm font-semibold text-[var(--color-accent-ink)] transition hover:opacity-90"
        >
          {recommendation.ctaLabel}
        </Link>
        <FavoriteButton activityId={recommendation.id} />
      </div>
    </article>
  );
}
