# Implementation Plan v1｜今晚做什麼 Prototype 五週實作計畫

## 1. 文件資訊

- 文件名稱：今晚做什麼 Prototype 五週實作計畫
- 版本：v1.0
- 狀態：Ready for Execution
- 最後更新日期：2026-03-14
- 來源文件：
  - `md_home/spot.md`
  - `md_home/prd.md`
  - `md_home/spec.md`
- 官方校正依據：
  - Next.js App Router 文件（Latest Version 16.1.6，2026-03-14 查核）
  - Vercel Git / Environment Variables / Deployment Protection 文件（2026-03-14 查核）
- 文件用途：提供 PM、設計、前端、QA、AI coding agent 依週次執行與驗收

## 2. 專案摘要

### 專案目標

在五週內交付一個 mobile-first 的前端 prototype，驗證「使用者輸入少量下班狀態，即可快速得到 3 個今晚推薦並採取下一步」是否成立。

### 專案性質

- 專案性質：Prototype
- 驗證主題：低決策成本、推薦可理解、行動 CTA 可促成 demo 級閉環
- 非目標：建立正式活動平台、正式推薦系統、正式會員系統

### 核心交付物

- Next.js App Router 前端專案
- 4 個核心路由：`/`、`/plan`、`/recommendations`、`/done`
- `not-found`、`recommendations/loading`、`recommendations/error`
- 24–30 筆可覆蓋主要情境的 mock data
- demo 級收藏流程（`localStorage`）
- GitHub repository、PR flow、Vercel preview / production
- 最小 CI
- 基本自動化測試與 demo 前人工驗收

### 五週後預期成果

- 可由首頁進入完整 happy path：首頁 → 條件輸入 → 3 個推薦 → 收藏或重抽 → 完成頁
- 可部署到 Vercel，`main` 可提供 production demo，PR branch 可提供 preview review
- 能穩定展示 prototype 價值，不誤導為正式產品

### Prototype 範圍切分

#### 本版必做

- 首頁價值主張與單一 CTA
- 五個條件維度的輸入頁
- 3 張推薦卡片與推薦理由
- 重抽推薦、調整條件、收藏、完成頁
- Empty / error / 404
- mobile-first UI
- GitHub + Vercel + 最小 CI + 測試節奏

#### 可延後

- 更完整的文案打磨
- 更細的 loading skeleton 視覺
- branch-specific preview 環境變數
- preview 保護機制

#### 明確不做

- 真實活動 API / DB
- 註冊登入、正式 auth、middleware guard
- 地圖、付款、預約、聊天室、社群、活動上架
- analytics 後台、長期偏好學習、多語系
- 獨立活動詳情頁

## 3. 實作策略總覽

### 為什麼這樣排順序

本專案是 prototype，不應先追求功能量，而應先鎖定「可被 demo 的主流程」。因此順序必須是：

1. 先鎖技術基座與路由骨架。
2. 再鎖 mock data 與推薦規則，避免 UI 先做完卻無法支撐內容。
3. 再做核心頁面與互動。
4. 最後集中處理測試、部署、demo hardening。

### 哪些先做

- 專案初始化、資料模型、路由骨架、query param 協議
- mock data 結構與推薦規則
- `/plan` 與 `/recommendations` 的主流程

### 哪些後做

- 視覺細節優化
- done 頁完成感文案
- demo polish 與異常態修正

### 哪些可以並行

- PM 文案定稿 與 設計低保真流程
- 前端 route skeleton 與 mock data 建模
- QA 測試案例設計 與 CI 腳本建立
- Vercel 專案接線 與頁面開發

### 哪些不能太早做

- 不要太早追求複雜動畫、視覺 polish
- 不要太早做收藏頁、活動詳情頁、正式 auth
- 不要在資料模型未定前大量做卡片元件

### 哪些地方要先做技術驗證

