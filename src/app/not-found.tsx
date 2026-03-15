import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex h-full flex-col justify-center px-5 py-8">
      <section className="shell-card rounded-[28px] p-6 text-center shadow-[0_24px_60px_rgba(55,40,21,0.10)]">
        <p className="text-sm font-medium text-[var(--color-accent)]">404</p>
        <h1 className="mt-3 text-3xl font-semibold">找不到這個頁面</h1>
        <p className="mt-4 text-base leading-7 text-[var(--color-muted)]">
          你可以回到首頁，或回到推薦頁重新開始。
        </p>
        <div className="mt-8 flex flex-col gap-3">
          <Link
            href="/recommendations"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--color-accent)] px-5 text-sm font-semibold text-[var(--color-accent-ink)] transition hover:opacity-90"
          >
            回推薦頁
          </Link>
          <Link
            href="/"
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-panel-strong)] px-5 text-sm font-medium"
          >
            回首頁
          </Link>
        </div>
      </section>
    </main>
  );
}
