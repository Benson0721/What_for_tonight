import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AppScreen } from "@/components/layout/app-screen";
import {
  buildRecommendationsHref,
  parseRecommendationSearchParams,
  type SearchParamRecord,
} from "@/lib/filters/search-params";
import { activities } from "@/mocks/activities";

type DonePageProps = {
  searchParams: Promise<SearchParamRecord>;
};

function getActivityId(searchParams: SearchParamRecord) {
  const rawValue = searchParams.activityId;

  if (Array.isArray(rawValue)) {
    return rawValue[0];
  }

  return rawValue;
}

export default async function DonePage({ searchParams }: DonePageProps) {
  const resolvedSearchParams = await searchParams;
  const activityId = getActivityId(resolvedSearchParams);

  if (!activityId) {
    notFound();
  }

  const selectedActivity = activities.find((activity) => activity.id === activityId);

  if (!selectedActivity) {
    notFound();
  }

  const backToRecommendationsHref = buildRecommendationsHref(
    parseRecommendationSearchParams(resolvedSearchParams),
  );

  return (
    <main className="flex h-full flex-col px-5 pb-8 pt-8">
      <AppScreen className="flex min-h-0 flex-1 flex-col">
        <div className="image-mask relative h-40">
          <Image src="/intro2.png" alt="已選活動封面" fill className="object-cover" />
          <div className="relative z-10 h-full" />
        </div>
        <div className="app-scroll flex min-h-0 flex-1 flex-col overflow-y-auto p-6">
          <h1 className="text-3xl font-semibold">今晚就從這個開始</h1>
          <article className="mt-6 rounded-[28px] border border-[var(--color-border)] bg-[var(--color-panel-strong)] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.18)]">
            <div className="flex flex-col gap-2">
              {selectedActivity.tags.map((tag) => (
                <span
                  key={tag}
                  className="w-fit rounded-full border border-[var(--color-border)] px-3 py-1 text-xs text-[var(--color-muted)]"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="mt-4 text-2xl font-semibold">{selectedActivity.title}</h2>
            <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{selectedActivity.shortDescription}</p>
            <dl className="mt-5 grid grid-cols-1 gap-3 text-left text-xs text-[var(--color-muted)]">
              <div className="rounded-2xl border border-[var(--color-border)] bg-[rgba(255,255,255,0.04)] p-3">
                <dt className="text-[10px] uppercase tracking-[0.16em]">時間</dt>
                <dd className="mt-2 text-sm text-white">{selectedActivity.timeLabel}</dd>
              </div>
              <div className="rounded-2xl border border-[var(--color-border)] bg-[rgba(255,255,255,0.04)] p-3">
                <dt className="text-[10px] uppercase tracking-[0.16em]">預算</dt>
                <dd className="mt-2 text-sm text-white">{selectedActivity.budgetLabel}</dd>
              </div>
              <div className="rounded-2xl border border-[var(--color-border)] bg-[rgba(255,255,255,0.04)] p-3">
                <dt className="text-[10px] uppercase tracking-[0.16em]">地點</dt>
                <dd className="mt-2 text-sm text-white">{selectedActivity.locationLabel}</dd>
              </div>
            </dl>
          </article>
          <div className="mt-8 flex flex-col gap-3">
            <Link
              href={backToRecommendationsHref}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--color-accent)] px-5 text-sm font-semibold text-[var(--color-accent-ink)] transition hover:opacity-90"
            >
              換一組推薦
            </Link>
            <Link
              href="/"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-panel-strong)] px-5 text-sm font-medium"
            >
              回首頁
            </Link>
          </div>
        </div>
      </AppScreen>
    </main>
  );
}
