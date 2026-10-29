import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { GameTile } from "@/components/game-tile";
import { gameCover } from "@/lib/assets";
import { formatCount } from "@/lib/brand";
import { gameCategories, type Game } from "@/lib/games";

export const MarketCard = ({ game }: { game: Game }) => (
  <article className="card-panel flex gap-4 p-4 transition-shadow hover:shadow-md">
    <Link href={`/market/${game.slug}`} className="shrink-0">
      <GameTile
        slug={game.slug}
        label={game.short}
        src={gameCover(game.slug)}
        alt={`${game.name} cover`}
        sizes="96px"
        className="size-20 rounded-xl sm:size-24"
      />
    </Link>
    <div className="min-w-0 flex-1">
      <Link
        href={`/market/${game.slug}`}
        className="line-clamp-1 font-semibold text-zinc-900 hover:text-purple-600"
      >
        {game.name}
      </Link>
      <p className="mt-0.5 text-xs text-zinc-500">
        {game.platform} · {game.genre}
      </p>
      <ul className="mt-2.5 space-y-1">
        {gameCategories(game).map((category) => (
          <li key={category.slug}>
            <Link
              href={`/market/${game.slug}/${category.slug}`}
              className="flex items-center justify-between text-sm text-zinc-600 hover:text-purple-600"
            >
              <span className="flex items-center gap-1">
                <ChevronRight className="size-3.5 text-zinc-400" aria-hidden />
                {category.label}
              </span>
              <span className="tabular-nums text-zinc-400">
                {formatCount(category.count)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </article>
);
