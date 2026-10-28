import type { Metadata } from "next";
import Link from "next/link";
import { MarketCard } from "@/components/market-card";
import { Breadcrumbs } from "@/components/page-blocks";
import { SearchForm } from "@/components/site-header";
import { BRAND, formatCount } from "@/lib/brand";
import { GAMES, GAMES_BY_VOLUME } from "@/lib/games";

export const metadata: Metadata = {
  title: "Browse All Game Markets",
  description: `Browse every game market on ${BRAND.name} A–Z: accounts, boosting, top ups, items and hourly services.`,
};

const LETTERS = ["Top", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""), "#"];

const letterOf = (name: string) => {
  const first = name.replace(/^the\s+/i, "")[0]?.toUpperCase() ?? "#";
  return /[A-Z]/.test(first) ? first : "#";
};

export default async function MarketIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; letter?: string }>;
}) {
  const { q = "", letter = "Top" } = await searchParams;
  const query = q.trim().toLowerCase();

  const filtered = query
    ? GAMES.filter(
        (game) =>
          game.name.toLowerCase().includes(query) ||
          game.short.toLowerCase().includes(query) ||
          game.genre.toLowerCase().includes(query),
      )
    : letter === "Top"
      ? GAMES_BY_VOLUME
      : [...GAMES]
          .filter((game) => letterOf(game.name) === letter)
          .sort((a, b) => a.name.localeCompare(b.name));

  const available = new Set(GAMES.map((game) => letterOf(game.name)));

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ label: "All Markets" }]} />
      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="section-label">{formatCount(BRAND.stats.games)} games</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight">All Markets</h1>
        </div>
        <SearchForm className="w-full sm:w-80" />
      </div>

      <nav aria-label="Alphabet" className="mt-8 flex flex-wrap gap-1.5">
        {LETTERS.map((item) => {
          const active = !query && item === letter;
          const enabled = item === "Top" || available.has(item);
          return enabled ? (
            <Link
              key={item}
              href={item === "Top" ? "/market" : `/market?letter=${item}`}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                active
                  ? "btn-gradient"
                  : "border border-zinc-200 bg-white text-zinc-600 hover:border-purple-300 hover:text-purple-700"
              }`}
            >
              {item}
            </Link>
          ) : (
            <span
              key={item}
              className="rounded-full border border-transparent px-3 py-1.5 text-xs text-zinc-300"
            >
              {item}
            </span>
          );
        })}
      </nav>

      {query && (
        <p className="mt-6 text-sm text-zinc-500">
          {filtered.length} market{filtered.length === 1 ? "" : "s"} matching{" "}
          <span className="font-medium text-zinc-800">“{q}”</span>
        </p>
      )}

      {filtered.length ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((game) => (
            <MarketCard key={game.slug} game={game} />
          ))}
        </div>
      ) : (
        <div className="card-panel mt-8 p-10 text-center">
          <h2 className="text-lg font-semibold text-zinc-900">No markets found</h2>
          <p className="mt-2 text-sm text-zinc-600">
            Can&apos;t find your game? Request a new market section and we&apos;ll
            review it.
          </p>
          <Link href="/support" className="btn-gradient mt-6 inline-block px-6 py-2.5 text-sm">
            Submit a request
          </Link>
        </div>
      )}
    </div>
  );
}
