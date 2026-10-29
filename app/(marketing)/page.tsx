import {
  Headset,
  LayoutGrid,
  ShieldCheck,
  Star,
} from "lucide-react";
import Link from "next/link";
import { HeroArt, HeroGrid } from "@/components/hero-art";
import { ListingCard } from "@/components/listing-card";
import { MarketCard } from "@/components/market-card";
import { NewsCard } from "@/components/news-card";
import { Cta, FeatureGrid, SectionHeading } from "@/components/page-blocks";
import { ReviewCard } from "@/components/review-card";
import { siteImage } from "@/lib/assets";
import { BRAND, formatCount } from "@/lib/brand";
import {
  CATEGORY_LABELS,
  POPULAR_GAMES,
  POPULAR_SEARCHES,
  getGame,
} from "@/lib/games";
import { REVIEWS, getNewestListings } from "@/lib/listings";
import { ARTICLES } from "@/lib/news";

const FEATURES = [
  {
    icon: LayoutGrid,
    title: "All-in-One Digital Market",
    body: "A complete ecosystem for gamers. Find, trade, and grow across diverse digital goods.",
  },
  {
    icon: ShieldCheck,
    title: "Buyer Protection",
    body: "Your payment is protected until the order is complete, guaranteed safety in every transaction.",
  },
  {
    icon: Star,
    title: "Trusted sellers & ratings",
    body: "Trusted sellers with transparent ratings for a worry-free shopping experience.",
  },
  {
    icon: Headset,
    title: "24/7 customer support",
    body: "Problem with your order? Get 24/7 support for a seamless experience.",
  },
];

