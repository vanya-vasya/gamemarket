import type { Metadata } from "next";
import Link from "next/link";
import { NewsCard } from "@/components/news-card";
import { Breadcrumbs } from "@/components/page-blocks";
import { BRAND } from "@/lib/brand";
import { ARTICLES } from "@/lib/news";

export const metadata: Metadata = {
  title: "Game News, Updates & Patch Notes",
  description: `Daily game news, event guides and patch notes from the ${BRAND.name} editorial team.`,
};

const PER_PAGE = 9;

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page = "1" } = await searchParams;
  const pages = Math.ceil(ARTICLES.length / PER_PAGE);
  const current = Math.min(Math.max(Number(page) || 1, 1), pages);
  const start = (current - 1) * PER_PAGE;
  const items = ARTICLES.slice(start, start + PER_PAGE);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ label: "News" }]} />
      <p className="section-label mt-4">Fresh every day</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight">News</h1>
      <p className="mt-2 max-w-2xl text-zinc-600">
        Patch notes, event guides and market updates for the games you trade.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((article) => (
          <NewsCard key={article.slug} article={article} />
        ))}
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 text-sm text-zinc-500">
        <p>
          Showing {start + 1}-{Math.min(start + PER_PAGE, ARTICLES.length)} of {ARTICLES.length}
        </p>
        <div className="flex gap-2">
          {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
            <Link
              key={n}
              href={n === 1 ? "/news" : `/news?page=${n}`}
              aria-current={n === current ? "page" : undefined}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold ${
                n === current
                  ? "btn-gradient"
                  : "border border-zinc-200 bg-white text-zinc-600 hover:border-purple-300"
              }`}
            >
              {n}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
