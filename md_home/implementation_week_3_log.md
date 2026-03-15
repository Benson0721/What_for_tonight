# Week 3 Implementation Log

## 1. 本週目標

- 補齊推薦頁的核心互動，讓 prototype 從可瀏覽進入可 demo。
- 完成收藏、重抽、`/done` 閉環與推薦頁 route-level 狀態。
- 補上 `activityId` 無效時的 404 與推薦頁 empty / error / loading 處理。

## 2. 本週完成項目

- 在推薦卡上接上 `今晚就做這個` CTA，導向 `/done?activityId=...`。
- 新增 `FavoriteButton`，以 `localStorage` 保存 demo 級收藏狀態。
- 新增 `RegenerateButton`，保留原條件並更新 `seed` / `exclude` 以換一組推薦。
- 將 `/done` 從 placeholder 改為依 `activityId` 查詢 mock data 的完成頁。
- 新增 `src/app/(experience)/recommendations/loading.tsx`。
- 新增 `src/app/(experience)/recommendations/error.tsx`。
- 更新全域 `not-found.tsx`，讓 `/done` 無效活動與未知路由共用。

## 3. 實際修改的檔案清單

- `src/app/(experience)/done/page.tsx`
- `src/app/(experience)/recommendations/page.tsx`
- `src/app/(experience)/recommendations/loading.tsx`
- `src/app/(experience)/recommendations/error.tsx`
- `src/app/not-found.tsx`
- `src/components/recommendation/recommendation-card.tsx`
- `src/components/recommendation/favorite-button.tsx`
- `src/components/recommendation/regenerate-button.tsx`
- `src/lib/storage/favorites.ts`

## 4. Blocking prerequisites

- 無

## 5. 偏離計畫之處

- 無

## 6. 已執行的檢查

- lint：`npm run lint`，通過
- build：`npm run build`，通過
- test：本週未新增自動化測試；依 implementation plan，測試框架與自動化補齊安排在 Week 4
- typecheck：`npm run typecheck`，通過

## 7. 目前已知問題 / 待下週處理項目

- 尚未建立 Week 4 要求的 unit / integration / e2e 測試。
- 尚未建立 GitHub Actions 最小 CI。
- 收藏只做 localStorage demo，不支援跨裝置或收藏列表管理。

## 8. 建議下一個 agent 接手時先看哪些檔案

- `md_home/implementation_plan_v1.md`
- `md_home/implementation_week_3_log.md`
- `src/app/(experience)/recommendations/page.tsx`
- `src/app/(experience)/done/page.tsx`
- `src/lib/filters/search-params.ts`
- `src/lib/recommendations/recommendations.ts`
