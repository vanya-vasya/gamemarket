import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ListingCard } from "@/components/listing-card";
import { MarketTabs } from "@/components/market-tabs";
import { Breadcrumbs } from "@/components/page-blocks";
import { BRAND, formatCount } from "@/lib/brand";
import {
  ACCOUNT_TIERS,
  CATEGORY_LABELS,
  CATEGORY_ORDER,
  GAMES,
  gameCategories,
  getGame,
  type AccountTier,
  type CategorySlug,
} from "@/lib/games";
import { getListings, getSeller, tierCounts } from "@/lib/listings";

type Params = Promise<{ game: string; category: string }>;
type Search = Promise<{ tier?: string; server?: string; sort?: string; online?: string }>;

const isCategory = (value: string): value is CategorySlug =>
  (CATEGORY_ORDER as string[]).includes(value);

export const generateStaticParams = () =>
  GAMES.flatMap((game) =>
    gameCategories(game).map((category) => ({ game: game.slug, category: category.slug })),
  );

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { game: gameSlug, category } = await params;
  const game = getGame(gameSlug);
  if (!game || !isCategory(category)) return {};
  return {
    title: `Buy ${game.name} ${CATEGORY_LABELS[category]} for Sale`,
    description: `${formatCount(game.counts[category] ?? 0)} ${game.name} ${CATEGORY_LABELS[category].toLowerCase()} listings from verified sellers. Covered by ${BRAND.protection}.`,
  };
}

const SORTS = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "discount", label: "Biggest discount" },
];

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: Search;
}) {
  const { game: gameSlug, category } = await params;
  const game = getGame(gameSlug);
  if (!game || !isCategory(category)) notFound();

  const { tier, server, sort = "newest", online } = await searchParams;
  const base = `/market/${game.slug}/${category}`;
  const buildHref = (patch: Record<string, string | undefined>) => {
    const query = new URLSearchParams();
    const next = { tier, server, sort, online, ...patch };
    for (const [key, value] of Object.entries(next)) {
      if (value && !(key === "sort" && value === "newest")) query.set(key, value);
    }
    const qs = query.toString();
    return qs ? `${base}?${qs}` : base;
  };

  let listings = getListings(game.slug, category);
  if (category === "accounts" && tier && (ACCOUNT_TIERS as readonly string[]).includes(tier)) {
    listings = listings.filter((listing) => listing.tier === (tier as AccountTier));
  }
  if (server) listings = listings.filter((listing) => listing.server === server);
  if (online === "1") {
    listings = listings.filter((listing) => getSeller(listing.seller)?.online);
  }
  listings = [...listings].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    if (sort === "discount") return b.discount - a.discount;
    return a.postedDaysAgo - b.postedDaysAgo;
  });

  const tiers = category === "accounts" ? tierCounts(game.slug) : [];
  const total = game.counts[category] ?? 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Breadcrumbs
        items={[
          { href: "/market", label: "All Markets" },
          { href: `/market/${game.slug}`, label: game.name },
          { label: CATEGORY_LABELS[category] },
        ]}
      />
      <h1 className="mt-4 text-4xl font-bold tracking-tight">
        {game.name} <span className="text-gradient">{CATEGORY_LABELS[category]}</span>
      </h1>
      <p className="mt-2 text-zinc-600">
        {formatCount(total)} listings from verified sellers. Payment is held by{" "}
        {BRAND.protection} until you confirm delivery.
      </p>

      <div className="mt-6">
        <MarketTabs game={game} active={category} />
      </div>

      {tiers.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2" aria-label="Account tiers">
          <Link
            href={buildHref({ tier: undefined })}
            className={`chip ${!tier ? "border-purple-400 bg-purple-50 text-purple-700" : "hover:border-purple-300"}`}
          >
            All tiers
          </Link>
          {tiers.map((item) => (
            <Link
              key={item.tier}
              href={buildHref({ tier: item.tier })}
              className={`chip ${tier === item.tier ? "border-purple-400 bg-purple-50 text-purple-700" : "hover:border-purple-300"}`}
            >
              {item.tier} <span className="text-zinc-400">{item.count}</span>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-6 flex flex-col gap-3 border-y border-black/5 py-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-zinc-500">Server:</span>
          <Link
            href={buildHref({ server: undefined })}
            className={`chip ${!server ? "border-purple-400 bg-purple-50 text-purple-700" : "hover:border-purple-300"}`}
          >
            All
          </Link>
          {game.servers.map((item) => (
            <Link
              key={item}
              href={buildHref({ server: item })}
              className={`chip ${server === item ? "border-purple-400 bg-purple-50 text-purple-700" : "hover:border-purple-300"}`}
            >
              {item}
            </Link>
          ))}
          <Link
            href={buildHref({ online: online === "1" ? undefined : "1" })}
            className={`chip ${online === "1" ? "border-purple-400 bg-purple-50 text-purple-700" : "hover:border-purple-300"}`}
          >
            <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden /> Online seller
          </Link>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-zinc-500">Sort:</span>
          {SORTS.map((item) => (
            <Link
              key={item.value}
              href={buildHref({ sort: item.value })}
              className={`chip ${sort === item.value ? "border-purple-400 bg-purple-50 text-purple-700" : "hover:border-purple-300"}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {listings.length ? (
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} showGame={false} />
          ))}
        </div>
      ) : (
        <div className="card-panel mt-8 p-10 text-center">
          <h2 className="text-lg font-semibold text-zinc-900">No listings match these filters</h2>
          <p className="mt-2 text-sm text-zinc-600">Try another server or tier, or clear the filters.</p>
          <Link href={base} className="btn-gradient mt-6 inline-block px-6 py-2.5 text-sm">
            Clear filters
          </Link>
        </div>
      )}

      <p className="mt-8 text-xs text-zinc-400">
        Showing {listings.length} of {formatCount(total)} {game.name}{" "}
        {CATEGORY_LABELS[category].toLowerCase()} listings.
      </p>
    </div>
  );
}
