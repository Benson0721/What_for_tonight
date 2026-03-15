import Image from "next/image";
import Link from "next/link";
import { AppScreen } from "@/components/layout/app-screen";
import { ConditionSummary } from "@/components/recommendation/condition-summary";
import { RegenerateButton } from "@/components/recommendation/regenerate-button";
import { RecommendationCard } from "@/components/recommendation/recommendation-card";
import {
  buildPlanHref,
  parseRecommendationSearchParams,
  serializeFilterParams,
  type SearchParamRecord,
} from "@/lib/filters/search-params";
import {
  getRecommendationSummary,
  pickTopRecommendations,
} from "@/lib/recommendations/recommendations";

type RecommendationsPageProps = {
  searchParams: Promise<SearchParamRecord>;
};

async function waitForRecommendationTransition() {
  await new Promise((resolve) => {
    setTimeout(resolve, 2400);
  });
}

export default async function RecommendationsPage({
  searchParams,
}: RecommendationsPageProps) {
  await waitForRecommendationTransition();

  const parsedParams = parseRecommendationSearchParams(await searchParams);
  const recommendations = pickTopRecommendations(parsedParams);
  const conditionSummary = getRecommendationSummary(parsedParams);
  const backToPlanHref = buildPlanHref(parsedParams);
  const filterQuery = serializeFilterParams(parsedParams);

  return (
    <main className="flex h-full flex-col px-5 pb-8 pt-8">
      <AppScreen className="flex min-h-0 flex-1 flex-col">
        <div className="app-scroll flex min-h-0 flex-1 flex-col overflow-y-auto p-6">
          <h1 className="text-2xl font-semibold">今晚為你挑了 3 個選擇</h1>

          {recommendations.length > 0 ? (
            <div className="mt-8">
              <div className="-mx-6 overflow-hidden px-6">
                <div
                  className="carousel-scroll flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-3 pr-6"
                  aria-label="推薦卡片，可左右滑動瀏覽"
                >
                  {recommendations.map((recommendation, index) => (
                    <div
                      key={recommendation.id}
                      className="w-[calc(100%-0.2rem)] max-w-[calc(100%)]  shrink-0 snap-center first:snap-start last:pr-1"
                      aria-label={`推薦卡片 ${index + 1}`}
                    >
                      <RecommendationCard
                        recommendation={recommendation}
                        selectionHref={
                          filterQuery
                            ? `/done?activityId=${encodeURIComponent(recommendation.id)}&${filterQuery}`
                            : `/done?activityId=${encodeURIComponent(recommendation.id)}`
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-8 rounded-[28px] border border-dashed border-[var(--color-border)] bg-[var(--color-panel-strong)] p-5">
              <h2 className="text-xl font-semibold">這次沒有找到合適的 3 個選項</h2>
              <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                你可以先放寬條件，或直接換一組通用推薦。
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <Link
                  href="/recommendations"
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--color-accent)] px-5 text-sm font-semibold text-[var(--color-accent-ink)]"
                >
                  看通用推薦
                </Link>
                <Link
                  href={backToPlanHref}
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--color-border)] bg-[rgba(255,255,255,0.05)] px-5 text-sm font-medium"
                >
                  調整條件
                </Link>
              </div>
            </div>
          )}

          {recommendations.length > 0 ? (
            <div className="mt-8 flex flex-col gap-3">
              <RegenerateButton
                currentFilters={parsedParams}
                currentIds={recommendations.map((recommendation) => recommendation.id)}
              />
              <Link
                href={backToPlanHref}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-panel-strong)] px-5 text-sm font-medium"
              >
                調整條件
              </Link>
            </div>
          ) : null}
        </div>
      </AppScreen>
    </main>
  );
}
