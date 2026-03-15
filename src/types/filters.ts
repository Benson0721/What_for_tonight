export type Energy = "tired" | "normal" | "energetic";
export type Intent = "relax" | "fulfill" | "move" | "explore";
export type Budget = "free" | "low" | "any";
export type Duration = "short" | "medium" | "long" | "any";
export type Location = "home" | "nearby" | "any";

export type FilterState = {
  energy?: Energy;
  intent?: Intent;
  budget?: Budget;
  duration?: Duration;
  location?: Location;
};

export type FilterOption<T extends string> = {
  label: string;
  value: T;
};

export const energyOptions: FilterOption<Energy>[] = [
  { label: "很累", value: "tired" },
  { label: "普通", value: "normal" },
  { label: "還有精神", value: "energetic" },
];

export const intentOptions: FilterOption<Intent>[] = [
  { label: "放鬆一下", value: "relax" },
  { label: "有點充實", value: "fulfill" },
  { label: "動一動", value: "move" },
  { label: "嘗試新東西", value: "explore" },
];

export const budgetOptions: FilterOption<Budget>[] = [
  { label: "不花錢", value: "free" },
  { label: "300 元內", value: "low" },
  { label: "都可以", value: "any" },
];

export const durationOptions: FilterOption<Duration>[] = [
  { label: "30 分鐘內", value: "short" },
  { label: "1 小時左右", value: "medium" },
  { label: "1–2 小時", value: "long" },
  { label: "都可以", value: "any" },
];

export const locationOptions: FilterOption<Location>[] = [
  { label: "在家", value: "home" },
  { label: "家附近", value: "nearby" },
  { label: "都可以", value: "any" },
];

const labelMap = new Map<string, string>(
  [
    ...energyOptions,
    ...intentOptions,
    ...budgetOptions,
    ...durationOptions,
    ...locationOptions,
  ].map((option) => [option.value, option.label]),
);

export function getFilterLabel(value: string | undefined) {
  return value ? labelMap.get(value) : undefined;
}