- App Router 下的 route groups 與 loading / error / not-found
- query params 回填與推薦頁重抽協議
- `localStorage` 收藏在 client island 的實作邊界
- Vercel preview branch 與 `main` production flow
- CI 中分開執行 lint 與 build

### 官方文件校正後的落地原則

- 採用 Next.js App Router 與 Server-first 實作；頁面與資料計算留在 server side，互動元件才用 `'use client'`。
- route groups 僅用於組織 `(marketing)` 與 `(experience)`，不影響 URL。
- `loading.tsx`、`error.tsx`、`not-found.tsx` 必須納入路由層設計，不在最後補。
- async Server Components 的主流程驗證優先用 E2E，而不是只靠 unit test。
- Vercel 以 `main` 作 production branch，其他分支皆視為 preview branch。
- CI 不可依賴 `next build` 自動 lint；lint 必須獨立成 job。

## 4. Workstreams

### 4.1 Product / PM Alignment

- 目標：把 prototype 的必做、可延後、不做切清楚，避免 scope creep。
- 內容：
  - 鎖定核心流程只到 `/done`
  - 鎖定 5 個條件維度與 3 張推薦
  - 鎖定 CTA 語意與 demo 文案
  - 鎖定無登入、無正式 auth
- 依賴關係：Spot / PRD / Spec 已完成。

### 4.2 Design / UI Finalization

- 目標：在不延誤工程的前提下，提供足夠可開發的頁面與狀態設計。
- 內容：
  - 首頁、輸入頁、推薦頁、完成頁
  - Empty / error / loading / not-found
  - mobile-first spacing、按鈕尺寸、卡片資訊層級
- 依賴關係：PM 已鎖 must-have 範圍；若設計延遲，工程先照 spec 做基線版。

### 4.3 Frontend Architecture

- 目標：建立可持續到 demo 的技術骨架。
- 內容：
  - Next.js + App Router + TypeScript + Tailwind
  - `src/app` 結構
  - server/client 邊界
  - types、lib、mocks、components 目錄
- 依賴關係：需先拍板技術棧與目錄規範。

### 4.4 Route & Navigation

- 目標：讓產品價值路徑可直接透過 URL 驅動與回放。
- 內容：
  - `/`、`/plan`、`/recommendations`、`/done`
  - query params 解析與回填
  - `loading.tsx`、`error.tsx`、`not-found.tsx`
- 依賴關係：需要先有 FilterState 與 activityId 協議。

### 4.5 Mock Data / State

- 目標：在無後端下支撐 demo 可信度。
- 內容：
  - 24–30 筆 mock activities
  - `FilterState`、`Activity`、`RecommendationViewModel`
  - score、exclude、seed、fallback 規則
  - 收藏 localStorage 封裝
- 依賴關係：需與 PM / 設計同步文案語氣與活動類型。

### 4.6 Auth / Guard Demo Flow

- 目標：避免團隊誤把 prototype 做成登入產品。
- 內容：
  - 明確不做 app-level auth、session、middleware guard
  - 需要 preview 保護時，只用 Vercel Deployment Protection，不寫應用程式 auth
  - 在文件與驗收標準中標記「demo only」
- 依賴關係：Vercel 專案已建立；若利害關係人要求封閉預覽，Week 4 再決定是否啟用。

### 4.7 Core Page Implementation

- 目標：完成主流程頁面與互動。
- 內容：
  - 首頁 Hero
  - PlanForm 與 chips
  - RecommendationCard、ConditionSummary、RegenerateButton、FavoriteButton
  - Done 頁
- 依賴關係：需先有資料模型與推薦規則。

### 4.8 QA / Test Readiness

- 目標：讓功能不是只能手點，而是可重複驗證。
- 內容：
  - unit / integration / e2e 測試掛鉤
  - manual QA checklist
  - release blocker 定義
- 依賴關係：Week 2 開始接入；Week 4 需補齊關鍵案例。

### 4.9 GitHub / Vercel / CI/CD Setup

