import Link from "next/link";
import { formatCount } from "@/lib/brand";
import { CATEGORY_LABELS, CATEGORY_ORDER, type CategorySlug, type Game } from "@/lib/games";

export const MarketTabs = ({
  game,
  active,
}: {
  game: Game;
  active?: CategorySlug;
}) => (
  <nav aria-label="Categories" className="flex flex-wrap gap-2">
    {CATEGORY_ORDER.filter(
      (category) => (game.counts[category] ?? 0) > 0 || category === active,
    ).map((category) => {
      const count = game.counts[category] ?? 0;
      const isActive = category === active;
      return (
        <Link
          key={category}
          href={`/market/${game.slug}/${category}`}
          className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            isActive
              ? "btn-gradient"
              : "border border-zinc-200 bg-white text-zinc-700 hover:border-purple-300 hover:text-purple-700"
          }`}
        >
          {CATEGORY_LABELS[category]}
          <span className={`tabular-nums text-xs ${isActive ? "text-white/80" : "text-zinc-400"}`}>
            {formatCount(count)}
          </span>
        </Link>
      );
    })}
  </nav>
);
