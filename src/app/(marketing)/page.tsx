import Image from "next/image";
import Link from "next/link";
import { AppScreen } from "@/components/layout/app-screen";

export default function HomePage() {
  return (
    <main className="flex h-full flex-col px-5 pb-8 pt-8">
      <AppScreen className="flex min-h-0 flex-1 flex-col">
        <div className="image-mask relative h-full">
          <Image
            src="/intro_header.png"
            alt="Tonight intro cover"
            fill
            priority
            className="object-cover"
          />
        
        </div>

        <div className="mt-auto p-6">
          <Link
            href="/plan"
            className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[var(--color-accent)] px-5 text-sm font-semibold text-[var(--color-accent-ink)] transition hover:opacity-90"
          >
            開始推薦
          </Link>
        </div>
      </AppScreen>
    </main>
  );
}