- 目標：從第一週就讓專案具備可 review、可部署、可驗證能力。
- 內容：
  - GitHub repo
  - branch strategy
  - Vercel project
  - preview / production flow
  - GitHub Actions 最小 CI
- 依賴關係：專案 skeleton 存在即可開始。

### 4.10 Demo Hardening

- 目標：在第 5 週前把 demo 失敗點壓到最低。
- 內容：
  - 文案與資料校對
  - 小螢幕檢查
  - loading / error / empty 補齊
  - demo script 與 branch freeze
- 依賴關係：主流程已完成、preview 穩定、測試已跑。

## 5. 五週總覽

| 週次 | 週目標 | 主要交付物 | 週末門檻 |
| --- | --- | --- | --- |
| Week 1 | 鎖基座與協議 | 專案 skeleton、路由骨架、資料模型、repo/Vercel 建立 | 本機與 preview 可打開 4 個基礎路由 |
| Week 2 | 做出可運作的推薦主流程 | mock data、推薦規則、`/plan` → `/recommendations` 串通 | 可在 preview 完成基本 happy path |
| Week 3 | 補齊核心互動與狀態 | 收藏、重抽、完成頁、empty/error/loading/404 | 主流程功能完整、無重大 UX 斷點 |
| Week 4 | 穩定化與測試化 | CI、unit/integration/e2e 關鍵案例、設計修補 | release blocker 可被測試攔下 |
| Week 5 | demo hardening 與交付 | demo branch/main freeze、最終 QA、可部署 demo | production demo 穩定、可展示、可交付 |

## 6. Detailed Weekly Plan

### Week 1

#### 本週目標

建立可開發、可 review、可部署的技術骨架，並把後續所有人要遵守的協議先拍板。

#### 本週核心產出

- GitHub repository
- Next.js 專案初始化
- App Router route skeleton
- `src/` 目錄、types/lib/mocks/components 基本結構
- Vercel 專案與 preview deploy
- 技術決策記錄第一版

#### 主要工作項目與任務拆解

| 任務 | 目的 | 依賴 | 可並行 |
| --- | --- | --- | --- |
| 建立 repo 與 branch 規範 | 讓後續 PR / preview / CI 有容器 | 無 | 可 |
| 初始化 Next.js App Router 專案 | 建立正式技術基座 | repo | 否 |
| 建立 `src/app`、route groups、基礎 layout | 讓頁面與路由有明確骨架 | 專案初始化 | 否 |
| 建立 `/` `/plan` `/recommendations` `/done` 空頁與 `not-found` | 先打通資訊架構 | route skeleton | 可 |
| 建立 types / lib / mocks 目錄與空檔 | 為 Week 2 邏輯預留位置 | 專案初始化 | 可 |
| 建立 Vercel project 並接 GitHub | 提前驗證部署鏈 | repo、初始 commit | 可 |
| 寫 README / 工程約定 | 避免 AI agent 與工程師各自發揮 | 技術棧已定 | 可 |

#### 本週交付物

- 可安裝、可啟動、可 build 的專案
- 可在 preview 打開空白但正確的 4 個路由
- 文件化的技術決策：
  - Next.js App Router
  - `src/` 目錄啟用
  - TypeScript + Tailwind
  - Vercel 部署目標
  - 無 auth / 無 backend

#### 本週驗收方式

- `npm run dev` 可啟動
- `npm run build` 成功
- Vercel preview 成功產生
- 點擊首頁 CTA 可進 `/plan`
- `not-found` 可正常工作

#### 本週風險與注意事項

- 若 Week 1 沒把 query 協議與資料模型定住，Week 2 會反覆拆 UI。
- 不可在 Week 1 就做細緻視覺 polish。
- 不可自行新增 API route 或 auth 套件。

### Week 2

#### 本週目標

完成推薦主流程最小可用版，讓產品價值第一次可被看見。

#### 本週核心產出

