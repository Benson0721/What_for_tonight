# Implementation Week 1 Log

## 1. 本週目標

- 建立可開發、可啟動、可 lint、可 build 的 Next.js App Router 專案骨架
- 建立 `src/` 結構與 4 個核心路由的空骨架
- 建立全域 layout、樣式基線與 `not-found`
- 將 UI 骨架改為參考 `public/intro.png`、`public/intro2.png`
- 不實作任何 Week 2 的表單、query params、推薦、收藏或 auth 邏輯

## 2. 本週完成項目

- 建立 `package.json`、`tsconfig.json`、`next.config.ts`、`postcss.config.mjs`、`eslint.config.mjs`
- 安裝 Next.js 16、React 19、TypeScript、Tailwind v4 與 ESLint
- 建立 `src/app/layout.tsx` 與 `src/app/globals.css`
- 建立 `/`、`/plan`、`/recommendations`、`/done`、`not-found`
- 建立 `components`、`lib`、`mocks`、`types`、`tests`、`public/icons` 等目錄骨架
- 首頁封面與骨架頁視覺改為參考 `public/intro.png` / `public/intro2.png`
- 修正 ESLint 設定相容性，讓 Week 1 工程檢查可通過

## 3. 實際修改的檔案清單

- `.gitignore`
- `README.md`
- `package.json`
- `package-lock.json`
- `tsconfig.json`
- `next.config.ts`
- `postcss.config.mjs`
- `eslint.config.mjs`
- `next-env.d.ts`
- `src/app/layout.tsx`
- `src/app/globals.css`
- `src/app/(marketing)/page.tsx`
- `src/app/(experience)/plan/page.tsx`
- `src/app/(experience)/recommendations/page.tsx`
- `src/app/(experience)/done/page.tsx`
- `src/app/not-found.tsx`
- `src/components/common/.gitkeep`
- `src/components/layout/.gitkeep`
- `src/components/plan/.gitkeep`
- `src/components/recommendation/.gitkeep`
- `src/components/feedback/.gitkeep`
- `src/lib/filters/.gitkeep`
- `src/lib/recommendations/.gitkeep`
- `src/lib/storage/.gitkeep`
- `src/lib/utils/.gitkeep`
- `src/mocks/.gitkeep`
- `src/types/.gitkeep`
- `src/tests/unit/.gitkeep`
- `src/tests/integration/.gitkeep`
- `src/tests/e2e/.gitkeep`
- `public/icons/.gitkeep`
- `md_home/implementation_week_1_log.md`

## 4. Blocking prerequisites

- `Blocking prerequisite`：原始 codebase 只有文件，沒有任何可執行專案；因此先建立 Next.js App Router 工程骨架，否則無法進入 Week 2 的資料模型與主流程開發。
- `Blocking prerequisite`：ESLint 初始設定與已安裝版本不相容，先調整為 `eslint-config-next` flat config + ESLint 9，否則 Week 1 的 lint 無法通過。

## 5. 偏離計畫之處

- 無功能性偏離。
- 補充說明：依使用者新增要求，Week 1 UI 骨架已改為參考 `public/intro.png` 與 `public/intro2.png`。這屬於本週可接受的 UI 基線調整，未提前實作 loading 功能本身。

## 6. 已執行的檢查

- lint：`npm run lint`，通過
- build：`npm run build`，通過
- test：本週未建立測試框架，未執行；`npm run typecheck` 已通過

## 7. 目前已知問題 / 待下週處理項目

- `/plan` 目前只有骨架，尚未實作條件 chips、狀態與提交
- `/recommendations` 目前只有骨架，尚未實作推薦規則、卡片與 query params
- `/done` 尚未接 `activityId`
- `loading.tsx` 與 `recommendations/error.tsx` 尚未建立，依計畫留到後續週次
- Vercel 專案與 preview 實際接線未在本地驗證
- loading 畫面尚未實作，但視覺資產已指定使用 intro 圖方向

## 8. 建議下一個 agent 接手時先看哪些檔案

- `md_home/prd.md`
- `md_home/spec.md`
- `md_home/implementation_plan_v1.md`
- `md_home/implementation_week_1_log.md`
- `package.json`
- `eslint.config.mjs`
- `src/app/layout.tsx`
- `src/app/globals.css`
- `src/app/(marketing)/page.tsx`
- `src/app/(experience)/plan/page.tsx`
- `src/app/(experience)/recommendations/page.tsx`
- `src/app/(experience)/done/page.tsx`
