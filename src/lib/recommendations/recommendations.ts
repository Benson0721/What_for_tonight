import { activities } from "@/mocks/activities";
import {
  getFilterLabel,
  type Budget,
  type Duration,
  type FilterState,
  type Location,
} from "@/types/filters";
import type {
  Activity,
  ActivityCategory,
  RecommendationViewModel,
} from "@/types/recommendation";
import type { RecommendationSearchParams } from "@/lib/filters/search-params";
import { hasMeaningfulFilters } from "@/lib/filters/search-params";

const categoryLabelMap: Record<ActivityCategory, string> = {
  relax: "放鬆",
  "light-exercise": "輕運動",
  "self-growth": "自我充實",
  "micro-social": "微社交",
  "city-explore": "城市探索",
  creative: "創作",
  recovery: "恢復感",
};

function scoreMatch(isMatch: boolean, weight: number) {
  return isMatch ? weight : 0;
}

function normalizeBudgetValue(value: Budget | undefined) {
  return value && value !== "any" ? value : undefined;
}

function normalizeDurationValue(value: Duration | undefined) {
  return value && value !== "any" ? value : undefined;
}

function normalizeLocationValue(value: Location | undefined) {
  return value && value !== "any" ? value : undefined;
}

function isDefined(value: string | undefined): value is string {
  return Boolean(value);
}

export function scoreActivity(activity: Activity, filters: FilterState) {
  const budget = normalizeBudgetValue(filters.budget);
  const duration = normalizeDurationValue(filters.duration);
  const location = normalizeLocationValue(filters.location);

  return (
    scoreMatch(Boolean(filters.energy && activity.energyFit.includes(filters.energy)), 3) +
    scoreMatch(Boolean(filters.intent && activity.intentFit.includes(filters.intent)), 3) +
    scoreMatch(Boolean(budget && activity.budgetFit.includes(budget)), 2) +
    scoreMatch(Boolean(duration && activity.durationFit.includes(duration)), 2) +
    scoreMatch(Boolean(location && activity.locationFit.includes(location)), 2)
  );
}

function stableRank(id: string, seed: number) {
  let hash = seed || 17;

  for (const char of id) {
    hash = (hash * 33 + char.charCodeAt(0)) % 100000;
  }

  return hash;
}

function buildMatchReason(filters: FilterState) {
  const labels = [
    getFilterLabel(filters.energy),
    getFilterLabel(filters.intent),
    getFilterLabel(normalizeBudgetValue(filters.budget)),
    getFilterLabel(normalizeDurationValue(filters.duration)),
    getFilterLabel(normalizeLocationValue(filters.location)),
  ].filter(isDefined);

  if (labels.length === 0) {
    return "你這次沒有特別設條件，所以先給你一組低決策成本、容易開始的今晚選項。";
  }

  if (labels.length === 1) {
    return `這個選項和你現在偏向「${labels[0]}」的狀態很貼近。`;
  }

  return `這個選項同時照顧到你現在想要「${labels[0]}」和「${labels[1]}」的方向。`;
}

export function buildReasonText(activity: Activity, filters: FilterState) {
  const primaryReason = buildMatchReason(filters);
  const secondaryReason = activity.reasonTemplates[0];
  return `${primaryReason}${secondaryReason}`;
}

function mapToViewModel(
  activity: Activity,
  filters: FilterState,
): RecommendationViewModel {
  return {
    id: activity.id,
    title: activity.title,
    categoryLabel: categoryLabelMap[activity.category],
    shortDescription: activity.shortDescription,
    timeLabel: activity.timeLabel,
    budgetLabel: activity.budgetLabel,
    locationLabel: activity.locationLabel,
    reasonText: buildReasonText(activity, filters),
    ctaLabel: activity.ctaLabel,
    tags: activity.tags,
  };
}

export function pickTopRecommendations(
  filters: RecommendationSearchParams,
  pool: Activity[] = activities,
) {
  const excludedIds = new Set(filters.exclude ?? []);
  const meaningfulFilters = hasMeaningfulFilters(filters);
  const seed = filters.seed ?? 17;

  const candidatePool = pool.filter((activity) => !excludedIds.has(activity.id));
  const basePool = meaningfulFilters
    ? candidatePool
    : candidatePool.filter((activity) => activity.isGenericFallback);

  const ranked = basePool
    .map((activity) => ({
      activity,
      score: meaningfulFilters ? scoreActivity(activity, filters) : 0,
      rank: stableRank(activity.id, seed),
    }))
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }

      return left.rank - right.rank;
    });

  const selected: Activity[] = [];
  const usedCategories = new Set<ActivityCategory>();

  for (const item of ranked) {
    if (selected.length === 3) {
      break;
    }

    if (!usedCategories.has(item.activity.category)) {
      selected.push(item.activity);
      usedCategories.add(item.activity.category);
    }
  }

  for (const item of ranked) {
    if (selected.length === 3) {
      break;
    }

    if (!selected.some((activity) => activity.id === item.activity.id)) {
      selected.push(item.activity);
    }
  }

  if (selected.length < 3) {
    const fallbackPool = candidatePool
      .filter((activity) => activity.isGenericFallback)
      .filter((activity) => !selected.some((picked) => picked.id === activity.id))
      .sort((left, right) => stableRank(left.id, seed) - stableRank(right.id, seed));

    for (const activity of fallbackPool) {
      if (selected.length === 3) {
        break;
      }

      selected.push(activity);
    }
  }

  return selected.map((activity) => mapToViewModel(activity, filters));
}

export function getRecommendationSummary(filters: FilterState) {
  const labels = [
    getFilterLabel(filters.energy),
    getFilterLabel(filters.intent),
    getFilterLabel(normalizeBudgetValue(filters.budget)),
    getFilterLabel(normalizeDurationValue(filters.duration)),
    getFilterLabel(normalizeLocationValue(filters.location)),
  ].filter(isDefined);

  return labels.length > 0 ? labels : ["通用推薦"];
}
