export const BRAND = {
  name: "Game Sector",
  domain: "gamesector.gg",
  coins: "GS Coins",
  protection: "Game Sector Buyer Protection",
  year: 2026,
  stats: {
    games: 1789,
    listings: 46980,
    reviews: 3317,
  },
} as const;

export const formatCount = (value: number) =>
  new Intl.NumberFormat("en-US").format(value);

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