- `FilterState`、`Activity`、`RecommendationViewModel`
- 24–30 筆 mock data 初版
- query params parse / serialize
- score / pickTopRecommendations / fallback 規則
- `/plan` 與 `/recommendations` 串通

#### 主要工作項目與任務拆解

| 任務 | 目的 | 依賴 | 可並行 |
| --- | --- | --- | --- |
| 定義 FilterState 與 URL enum | 鎖定頁面與資料邏輯的共同語言 | Week 1 結構完成 | 否 |
| 建立 activities mock data 初版 | 支撐推薦畫面與重抽 | 資料模型完成 | 可 |
| 實作 parse / serialize 邏輯 | 讓 `/plan` 與 `/recommendations` 可互通 | URL enum 完成 | 否 |
| 實作 score、exclude、seed、fallback | 讓推薦頁可產生穩定結果 | mock data 初版 | 否 |
| 完成 PlanForm 與 chips 互動 | 讓使用者可輸入條件 | URL enum 完成 | 可 |
| 完成推薦頁 server-side 計算與首版卡片 | 打通核心價值展示 | 推薦規則完成 | 可 |
| 補 ConditionSummary 與調整條件返回 | 讓流程可回填、可迭代 | parse / serialize 完成 | 可 |

#### 本週交付物

- 可在 `/plan` 任意選條件並進 `/recommendations`
- 可依條件產生 3 張推薦卡
- 條件全空時可顯示通用推薦
- `seed` / `exclude` 協議已存在但 UI 可先簡化

#### 本週驗收方式

- 至少 5 組代表性條件能產出合理結果
- 極端條件下仍不 crash
- 從 `/recommendations` 返回 `/plan` 可回填條件
- preview 可向 PM / 設計演示主流程

#### 本週風險與注意事項

- mock data 若只寫 8–10 筆，Week 3 的重抽會明顯失真。
- 推薦理由文案此週先求一致，不追求最終 polish。
- 若 `/recommendations` 被整頁 client 化，需立刻回退，避免後續維護混亂。

### Week 3

#### 本週目標

補齊 prototype 必做互動與狀態頁，讓流程從「能跑」進入「可 demo」。

#### 本週核心產出

- 收藏功能（demo only）
- 重抽推薦
- `/done` 完成頁
- `loading.tsx`、`error.tsx`、`not-found.tsx`
- empty state、invalid activityId 處理

#### 主要工作項目與任務拆解

| 任務 | 目的 | 依賴 | 可並行 |
| --- | --- | --- | --- |
| 實作 FavoriteButton + storage wrapper | 完成 demo 級保留動作 | 推薦卡已完成 | 可 |
| 實作 RegenerateButton 與 URL 更新 | 讓推薦結果具備第二輪選擇能力 | seed / exclude 規則已完成 | 可 |
| 實作 `/done` 頁與 `activityId` 查找 | 完成流程閉環 | 推薦卡 CTA 已存在 | 可 |
| 補 route-level loading / error | 降低導頁與異常時的 demo 風險 | recommendations route 已存在 | 可 |
| 補 empty state / 404 | 處理 Week 4 測試會打到的邊界 | 推薦規則與 done 頁完成 | 可 |
| 設計與工程一起調整卡片資訊密度 | 避免推薦頁像活動平台列表 | 首版 UI 完成 | 可 |

#### 本週交付物

- `收藏` 可作用且不需登入
- `換一組推薦` 可刷新結果
- 點 `今晚就做這個` 可到 `/done`
- 無效 `activityId` 會進 404
- 推薦頁有 loading/error/empty path

#### 本週驗收方式

- happy path 可完整走到 `/done`
- 連續重抽不會三張都完全重複
- 收藏失敗不會整頁 crash
- 推薦頁例外時有 fallback UI

#### 本週風險與注意事項

- 收藏只能是 demo 級 localStorage，不得擴寫成收藏中心。
- 若設計仍未提供最終稿，本週以 spec 基線版為準，不再等待。
- 不新增獨立活動詳情頁，避免打亂時程。

