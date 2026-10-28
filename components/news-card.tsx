import Link from "next/link";
import { GameTile } from "@/components/game-tile";
import { getGame } from "@/lib/games";
import { formatDate, type Article } from "@/lib/news";

export const NewsCard = ({
  article,
  compact = false,
}: {
  article: Article;
  compact?: boolean;
}) => {
  const game = getGame(article.gameSlug);
  const short = game?.short ?? article.gameName.split(" ").map((w) => w[0]).join("").slice(0, 4).toUpperCase();
  return (
    <article className="card-panel group flex h-full flex-col overflow-hidden transition-shadow hover:shadow-md">
      <Link href={`/news/${article.slug}`}>
        <GameTile
          slug={article.gameSlug}
          label={short}
          size={compact ? "md" : "lg"}
          className={`w-full ${compact ? "aspect-[2/1]" : "aspect-[16/9]"} transition-transform duration-500 group-hover:scale-[1.02]`}
        />
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between gap-2 text-xs">
          {game ? (
            <Link href={`/market/${game.slug}`} className="chip hover:border-purple-300">
              {article.gameName}
            </Link>
          ) : (
            <span className="chip">{article.gameName}</span>
          )}
          <span className="text-zinc-400">{formatDate(article.date)}</span>
        </div>
        <Link
          href={`/news/${article.slug}`}
          className="mt-3 line-clamp-2 font-semibold leading-snug text-zinc-900 hover:text-purple-600"
        >
          {article.title}
        </Link>
        {!compact && (
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-zinc-600">
            {article.excerpt}
          </p>
        )}
        <p className="mt-auto pt-3 text-xs text-zinc-400">{article.readMinutes} min read</p>
      </div>
    </article>
  );
};
