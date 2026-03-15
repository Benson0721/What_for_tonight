const FAVORITES_KEY = "tonight-activity-favorites";

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function getFavoriteIds() {
  if (!canUseStorage()) {
    return [];
  }

  try {
    const rawValue = window.localStorage.getItem(FAVORITES_KEY);

    if (!rawValue) {
      return [];
    }

    const parsed = JSON.parse(rawValue);
    return Array.isArray(parsed)
      ? parsed.filter((value): value is string => typeof value === "string")
      : [];
  } catch {
    return [];
  }
}

export function toggleFavoriteId(activityId: string) {
  if (!canUseStorage()) {
    throw new Error("localStorage unavailable");
  }

  const currentIds = getFavoriteIds();
  const nextIds = currentIds.includes(activityId)
    ? currentIds.filter((id) => id !== activityId)
    : [...currentIds, activityId];

  window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(nextIds));
  return nextIds.includes(activityId);
}