### Week 4

#### 本週目標

把專案從可 demo 推進到可穩定交付，建立自動檢查與 release blocker。

#### 本週核心產出

- GitHub Actions 最小 CI
- lint / typecheck / build / unit / integration
- Playwright happy path 與關鍵 edge case
- manual QA checklist 初版完成
- 視覺與交互修補

#### 主要工作項目與任務拆解

| 任務 | 目的 | 依賴 | 可並行 |
| --- | --- | --- | --- |
| 建立 `lint`、`typecheck`、`test`、`build` scripts | 讓 CI 有明確入口 | 專案已成形 | 否 |
| 建立 GitHub Actions | 將品質門檻自動化 | scripts 存在 | 否 |
| 補 unit tests | 穩定推薦與 query 邏輯 | lib 已穩定 | 可 |
| 補 integration tests | 穩定頁面與元件連接 | 核心互動完成 | 可 |
| 補 Playwright E2E | 覆蓋 async route 與主流程 | preview / local app 可跑 | 可 |
| 跑 manual QA 並修正 RWD / 文案 / 狀態問題 | 降低 demo 現場風險 | 各頁已完成 | 可 |
| 評估是否啟用 preview protection | 只在 review 對象需要時啟用 | Vercel project 穩定 | 可 |

#### 本週交付物

- PR 可自動跑最小 CI
- 至少 1 條 happy path E2E 綠燈
- 核心 unit / integration tests 上線
- release blocker 清單明確

#### 本週驗收方式

- 任一 PR 需通過 lint、typecheck、build
- happy path E2E 通過
- 無條件、非法 query、無效 activityId、localStorage 失敗至少有對應測試或 manual QA 記錄
- mobile viewport 320–430px 無明顯破版

#### 本週風險與注意事項

- 不要等到 Week 5 才接 CI，否則最後只會堆 bug。
- 若 E2E 不穩，優先修主流程穩定性，不追次要視覺問題。
- 預覽保護若啟用，需確認 demo 當天存取路徑與權限。

### Week 5

#### 本週目標

完成 demo hardening、branch freeze、最終驗收與交付。

#### 本週核心產出

- demo branch / main branch freeze 規則
- production demo 網址
- 最終 QA 結果
- demo script
- release note / handoff note

#### 主要工作項目與任務拆解

| 任務 | 目的 | 依賴 | 可並行 |
| --- | --- | --- | --- |
| 清空 release blocker | 確保 demo 不會在核心流程失敗 | Week 4 測試完成 | 否 |
| 跑完整 smoke test 與 demo rehearsal | 模擬真實展示情境 | preview / production 可用 | 可 |
| 鎖定 main/demo branch 合併規則 | 防止最後兩天不必要變動 | CI 與部署穩定 | 否 |
| 完成 PM / 設計 / 工程共同驗收 | 確認 demo 口徑一致 | 主要 bug 已收斂 | 可 |
| 寫交付紀錄與未做清單 | 防止 prototype 被誤認為產品完成 | 範圍已收斂 | 可 |

#### 本週交付物

- 可公開演示的 production deployment
- freeze 後穩定的 demo branch 或 `main`
- demo 流程腳本：
  - Happy path
  - 無條件推薦 path
  - 重抽 path
- 最終 Demo Readiness Checklist 全部打勾

#### 本週驗收方式

- production 網址可打開且核心流程穩定
- 最少兩次完整 rehearsal 無 blocker
- 不存在 P0 / P1 缺陷
- 所有 must-have 與 prototype 限制皆有明確說明

#### 本週風險與注意事項

- Week 5 不可再加功能，只能修 blocker 或明顯 demo 問題。
- 若利害關係人臨時要求新頁面或登入，必須明確拒絕納入本版。
- branch freeze 後的修改只允許：阻斷 happy path、部署失敗、重大文案錯誤。

## 7. 關鍵技術決策點

