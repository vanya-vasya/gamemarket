import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GameTile } from "@/components/game-tile";
import { gameCover } from "@/lib/assets";
import { ListingCard } from "@/components/listing-card";
import { MarketTabs } from "@/components/market-tabs";
import { NewsCard } from "@/components/news-card";
import { Breadcrumbs, SectionHeading } from "@/components/page-blocks";
import { ReviewCard } from "@/components/review-card";
import { BRAND, formatCount } from "@/lib/brand";
import { GAMES, gameCategories, gameTotal, getGame } from "@/lib/games";
import { REVIEWS, getListings } from "@/lib/listings";
import { ARTICLES } from "@/lib/news";

type Params = Promise<{ game: string }>;

export const generateStaticParams = () => GAMES.map((game) => ({ game: game.slug }));

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const game = getGame((await params).game);
  if (!game) return {};
  return {
    title: `Buy ${game.name} for Sale`,
    description: `${formatCount(gameTotal(game))} ${game.name} listings: ${gameCategories(game)
      .map((c) => c.label.toLowerCase())
      .join(", ")}. Protected by ${BRAND.protection}.`,
  };
}

export default async function GamePage({ params }: { params: Params }) {
  const game = getGame((await params).game);
  if (!game) notFound();

  const categories = gameCategories(game);
  const reviews = REVIEWS.filter((review) => review.gameSlug === game.slug).slice(0, 3);
  const articles = ARTICLES.filter((article) => article.gameSlug === game.slug).slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ href: "/market", label: "All Markets" }, { label: game.name }]} />

      <section className="mt-6 flex flex-col gap-6 md:flex-row md:items-center">
        <GameTile
          slug={game.slug}
          label={game.short}
          src={gameCover(game.slug)}
          alt={`${game.name} cover`}
          size="lg"
          sizes="128px"
          priority
          className="size-28 shrink-0 rounded-2xl sm:size-32"
        />
        <div className="min-w-0">
          <div className="flex flex-wrap gap-2">
            <span className="chip">{game.platform}</span>
            <span className="chip">{game.genre}</span>
            <span className="chip">{formatCount(gameTotal(game))} listings</span>
          </div>
          <h1 className="mt-3 text-4xl font-bold tracking-tight">{game.name}</h1>
          <p className="mt-2 max-w-2xl text-zinc-600">{game.blurb}</p>
          <p className="mt-1 text-sm text-zinc-500">Servers: {game.servers.join(" · ")}</p>
        </div>
      </section>

      <div className="mt-8">
        <MarketTabs game={game} />
      </div>

      {categories.map((category) => {
        const listings = getListings(game.slug, category.slug);
        if (!listings.length) return null;
        return (
          <section key={category.slug} className="py-10">
            <SectionHeading
              label={`${formatCount(category.count)} listings`}
              title={`${game.name} ${category.label}`}
              href={`/market/${game.slug}/${category.slug}`}
              linkLabel={`All ${category.label.toLowerCase()}`}
            />
            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
              {listings.slice(0, 8).map((listing) => (
                <ListingCard key={listing.id} listing={listing} showGame={false} />
              ))}
            </div>
          </section>
        );
      })}

      {reviews.length > 0 && (
        <section className="py-10">
          <SectionHeading label="Market-specific feedback" title={`${game.name} reviews`} />
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </section>
      )}

      {articles.length > 0 && (
        <section className="py-10">
          <SectionHeading label="News" title={`${game.name} updates`} href="/news" linkLabel="All news" />
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {articles.map((article) => (
              <NewsCard key={article.slug} article={article} compact />
            ))}
          </div>
        </section>
      )}

      <section className="py-10">
        <div className="card-panel grid items-center gap-6 p-8 md:grid-cols-2 md:p-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Sell your {game.name} stock{" "}
              <span className="text-gradient">with 0% commission</span>
            </h2>
            <p className="mt-4 text-zinc-600">
              Free listings, instant payouts and {BRAND.protection} on every
              order. Verify once, sell in every market.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 md:justify-end">
            <Link href="/seller" className="btn-gradient px-6 py-3 text-sm">
              Become a seller
            </Link>
            <Link
              href="/faq"
              className="rounded-full border border-zinc-300 px-6 py-3 text-sm text-zinc-700 hover:border-zinc-400"
            >
              Read the FAQ
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
