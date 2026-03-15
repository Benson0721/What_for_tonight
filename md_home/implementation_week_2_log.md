# Implementation Week 2 Log

## 1. 本週目標

- 完成 `FilterState`、`Activity`、`RecommendationViewModel`
- 建立 24–30 筆 mock data
- 完成 query params parse / serialize
- 完成推薦規則：score、挑選前 3 筆、fallback
- 讓 `/plan` 可輸入條件並導向 `/recommendations`
- 讓 `/recommendations` 依條件顯示 3 張推薦卡與條件摘要

## 2. 本週完成項目

- 新增 `src/types/filters.ts` 與 `src/types/recommendation.ts`
- 新增 `src/mocks/activities.ts`，建立 26 筆 mock data
- 新增 `src/lib/filters/search-params.ts`
- 新增 `src/lib/recommendations/recommendations.ts`
- 新增 `FilterChipGroup`、`PlanForm`、`ConditionSummary`、`RecommendationCard`
- `/plan` 改為可選條件、可提交至 `/recommendations`
- `/recommendations` 改為 server-side 解析 query 並顯示 3 張推薦卡
- 首頁文案改為對應 Week 2 現況，不再顯示 Week 1 skeleton 說明
- 修正本次實作造成的 TypeScript 型別問題，確保 lint / typecheck / build 通過

## 3. 實際修改的檔案清單

- `README.md`
- `src/app/layout.tsx`
- `src/app/(marketing)/page.tsx`
- `src/app/(experience)/plan/page.tsx`
- `src/app/(experience)/recommendations/page.tsx`
- `src/types/filters.ts`
- `src/types/recommendation.ts`
- `src/mocks/activities.ts`
- `src/lib/filters/search-params.ts`
- `src/lib/recommendations/recommendations.ts`
- `src/components/plan/filter-chip-group.tsx`
- `src/components/plan/plan-form.tsx`
- `src/components/recommendation/condition-summary.tsx`
- `src/components/recommendation/recommendation-card.tsx`
- `md_home/implementation_week_2_log.md`

## 4. Blocking prerequisites

- 無

## 5. 偏離計畫之處

- 無功能性偏離。
- 補充說明：本週未實作 `seed` / `exclude` 的 UI，但已在 query parse / serialize 層保留協議，符合 implementation plan「協議先存在、UI 可簡化」的要求。

## 6. 已執行的檢查

- lint：`npm run lint`，通過
- build：`npm run build`，通過
- test：本週未建立測試框架，未執行；`npm run typecheck` 已通過

## 7. 目前已知問題 / 待下週處理項目

- `/recommendations` 目前沒有重抽、收藏、完成頁 CTA 導頁
- `RecommendationCard` 的主 CTA 目前為 disabled 狀態，等待 Week 3 接收藏 / 完成頁閉環
- `/done` 仍是 Week 1 placeholder，尚未接 `activityId`
- `loading.tsx`、`recommendations/error.tsx` 尚未建立
- 尚未建立 unit / integration / e2e 測試
- recommendation 文案與 mock data 雖可用，但還沒有進行 PM / 設計校稿輪

## 8. 建議下一個 agent 接手時先看哪些檔案

- `md_home/prd.md`
- `md_home/spec.md`
- `md_home/implementation_plan_v1.md`
- `md_home/implementation_week_1_log.md`
- `md_home/implementation_week_2_log.md`
- `src/types/filters.ts`
- `src/types/recommendation.ts`
- `src/mocks/activities.ts`
- `src/lib/filters/search-params.ts`
- `src/lib/recommendations/recommendations.ts`
- `src/components/plan/plan-form.tsx`
- `src/components/recommendation/recommendation-card.tsx`
- `src/app/(experience)/plan/page.tsx`
- `src/app/(experience)/recommendations/page.tsx`