| 決策內容 | 最晚拍板週次 | 若不拍板的後果 | 建議保守方案 |
| --- | --- | --- | --- |
| 使用 Next.js App Router 與 `src/` 結構 | Week 1 | 後續路由與目錄反覆搬動 | 採 `src/app`、route groups |
| Unit/Integration 工具選型 | Week 1 | CI 與測試掛鉤延後 | 採 Vitest |
| E2E 工具選型 | Week 1 | Week 4 無法穩定補測 | 採 Playwright |
| icon library | Week 1 | UI 反覆替換、PR 噪音高 | 採 Lucide 或 Heroicons 擇一 |
| query param 協議 | Week 1 | `/plan` ↔ `/recommendations` 無法穩定回填 | 依 spec enum 固定 |
| mock data 欄位與最低數量 | Week 2 | 重抽、fallback、理由文案全部失真 | 24–30 筆、固定型別 |
| 推薦規則與 fallback 規則 | Week 2 | 後續測試無法寫、結果反覆改 | 採 score + seed + fallback |
| 收藏 demo 方案 | Week 2 | 誤做成帳號需求 | 僅 `localStorage` |
| preview protection 是否啟用 | Week 4 | demo 對外分享或 review 受阻 | 預設不啟用；必要時用 Vercel Authentication |
| demo freeze branch 策略 | Week 4 | Week 5 變更失控 | `main` 或 `demo` branch 單一路徑 freeze |

## 8. GitHub / Vercel / CI/CD 里程碑

### 週次安排

- Week 1：
  - 建立 GitHub repo
  - 設定 `main` 為 production branch
  - 接上 Vercel project
  - 驗證第一個 preview deployment
- Week 2：
  - 建立 PR 範本與最小 review 規範
  - 每個功能分支必須經 preview review
- Week 3：
  - 補 deployment smoke checklist
  - 視需求決定是否新增 demo 專用 alias/domain
- Week 4：
  - 加最小 CI：lint、typecheck、build、test
  - 若需要封閉預覽，評估 Vercel Deployment Protection
- Week 5：
  - freeze `main` 或 `demo` branch
  - 只允許 blocker 修復
  - production deployment 作為最終 demo 版本

### 執行要求

- 不接受「先本機開發，最後再接 Vercel」。
- 不接受「只 build 不設 preview」。
- 不接受「CI 只跑 build，不跑 lint / typecheck」。
- 不接受「Week 5 才第一次在 production 上驗證」。

## 9. Definition of Done

### 功能層

- 4 個核心路由可用
- 可輸入條件、得到 3 個推薦、重抽、收藏、到完成頁
- invalid activityId 可正確進 404
- 無條件可進入通用推薦

### UI 層

- mobile-first 完整可用
- CTA 一致、清楚、可點
- 卡片資訊密度控制合理
- empty / error / loading / not-found 有明確畫面

### 路由與互動層

- `/plan` ↔ `/recommendations` 條件可回填
- `seed` / `exclude` 可支撐重抽
- 收藏只影響局部 client state，不污染整頁結構
- `loading.tsx`、`error.tsx`、`not-found.tsx` 已接入

### 測試層

- unit：query parse、serialize、score、pickTopRecommendations、fallback
- integration：PlanForm、Recommendation flow、Done page
- e2e：至少 happy path、invalid query、invalid activityId
- manual QA：mobile、長文案、localStorage 失敗、重複點擊

### 部署層

- preview deployment 可自動產生
- production deployment 穩定
- CI 綠燈才可 merge
- demo 當天使用的 branch 已 freeze

### Prototype 限制說明

- 全資料來自 mock data
- 收藏為 demo only
- 無正式登入 / 權限 / session
- 不承諾正式推薦準確率
- 不承諾真實活動可報名或可到場

## 10. Demo Readiness Checklist

