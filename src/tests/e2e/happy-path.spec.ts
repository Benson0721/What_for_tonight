import { expect, test } from "@playwright/test";

test("core happy path reaches done page", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "開始推薦" }).click();

  await expect(page).toHaveURL(/\/plan/);

  await page.getByRole("button", { name: "普通" }).click();
  await page.getByRole("button", { name: "有點充實" }).click();
  await page.getByRole("button", { name: "在家" }).click();
  await page.getByRole("button", { name: "看今晚推薦" }).click();

  await expect(page).toHaveURL(/\/recommendations/);
  await expect(page.getByRole("heading", { name: "今晚為你挑了 3 個選擇" })).toBeVisible();

  await page.getByRole("link", { name: "今晚就做這個" }).first().click();

  await expect(page).toHaveURL(/\/done/);
  await expect(page.getByRole("heading", { name: "今晚就從這個開始吧" })).toBeVisible();
});
