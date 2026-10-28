import {
  BadgeCheck,
  Clock,
  MessageSquare,
  Share2,
  ShieldCheck,
  Star,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GameTile } from "@/components/game-tile";
import { ListingCard } from "@/components/listing-card";
import { Breadcrumbs, SectionHeading } from "@/components/page-blocks";
import { BRAND, formatPrice } from "@/lib/brand";
import {
  CATEGORY_LABELS,
  CATEGORY_ORDER,
  getGame,
  type CategorySlug,
} from "@/lib/games";
import { getListing, getListings, getSeller } from "@/lib/listings";

type Params = Promise<{ game: string; category: string; id: string }>;

const isCategory = (value: string): value is CategorySlug =>
  (CATEGORY_ORDER as string[]).includes(value);

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { game: gameSlug, category, id } = await params;
  const game = getGame(gameSlug);
  if (!game || !isCategory(category)) return {};
  const listing = getListing(gameSlug, category, id);
  if (!listing) return {};
  return {
    title: `${listing.title} — ${game.name} ${CATEGORY_LABELS[category]}`,
    description: listing.description[0],
  };
}

const STEPS = [
  { title: "Lock in your loot", body: "Place the order and pay with any supported method." },
  { title: "Buyer protection", body: "Funds are held securely until the order is complete." },
  { title: "Deliver the goods", body: "The seller delivers in the order chat with proof." },
  { title: "Seal the deal", body: "Confirm the order, or it completes automatically after the set period." },
];

