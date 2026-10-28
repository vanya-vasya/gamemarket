import { BRAND } from "./brand";
import {
  ACCOUNT_TIERS,
  CATEGORY_LABELS,
  GAMES,
  gameCategories,
  getGame,
  type AccountTier,
  type CategorySlug,
  type Game,
} from "./games";

export type Seller = {
  handle: string;
  rating: number;
  reviews: number;
  sales: number;
  level: "Bronze" | "Silver" | "Gold" | "Platinum" | "Diamond";
  verified: boolean;
  online: boolean;
  joined: string;
  responseTime: string;
};

export const SELLERS: Seller[] = [
  { handle: "GameNews", rating: 4.9, reviews: 1087, sales: 4120, level: "Diamond", verified: true, online: true, joined: "2023", responseTime: "~5 min" },
  { handle: "Zone", rating: 4.9, reviews: 324, sales: 1265, level: "Platinum", verified: true, online: true, joined: "2024", responseTime: "~10 min" },
  { handle: "LunaStore", rating: 5.0, reviews: 212, sales: 980, level: "Gold", verified: true, online: false, joined: "2024", responseTime: "~20 min" },
  { handle: "ArcadiaShop", rating: 4.8, reviews: 156, sales: 640, level: "Gold", verified: false, online: true, joined: "2025", responseTime: "~15 min" },
  { handle: "PixelVault", rating: 4.9, reviews: 97, sales: 410, level: "Silver", verified: false, online: true, joined: "2025", responseTime: "~30 min" },
  { handle: "NovaBoost", rating: 4.7, reviews: 388, sales: 1530, level: "Platinum", verified: true, online: true, joined: "2023", responseTime: "~5 min" },
  { handle: "TopUpKing", rating: 4.9, reviews: 642, sales: 3890, level: "Diamond", verified: true, online: true, joined: "2023", responseTime: "~2 min" },
  { handle: "Kairo", rating: 4.6, reviews: 48, sales: 140, level: "Bronze", verified: false, online: false, joined: "2026", responseTime: "~1 h" },
  { handle: "QueenBee", rating: 5.0, reviews: 76, sales: 290, level: "Silver", verified: false, online: true, joined: "2025", responseTime: "~25 min" },
  { handle: "MythicDealer", rating: 4.8, reviews: 265, sales: 1010, level: "Gold", verified: true, online: false, joined: "2024", responseTime: "~15 min" },
];

export const getSeller = (handle: string) =>
  SELLERS.find((seller) => seller.handle === handle);

export type Listing = {
  id: string;
  gameSlug: string;
  category: CategorySlug;
  tier?: AccountTier;
  title: string;
  price: number;
  originalPrice?: number;
  discount: number;
  seller: string;
  server: string;
  delivery: "In-Chat Delivery" | "Automatic Delivery";
  deliveryTime: string;
  warranty?: string;
  stock: number;
  sold: number;
  affiliateRate?: number;
  highlights: string[];
  description: string[];
  postedDaysAgo: number;
};