const GUIDE: { heading: string; paragraphs?: string[]; bullets?: string[] }[] = [
  {
    heading: "Understanding the Concept of a Game Digital Asset Platform",
    paragraphs: [
      "At its core, a game marketplace facilitates the exchange of digital assets among the gaming community. Its purpose is to provide a centralized, secure hub where gamers can easily find and acquire items that might be difficult to obtain within the game itself. The key difference lies between independent trading platforms and official stores:",
    ],
    bullets: [
      `Secure Platforms (like ${BRAND.name}): Gamers can acquire assets directly through a verified and protected ecosystem. The platform guarantees security and fairness for all listed assets, ranging from rare accounts to in-game items, acting as the principal guarantor of the transaction.`,
      "Official Stores (like the Steam Community Market): These are typically operated by the game developers themselves. Trading is limited to specific items (like skins or cards), and profits often remain within the platform's ecosystem as store credit.",
    ],
  },
  {
    heading: `How Game Marketplaces Like ${BRAND.name} Work`,
    paragraphs: [
      `Modern game trading platforms are designed with a primary focus on security and convenience. The transaction process on ${BRAND.name} follows a clear, step-by-step flow to protect every user.`,
    ],
    bullets: [
      "Verified Listings: Game accounts, items, or services (such as a boosting service) are listed with detailed descriptions, images, and set prices.",
      "Buyer Places an Order: A buyer browses the verified catalog and makes a purchase for their desired item.",
      `Funds are Secured via ${BRAND.protection}: The buyer's payment is processed and held securely by our internal guarantee system. The transaction is fully protected until the order is successfully completed.`,
      "Digital Asset Delivery: The asset is delivered to the buyer through the platform's secure delivery system. For accounts and items the details are transferred securely; for boosting services a verified professional begins working on the service as agreed.",
      "Buyer Confirms Receipt: The buyer inspects the received asset or verifies that the boosting service has been completed as described.",
      `Order is Settled: Once confirmation is received, ${BRAND.name} finalizes the transaction securely and updates the respective account balances.`,
    ],
  },
  {
    heading: "Why Players Buy and Sell Game Accounts",
    paragraphs: [
      "The motivations behind trading digital assets are diverse but generally center on three main benefits:",
    ],
    bullets: [
      "Saving Time (Skipping the Grind): Many games demand a significant time investment to obtain rare items or reach high levels. Marketplaces allow players to buy established accounts or hire boosting experts to rank up without spending countless hours.",
      "Earning Real Money from Game Assets: Dedicated players can turn their time and skill into real-world value by supplying high-demand accounts or items to the community.",
      "Access to Global Trading: Marketplaces connect players from different regions, opening up opportunities to acquire items that may not be available on their local servers.",
    ],
  },
  {
    heading: `Security and Trust in ${BRAND.name}`,
    paragraphs: [
      `As a secure game marketplace, ${BRAND.name} prioritizes user safety through several layers of protection:`,
    ],
    bullets: [
      `${BRAND.protection}: A fundamental feature that protects users by ensuring funds are secured and transactions are verified as completely fulfilled before final settlement.`,
      "Verified Inventory & Sellers: We enforce strict verification processes to ensure the reliability and legitimacy of the assets on our platform.",
      `Delivery Guarantee: ${BRAND.name} offers a comprehensive guarantee that protects buyers from fraud or assets that are not as described.`,
      "Transparent Review System: Each completed transaction allows users to leave honest ratings and reviews, helping build trust and accountability.",
      "Dispute Resolution: A dedicated support team is available 24/7 to help resolve any issues that may arise during the trading process.",
    ],
  },
  {
    heading: "Different Types of Game Marketplaces",
    bullets: [
      `Comprehensive Marketplaces (${BRAND.name}): Focus on a wide variety of digital asset trading backed by strict internal security and Buyer Protection.`,
      "Official Stores (Steam Community Market): Managed by game publishers, usually restricted to cosmetic items.",
      "Modern Payment Platforms: A new generation of platforms that support multiple payment methods, allowing users to buy and acquire digital assets seamlessly across various payment options.",
    ],
  },
  {
    heading: `Why ${BRAND.name} Is the Best Choice`,
    bullets: [
      "24/7 Support: Our team is always ready to assist you at any time.",
      "Verified Listings: We work hard to ensure all active listings on our platform are legitimate, accurate, and ready for secure transfer.",
      "Transparent Reviews: Supported by a clear rating and review system based on real user experiences.",
      "Global Marketplace Coverage: Connecting thousands of gamers from all over the world.",
    ],
  },
  {
    heading: "The Future of Game Marketplaces",
    paragraphs: [
      `The future of digital trading looks bright with the rise of Web3 and true digital asset ownership, where players have full control over the items they earn. As technology evolves, platforms like ${BRAND.name} will continue to adapt to serve the needs of gamers.`,
    ],
  },
];

