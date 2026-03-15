# Week 5 Implementation Log

## 1. 本週目標

- 完成 demo hardening 與最終交付所需的檢查掛鉤。
- 收斂會阻斷 demo 驗收的 blocker，並提供 smoke script / handoff 資訊。
- 在不新增產品功能的前提下，確認 happy path、404 path 與基本檢查可重複執行。

## 2. 本週完成項目

- 補上 Week 4 遺留的最小測試 / CI 基礎，作為 Week 5 驗收的 `Blocking prerequisite`。
- 新增 `Vitest` 設定與 unit / integration 測試。
- 新增 `Playwright` 設定與 2 條 e2e smoke cases：
  - happy path：首頁 → `/plan` → `/recommendations` → `/done`
  - invalid activityId：`/done?activityId=missing-activity` → 404
- 新增 GitHub Actions 最小 CI workflow。
- 更新 `README.md`，補上驗證指令、demo script、Week 5 merge / freeze 提醒。
- 修正全域背景實際被 `body` class 蓋掉的問題，讓 `public/背景.png` 能正常作為頁面底圖。
- 補上測試產物忽略規則，避免 `coverage/` 與 `test-results/` 汙染 lint / git 狀態。

## 3. 實際修改的檔案清單

- `package.json`
- `package-lock.json`
- `.gitignore`
- `eslint.config.mjs`
- `README.md`
- `vitest.config.ts`
- `playwright.config.ts`
- `.github/workflows/ci.yml`
- `src/app/globals.css`
- `src/app/layout.tsx`
- `src/tests/setup.ts`
- `src/tests/unit/search-params.test.ts`
- `src/tests/unit/recommendations.test.ts`
- `src/tests/integration/plan-form.test.tsx`
- `src/tests/e2e/happy-path.spec.ts`
- `src/tests/e2e/invalid-activity.spec.ts`
- `md_home/implementation_week_5_log.md`

## 4. Blocking prerequisites

- Week 4 的最小測試 / CI 尚未落地，會直接阻斷 Week 5 的最終驗收。
- 因此本週補了最小必要版本：
  - `Vitest` unit / integration
  - `Playwright` smoke e2e
  - GitHub Actions 最小 CI

## 5. 偏離計畫之處

- 無功能性偏離。
- 僅將 Week 4 應完成但尚未存在的測試 / CI 視為 Week 5 驗收 blocker，做最小補齊。

## 6. 已執行的檢查

- lint：`npm run lint`，通過
- build：`npm run build`，通過
- test：`npm test`，通過
- typecheck：`npm run typecheck`，通過
- 其他：`npx playwright install chromium` 已完成本機瀏覽器安裝

## 7. 目前已知問題 / 待下週處理項目

- 實際 `main` / demo branch freeze、GitHub branch protection、Vercel production URL 驗證仍需在遠端平台執行，不在本地 repo 內完成。
- 目前 e2e 仍是最小 smoke level，若後續要維護正式產品，需再補更多 edge case。
- 收藏仍為 demo-only localStorage，不能當成正式跨裝置方案。

## 8. 建議下一個 agent 接手時先看哪些檔案

- `md_home/implementation_plan_v1.md`
- `md_home/implementation_week_5_log.md`
- `README.md`
- `.github/workflows/ci.yml`
- `vitest.config.ts`
- `playwright.config.ts`
- `src/tests/unit/search-params.test.ts`
- `src/tests/unit/recommendations.test.ts`
- `src/tests/integration/plan-form.test.tsx`
- `src/tests/e2e/happy-path.spec.ts`
