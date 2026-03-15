import { describe, expect, it } from "vitest";
import {
  buildPlanHref,
  buildRecommendationsHref,
  parseFilterParams,
  parseRecommendationSearchParams,
  serializeFilterParams,
} from "@/lib/filters/search-params";

describe("search params helpers", () => {
  it("ignores invalid filter values when parsing", () => {
    expect(
      parseFilterParams({
        energy: "unknown",
        intent: "relax",
        budget: "free",
        duration: "bad",
        location: "home",
      }),
    ).toEqual({
      energy: undefined,
      intent: "relax",
      budget: "free",
      duration: undefined,
      location: "home",
    });
  });

  it("parses recommendation-only params conservatively", () => {
    expect(
      parseRecommendationSearchParams({
        energy: "normal",
        seed: "19",
        exclude: "a, b , ,c",
      }),
    ).toEqual({
      energy: "normal",
      intent: undefined,
      budget: undefined,
      duration: undefined,
      location: undefined,
      seed: 19,
      exclude: ["a", "b", "c"],
    });
  });

  it("serializes only defined values", () => {
    expect(
      serializeFilterParams({
        energy: "tired",
        location: "home",
        seed: 4,
      }),
    ).toBe("energy=tired&location=home&seed=4");
  });

  it("builds plan and recommendations hrefs", () => {
    expect(buildPlanHref({ intent: "explore" })).toBe("/plan?intent=explore");
    expect(buildRecommendationsHref({})).toBe("/recommendations");
  });
});