- 首頁 3 秒內可理解產品價值。
- `/plan` 五個維度可正常選取與取消。
- 不填條件也能走通推薦流程。
- `/recommendations` 一次顯示 3 張卡，文案不衝突。
- `換一組推薦` 不會完全無變化。
- `收藏` 可成功，且 localStorage 失敗時不 crash。
- `今晚就做這個` 可穩定進 `/done`。
- `/done` 顯示正確活動名稱；錯誤 `activityId` 會進 404。
- loading / error / empty state 都實際驗證過。
- 320px、390px、430px 寬度都可操作。
- preview 與 production 網址皆可用。
- CI 為綠燈。
- demo branch / `main` 已 freeze。
- demo script 已 rehearsal 至少 2 次。
- 文件與口頭說明都清楚標示「prototype，不含真實 auth / backend」。

## 11. 風險清單與對策

| 風險 | 說明 | 對策 |
| --- | --- | --- |
| PRD / Spec 模糊點 | Spot 提到活動詳情頁，但 Spec 以 `/done` 作閉環 | 本版不做獨立詳情頁，以 `/done` 代表完成感；若未來要補，另開版本 |
| 技術風險 | App Router server/client 邊界處理不當，導致整頁 client 化 | Week 1 先拍板 Server-first；code review 專查 `'use client'` 範圍 |
| 設計延遲 | 視覺稿若延後，工程可能卡住 | Week 2 之後工程直接按 spec 基線版開發，不等待高保真稿 |
| Mock data 與真實資料差距 | 推薦看起來太假，影響 demo 說服力 | Week 2 由 PM / 設計 / 工程共同校稿活動名稱、理由、分類與多樣性 |
| Demo auth 被誤當正式方案 | 可能有人要求登入或 preview gate 進 app 內做 | 文件明定不做 app auth；若要保護預覽，只用 Vercel Deployment Protection |
| 時程壓力 | 若 Week 2 主流程沒通，後續全延後 | Week 2 以推薦主流程為唯一優先；次要頁與 polish 一律延後 |
| 推薦重複或邏輯衝突 | 3 張卡太像或文案對不上條件 | 以 seed/exclude/fallback 規則加上 unit test 與 manual QA 兜底 |
| 測試接太晚 | 最後一週才發現主流程不穩 | Week 4 前必須接上 CI 與最少 E2E |
| Vercel 預覽不穩 | demo 前才發現 preview/production 差異 | Week 1 即接 Vercel，Week 4 前完成 smoke test |
| Scope creep | 加收藏頁、地圖、活動詳情、正式登入 | 每週 review 只允許 must-have 與 blocker；任何新需求移到 backlog |

## 12. 執行紀律

### 後續每週寫 code 時要怎麼遵守這份計畫

- 每週只做該週計畫內的任務與 blocker 修復。
- 每一個 PR 必須對應到某一個 workstream 與週次任務。
- 每週結束前，必須用「本週完成的定義」驗收，而不是用感覺判斷。
- AI agent 產碼時，不可自行新增超出 plan 的功能。

### 什麼情況可偏離

- 發現官方框架或部署做法與既定方案衝突
- 發現 blocker 會直接阻斷 happy path
- 發現測試或部署機制無法支撐第 5 週 demo

### 什麼情況不可偏離

- 因為想讓 UI 更完整而新增頁面
- 因為想「順便做好」而引入 backend、auth、analytics
- 因為 mock data 看起來不夠真就擴成外部 API
- 因為收藏流程存在就擴成收藏清單管理

### 偏離時要如何紀錄

- 必須記錄在週報或 PR 描述中，格式固定為：
  - 偏離項目
  - 原計畫內容
  - 偏離原因
  - 對週次的影響
  - 是否影響 demo scope
- 若偏離會影響 Week 5 交付，需先更新本文件再執行。

### 本計畫的最終控管原則

- 優先保證主流程可 demo、可部署、可重複驗證。
- 不以功能數量作為進度指標，以每週可檢查交付物作為進度指標。
- 任何無助於第 5 週 demo 的工作，都不得擠壓 must-have 任務。
