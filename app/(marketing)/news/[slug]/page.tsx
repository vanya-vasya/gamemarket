import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GameTile } from "@/components/game-tile";
import { ListingCard } from "@/components/listing-card";
import { NewsCard } from "@/components/news-card";
import { Breadcrumbs, SectionHeading } from "@/components/page-blocks";
import { gameCategories, getGame } from "@/lib/games";
import { getListings } from "@/lib/listings";
import { ARTICLES, formatDate, getArticle } from "@/lib/news";

type Params = Promise<{ slug: string }>;

export const generateStaticParams = () => ARTICLES.map((article) => ({ slug: article.slug }));

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const article = getArticle((await params).slug);
  if (!article) return {};
  return { title: article.title, description: article.excerpt };
}

export default async function ArticlePage({ params }: { params: Params }) {
  const article = getArticle((await params).slug);
  if (!article) notFound();
  const game = getGame(article.gameSlug);
  const firstCategory = game ? gameCategories(game)[0] : undefined;
  const listings = game && firstCategory ? getListings(game.slug, firstCategory.slug).slice(0, 4) : [];
  const more = ARTICLES.filter((item) => item.slug !== article.slug).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ href: "/news", label: "News" }, { label: article.gameName }]} />
      <article className="mx-auto mt-6 max-w-3xl">
        <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500">
          {game ? (
            <Link href={`/market/${game.slug}`} className="chip hover:border-purple-300">
              {article.gameName}
            </Link>
          ) : (
            <span className="chip">{article.gameName}</span>
          )}
          <span>{formatDate(article.date)}</span>
          <span>·</span>
          <span>{article.readMinutes} min read</span>
        </div>
        <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight">{article.title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-zinc-600">{article.excerpt}</p>
        <GameTile
          slug={article.gameSlug}
          label={game?.short ?? article.gameName.slice(0, 3).toUpperCase()}
          size="lg"
          className="mt-8 aspect-[16/8] w-full rounded-2xl"
        />
        <div className="mt-8 space-y-5">
          {article.body.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="leading-relaxed text-zinc-700">
              {paragraph}
            </p>
          ))}
        </div>
      </article>

      {game && listings.length > 0 && (
        <section className="py-16">
          <SectionHeading
            label="From the market"
            title={`${game.name} ${firstCategory?.label.toLowerCase()}`}
            href={`/market/${game.slug}`}
            linkLabel={`Browse ${game.name}`}
          />
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} showGame={false} />
            ))}
          </div>
        </section>
      )}

      <section className="py-8">
        <SectionHeading label="Keep reading" title="More news" href="/news" linkLabel="All news" />
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {more.map((item) => (
            <NewsCard key={item.slug} article={item} compact />
          ))}
        </div>
      </section>
    </div>
  );
}
