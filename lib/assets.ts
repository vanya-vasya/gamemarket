import manifest from "./asset-manifest.json";

/**
 * Image slots. Every slot is a path under public/images without extension;
 * the first existing file among the supported extensions wins. When nothing
 * exists the caller falls back to the gradient tile / initial letter, so the
 * site renders with any subset of images present.
 *
 * Regenerate the manifest with `npm run assets` (also runs before build/dev).
 */
const ASSETS = new Set<string>(manifest as string[]);
const EXTENSIONS = ["webp", "jpg", "jpeg", "png", "avif"] as const;

export const findAsset = (slot: string): string | undefined => {
  for (const ext of EXTENSIONS) {
    const path = `/images/${slot}.${ext}`;
    if (ASSETS.has(path)) return path;
  }
  return undefined;
};

/** public/images/games/<game-slug>.*  — 4:3, used for tiles, listing covers and market heroes. */
export const gameCover = (gameSlug: string) => findAsset(`games/${gameSlug}`);

/** public/images/news/<article-slug>.*  — 16:9; falls back to the game cover. */
export const newsCover = (article: { slug: string; gameSlug: string }) =>
  findAsset(`news/${article.slug}`) ?? gameCover(article.gameSlug);

/** public/images/sellers/<handle-lowercase>.*  — 1:1 avatar. */
export const sellerAvatar = (handle: string) =>
  findAsset(`sellers/${handle.toLowerCase()}`);

/** public/images/merchants/<merchant-slug>.*  — 1:1 logo mark. */
export const merchantLogo = (merchantSlug: string) =>
  findAsset(`merchants/${merchantSlug}`);

/** public/images/site/<name>.*  — page heroes, OG image, 404 illustration. */
export const siteImage = (
  name:
    | "home-hero"
    | "seller-hero"
    | "affiliate-hero"
    | "about-hero"
    | "og-default"
    | "not-found",
) => findAsset(`site/${name}`);
