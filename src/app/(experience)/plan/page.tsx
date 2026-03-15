import Image from "next/image";
import Link from "next/link";
import { AppScreen } from "@/components/layout/app-screen";
import { PlanForm } from "@/components/plan/plan-form";
import {
  parseFilterParams,
  type SearchParamRecord,
} from "@/lib/filters/search-params";

type PlanPageProps = {
  searchParams: Promise<SearchParamRecord>;
};

export default async function PlanPage({ searchParams }: PlanPageProps) {
  const filters = parseFilterParams(await searchParams);

  return (
    <main className="flex h-full flex-col px-5 pb-8 pt-8">
      <AppScreen className="flex min-h-0 flex-1 flex-col">
        <div className="app-scroll flex min-h-0 flex-1 flex-col overflow-y-auto p-6">
          <h1 className="text-3xl font-semibold">先選幾個今晚條件</h1>
          <div className="mt-6">
            <PlanForm initialFilters={filters} />
          </div>
          <div className="mt-4 flex flex-col gap-3">
            <Link
              href="/"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-panel-strong)] px-5 text-sm font-medium"
            >
              回首頁
            </Link>
          </div>
        </div>
      </AppScreen>
    </main>
  );
}