export default function HomePage() {
  const newest = getNewestListings(12);
  const reviews = REVIEWS.slice(0, 6);
  const articles = ARTICLES.slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      {/* Hero */}
      <section className="py-14 md:py-20">
        <HeroGrid
          art={<HeroArt src={siteImage("home-hero")} alt="Collage of game accounts, boosting and top ups traded on Game Sector" />}
        >
          <span className="chip">
            {formatCount(BRAND.stats.games)} games · {formatCount(BRAND.stats.listings)} listings
          </span>
          <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Gamers marketplace{" "}
            <span className="text-gradient">you can trust</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-600">
            Buy and sell game accounts, boosting, top ups, items and hourly
            services. Every payment is held by {BRAND.protection} until the
            order is complete.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="/market" className="btn-gradient px-6 py-3 text-sm">
              Browse all markets →
            </Link>
            <Link
              href="/seller"
              className="rounded-full border border-zinc-300 px-6 py-3 text-sm text-zinc-700 transition-colors hover:border-zinc-400"
            >
              Start selling with 0% commission
            </Link>
          </div>
          <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
            <div>
              <dt className="text-2xl font-bold text-zinc-900">0%</dt>
              <dd className="text-sm text-zinc-500">sales commission</dd>
            </div>
            <div>
              <dt className="text-2xl font-bold text-zinc-900">{formatCount(BRAND.stats.reviews)}</dt>
              <dd className="text-sm text-zinc-500">verified reviews</dd>
            </div>
            <div>
              <dt className="text-2xl font-bold text-zinc-900">24/7</dt>
              <dd className="text-sm text-zinc-500">customer support</dd>
            </div>
          </dl>
        </HeroGrid>
      </section>

      {/* Popular markets */}
      <section className="py-12">
        <SectionHeading
          label={`Out of ${formatCount(BRAND.stats.games)}`}
          title="Popular Markets"
          href="/market"
          linkLabel="Discover more markets"
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {POPULAR_GAMES.map((game) => (
            <MarketCard key={game.slug} game={game} />
          ))}
        </div>
      </section>

      {/* Newest listings */}
      <section className="py-12">
        <SectionHeading
          label={`Out of ${formatCount(BRAND.stats.listings)}`}
          title="Newest Listings"
          href="/market"
          linkLabel="All markets"
        />
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {newest.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>

      {/* Latest reviews */}
      <section className="py-12">
        <SectionHeading
          label={`Out of ${formatCount(BRAND.stats.reviews)}`}
          title="Latest Reviews"
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </section>

      {/* News */}
      <section className="py-12">
        <SectionHeading
          label="Fresh every day"
          title={`${BRAND.name} News`}
          href="/news"
          linkLabel="All news"
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {articles.map((article) => (
            <NewsCard key={article.slug} article={article} compact />
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-12">
        <FeatureGrid features={FEATURES} />
      </section>

      {/* Guide */}
      <section className="py-12">
        <div className="card-panel p-6 sm:p-10">
          <p className="section-label">A Complete Guide by {BRAND.name}</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">
            What Is a Game Marketplace?
          </h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-zinc-600">
            A game marketplace is a platform where gamers can buy, sell, and
            acquire game accounts, items, and top-up services in a secure and
            trusted environment. Platforms like {BRAND.name} provide a highly
            secure and organized digital ecosystem for transactions involving
            game accounts, in-game items, virtual currency, top-up services, and
            game boosting services. In this guide, you&apos;ll learn exactly what
            a game marketplace is, how it works, why millions of players use it,
            and why {BRAND.name} is considered one of the most reliable
            platforms for digital game trading.
          </p>
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            {GUIDE.map((block) => (
              <div key={block.heading}>
                <h3 className="text-lg font-semibold text-zinc-900">{block.heading}</h3>
                {block.paragraphs?.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)} className="mt-2 text-sm leading-relaxed text-zinc-600">
                    {paragraph}
                  </p>
                ))}
                {block.bullets && (
                  <ul className="mt-3 space-y-2">
                    {block.bullets.map((bullet) => (
                      <li key={bullet.slice(0, 32)} className="flex gap-2 text-sm leading-relaxed text-zinc-600">
                        <span className="text-gradient mt-0.5 font-bold">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-zinc-500">
            Trade smarter. Every transaction is protected by {BRAND.protection}.
            Ready to start? Join thousands of gamers buying and selling safely on{" "}
            <Link href="/signup" className="font-medium text-purple-600 hover:text-purple-500">
              {BRAND.name}
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Popular searches */}
      <section className="py-12">
        <SectionHeading label="Trending" title={`Top Popular Searches on ${BRAND.name}!`} />
        <ul className="mt-6 flex flex-wrap gap-2">
          {POPULAR_SEARCHES.map((search) => {
            const game = getGame(search.game);
            if (!game) return null;
            return (
              <li key={`${search.game}-${search.category}`}>
                <Link
                  href={`/market/${search.game}/${search.category}`}
                  className="chip transition-colors hover:border-purple-300 hover:text-purple-700"
                >
                  Buy {game.name} {CATEGORY_LABELS[search.category]}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <Cta
        title={
          <>
            Your next trade is <span className="text-gradient">protected</span>
          </>
        }
        body="Create a free account to buy with Buyer Protection or get verified as a seller and keep 100% of every sale."
        primary={{ href: "/signup", label: "Create a free account" }}
        secondary={{ href: "/seller", label: "Become a seller" }}
      />
    </div>
  );
}
