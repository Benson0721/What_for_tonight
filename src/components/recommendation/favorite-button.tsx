"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import {
  getFavoriteIds,
  toggleFavoriteId,
} from "@/lib/storage/favorites";

type FavoriteButtonProps = {
  activityId: string;
};

export function FavoriteButton({ activityId }: FavoriteButtonProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    setIsFavorited(getFavoriteIds().includes(activityId));
  }, [activityId]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  function showFeedback(message: string) {
    setFeedback(message);

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setFeedback(null);
    }, 2200);
  }

  function handleToggle() {
    startTransition(() => {
      try {
        const nextValue = toggleFavoriteId(activityId);
        setIsFavorited(nextValue);
        showFeedback(nextValue ? "已加入有興趣清單" : "已從有興趣清單移除");
      } catch {
        showFeedback("目前無法保存");
      }
    });
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleToggle}
        disabled={isPending}
        aria-pressed={isFavorited}
        className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-[var(--color-border)] bg-[rgba(255,255,255,0.05)] px-5 text-sm font-medium text-[var(--color-ink)] transition disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isFavorited ? "已收藏" : "收藏"}
      </button>
      <p
        aria-live="polite"
        className="mt-2 min-h-5 text-center text-xs text-[var(--color-muted)]"
      >
        {feedback ?? " "}
      </p>
    </div>
  );
}
