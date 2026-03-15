"use client";

import Link from "next/link";

type RecommendationsErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function RecommendationsError({
  error,
  reset,
}: RecommendationsErrorProps) {
  return (
    <main className="flex min-h-screen flex-col justify-center px-5 py-8">
      <section className="shell-card rounded-[28px] p-6 shadow-[0_24px_60px_rgba(55,40,21,0.10)]">
        <p className="text-sm font-medium text-[var(--color-accent)]">推薦暫時出錯</p>
        <h1 className="mt-3 text-3xl font-semibold">今晚的選項還沒整理好</h1>
        <p className="mt-4 text-base leading-7 text-[var(--color-muted)]">
          剛剛在整理推薦時發生非預期問題。你可以先重試一次，或回到條件設定重新開始。
        </p>
        <p className="mt-3 text-xs leading-6 text-[var(--color-muted)]">
          錯誤訊息：{error.message || "unknown error"}
        </p>
        <div className="mt-8 flex flex-col gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--color-accent)] px-5 text-sm font-semibold text-[var(--color-accent-ink)] transition hover:opacity-90"
          >
            再試一次
          </button>
          <Link
            href="/plan"
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-panel-strong)] px-5 text-sm font-medium"
          >
            返回條件設定
          </Link>
        </div>
      </section>
    </main>
  );
}