/** Small deterministic PRNG so the catalog is identical on every render. */
const seeded = (seed: string) => {
  let h = 1779033703 ^ seed.length;
  for (const char of seed) {
    h = Math.imul(h ^ char.charCodeAt(0), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  };
};

const pick = <T,>(rand: () => number, items: readonly T[]) =>
  items[Math.floor(rand() * items.length)];
const between = (rand: () => number, min: number, max: number) =>
  Math.floor(min + rand() * (max - min + 1));
const sample = <T,>(rand: () => number, items: readonly T[], count: number) => {
  const pool = [...items];
  const out: T[] = [];
  while (pool.length && out.length < count) {
    out.push(pool.splice(Math.floor(rand() * pool.length), 1)[0]);
  }
  return out;
};

const ACCOUNT_EXTRAS = [
  "Take Mail",
  "Full Access",
  "Original Owner",
  "Email Changeable",
  "No Bind",
  "Check SS",
  "BD Unset",
  "Low Explore",
  "Rate On",
  "Premium Team",
];
const MC = ["Female MC", "Male MC"];
const BOOST_RANKS = [
  ["Bronze", "Silver"],
  ["Silver", "Gold"],
  ["Gold", "Platinum"],
  ["Platinum", "Diamond"],
  ["Diamond", "Master"],
  ["Master", "Grandmaster"],
];
const BOOST_TASKS = [
  "Daily commissions, 7 days",
  "Weekly bosses full clear",
  "Exploration 100% one region",
  "Abyss 36★ clear",
  "Event shop full clear",
  "Battle pass to max",
  "Spiral progression + materials",
  "Achievements farming",
];
const HOURLY = [
  "Pro player co-op, 1 hour",
  "Account piloting, 1 hour",
  "Coaching session, 1 hour",
  "Farming & dailies, 1 hour",
  "Duo queue with pro, 1 hour",
];
const TOPUP_AMOUNTS = [60, 300, 980, 1980, 3280, 6480];
const ITEM_NAMES = [
  "Rare bundle",
  "Starter pack",
  "Boss drop set",
  "Currency pack 1M",
  "Premium skin",
  "Legendary gear set",
];

const tierForLevel = (rand: () => number): AccountTier => {
  const roll = rand();
  if (roll < 0.22) return "Starter";
  if (roll < 0.58) return "Mid Game";
  if (roll < 0.72) return "End Game";
  if (roll < 0.82) return "Reroll";
  if (roll < 0.86) return "Whale";
  return "Others";
};

const tierPrice: Record<AccountTier, [number, number]> = {
  Starter: [8, 40],
  "Mid Game": [35, 180],
  "End Game": [150, 600],
  Reroll: [5, 25],
  Whale: [600, 2500],
  Others: [10, 120],
};

const buildListing = (game: Game, category: CategorySlug, index: number): Listing => {
  const rand = seeded(`${game.slug}:${category}:${index}`);
  const seller = pick(rand, SELLERS);
  const server = pick(rand, game.servers);
  const discount = rand() < 0.55 ? pick(rand, [10, 12, 15, 18, 20, 25, 30]) : 0;
  const id = `${game.short.replace(/[^A-Z0-9]/gi, "").toUpperCase()}${String(1000 + index * 37 + game.slug.length).padStart(4, "0")}`;
  const shared = {
    id,
    gameSlug: game.slug,
    category,
    seller: seller.handle,
    server,
    discount,
    stock: between(rand, 1, 9),
    sold: between(rand, 0, 120),
    affiliateRate: rand() < 0.6 ? pick(rand, [5, 10, 15, 20, 30, 50]) : undefined,
    postedDaysAgo: between(rand, 0, 30),
  };
  const withPrice = (base: number, rest: Omit<Listing, keyof typeof shared | "price" | "originalPrice">): Listing => {
    const price = Math.round(base * 100) / 100;
    const originalPrice = discount ? Math.round((price / (1 - discount / 100)) * 100) / 100 : undefined;
    return { ...shared, price, originalPrice, ...rest };
  };

  if (category === "accounts") {
    const tier = tierForLevel(rand);
    const level = between(rand, 10, 70);
    const limited = between(rand, 1, 14);
    const weapons = between(rand, 0, 8);
    const names = sample(rand, game.highlights, between(rand, 2, 4));
    const extras = sample(rand, ACCOUNT_EXTRAS, 2);
    const [min, max] = tierPrice[tier];
    const title = [
      `${game.levelLabel} ${level}`,
      `${limited} Limited + ${weapons} (*5 Weapon)`,
      names.join(", "),
      pick(rand, MC),
      extras[0],
    ].join(" | ");
    return withPrice(between(rand, min * 100, max * 100) / 100, {
      tier,
      title,
      delivery: "In-Chat Delivery",
      deliveryTime: pick(rand, ["Instant", "5–30 min", "Within 1 hour"]),
      warranty: pick(rand, ["14 days", "30 days", "Lifetime", undefined]),
      highlights: [`${game.levelLabel} ${level}`, ...names, ...extras],
      description: [
        `${tier} ${game.name} account on the ${server} server. ${names.join(", ")} already pulled, ${limited} limited characters and ${weapons} five-star weapons in total.`,
        `${extras.join(" and ")}. Full login details plus original email are transferred in the order chat; the buyer confirms access before the order is marked complete.`,
        `Every ${game.name} account is checked by the seller before listing. If anything differs from the description, ${BRAND.protection} holds the funds and support steps in.`,
      ],
    });
  }

  if (category === "boosting") {
    const ranks = pick(rand, BOOST_RANKS);
    const task = pick(rand, BOOST_TASKS);
    const title = rand() < 0.5
      ? `Rank boost ${ranks[0]} → ${ranks[1]} | Hand-played | Stream on request`
      : `${task} | ${game.name} | Hand-played | VPN safe`;
    return withPrice(between(rand, 900, 14000) / 100, {
      title,
      delivery: "In-Chat Delivery",
      deliveryTime: pick(rand, ["1–2 days", "2–4 days", "Same day"]),
      highlights: ["Hand-played", "VPN matched to your region", "Progress screenshots", "No bots or scripts"],
      description: [
        `Professional ${game.name} booster completes the order on your account. The booster logs in with a VPN matched to your region and never touches your inventory or currency.`,
        "You get progress screenshots in the order chat and can request a stream while the booster plays.",
        "Funds stay protected until you confirm the result. Nothing is released to the seller before you are satisfied.",
      ],
    });
  }

  if (category === "top-up" || category === "robux") {
    const amount = pick(rand, TOPUP_AMOUNTS);
    const bonus = Math.round(amount * (rand() < 0.5 ? 1 : 0.1));
    const unit = category === "robux" ? "Robux" : game.currency;
    return withPrice(amount * (0.0095 + rand() * 0.004), {
      title: `${amount}${bonus ? ` + ${bonus}` : ""} ${unit} | UID top up | ${server}`,
      delivery: rand() < 0.5 ? "Automatic Delivery" : "In-Chat Delivery",
      deliveryTime: pick(rand, ["5–30 min", "Instant", "Within 1 hour"]),
      highlights: [`${amount} ${unit}`, "UID / ID only, no login", "Official recharge", "Receipt provided"],
      description: [
        `Top up ${amount} ${unit} to your ${game.name} account by UID. No password or login is needed, only your in-game ID and server.`,
        "The seller completes the recharge through official channels and sends a receipt screenshot in the order chat.",
        "Confirm in game that the currency has arrived, then mark the order complete to release payment.",
      ],
    });
  }

  if (category === "hourly-services") {
    const service = pick(rand, HOURLY);
    return withPrice(between(rand, 400, 2500) / 100, {
      title: `${service} | ${game.name} | ${server}`,
      delivery: "In-Chat Delivery",
      deliveryTime: "Scheduled in chat",
      highlights: ["Flexible scheduling", "Voice or text", "Extend by the hour", "Experienced player"],
      description: [
        `Book an experienced ${game.name} player by the hour. Use the session for co-op, farming, coaching or simply someone to play with.`,
        "Agree on a time in the order chat. Sessions can be extended hour by hour for the same price.",
        "Payment is released only after the session is over and you confirm it in the order.",
      ],
    });
  }

  if (category === "items") {
    const item = pick(rand, ITEM_NAMES);
    return withPrice(between(rand, 300, 9000) / 100, {
      title: `${item} | ${pick(rand, game.highlights)} | ${server}`,
      delivery: "In-Chat Delivery",
      deliveryTime: pick(rand, ["Instant", "5–30 min", "Within 1 hour"]),
      highlights: [item, "In-game trade", "Meet-up in chat", "Screenshots on request"],
      description: [
        `${item} for ${game.name}, delivered through an in-game trade on ${server}.`,
        "The seller arranges a meeting point in the order chat and hands over the items directly.",
        "Check your inventory before marking the order complete.",
      ],
    });
  }

  return withPrice(between(rand, 200, 5000) / 100, {
    title: `${pick(rand, ["Custom service", "Account unlink", "Region change", "Gift code", "Name change"])} | ${game.name}`,
    delivery: "In-Chat Delivery",
    deliveryTime: pick(rand, ["Same day", "1–2 days"]),
    highlights: ["Custom request", "Details in chat", "Proof of completion"],
    description: [
      `Miscellaneous ${game.name} service. Describe exactly what you need in the order chat before the seller starts.`,
      "The seller uploads proof of completion and you confirm the order once everything is done.",
    ],
  });
};

const cache = new Map<string, Listing[]>();

/** Up to 24 deterministic listings per game and category. */
export const getListings = (gameSlug: string, category: CategorySlug): Listing[] => {
  const key = `${gameSlug}:${category}`;
  const cached = cache.get(key);
  if (cached) return cached;
  const game = getGame(gameSlug);
  const count = Math.min(game?.counts[category] ?? 0, 24);
  const listings = game
    ? Array.from({ length: count }, (_, index) => buildListing(game, category, index))
    : [];
  cache.set(key, listings);
  return listings;
};

export const getGameListings = (gameSlug: string) => {
  const game = getGame(gameSlug);
  if (!game) return [];
  return gameCategories(game).flatMap((category) => getListings(gameSlug, category.slug));
};

export const getListing = (gameSlug: string, category: CategorySlug, id: string) =>
  getListings(gameSlug, category).find((listing) => listing.id === id);

/** Mix of the freshest listings across every popular market. */
export const getNewestListings = (limit = 12): Listing[] =>
  GAMES.filter((game) => game.popular)
    .flatMap((game) => gameCategories(game).flatMap((c) => getListings(game.slug, c.slug).slice(0, 3)))
    .sort((a, b) => a.postedDaysAgo - b.postedDaysAgo || a.id.localeCompare(b.id))
    .slice(0, limit);

export const getSellerListings = (handle: string, limit = 12): Listing[] =>
  GAMES.flatMap((game) => gameCategories(game).flatMap((c) => getListings(game.slug, c.slug)))
    .filter((listing) => listing.seller === handle)
    .slice(0, limit);

export const categoryLabel = (category: CategorySlug) => CATEGORY_LABELS[category];

export const tierCounts = (gameSlug: string): { tier: AccountTier; count: number }[] =>
  ACCOUNT_TIERS.map((tier) => ({
    tier,
    count: getListings(gameSlug, "accounts").filter((listing) => listing.tier === tier).length,
  }));

export type Review = {
  id: string;
  seller: string;
  buyer: string;
  gameSlug: string;
  category: CategorySlug;
  rating: number;
  text: string;
  daysAgo: number;
};

export const REVIEWS: Review[] = [
  { id: "r1", seller: "GameNews", buyer: "yuki_r", gameSlug: "genshin-impact", category: "accounts", rating: 5, text: "Account exactly as described, email changed within ten minutes. Second purchase from this seller.", daysAgo: 0 },
  { id: "r2", seller: "NovaBoost", buyer: "dmitri", gameSlug: "honkai-star-rail", category: "boosting", rating: 5, text: "MoC 12 cleared overnight with screenshots after every stage. Very professional.", daysAgo: 0 },
  { id: "r3", seller: "TopUpKing", buyer: "aisyah", gameSlug: "mobile-legends-bang-bang", category: "top-up", rating: 5, text: "Diamonds arrived in 4 minutes, cheaper than the in-game shop. Recommended.", daysAgo: 1 },
  { id: "r4", seller: "Zone", buyer: "kenta", gameSlug: "epic-seven", category: "accounts", rating: 5, text: "Smooth delivery, seller answered all my questions before I paid.", daysAgo: 1 },
  { id: "r5", seller: "LunaStore", buyer: "marcos", gameSlug: "wuthering-waves", category: "accounts", rating: 4, text: "Great value starter account. Took a bit longer to deliver but everything matched.", daysAgo: 2 },
  { id: "r6", seller: "PixelVault", buyer: "lea", gameSlug: "fortnite", category: "accounts", rating: 5, text: "OG skins account with full access. Buyer protection made the whole thing stress-free.", daysAgo: 2 },
  { id: "r7", seller: "MythicDealer", buyer: "harun", gameSlug: "blood-strike", category: "accounts", rating: 5, text: "Mythic skins confirmed, login worked first try. Will buy again.", daysAgo: 3 },
  { id: "r8", seller: "ArcadiaShop", buyer: "sora", gameSlug: "zenless-zone-zero", category: "accounts", rating: 5, text: "Fast and friendly. Account had more pulls than listed.", daysAgo: 3 },
  { id: "r9", seller: "NovaBoost", buyer: "ivan", gameSlug: "war-thunder", category: "boosting", rating: 5, text: "Top tier grind done in three days, no issues with the account afterwards.", daysAgo: 4 },
  { id: "r10", seller: "QueenBee", buyer: "nadia", gameSlug: "arknights-endfield", category: "hourly-services", rating: 5, text: "Fun co-op session, learned a lot about factory layouts. Booked another hour.", daysAgo: 4 },
  { id: "r11", seller: "GameNews", buyer: "tom", gameSlug: "honkai-star-rail", category: "accounts", rating: 5, text: "Everything legit, seller stayed in chat until I verified the email change.", daysAgo: 5 },
  { id: "r12", seller: "TopUpKing", buyer: "bima", gameSlug: "genshin-impact", category: "top-up", rating: 5, text: "Genesis crystals top up via UID, no login needed. 10/10.", daysAgo: 6 },
];
