import Image from "next/image";
import { AppScreen } from "@/components/layout/app-screen";

export default function RecommendationsLoading() {
  return (
    <main className="flex h-full flex-col px-5 pb-8 pt-8">
      <AppScreen className="flex min-h-0 flex-1">
        <div className="relative flex min-h-0 flex-1 flex-col items-center justify-center overflow-hidden px-6 py-8 text-center">
          <div className=" absolute inset-0">
            <Image
              src="/VIBECHECK.PNG"
              alt="Vibe check loading visual"
              fill
              priority
              className="object-cover"
            />
          </div>

          <div className="relative z-10 mt-auto max-w-[16rem]">
            <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
              幫你整理適合今晚的 3 個選項，馬上帶你看結果。
            </p>
          </div>

          <div
            className="relative z-10 mt-8 flex items-center justify-center gap-2"
            aria-hidden="true"
          >
            <span className="vibe-dot" />
            <span className="vibe-dot vibe-dot-delay-1" />
            <span className="vibe-dot vibe-dot-delay-2" />
          </div>
        </div>
      </AppScreen>
    </main>
  );
}
