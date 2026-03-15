import type {
  Budget,
  Duration,
  Energy,
  Intent,
  Location,
} from "@/types/filters";

export type ActivityCategory =
  | "relax"
  | "light-exercise"
  | "self-growth"
  | "micro-social"
  | "city-explore"
  | "creative"
  | "recovery";

export type Activity = {
  id: string;
  title: string;
  category: ActivityCategory;
  shortDescription: string;
  energyFit: Energy[];
  intentFit: Intent[];
  budgetFit: Exclude<Budget, "any">[];
  durationFit: Exclude<Duration, "any">[];
  locationFit: Exclude<Location, "any">[];
  timeLabel: string;
  budgetLabel: string;
  locationLabel: string;
  reasonTemplates: string[];
  ctaLabel: string;
  tags: string[];
  isGenericFallback?: boolean;
};

export type RecommendationViewModel = {
  id: string;
  title: string;
  categoryLabel: string;
  shortDescription: string;
  timeLabel: string;
  budgetLabel: string;
  locationLabel: string;
  reasonText: string;
  ctaLabel: string;
  tags: string[];
};
