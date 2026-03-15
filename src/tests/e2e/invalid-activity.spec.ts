import { expect, test } from "@playwright/test";

test("invalid activity id falls back to 404", async ({ page }) => {
  await page.goto("/done?activityId=missing-activity");

  await expect(page.getByRole("heading", { name: "找不到這個頁面" })).toBeVisible();
});
