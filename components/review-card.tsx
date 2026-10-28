import { Star } from "lucide-react";
import Link from "next/link";
import { CATEGORY_LABELS, getGame } from "@/lib/games";
import type { Review } from "@/lib/listings";

const ago = (days: number) =>
  days === 0 ? "Today" : days === 1 ? "Yesterday" : `${days} days ago`;

export const Stars = ({ rating }: { rating: number }) => (
  <span className="flex items-center gap-0.5" aria-label={`${rating} out of 5`}>
    {Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`size-3.5 ${i < Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-zinc-300"}`}
        aria-hidden
      />
    ))}
  </span>
);

export const ReviewCard = ({ review }: { review: Review }) => {
  const game = getGame(review.gameSlug);
  return (
    <article className="card-panel flex h-full flex-col p-5">
      <div className="flex items-center justify-between gap-3">
        <Stars rating={review.rating} />
        <span className="text-xs text-zinc-400">{ago(review.daysAgo)}</span>
      </div>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-700">
        <span className="text-gradient mr-1 text-lg font-bold leading-none">“</span>
        {review.text}
      </p>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-black/5 pt-3 text-xs text-zinc-500">
        <span>
          <span className="font-medium text-zinc-800">@{review.buyer}</span> about{" "}
          <Link href={`/seller/${review.seller}`} className="font-medium text-purple-600 hover:text-purple-500">
            {review.seller}
          </Link>
        </span>
        {game && (
          <Link
            href={`/market/${game.slug}/${review.category}`}
            className="chip hover:border-purple-300"
          >
            {game.name} · {CATEGORY_LABELS[review.category]}
          </Link>
        )}
      </div>
    </article>
  );
};
