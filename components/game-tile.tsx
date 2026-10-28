import { gamePalette } from "@/lib/games";

/**
 * Gradient tile that stands in for cover art. Stays inside the brand gradient
 * palette so the catalog never breaks the visual language of the site.
 */
export const GameTile = ({
  slug,
  label,
  className = "",
  size = "md",
}: {
  slug: string;
  label: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}) => {
  const text =
    size === "sm" ? "text-xs" : size === "lg" ? "text-3xl sm:text-4xl" : "text-lg";
  return (
    <div
      aria-hidden
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br text-white ${gamePalette(slug)} ${className}`}
    >
      <span className="absolute -left-6 -top-6 size-24 rounded-full bg-white/15 blur-2xl" />
      <span className="absolute -bottom-8 -right-8 size-32 rounded-full bg-black/15 blur-2xl" />
      <span className={`relative font-bold tracking-[0.12em] drop-shadow ${text}`}>
        {label}
      </span>
    </div>
  );
};
