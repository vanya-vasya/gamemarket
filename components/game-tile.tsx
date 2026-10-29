import Image from "next/image";
import { gamePalette } from "@/lib/games";

/**
 * Cover slot. Renders the generated artwork when `src` is provided, otherwise a
 * gradient tile inside the brand palette so the catalog never looks broken.
 */
export const GameTile = ({
  slug,
  label,
  src,
  alt,
  className = "",
  size = "md",
  sizes = "(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw",
  priority = false,
}: {
  slug: string;
  label: string;
  src?: string;
  alt?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  sizes?: string;
  priority?: boolean;
}) => {
  if (src) {
    return (
      <div className={`relative overflow-hidden bg-zinc-100 ${className}`}>
        <Image
          src={src}
          alt={alt ?? label}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
    );
  }
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