export default async function ListingPage({ params }: { params: Params }) {
  const { game: gameSlug, category, id } = await params;
  const game = getGame(gameSlug);
  if (!game || !isCategory(category)) notFound();
  const listing = getListing(gameSlug, category, id);
  if (!listing) notFound();
  const seller = getSeller(listing.seller);
  if (!seller) notFound();

  const related = getListings(gameSlug, category)
    .filter((item) => item.id !== listing.id)
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Breadcrumbs
        items={[
          { href: "/market", label: "All Markets" },
          { href: `/market/${game.slug}`, label: game.name },
          { href: `/market/${game.slug}/${category}`, label: CATEGORY_LABELS[category] },
          { label: listing.id },
        ]}
      />

      <div className="mt-6 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
        <div className="space-y-6">
          <div className="relative overflow-hidden rounded-2xl border border-black/8">
            <GameTile slug={game.slug} label={game.short} size="lg" className="aspect-[16/10] w-full" />
            {listing.discount > 0 && (
              <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-sm font-bold text-fuchsia-600 shadow-sm">
                -{listing.discount}%
              </span>
            )}
            {listing.affiliateRate && (
              <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                <Share2 className="size-3.5" aria-hidden /> Share · {listing.affiliateRate}%
              </span>
            )}
          </div>

          <div className="card-panel p-6">
            <h2 className="text-lg font-semibold text-zinc-900">Description</h2>
            <div className="mt-3 space-y-3">
              {listing.description.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="text-sm leading-relaxed text-zinc-600">
                  {paragraph}
                </p>
              ))}
            </div>
            <ul className="mt-5 flex flex-wrap gap-2">
              {listing.highlights.map((item) => (
                <li key={item} className="chip">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="card-panel p-6">
            <h2 className="text-lg font-semibold text-zinc-900">How the order works</h2>
            <ol className="mt-4 grid gap-4 sm:grid-cols-2">
              {STEPS.map((step, index) => (
                <li key={step.title} className="flex gap-3">
                  <span className="text-gradient text-sm font-bold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-zinc-900">{step.title}</p>
                    <p className="text-sm text-zinc-600">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <aside className="order-first space-y-4 lg:order-none lg:sticky lg:top-24 lg:self-start">
          <div className="card-panel p-6">
            <div className="flex flex-wrap gap-2">
              <span className="chip">{CATEGORY_LABELS[category]}{listing.tier ? ` · ${listing.tier}` : ""}</span>
              <span className="chip">{listing.server}</span>
              <span className="chip">{listing.id}</span>
            </div>
            <h1 className="mt-4 text-xl font-bold leading-snug tracking-tight text-zinc-900">
              {listing.title}
            </h1>
            <div className="mt-5 flex items-end gap-3">
              <p className="text-3xl font-bold text-zinc-900">{formatPrice(listing.price)}</p>
              {listing.originalPrice && (
                <p className="pb-1 text-sm text-zinc-400 line-through">{formatPrice(listing.originalPrice)}</p>
              )}
            </div>
            <dl className="mt-5 space-y-2 text-sm">
              <div className="flex justify-between gap-2">
                <dt className="text-zinc-500">Delivery method</dt>
                <dd className="text-zinc-800">{listing.delivery}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-zinc-500">Delivery time</dt>
                <dd className="text-zinc-800">{listing.deliveryTime}</dd>
              </div>
              {listing.warranty && (
                <div className="flex justify-between gap-2">
                  <dt className="text-zinc-500">Warranty</dt>
                  <dd className="text-zinc-800">{listing.warranty}</dd>
                </div>
              )}
              <div className="flex justify-between gap-2">
                <dt className="text-zinc-500">Stock</dt>
                <dd className="text-zinc-800">{listing.stock} available · {listing.sold} sold</dd>
              </div>
            </dl>
            <div className="mt-6 flex flex-col gap-3">
              <Link href={`/login?next=/market/${game.slug}/${category}/${listing.id}`} className="btn-gradient px-6 py-3 text-center text-sm">
                Buy now
              </Link>
              <Link
                href="/chat"
                className="flex items-center justify-center gap-2 rounded-full border border-zinc-300 px-6 py-3 text-sm text-zinc-700 transition-colors hover:border-zinc-400"
              >
                <MessageSquare className="size-4" aria-hidden /> Chat with seller
              </Link>
            </div>
            <p className="mt-4 flex items-start gap-2 text-xs text-zinc-500">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-emerald-500" aria-hidden />
              Covered by {BRAND.protection}. Payment is released only after you confirm the order.
            </p>
          </div>

          <div className="card-panel p-6">
            <p className="section-label">Seller</p>
            <div className="mt-3 flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 to-indigo-500 text-lg font-bold text-white">
                {seller.handle[0]}
              </span>
              <div>
                <Link href={`/seller/${seller.handle}`} className="flex items-center gap-1.5 font-semibold text-zinc-900 hover:text-purple-600">
                  {seller.handle}
                  {seller.verified && <BadgeCheck className="size-4 text-sky-500" aria-label="Verified seller" />}
                </Link>
                <p className="flex items-center gap-1 text-xs text-zinc-500">
                  <Star className="size-3 fill-amber-400 text-amber-400" aria-hidden />
                  {seller.rating.toFixed(1)} ({seller.reviews.toLocaleString("en-US")} reviews) · {seller.level} Seller
                </p>
              </div>
            </div>
            <dl className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="rounded-xl bg-zinc-50 p-2">
                <dt className="text-zinc-500">Sales</dt>
                <dd className="font-semibold text-zinc-900">{seller.sales.toLocaleString("en-US")}</dd>
              </div>
              <div className="rounded-xl bg-zinc-50 p-2">
                <dt className="text-zinc-500">Response</dt>
                <dd className="font-semibold text-zinc-900">{seller.responseTime}</dd>
              </div>
              <div className="rounded-xl bg-zinc-50 p-2">
                <dt className="text-zinc-500">Status</dt>
                <dd className={`font-semibold ${seller.online ? "text-emerald-600" : "text-zinc-500"}`}>
                  {seller.online ? "Online" : "Offline"}
                </dd>
              </div>
            </dl>
            <p className="mt-3 flex items-center gap-1.5 text-xs text-zinc-400">
              <Clock className="size-3.5" aria-hidden /> Selling since {seller.joined}
            </p>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="py-16">
          <SectionHeading
            label="More like this"
            title={`Other ${game.name} ${CATEGORY_LABELS[category].toLowerCase()}`}
            href={`/market/${game.slug}/${category}`}
            linkLabel="View all"
          />
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            {related.map((item) => (
              <ListingCard key={item.id} listing={item} showGame={false} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
