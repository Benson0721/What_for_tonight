# **文件資訊**

- **文件名稱**：今晚做什麼 Prototype Frontend Spec
- **文件版本**：v1.0
- **文件狀態**：Draft / Ready for Build Review
- **最後更新日期**：2026-03-14
- **文件目的**：提供前端工程師、QA、AI coding agent 作為實作、測試與交付依據
- **來源（Spot / PRD）**：
  - Spot：今晚做什麼 Prototype Spot
  - PRD：今晚做什麼（下班活動推薦）Prototype PRD v1.0
- **參考依據（官方 Next.js / 官方 Vercel）**：
  - Next.js App Router、Server/Client Components、Project Structure、Route Groups、loading、not-found、Error Handling、TypeScript、Testing、CSS / Tailwind
  - Vercel Git Integration、GitHub Integration、Deployments、Environment Variables、Deployment Protection。([Next.js](https://nextjs.org/docs/app))

# **前言**

## **Spec 目的**

本文件將 Spot 與 PRD 轉換為可直接實作的前端規格，明確定義：

- 路由與頁面
- 元件責任
- 狀態與互動
- mock data
- 例外處理
- 測試掛鉤
- 部署前提

## **文件定位**

本文件不是產品願景文件，也不是資料庫 / API spec。  
本文件只處理 **Prototype 前端 demo** 所需的實作規格。

## **與 PRD 的關係**

- PRD 定義：為什麼做、做給誰、做哪些功能、如何驗收
- Spec 定義：頁面怎麼切、路由怎麼走、資料怎麼放、互動怎麼處理、錯誤怎麼顯示、測試怎麼掛鉤

## **本文件適用範圍**

適用於：

- 前端實作
- QA 測試案例設計
- AI coding agent 產碼
- Build Plan / Testing Plan 拆解

不適用於：

- 後端資料庫設計
- 正式會員系統
- 正式推薦演算法
- 正式資安方案

# **開發範圍與限制**

## **本次實作範圍**

本次僅實作 **mobile-first 前端 prototype**，完整支援以下核心流程：

1. 首頁進入
2. 輸入今晚狀態
3. 取得 3 個推薦
4. 查看推薦理由
5. 收藏推薦
6. 換一組推薦
7. 返回調整條件
8. 選定一個推薦並進入簡單完成頁

## **不在本次範圍**

以下明確不做：

- 真實活動資料串接
- 後端 API / DB
- 會員登入 / 註冊
- 真實 session / 權限控制
- 社群、揪團、辦活動
- 真實定位 / 地圖 API
- 付款 / 報名 / 預約
- 推播
- 後台管理
- Analytics 後台
- 多語系
- SEO 深化
- 完整收藏列表管理
- 長期個人化學習

## **Prototype 限制**

- 所有推薦資料來自 mock data
- 推薦邏輯為規則式 / 前端可預測邏輯
- 收藏僅為 demo 級前端狀態保存
- 無正式安全機制
- 無正式錯誤監控與稽核流程

## **風險提醒**

- Prototype 可驗證「低決策成本」體驗，不可驗證真實推薦精準度
- mock data 若覆蓋不足，容易導致重抽重複或推薦單一化
- 若把整個頁面過度 client 化，會違反本 Spec 的 server-first 原則
- 若自行加入 API / auth / 後端，會產生 scope creep

# **技術基準**

本專案以 **最新官方穩定 Next.js \+ App Router \+ TypeScript \+ Tailwind CSS \+ GitHub \+ Vercel** 為基準。Next.js 官方目前以 App Router 作為新架構，採檔案系統路由；在 App Router 中，`layout` 與 `page` 預設為 Server Components，只有需要互動或瀏覽器 API 時才應切為 Client Components。([Next.js](https://nextjs.org/docs/app))

## **Next.js**

- 使用 **Next.js 最新官方穩定版本**
- 使用 **App Router**
- 不使用 `pages/` Router
- 建議使用 `create-next-app` 的官方預設組合：
  - TypeScript
  - ESLint
  - Tailwind CSS
  - App Router
  - Turbopack。([Next.js](https://nextjs.org/docs/pages/getting-started/installation))

## **App Router**

- 路由定義放在 `app/`（本 Spec 建議放在 `src/app/`）
- 使用 route groups 做區塊組織，但 route group 名稱不進 URL
- 使用 `loading.tsx` / `error.tsx` / `not-found.tsx` 處理對應狀態。([Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/route-groups))

## **TypeScript**

- 全專案使用 TypeScript
- 最低 TypeScript 版本基準：`>= 5.1`
- 開發環境最低 Node.js 版本基準：`>= 20.9`
- 使用 `@/*` import alias
- 使用 `next.config.ts`
- 禁止以 `any` 作為核心資料模型預設型別。([Next.js](https://nextjs.org/docs/pages/getting-started/installation))

## **Tailwind CSS**

- 以 Tailwind CSS 為主要 styling 方案
- Tailwind 透過 `@tailwindcss/postcss` 與 `app/globals.css` 載入
- `globals.css` 僅放全域樣式、reset、設計 token 映射
- 元件樣式優先以 utility classes 寫法完成，只有 Tailwind 不足時才允許 CSS Module。([Next.js](https://nextjs.org/docs/app/getting-started/css))

## **GitHub**

- 程式碼儲存在 GitHub repository
- 以 Pull Request 作為主要整合單位
- 以 branch-based workflow 進行 review 與 preview 驗證

## **Vercel**

- 部署目標為 Vercel
- 使用 Git-based deploy
- 每次 branch push 應產生 Preview Deployment
- Production Branch 假設為 `main`
- merge / push 到 `main` 後產生 Production Deployment。([Vercel](https://vercel.com/docs/git))

## **Preview / Production 邏輯**

- **Development**：本機開發
- **Preview**：任何非 Production Branch 的分支部署
- **Production**：`main` 分支部署
- 本 prototype 不依賴自定義環境變數即可運作；若後續加入環境變數，需明確區分 Development / Preview / Production。([Vercel](https://vercel.com/docs/environment-variables))

## **是否使用 mock data**

- 是
- 所有推薦內容、條件匹配、重抽結果均來自 mock data 與前端規則

## **是否使用 demo auth / session**

- **不使用登入**
- **不使用正式 session**
- **不使用 route protection**
- 全部頁面皆為公開頁面

## **哪些是 demo 級做法**

- 推薦資料來源：mock data
- 推薦引擎：前端規則式篩選與排序
- 收藏：`localStorage` 保存
- 推薦切換：透過 URL search params 與前端邏輯計算
- 錯誤模擬：本地 error boundary / fallback UI

## **哪些不是正式安全方案**

以下都只可視為 demo 級做法，不可沿用到正式產品：

- `localStorage` 保存收藏狀態
- URL search params 傳遞條件與 `activityId`
- 無登入、無身份識別
- 無 HttpOnly cookie
- 無 server-side authorization
- 無資料來源簽章驗證
- 無真正的 preview access control 流程；若未來 preview 需要保護，應改用 Vercel Deployment Protection 或正式身分驗證。([Vercel](https://vercel.com/docs/deployment-protection))

# **專案結構建議**

root/  
├─ public/  
│ └─ icons/  
├─ src/  
│ ├─ app/  
│ │ ├─ (marketing)/  
│ │ │ └─ page.tsx  
│ │ ├─ (experience)/  
│ │ │ ├─ plan/  
│ │ │ │ └─ page.tsx  
│ │ │ ├─ recommendations/  
│ │ │ │ ├─ page.tsx  
│ │ │ │ ├─ loading.tsx  
│ │ │ │ └─ error.tsx  
│ │ │ └─ done/  
│ │ │ └─ page.tsx  
│ │ ├─ layout.tsx  
│ │ ├─ not-found.tsx  
│ │ └─ globals.css  
│ ├─ components/  
│ │ ├─ common/  
│ │ ├─ layout/  
│ │ ├─ plan/  
│ │ ├─ recommendation/  
│ │ └─ feedback/  
│ ├─ lib/  
│ │ ├─ filters/  
│ │ ├─ recommendations/  
│ │ ├─ storage/  
│ │ └─ utils/  
│ ├─ mocks/  
│ │ └─ activities.ts  
│ ├─ types/  
│ │ ├─ filters.ts  
│ │ └─ recommendation.ts  
│ └─ tests/  
│ ├─ unit/  
│ ├─ integration/  
│ └─ e2e/  
├─ eslint.config.mjs  
├─ next.config.ts  
├─ postcss.config.mjs  
├─ package.json  
└─ tsconfig.json

## **切分原則**

### **`src/app/`**

- 放 App Router 路由與 route-level 檔案
- 只放 route entry，不放複雜商業邏輯
- route group 用來區分首頁與產品體驗流程，URL 不受 group 名稱影響。([Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/route-groups))

### **`src/components/`**

- 放可重用 UI 元件
- 依領域切分，避免所有元件堆在同一層
- 嚴禁把 route 專屬資料處理塞進純展示元件

### **`src/lib/`**

- 放純函式與邏輯
- 包含：
  - query param 解析 / 序列化
  - 推薦分數計算
  - 重抽規則
  - localStorage 包裝
- 這裡應維持高可測試性

### **`src/mocks/`**

- 放 prototype 用固定資料
- 僅可存靜態活動資料與必要的 demo 配置
- 不可假裝成正式 API client

### **`src/types/`**

- 放 TS 型別與 enum
- 前端 state、URL params、資料模型共用型別集中管理

### **`src/tests/`**

- 區分：
  - `unit/`：純函式邏輯
  - `integration/`：頁面與元件整合
  - `e2e/`：實際 user journey

# **路由與頁面規格**

## **路由總覽**

| 路由                      | 頁面       | 必要性 | 說明                |
| ------------------------- | ---------- | ------ | ------------------- |
| `/`                       | 首頁       | Must   | 產品價值入口        |
| `/plan`                   | 狀態輸入頁 | Must   | 輸入今晚條件        |
| `/recommendations`        | 推薦結果頁 | Must   | 顯示 3 個推薦       |
| `/done`                   | 完成頁     | Must   | 選擇活動後的閉環頁  |
| `not-found`               | 404 頁     | Must   | 錯誤路徑與無效活動  |
| `recommendations/error`   | 路由錯誤頁 | Must   | 推薦頁非預期例外    |
| `recommendations/loading` | 載入頁     | Should | 推薦頁切換 skeleton |

---

## **1\. `/` 首頁**

### **路由**

- `/`

### **頁面目的**

- 快速說明產品價值
- 引導使用者開始流程

### **使用者**

- 初次進入或重新開始的使用者

### **When**

- 使用者下班後、通勤中、回家後，第一次打開產品

### **What**

- 告訴使用者：這個產品能幫你快速決定今晚做什麼

### **How**

- 單一主要 CTA：`開始推薦`

### **Where**

- 流程起點
- 從任何其他頁面「返回首頁」也會回到此頁

### **頁面區塊**

1. Hero 區
   - 主標題
   - 副標
   - 簡短說明
2. 核心價值區
   - 30 秒得到 3 個推薦
   - 低決策成本
3. 主 CTA 區
   - `開始推薦`

### **導頁規則**

- 點擊 `開始推薦` → `/plan`

### **未授權 / 過期 / 錯誤時怎麼處理**

- 無授權限制
- 無過期狀態
- 若頁面 render 失敗，使用全域 error 機制；若路由不存在，走 `app/not-found.tsx`

---

## **2\. `/plan` 狀態輸入頁**

### **路由**

- `/plan`

### **頁面目的**

- 讓使用者用最小成本表達今晚狀態

### **使用者**

- 已願意嘗試推薦的目標使用者

### **When**

- 使用者想要開始找今晚活動，但沒精力自己查詢比較

### **What**

- 蒐集以下條件：
  - 精力狀態
  - 今晚想要的感覺
  - 預算
  - 時間
  - 地點偏好

### **How**

- 以單選 chips / pills 方式操作
- 每個維度最多選 1 個值
- 同一選項可再次點擊取消
- 可全部留空後直接送出

### **Where**

- 由首頁進入
- 由推薦結果頁 `調整條件` 返回時也會進入此頁

### **頁面區塊**

1. 頁首
   - 返回按鈕
   - 頁面標題
2. 條件輸入區
   - `你現在的狀態？`
   - `今晚想要什麼感覺？`
   - `預算`
   - `時間`
   - `地點偏好`
3. 底部固定 CTA 區
   - 主按鈕：`看今晚推薦`
   - 次文案：`不確定也可以直接看`

### **導頁規則**

- 點擊 `看今晚推薦`
  - 將條件序列化為 query string
  - 導向 `/recommendations`
- 若由 `/recommendations` 回來，應保留既有條件

### **未授權 / 過期 / 錯誤時怎麼處理**

- 無授權限制
- 若 query param 不合法：
  - 忽略非法值
  - 其餘合法值正常回填
- 若全部值都不合法：
  - 顯示空白狀態表單，不報錯

### **URL 規格**

`/plan` 可接受以下 query params 以作為回填：

- `energy=tired|normal|energetic`
- `intent=relax|fulfill|move|explore`
- `budget=free|low|any`
- `duration=short|medium|long|any`
- `location=home|nearby|any`

---

## **3\. `/recommendations` 推薦結果頁**

### **路由**

- `/recommendations`

### **頁面目的**

- 顯示 3 個今晚推薦
- 讓使用者理解推薦原因
- 讓使用者能收藏、重抽或選擇一個活動

### **使用者**

- 已完成條件輸入，或直接用預設條件進來的使用者

### **When**

- 使用者想快速看到今晚可執行的活動選項

### **What**

- 根據條件顯示 3 個推薦
- 顯示條件摘要
- 顯示推薦理由
- 支援 `換一組推薦`
- 支援 `調整條件`
- 支援 `收藏`
- 支援 `今晚就做這個`

### **How**

- 推薦結果由 server-side 純函式從 mock data 計算
- 使用 query params 作為輸入來源
- Client 元件只負責互動操作

### **Where**

- 由 `/plan` 導入
- 可透過分享 URL 直接進入

### **頁面區塊**

1. 頁首摘要
   - `今晚為你挑了 3 個選擇`
   - 條件摘要 chips
2. 推薦清單區
   - 3 張 `RecommendationCard`
3. 頁尾操作區
   - `換一組推薦`
   - `調整條件`

### **導頁規則**

- `換一組推薦`
  - 保留原條件
  - 更新 `seed`
  - 更新 `exclude`
  - 留在 `/recommendations`
- `調整條件`
  - 導回 `/plan`
  - 保留目前條件
- `今晚就做這個`
  - 導向 `/done?activityId=...`，可附帶目前條件作返回用途

### **未授權 / 過期 / 錯誤時怎麼處理**

- 無授權限制
- 若 query param 非法：
  - 僅採用合法值
  - 非法值忽略
  - 若最終無有效條件，改顯示通用推薦
- 若 `exclude` 含未知 id：
  - 忽略未知 id
- 若推薦引擎回傳 0 筆：
  - 顯示 Empty State \+ `換寬鬆一點的條件` / `直接看通用推薦`
- 若計算過程拋出非預期例外：
  - 使用 `app/(experience)/recommendations/error.tsx` 顯示 retry UI
- 若 route-level loading 發生：
  - 顯示 skeleton loading。`loading.tsx` 為 App Router 官方建議的 route loading 慣例。([Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/loading))

### **URL 規格**

`/recommendations` 接受：

- `energy=tired|normal|energetic`
- `intent=relax|fulfill|move|explore`
- `budget=free|low|any`
- `duration=short|medium|long|any`
- `location=home|nearby|any`
- `seed=<number-string>`：重抽用
- `exclude=<id1,id2,id3>`：避免立刻出現同一組，demo only

---

## **4\. `/done` 完成頁**

### **路由**

- `/done`

### **頁面目的**

- 提供選定後的閉環感
- 降低「又回去猶豫」的機率

### **使用者**

- 已選定一個推薦活動的使用者

### **When**

- 使用者在推薦頁點擊 `今晚就做這個`

### **What**

- 顯示選定活動摘要
- 提供鼓勵文案
- 提供返回推薦或回首頁的入口

### **How**

- 透過 `activityId` 從 mock data 取活動資料
- 頁面不需要再次計算推薦名單

### **Where**

- 僅能由推薦結果頁導入；直接打開也可，只要 query 合法

### **頁面區塊**

1. 完成訊息區
2. 已選活動摘要卡
3. 次要操作區
   - `再看其他推薦`
   - `回首頁`

### **導頁規則**

- `再看其他推薦` → `/recommendations`（保留既有條件）
- `回首頁` → `/`

### **未授權 / 過期 / 錯誤時怎麼處理**

- 無授權限制
- 若缺少 `activityId` 或 id 不存在：
  - 直接 `notFound()`
- `not-found.tsx` 應作為全域 404 UI。App Router 中 `not-found` 用於 route segment 找不到資料時的 fallback。([Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/not-found))

### **URL 規格**

- `activityId=<string>` 必填
- 可選擇附帶原條件：
  - `energy`
  - `intent`
  - `budget`
  - `duration`
  - `location`
  - `seed`

---

## **5\. `not-found` 與錯誤頁**

### **`app/not-found.tsx`**

用途：

- 不存在路由
- `/done` 找不到 `activityId`
- 未來若 route segment 明確 `notFound()`

### **`app/(experience)/recommendations/error.tsx`**

用途：

- 推薦頁計算 / render 非預期例外
- 必須是 Client Component；這是 Next.js error boundary 的官方要求。([Next.js](https://nextjs.org/docs/app/getting-started/error-handling))

# **Server / Client 邊界**

## **Server-first 原則**

本專案優先採用 server-first 實作。App Router 中 `page` / `layout` 預設為 Server Components，因此頁面層與資料計算層應優先留在 server side，只有互動與 browser-only 能力才進 Client Component。([Next.js](https://nextjs.org/docs/app/getting-started/server-and-client-components))

## **應優先為 Server Component 的頁面 / 元件**

### **頁面**

- `app/layout.tsx`
- `app/(marketing)/page.tsx`
- `app/(experience)/plan/page.tsx`
- `app/(experience)/recommendations/page.tsx`
- `app/(experience)/done/page.tsx`
- `app/not-found.tsx`

### **Server-side 邏輯**

- query param 解析（page entry 可先收，再交給 lib）
- mock data 讀取
- 推薦分數計算
- 3 筆推薦選擇
- activityId 查詢

## **一定要是 Client Component 的元件**

### **必須 client 化**

- `PlanForm`
  - 使用互動式選擇 chips
  - 使用 `useState` / `useTransition` / `useRouter`
- `FilterChipGroup`
- `RegenerateButton`
- `FavoriteButton`
- `BottomActionBar`
- `ToastProvider` / `Toast`
- `recommendations/error.tsx`
  - Next.js error boundary 必須 client。([Next.js](https://nextjs.org/docs/app/getting-started/error-handling))

## **只存在前端的狀態**

- 表單選中值（送出前）
- 收藏狀態
- toast 顯示狀態
- 互動 pending 狀態
- 失敗提示顯示狀態

## **避免不必要 client 化的地方**

- 不要把整個 `/recommendations/page.tsx` 改成 Client Component
- 不要把 mock data matching 邏輯放進 card 元件
- 不要把 query param parsing 全部放在 client
- 不要為了收藏狀態而把整頁變成 client；收藏按鈕應是局部 client island

# **畫面區塊與元件規格**

## **1\. `MobileShell`**

- **用途**：提供 mobile-first 主要版面容器
- **顯示內容**：header slot、content slot、bottom action slot
- **輸入**：
  - `children`
  - `stickyFooter?: ReactNode`
- **輸出**：無
- **狀態**：無
- **空狀態**：不適用
- **錯誤狀態**：不適用
- **loading 狀態**：不適用
- **success / failure 行為**：不適用
- **備註**：內容區應有 `max-width`，桌機時居中但不做 desktop-first layout

## **2\. `HeroSection`**

- **用途**：首頁價值傳達
- **顯示內容**：
  - 主標
  - 副標
  - 說明
  - 主 CTA
- **輸入**：
  - `title`
  - `subtitle`
  - `ctaLabel`
  - `ctaHref`
- **輸出**：點擊 CTA 導頁
- **狀態**：無
- **空狀態**：不適用
- **錯誤狀態**：CTA href 不得為空
- **loading 狀態**：不適用

## **3\. `PlanForm`**

- **用途**：收集今晚狀態條件
- **顯示內容**：
  - 5 組單選條件
  - 底部 CTA
- **輸入**：
  - `initialFilters: Partial<FilterState>`
- **輸出**：
  - 導向 `/recommendations?...`
- **狀態**：
  - `draftFilters`
  - `isSubmitting`
- **空狀態**：
  - 所有欄位未選也合法
- **錯誤狀態**：
  - query param 回填非法值時忽略
- **loading 狀態**：
  - submit pending 時，CTA disabled \+ loading text
- **success / failure 行為**：
  - success：router push
  - failure：停留頁面並顯示 toast `目前無法前往推薦，請再試一次`
- **props / data contract**：
  - `FilterState` 見後述資料模型

## **4\. `FilterChipGroup`**

- **用途**：呈現單一條件群組
- **顯示內容**：
  - 群組標題
  - 多個可點選 chip
- **輸入**：
  - `label: string`
  - `options: FilterOption[]`
  - `value?: FilterValue`
  - `onChange(value?: FilterValue): void`
- **輸出**：
  - 單一值變更
- **狀態**：
  - selected / unselected
- **空狀態**：
  - 可無選擇
- **錯誤狀態**：
  - 若 value 不在 options 中，視為無選擇
- **loading 狀態**：無
- **success / failure 行為**：無
- **互動規則**：
  - 點未選 → 選取
  - 點已選 → 取消

## **5\. `ConditionSummary`**

- **用途**：推薦頁顯示條件摘要
- **顯示內容**：目前篩選條件 chips
- **輸入**：
  - `filters: Partial<FilterState>`
- **輸出**：無
- **狀態**：無
- **空狀態**：
  - 若無條件，顯示 `通用推薦`
- **錯誤狀態**：忽略非法值

## **6\. `RecommendationList`**

- **用途**：承接 3 張推薦卡片
- **顯示內容**：3 張 `RecommendationCard`
- **輸入**：
  - `items: RecommendationViewModel[]`
  - `filters: Partial<FilterState>`
- **輸出**：子元件事件
- **狀態**：
  - normal
  - empty
- **空狀態**：
  - 顯示 Empty State
- **錯誤狀態**：
  - 顯示 route error fallback，不在 list 內處理
- **loading 狀態**：
  - page-level skeleton，不在 list 內自管

## **7\. `RecommendationCard`**

- **用途**：顯示單筆推薦
- **顯示內容**：
  - 活動名稱
  - 類型 tag
  - 簡短描述
  - 時間
  - 預算
  - 地點形式
  - 推薦理由
  - CTA
  - 收藏按鈕
- **輸入**：
  - `item: RecommendationViewModel`
  - `isFavorited: boolean`
  - `onFavoriteToggle(id: string): void`
  - `onSelect(id: string): void`
- **輸出**：
  - 收藏事件
  - 選擇事件
- **狀態**：
  - normal
  - favorited
  - selecting
- **空狀態**：
  - 不適用
- **錯誤狀態**：
  - 若 item 欄位缺失，card 不渲染並記錄 console warning（demo 級）
- **loading 狀態**：
  - 由 skeleton card 代替
- **success / failure 行為**：
  - 收藏成功：toast `已加入有興趣清單`
  - 收藏失敗：toast `目前無法保存`
  - 選擇成功：導頁 `/done`

## **8\. `FavoriteButton`**

- **用途**：切換收藏狀態
- **顯示內容**：icon \+ 文案（收藏 / 已收藏）
- **輸入**：
  - `activityId: string`
  - `defaultValue: boolean`
- **輸出**：
  - toggle result
- **狀態**：
  - idle
  - pending
  - success
  - failure
- **空狀態**：不適用
- **錯誤狀態**：
  - localStorage 無法使用
- **loading 狀態**：
  - 點擊當下短暫 pending
- **success / failure 行為**：
  - success：更新 icon / 文案
  - failure：回滾 UI

## **9\. `RegenerateButton`**

- **用途**：在不重填表單的前提下換一組推薦
- **顯示內容**：`換一組推薦`
- **輸入**：
  - `currentFilters`
  - `currentIds: string[]`
  - `currentSeed?: string`
- **輸出**：
  - 更新 URL search params
- **狀態**：
  - idle
  - pending
- **空狀態**：不適用
- **錯誤狀態**：
  - 若導頁失敗，toast 提示
- **loading 狀態**：
  - 按鈕 disabled
- **success / failure 行為**：
  - success：頁面重新算出另一組推薦
  - failure：保留原畫面

## **10\. `EmptyRecommendationState`**

- **用途**：推薦為 0 筆時提示
- **顯示內容**：
  - 標題
  - 說明
  - CTA：`看通用推薦`
  - CTA：`調整條件`
- **輸入**：
  - `reason?: 'no-match' | 'data-missing'`
- **輸出**：對應導頁
- **狀態**：無
- **空狀態**：自身即空狀態元件
- **錯誤狀態**：無
- **loading 狀態**：無

## **11\. `Toast`**

- **用途**：成功 / 失敗短訊息
- **顯示內容**：單行文字
- **輸入**：
  - `type: 'success' | 'error' | 'info'`
  - `message: string`
- **輸出**：無
- **狀態**：
  - visible
  - dismissing
- **空狀態**：不 render
- **錯誤狀態**：無
- **loading 狀態**：無
- **備註**：
  - 應支援 `aria-live="polite"`

# **資料與 Mock Data 規格**

## **mock data 放置方式**

- 檔案位置：`src/mocks/activities.ts`
- 不建立 API route
- 不建立 JSON 檔與 fetch 流程
- 直接以 TypeScript `const` 匯出

## **檔案位置建議**

- `src/mocks/activities.ts`：活動資料主檔
- `src/types/recommendation.ts`：活動與 view model 型別
- `src/lib/recommendations/*`：推薦邏輯
- `src/lib/filters/*`：URL 解析與序列化

## **資料模型**

### **`FilterState`**

type Energy \= 'tired' | 'normal' | 'energetic'  
type Intent \= 'relax' | 'fulfill' | 'move' | 'explore'  
type Budget \= 'free' | 'low' | 'any'  
type Duration \= 'short' | 'medium' | 'long' | 'any'  
type Location \= 'home' | 'nearby' | 'any'

type FilterState \= {  
 energy?: Energy  
 intent?: Intent  
 budget?: Budget  
 duration?: Duration  
 location?: Location  
}

### **`Activity`**

type ActivityCategory \=  
 | 'relax'  
 | 'light-exercise'  
 | 'self-growth'  
 | 'micro-social'  
 | 'city-explore'  
 | 'creative'  
 | 'recovery'

type Activity \= {  
 id: string  
 title: string  
 category: ActivityCategory  
 shortDescription: string  
 energyFit: Energy\[\]  
 intentFit: Intent\[\]  
 budgetFit: Budget\[\]  
 durationFit: Duration\[\]  
 locationFit: Location\[\]  
 timeLabel: string  
 budgetLabel: string  
 locationLabel: string  
 reasonTemplates: string\[\]  
 ctaLabel: string  
 tags: string\[\]  
 isGenericFallback?: boolean  
}

### **`RecommendationViewModel`**

type RecommendationViewModel \= {  
 id: string  
 title: string  
 categoryLabel: string  
 shortDescription: string  
 timeLabel: string  
 budgetLabel: string  
 locationLabel: string  
 reasonText: string  
 ctaLabel: string  
 tags: string\[\]  
}

## **欄位定義**

| 欄位                | 必填 | 說明                                     |
| ------------------- | ---- | ---------------------------------------- |
| `id`                | 是   | 穩定唯一值，供收藏 / exclude / done 使用 |
| `title`             | 是   | 活動名稱                                 |
| `category`          | 是   | 活動類型                                 |
| `shortDescription`  | 是   | 1 句簡短描述                             |
| `energyFit`         | 是   | 適合的精力狀態                           |
| `intentFit`         | 是   | 適合的今晚期待                           |
| `budgetFit`         | 是   | 適合的預算                               |
| `durationFit`       | 是   | 適合的時間長度                           |
| `locationFit`       | 是   | 適合的地點偏好                           |
| `timeLabel`         | 是   | 顯示用文案                               |
| `budgetLabel`       | 是   | 顯示用文案                               |
| `locationLabel`     | 是   | 顯示用文案                               |
| `reasonTemplates`   | 是   | 推薦理由模板陣列                         |
| `ctaLabel`          | 是   | 卡片主要 CTA                             |
| `tags`              | 否   | 視覺標籤                                 |
| `isGenericFallback` | 否   | 通用補位推薦                             |

## **初始資料量**

- 最少：24 筆
- 建議：30 筆
- 每個 `intent` 至少 6 筆可用資料
- 每個 `location` 至少 8 筆可用資料
- 至少 6 筆 `isGenericFallback = true`，供無條件 / 無匹配時補位

## **狀態變化方式**

### **推薦結果**

- 不直接修改 `activities` 原始資料
- 每次進入 `/recommendations` 時：
  1. 解析 query params
  2. 對每筆活動計分
  3. 依分數排序
  4. 套用 `exclude`
  5. 選出 3 筆唯一活動
  6. 產生推薦理由

### **收藏狀態**

- 僅以前端 `localStorage` 更新
- key 建議：`tonight-activity-favorites`
- value 型別：`string[]`

### **若目前只做前端狀態更新**

- 是
- 本版所有變更都只在前端狀態 / localStorage 發生
- 不寫回任何後端

## **推薦規則（實作級）**

### **基本分數**

- `energy` 命中：+3
- `intent` 命中：+3
- `budget` 命中：+2
- `duration` 命中：+2
- `location` 命中：+2
- 對未選條件：不加分、不扣分

### **排序規則**

1. 總分高者優先
2. 同分時依 `seed` 決定穩定 shuffle 順序
3. 盡量避免 3 張卡片全部同類型
4. 若可選結果 \< 3：
   - 先放寬 `exclude`
   - 再補入 `isGenericFallback`
5. 最終仍不足 3：
   - 顯示實際數量 \+ Empty / 補位說明

### **推薦理由生成**

- 優先使用命中的條件組成
- 理由長度限制：1–2 句
- 不可生成與條件衝突的文案

# **驗證 / 權限 / Session Flow**

## **進入條件**

- 全部頁面皆公開
- 不需要登入

## **驗證條件**

- 無身份驗證
- 僅做 query param 合法性驗證：
  - enum 值是否合法
  - `activityId` 是否存在
  - `exclude` 是否可解析

## **失敗條件**

- query param 非法
- `activityId` 不存在
- localStorage 讀寫失敗
- 推薦結果空集合

## **過期條件**

本版無正式 session，因此無 session 過期概念。  
但以下情況視為 **狀態失效**：

- 舊版 URL 含不再支援的 enum 值
- `activityId` 對不到現有 mock data

處理規則：

- enum 值失效：忽略並回退預設
- `activityId` 失效：`notFound()`

## **route protection 規則**

- 不使用 middleware
- 不設 protected route
- 不設 password gate

## **重新登入條件**

- 不適用

## **demo 做法**

- 收藏狀態存在 localStorage
- 選中的活動透過 URL `activityId` 傳遞
- 不建立身份層

## **正式產品未來應如何替換**

若未來需要個人資料或跨裝置同步，需替換為：

- 正式 auth provider
- server-side session / token 驗證
- HttpOnly cookie
- 伺服器端 route protection
- 收藏 / 歷史行為後端化
- 使用者與推薦紀錄分表保存

# **狀態與互動規格**

## **表單狀態**

### **初始狀態**

- 所有欄位皆未選

### **互動規則**

- 每群單選
- 點選已選值可取消
- 不做必填驗證
- CTA 永遠可點

### **提交規則**

- 提交時將 `draftFilters` 轉成 query string
- 空欄位不輸出至 URL
- 提交後 push 到 `/recommendations`

## **清單狀態**

推薦頁清單狀態需涵蓋：

- `loading`
- `ready`
- `empty`
- `error`

## **篩選 / 排序**

- 使用者在推薦頁不再做前端清單篩選 UI
- 排序由推薦引擎產生，不提供使用者自行排序
- 本版不加入「更多條件」或「排序切換」

## **儲存 / 更新**

### **收藏**

- 點擊收藏立即 optimistic update
- 成功後保留
- 失敗則回滾

### **重抽**

- 更新 `seed` 與 `exclude`
- 透過路由更新取得新結果

### **調整條件**

- 導回 `/plan` 並保留目前條件

## **錯誤提示**

- 表單回填錯誤：靜默忽略，不阻塞
- localStorage 失敗：toast
- 推薦結果為空：頁面級 Empty State
- 推薦計算失敗：route-level error page
- unknown activityId：404

## **成功提示**

- 收藏成功：toast
- 取消收藏成功：toast
- 重抽成功：不需要 toast，以頁面更新即可
- 選擇活動成功：進 `/done`

## **重複提交處理**

- `/plan` 提交時按鈕 disabled，避免重複 push
- `RegenerateButton` pending 時不可連點
- `FavoriteButton` pending 時不可重複點擊
- `今晚就做這個` 點擊後立即導頁，避免雙擊

## **timeout / failure UI 行為**

- 若推薦頁導頁延遲：
  - 顯示 `loading.tsx` skeleton
- 若 client action 失敗：
  - 顯示 toast
  - 不清掉現有畫面
- 若 route render 失敗：
  - 顯示 `error.tsx`
  - 提供 `再試一次` 與 `返回條件設定`

# **RWD / UX / Accessibility 規格**

## **mobile first 要求**

- 以 320–430px 寬度作為主要設計區間
- 桌機僅做寬螢幕置中，不另做資訊密度提升版
- 底部主 CTA 區在手機需易於單手操作

## **文字層級**

- H1：首頁主標、完成頁主標
- H2：頁面標題、清單區標題
- Body：主要說明
- Meta：時間 / 預算 / 地點等輔助資訊
- 同頁層級不可混亂；不可用純字重代替階層

## **點擊區域**

- 所有可點擊元件最小觸控區域建議 `44x44px`
- chips 間距不可過小，避免誤觸
- 底部 CTA 不可被安全區 / 手機瀏覽器 UI 遮蔽

## **對比與可讀性**

- 文字與背景需具足夠對比
- 推薦理由、meta 資訊不可過淡
- 不能只依賴色差區分主次

## **狀態不能只靠顏色**

以下狀態必須同時有：

- 邊框 / icon / 文案 / 背景變化
- selected chip
- favorite state
- disabled button
- error state

## **表單錯誤可辨識**

本版無阻塞式必填驗證，但若出現異常：

- 需以文字告知
- 不可只用紅框
- toast 需可讀且不遮擋主要 CTA

## **窄螢幕 / 長內容 / 多資料量時的處理**

- 推薦卡片標題超過 2 行需截斷
- 描述與理由總高度需可控
- tag 過多時換行，不可撐破卡片
- 空狀態 / 錯誤態也需在小螢幕完整可用
- 若資料不足少於 3 張，畫面仍需穩定，不可因假設固定 3 張而破版

## **鍵盤與螢幕閱讀器**

- 互動元件需可 focus
- chips 需有可辨識 label
- toast 建議 `aria-live="polite"`
- 表單群組需有可感知的區塊標題
- 按鈕文字不可只寫「按這裡」

# **錯誤與例外處理**

## **1\. 空值**

### **情境**

- 使用者未選任何條件就送出

### **處理**

- 允許
- `/recommendations` 顯示通用推薦
- `ConditionSummary` 顯示 `通用推薦`

---

## **2\. 錯誤輸入**

### **情境**

- URL 內有非法 enum 值
- `seed` 非數字字串
- `exclude` 格式錯誤

### **處理**

- enum 值：忽略
- `seed`：回退預設 seed
- `exclude`：解析不到的值忽略

---

## **3\. 權限不足**

### **情境**

- 本版無權限系統

### **處理**

- 不適用
- 不應自行加上保護頁與權限檢查

---

## **4\. 狀態過期**

### **情境**

- 舊分享連結使用已移除活動 id 或舊 enum

### **處理**

- 舊 enum：忽略並回退預設
- 舊 activityId：404

---

## **5\. 重複提交**

### **情境**

- 連續點擊 `看今晚推薦`
- 連續點擊 `換一組推薦`
- 連續點擊收藏

### **處理**

- pending disabled
- 忽略重複 click
- 不可造成重複導頁或狀態抖動

---

## **6\. 大量資料**

### **情境**

- mock data 後續增長至 100+ 筆

### **處理**

- 推薦計算維持純函式
- 不在 card render 期間動態重算
- 仍只輸出 3 張卡片
- 不增加 list virtualize，除非後續 scope 變更

---

## **7\. timeout**

### **情境**

- 路由切換或 client action 發生延遲

### **處理**

- route navigation：`loading.tsx`
- client action：按鈕 pending \+ toast / retry
- 本版不設全域 timeout modal

---

## **8\. API failure**

### **情境**

- 本版無 remote API

### **處理**

- 若未來將 mock provider 抽象成 async function，該 function throw error 時，視同 internal data failure
- `/recommendations` 由 route error boundary 顯示 fallback
- 不允許本版私自新增外部 API 依賴

---

## **9\. mock data 無資料**

### **情境**

- `activities.ts` 為空
- 過濾後結果為 0

### **處理**

- `activities.ts` 為空：
  - `/recommendations` 顯示 Empty State
  - 同時 console error（demo 級）
- 過濾後為 0：
  - 顯示 Empty State
  - 提供 `看通用推薦` 與 `調整條件`

---

## **10\. 與 Spot / PRD 直接相關的 corner cases**

### **很累 \+ 想動一動 \+ 不花錢 \+ 30 分鐘內 \+ 在家**

- 應能回傳低門檻居家活動
- 不可回傳高摩擦外出活動

### **重抽後 3 張全部與前次相同**

- 若資料量足夠，視為 bug
- 若資料量不足，至少顯示說明或部分替換

### **推薦文案與條件衝突**

- 視為 bug
- 需由 unit test 與 manual QA 檢查

### **`/done` 缺少 activityId**

- 404
- 不可顯示空白成功頁

### **收藏狀態在 Safari 私密模式 / localStorage 失敗**

- 不可整頁 crash
- 以非阻塞提示告知即可

### **event handler error**

- 不應期待 error boundary 自動接住
- client event 失敗需在元件內自行處理。Next.js 官方說明 error boundaries 不會捕捉一般 event handler 內錯誤。([Next.js](https://nextjs.org/docs/app/getting-started/error-handling))

# **測試掛鉤需求**

## **哪些邏輯適合 Unit Test**

以下放 `tests/unit/`：

- `parseFilterParams`
- `serializeFilterParams`
- `scoreActivity`
- `pickTopRecommendations`
- `applyExcludeRule`
- `buildReasonText`
- `toggleFavorite`
- `readFavoritesFromStorage`
- `writeFavoritesToStorage`

### **必測案例**

- 空條件可返回通用推薦
- 非法 query 被忽略
- `exclude` 生效
- 同分時 seed 可穩定輸出
- 不足 3 筆時 fallback 補位
- 推薦理由不為空
- 推薦結果 id 不重複

## **哪些流程適合 Integration Test**

以下放 `tests/integration/`：

- `/plan` 初始載入與 query 回填
- `PlanForm` 選值 → submit → URL 正確
- `/recommendations` 接 query 後正確 render 3 張卡
- `RegenerateButton` 更新 URL 並刷新卡片
- `FavoriteButton` 與 localStorage 同步
- `/done` 透過 `activityId` render 正確內容
- `/done` activityId 不存在時走 not-found

## **哪些 user journey 應由 E2E 驗證**

以下放 `tests/e2e/`，建議使用 Playwright；Next.js 官方將 Playwright / Cypress 視為常見 E2E 工具，而 async Server Components 更適合用 E2E 驗證，不建議只靠 Jest / Vitest。([Next.js](https://nextjs.org/docs/app/guides/testing?utm_source=chatgpt.com))

### **必跑旅程**

1. **Happy Path**
   - 首頁 → `/plan` → `/recommendations` → 收藏 → `/done`
2. **No Filter Path**
   - `/plan` 不選任何條件 → `/recommendations` 顯示通用推薦
3. **Adjust Conditions Path**
   - `/recommendations` → `調整條件` → `/plan`
   - 原條件已回填
4. **Regenerate Path**
   - `/recommendations` → `換一組推薦`
   - 結果更新
5. **Invalid Query Path**
   - 直接用非法 query 進 `/recommendations`
   - 頁面不 crash，正常 fallback
6. **Invalid Activity Path**
   - 直接用不存在的 `activityId` 進 `/done`
   - 顯示 404

## **哪些 UI / 文案 / RWD 要留給 Manual QA**

- 文案語氣是否符合「下班疲累、低決策成本」
- 卡片資訊量是否過重
- 小螢幕是否有 CTA 被遮住
- 中文長標題是否斷行自然
- chips selected state 是否清楚
- 收藏 / 已收藏狀態是否容易辨識
- route loading skeleton 是否與真畫面一致
- landscape 模式是否破版

## **哪些 edge cases 必須被測**

- localStorage 不可用
- mock data 少於 3 筆
- 同一活動 repeated selection
- 重複快速點擊
- `exclude` 包含不存在 id
- 所有 query 值皆非法
- 很長的推薦理由 / 活動名稱

# **部署與環境規格（高層）**

## **GitHub repo 前提**

- 使用單一 GitHub repository
- 預設分支為 `main`
- 所有變更透過 PR 合併
- PR 必須通過基本檢查才可合併

## **branch / preview / production 基本邏輯**

- feature branch / PR branch：
  - 產生 Preview Deployment
- `main`：
  - 產生 Production Deployment
- Vercel Git integration 會對 branch push 自動部署，並提供 preview URL；對 production branch 的推送 / 合併則更新 production domain / alias。([Vercel](https://vercel.com/docs/git))

## **Vercel 部署假設**

- 專案部署於單一 Vercel project
- 使用 GitHub integration
- 本版不需要自定義環境變數即可運行
- 若日後加環境變數，需在 Development / Preview / Production 分開配置。Vercel 官方定義 preview 變數套用於非 production branch 的部署，production 變數套用於 production branch。([Vercel](https://vercel.com/docs/environment-variables))

## **最低 CI/CD 要求**

### **Pull Request 必須跑**

- install
- typecheck
- lint
- unit tests
- integration tests
- `next build`

### **`main` 合併前至少要求**

- PR 狀態全綠
- Preview Deployment 可打開
- 主要 happy path 通過

### **補充規格**

- 不依賴 `next build` 自動 lint；Next.js 官方已說明 `next build` 不再自動執行 lint，需透過獨立 script 執行。([Next.js](https://nextjs.org/docs/pages/getting-started/installation))
- 若後續啟用 preview 保護，E2E 需相容 Vercel Deployment Protection / automation bypass。([Vercel](https://vercel.com/docs/deployment-protection))

# **不做事項**

- 不做正式推薦服務
- 不做後端 API
- 不做資料庫
- 不做會員
- 不做 session / auth
- 不做 middleware 權限保護
- 不做真實活動圖庫
- 不做 map / location API
- 不做 analytics SDK
- 不做社群
- 不做付款
- 不做 SEO 客製化策略
- 不做 CMS
- 不做完整收藏頁
- 不做 A/B testing 系統
- 不做 push notification
- 不做 dark mode（除非 implementation plan 明確追加且不影響本版交付）

# **假設與待確認事項**

1. `/done` 視為本版 in-scope，用於完成閉環。
2. 本版僅支援繁體中文。
3. 本版不顯示真實活動圖片；可使用 icon / emoji / gradient placeholder。
4. 本版不依賴實際時間判斷「是否為今晚」；僅以產品語境呈現。
5. 推薦邏輯採規則式，不涉及 AI 模型推論。
6. `seed` 與 `exclude` 為 demo 專用 URL 參數，正式產品不應直接暴露為核心協議。
7. 收藏僅需在同一瀏覽器持久化，不要求跨裝置同步。
8. Empty State 是否顯示 0 張卡片或補位卡片，需在 implementation plan 定稿；本 Spec 優先建議顯示專屬 Empty State。
9. 推薦理由模板文字由前端與設計共同定稿，本 Spec 只限制長度與一致性，不限制最終文案。
10. icon 系統（Heroicons / Lucide 等）尚未指定，需在 implementation plan 先拍板。
11. 是否需要在 preview 部署加入保護，需依 review 對象決定；預設不開啟，以降低 demo 溝通摩擦。

# **給 Build / Test 的交接備註**

## **哪些地方 build 階段不能自行超做**

- 不可自行新增後端 API
- 不可自行新增登入系統
- 不可自行新增完整收藏頁
- 不可把 mock data 改成外部資料源
- 不可將 route 改成單頁 SPA 狀態機而失去 URL 可分享性
- 不可將整個 `/recommendations` client 化
- 不可額外加入分析事件與 SDK，除非有明確追加需求

## **哪些技術決策在 implementation plan 要先拍板**

1. `src/` 目錄是否啟用（本 Spec 建議啟用）
2. icon library 選擇
3. toast 實作方式（自製 / 輕量套件）
4. 測試工具最終組合：
   - Unit / Integration：Vitest 或 Jest
   - E2E：Playwright
5. `seed` 產生方式（遞增 / timestamp-based deterministic seed）
6. 收藏 localStorage key naming
7. skeleton 視覺樣式

## **哪些規格 testing plan 必須優先覆蓋**

1. 首頁 → 條件輸入 → 推薦頁 → 完成頁 happy path
2. 無條件送出
3. 非法 query fallback
4. 調整條件回填
5. 重抽規則
6. 收藏狀態
7. `/done` invalid activityId
8. 小螢幕下 CTA 可點擊
9. 長文案與長標題不破版
10. localStorage failure 不 crash
