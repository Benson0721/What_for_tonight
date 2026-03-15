import { describe, expect, it } from "vitest";
import { activities } from "@/mocks/activities";
import {
  buildReasonText,
  getRecommendationSummary,
  pickTopRecommendations,
  scoreActivity,
} from "@/lib/recommendations/recommendations";

describe("recommendation engine", () => {
  it("scores closer matches higher", () => {
    const activity = activities.find((item) => item.id === "home-stretch-reset");

    expect(activity).toBeDefined();
    expect(
      scoreActivity(activity!, {
        energy: "tired",
        intent: "relax",
        budget: "free",
        duration: "short",
        location: "home",
      }),
    ).toBe(12);
  });

  it("returns three recommendations for empty filters via fallback pool", () => {
    const recommendations = pickTopRecommendations({});

    expect(recommendations).toHaveLength(3);
    expect(recommendations.every((item) => item.title.length > 0)).toBe(true);
  });

  it("changes ordering when seed changes", () => {
    const first = pickTopRecommendations({ intent: "explore", seed: 17 }).map(
      (item) => item.id,
    );
    const second = pickTopRecommendations({ intent: "explore", seed: 18 }).map(
      (item) => item.id,
    );

    expect(first).not.toEqual(second);
  });

  it("generates readable summary and reason text", () => {
    const activity = activities.find((item) => item.id === "museum-online-tour");

    expect(getRecommendationSummary({})).toEqual(["通用推薦"]);
    expect(
      buildReasonText(activity!, { intent: "explore", location: "home" }),
    ).toContain("嘗試新東西");
  });
});
