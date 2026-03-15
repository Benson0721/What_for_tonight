import type {
  Budget,
  Duration,
  Energy,
  FilterState,
  Intent,
  Location,
} from "@/types/filters";

export type SearchParamRecord = Record<string, string | string[] | undefined>;

export type RecommendationSearchParams = FilterState & {
  seed?: number;
  exclude?: string[];
};

const energyValues = new Set<Energy>(["tired", "normal", "energetic"]);
const intentValues = new Set<Intent>(["relax", "fulfill", "move", "explore"]);
const budgetValues = new Set<Budget>(["free", "low", "any"]);
const durationValues = new Set<Duration>(["short", "medium", "long", "any"]);
const locationValues = new Set<Location>(["home", "nearby", "any"]);

function normalizeSingleValue(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

export function parseFilterParams(searchParams: SearchParamRecord): FilterState {
  const energy = normalizeSingleValue(searchParams.energy);
  const intent = normalizeSingleValue(searchParams.intent);
  const budget = normalizeSingleValue(searchParams.budget);
  const duration = normalizeSingleValue(searchParams.duration);
  const location = normalizeSingleValue(searchParams.location);

  return {
    energy: energyValues.has(energy as Energy) ? (energy as Energy) : undefined,
    intent: intentValues.has(intent as Intent) ? (intent as Intent) : undefined,
    budget: budgetValues.has(budget as Budget) ? (budget as Budget) : undefined,
    duration: durationValues.has(duration as Duration)
      ? (duration as Duration)
      : undefined,
    location: locationValues.has(location as Location)
      ? (location as Location)
      : undefined,
  };
}

export function parseRecommendationSearchParams(
  searchParams: SearchParamRecord,
): RecommendationSearchParams {
  const filters = parseFilterParams(searchParams);
  const seedValue = normalizeSingleValue(searchParams.seed);
  const excludeValue = normalizeSingleValue(searchParams.exclude);

  const seed =
    seedValue && /^\d+$/.test(seedValue) ? Number.parseInt(seedValue, 10) : undefined;
  const exclude = excludeValue
    ? excludeValue
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    : undefined;

  return {
    ...filters,
    seed,
    exclude,
  };
}

export function serializeFilterParams(filters: RecommendationSearchParams) {
  const params = new URLSearchParams();

  if (filters.energy) {
    params.set("energy", filters.energy);
  }

  if (filters.intent) {
    params.set("intent", filters.intent);
  }

  if (filters.budget) {
    params.set("budget", filters.budget);
  }

  if (filters.duration) {
    params.set("duration", filters.duration);
  }

  if (filters.location) {
    params.set("location", filters.location);
  }

  if (typeof filters.seed === "number" && Number.isFinite(filters.seed)) {
    params.set("seed", filters.seed.toString());
  }

  if (filters.exclude && filters.exclude.length > 0) {
    params.set("exclude", filters.exclude.join(","));
  }

  return params.toString();
}

export function buildPlanHref(filters: RecommendationSearchParams) {
  const query = serializeFilterParams(filters);
  return query ? `/plan?${query}` : "/plan";
}

export function buildRecommendationsHref(filters: RecommendationSearchParams) {
  const query = serializeFilterParams(filters);
  return query ? `/recommendations?${query}` : "/recommendations";
}

export function hasMeaningfulFilters(filters: FilterState) {
  return Boolean(
    filters.energy ||
      filters.intent ||
      (filters.budget && filters.budget !== "any") ||
      (filters.duration && filters.duration !== "any") ||
      (filters.location && filters.location !== "any"),
  );
}

