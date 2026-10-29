import { BadgeCheck, Star } from "lucide-react";
import Link from "next/link";
import { GameTile } from "@/components/game-tile";
import { SellerAvatar } from "@/components/seller-avatar";
import { gameCover } from "@/lib/assets";
import { formatPrice } from "@/lib/brand";
import { CATEGORY_LABELS, getGame } from "@/lib/games";
import { getSeller, type Listing } from "@/lib/listings";

export const listingHref = (listing: Listing) =>
  `/market/${listing.gameSlug}/${listing.category}/${listing.id}`;

export const SellerLine = ({
  handle,
  className = "",
}: {
  handle: string;
  className?: string;
}) => {
  const seller = getSeller(handle);
  if (!seller) return null;
  return (
    <span className={`flex items-center gap-1.5 text-xs text-zinc-600 ${className}`}>
      <SellerAvatar handle={seller.handle} size="xs" />
      <span className="font-medium text-zinc-800">{seller.handle}</span>
      {seller.verified && (
        <BadgeCheck className="size-3.5 text-sky-500" aria-label="Verified seller" />
      )}
      <Star className="size-3 fill-amber-400 text-amber-400" aria-hidden />
      <span className="tabular-nums">
        {seller.rating.toFixed(1)} ({seller.reviews.toLocaleString("en-US")})
      </span>
    </span>
  );
};

export const ListingCard = ({
  listing,
  showGame = true,
}: {
  listing: Listing;
  showGame?: boolean;
}) => {
  const game = getGame(listing.gameSlug);
  if (!game) return null;
  return (
    <article className="card-panel group flex flex-col overflow-hidden transition-shadow hover:shadow-md">
      <Link href={listingHref(listing)} className="relative block">
        <GameTile
          slug={game.slug}
          label={game.short}
          src={gameCover(game.slug)}
          alt={`${game.name} cover`}
          size="lg"
          className="aspect-[4/3] w-full transition-transform duration-500 group-hover:scale-[1.02]"
        />
        {listing.discount > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2 py-0.5 text-xs font-bold text-fuchsia-600 shadow-sm">
            -{listing.discount}%
          </span>
        )}
        <span className="absolute right-3 top-3 rounded-full bg-black/40 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur">
          {listing.server}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <SellerLine handle={listing.seller} />
        {showGame && (
          <Link
            href={`/market/${game.slug}`}
            className="mt-2 text-xs font-medium text-purple-600 hover:text-purple-500"
          >
            {game.name}
          </Link>
        )}
        <Link
          href={listingHref(listing)}
          className="mt-1.5 line-clamp-2 text-sm font-semibold leading-snug text-zinc-900 hover:text-purple-600"
        >
          {listing.title}
        </Link>
        <dl className="mt-3 space-y-1 text-xs text-zinc-500">
          <div className="flex justify-between gap-2">
            <dt>Type</dt>
            <dd className="text-right text-zinc-700">
              {CATEGORY_LABELS[listing.category]}
              {listing.tier ? ` · ${listing.tier}` : ""}
            </dd>
          </div>
          <div className="flex justify-between gap-2">
            <dt>Delivery method</dt>
            <dd className="text-right text-zinc-700">{listing.delivery}</dd>
          </div>
          <div className="flex justify-between gap-2">
            <dt>Server</dt>
            <dd className="text-right text-zinc-700">{listing.server}</dd>
          </div>
        </dl>
        <div className="mt-auto flex items-end justify-between pt-4">
          <div>
            {listing.originalPrice && (
              <p className="text-xs text-zinc-400 line-through">
                {formatPrice(listing.originalPrice)}
              </p>
            )}
            <p className="text-lg font-bold text-zinc-900">
              {formatPrice(listing.price)}
            </p>
          </div>
          {listing.warranty && (
            <span className="chip">{listing.warranty} warranty</span>
          )}
        </div>
      </div>
    </article>
  );
};
