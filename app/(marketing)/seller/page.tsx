import {
  BadgeCheck,
  Banknote,
  Check,
  Coins,
  FileText,
  Gamepad2,
  Handshake,
  IdCard,
  Images,
  LockOpen,
  MessagesSquare,
  ShieldCheck,
  Sprout,
  Star,
  Wallet,
  X,
  Zap,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { HeroArt, HeroGrid } from "@/components/hero-art";
import { Cta, FaqList, FeatureGrid, SectionHeading, Steps } from "@/components/page-blocks";
import { siteImage } from "@/lib/assets";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Sell Game Accounts, Boosting & Top Ups with 0% Commission",
  description: `Sell game accounts, boosting, top ups, and items to buyers worldwide on ${BRAND.name}. Free listings, 0% sales commission, instant payouts.`,
};

const WHY = [
  {
    icon: Coins,
    title: "0% sales commission",
    body: "Sell for $100, get $100 in your balance. Other marketplaces take 5-10% of every sale; here the only cost is a cheap withdrawal fee when you cash out.",
  },
  {
    icon: Wallet,
    title: "Withdraw your way: crypto or bank",
    body: "Cash out through the method you prefer, with a full statement trail for every transaction.",
  },
  {
    icon: Handshake,
    title: "Share revenue with affiliates, marketing runs itself",
    body: "Set an affiliate rate of up to 50% on your listing and anyone (YouTube/TikTok creators, communities, fellow users) can sell it through their affiliate link, tracked for 100 days. You do not spend a cent until it actually sells.",
  },
  {
    icon: MessagesSquare,
    title: "Two chat lanes: regular room & order chat",
    body: "A regular chat room for questions and negotiation, plus a dedicated order chat that opens automatically for every running transaction. History is saved and counts as evidence in disputes.",
  },
];

const BENEFITS = [
  { icon: Gamepad2, title: "Sell many categories at once", body: `Game accounts, boosting, hourly services, top ups, in-game currency, and items across ${BRAND.stats.games.toLocaleString("en-US")}+ games, all in one store.` },
  { icon: ShieldCheck, title: "Safe from chargebacks", body: "Payments are verified before you deliver. Fraudulent claims are handled by our team, not by you." },
  { icon: Images, title: "Up to 50 images per listing", body: "Upload up to 50 images per listing, 5MB each. Every image is auto-watermarked with a link to your profile: anyone stealing your images ends up promoting you." },
  { icon: Zap, title: "Money lands INSTANTLY", body: "The moment the buyer marks the order complete, the funds hit your balance automatically, that very second. Elsewhere you typically wait 3-7 days." },
  { icon: LockOpen, title: "Verify once, sell anything", body: "One verification is all it takes. After that, sell any category in any game: accounts, boosting, top ups, items, with no re-approval." },
  { icon: FileText, title: "Order chats, kept separate", body: `Tired of one messy chat pile? On ${BRAND.name}, order chats are automatically separated from regular chats: every deal gets its own room, and nothing gets buried.` },
];

const EASY = [
  { icon: IdCard, title: "One-page verification", body: "The whole seller verification lives on a single settings page. Fill it in, submit, done." },
  { icon: FileText, title: "Listing made as simple as it gets", body: "We cut the form to the bone: pick the game, fill in the essentials, set your price, go live. Change price and stock anytime." },
  { icon: Banknote, title: "Withdrawals without drama", body: "Request a withdrawal from the dashboard, track its status, and see full history in Statement." },
];

const FEES = [
  { value: "0%", title: "Sales commission", body: "Sell for $100, $100 hits your balance." },
  { value: "$0", title: "Listing & signup fees", body: "Post as many listings as you want, free." },
  { value: "0", title: "Hidden fees", body: "No stealth service fees, no surprise deductions." },
  { value: "1", title: "Only a withdrawal fee", body: "Starts at 4.99% and keeps dropping to 0.99% as your level rises. Every number is shown clearly BEFORE you confirm." },
];

const LEVELS = [
  { level: "Bronze Seller", sales: "From $0", fee: "4.99%" },
  { level: "Silver Seller", sales: "$1,000+", fee: "3.99%" },
  { level: "Gold Seller", sales: "$5,000+", fee: "2.99%" },
  { level: "Platinum Seller", sales: "$10,000+", fee: "1.99%" },
  { level: "Diamond Seller", sales: "$50,000+", fee: "0.99%" },
];

const STEPS = [
  { title: "Sign up & verify", body: "Create an account, open Settings, complete seller verification on one page." },
  { title: "Post your first listing", body: "Pick the game and category, write the details, set your price. It goes live instantly and stays editable." },
  { title: "Receive & deliver orders", body: "Get notified, chat with the buyer, deliver the order, upload delivery proof." },
  { title: "Get your money", body: "Funds land in your balance once the order completes. Withdraw anytime: crypto or bank." },
];

const COMPARE: { feature: string; us: string; them: string; good?: boolean }[] = [
  { feature: "Sales commission", us: "0%", them: "4.99% - 10%+" },
  { feature: "Hidden / service fees", us: "None", them: "Often" },
  { feature: "The only fee", us: "A cheap, transparent withdrawal fee", them: "Commission plus stacked fees" },
  { feature: "Funds after order completion", us: "Instant, automatic", them: "Usually 3-7 days" },
  { feature: "Listing fee", us: "Free", them: "Free / paid" },
  { feature: "Real-time buyer-seller chat", us: "Yes, built in", them: "Often missing" },
  { feature: "Order chats separated from regular chats", us: "Yes", them: "No" },
  { feature: "Anti-theft image watermark (profile link)", us: "Yes, automatic", them: "No" },
  { feature: "Crypto + bank payouts", us: "Yes", them: "Varies" },
  { feature: "Affiliate revenue share (up to 50%)", us: "Yes", them: "No" },
  { feature: "Blue-check seller badge", us: "Yes", them: "Rare" },
  { feature: "Chargeback protection", us: "Yes", them: "Rare" },
];

const RANKS = [
  { icon: Sprout, title: "New Seller", body: "Pass verification, start selling, collect your first reviews." },
  { icon: Star, title: "Trusted Seller", body: "Ratings and sales climb, buyers notice your listings more." },
  { icon: BadgeCheck, title: "Pro Seller · Blue Check", body: "1,000+ sales. The blue check appears on every listing and on your profile." },
];

const FAQ = [
  { q: "What can I sell?", a: `Game accounts, boosting, hourly services, top ups, in-game currency, and items across the ${BRAND.stats.games.toLocaleString("en-US")}+ games available on ${BRAND.name}.` },
  { q: "What does it cost? Is there a commission?", a: `Sales commission is 0%: your selling price lands in your balance in full. The only cost is the withdrawal fee when you cash out: 4.99% for Bronze Sellers, dropping with your level down to 0.99% for Diamond Sellers, plus a tiny method fee (${BRAND.coins} free; crypto and local banks just $1). Every number is shown clearly before you confirm. No hidden fees.` },
  { q: "How and when do I get paid?", a: "Instantly. The moment the buyer marks the order complete, the funds land in your seller balance automatically, with none of the 3-7 day holds other marketplaces impose. From there, withdraw anytime via crypto or bank transfer on the Withdraw page." },
  { q: "How long does seller verification take?", a: "It happens on a single settings page and is usually completed within business hours once your documents are in order." },
  { q: "What if a buyer acts in bad faith?", a: "Order chat history and your delivery proof are the evidence. Our team reviews disputes and fraudulent claims are rejected; you are never charged back." },
  { q: "Can I sell in more than one game?", a: "Yes. One verification covers every game and every category with no re-approval." },
];

export default function SellerPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <section className="py-16 md:py-24">
        <HeroGrid
          art={<HeroArt src={siteImage("seller-hero")} alt="Seller dashboard with instant payouts and order chats" />}
        >
          <span className="chip">Free listings · 0% commission · Instant payouts</span>
          <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Turn Your Game Stock Into <span className="text-gradient">Global Income</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-600">
            Sell game accounts, boosting, top ups, and items to buyers worldwide.
            Free listings, 0% sales commission, and you keep your full selling price.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="/signup" className="btn-gradient px-6 py-3 text-sm">
              Start Seller Verification
            </Link>
            <Link
              href="#how-it-works"
              className="rounded-full border border-zinc-300 px-6 py-3 text-sm text-zinc-700 transition-colors hover:border-zinc-400"
            >
              See How It Works
            </Link>
          </div>
        </HeroGrid>
      </section>

      <section className="py-12">
        <SectionHeading
          label="Why sell here"
          title={
            <>
              Why sell on <span className="text-gradient">{BRAND.name}?</span>
            </>
          }
        />
        <div className="mt-8">
          <FeatureGrid features={WHY} columns={2} />
        </div>
      </section>

      <section className="py-12">
        <SectionHeading label="Seller benefits" title="Built for people who sell every day" />
        <div className="mt-8">
          <FeatureGrid features={BENEFITS} columns={3} />
        </div>
      </section>

      <section className="py-12">
        <SectionHeading label="It really is that easy" title="Three screens, no paperwork" />
        <div className="mt-8">
          <FeatureGrid features={EASY} columns={3} />
        </div>
      </section>

      <section className="py-12">
        <SectionHeading
          label="Pricing"
          title={
            <>
              No <span className="text-gradient">hidden fee</span>
            </>
          }
          description={`Elsewhere, deductions come from everywhere: sales commission, service fees, exchange margins. ${BRAND.name} has exactly ONE fee, and it is cheap.`}
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEES.map((fee) => (
            <div key={fee.title} className="card-panel p-6">
              <p className="text-gradient text-4xl font-bold">{fee.value}</p>
              <h3 className="mt-3 font-semibold text-zinc-900">{fee.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">{fee.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12">
        <SectionHeading
          label="Seller levels"
          title={
            <>
              Sell more, pay less to <span className="text-gradient">withdraw</span>
            </>
          }
          description="Your level is recalculated automatically on the 1st of every month from last month's completed sales. No signup, no hidden requirements."
        />
        <div className="card-panel mt-8 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-50 text-xs uppercase tracking-wider text-zinc-500">
              <tr>
                <th className="px-5 py-3 font-semibold">Level</th>
                <th className="px-5 py-3 font-semibold">Last month&apos;s sales</th>
                <th className="px-5 py-3 font-semibold">Withdrawal fee</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {LEVELS.map((row) => (
                <tr key={row.level}>
                  <td className="px-5 py-3 font-medium text-zinc-900">{row.level}</td>
                  <td className="px-5 py-3 text-zinc-600">{row.sales}</td>
                  <td className="px-5 py-3 font-semibold text-zinc-900">{row.fee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="how-it-works" className="scroll-mt-24 py-12">
        <SectionHeading label="Getting started" title="4 steps" />
        <div className="mt-8">
          <Steps steps={STEPS} />
        </div>
      </section>

      <section className="py-12">
        <SectionHeading
          label="Compare for yourself"
          title="What you get here vs a typical game marketplace"
        />
        <div className="card-panel mt-8 overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="bg-zinc-50 text-xs uppercase tracking-wider text-zinc-500">
              <tr>
                <th className="px-5 py-3 font-semibold">Feature</th>
                <th className="px-5 py-3 font-semibold text-purple-700">{BRAND.name}</th>
                <th className="px-5 py-3 font-semibold">Other marketplaces</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {COMPARE.map((row) => (
                <tr key={row.feature}>
                  <td className="px-5 py-3 text-zinc-700">{row.feature}</td>
                  <td className="px-5 py-3 font-medium text-zinc-900">
                    <span className="flex items-center gap-2">
                      <Check className="size-4 text-emerald-500" aria-hidden /> {row.us}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-zinc-500">
                    <span className="flex items-center gap-2">
                      <X className="size-4 text-zinc-300" aria-hidden /> {row.them}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="py-12">
        <SectionHeading
          label="Reputation"
          title="Level up to the blue check"
          description="Your reputation shows, and we help you show it off."
        />
        <div className="mt-8">
          <FeatureGrid features={RANKS} columns={3} />
        </div>
      </section>

      <section className="py-12">
        <SectionHeading
          label="FAQ"
          title="Frequently asked questions"
          description={`Everything you need to know about selling on ${BRAND.name}.`}
        />
        <div className="mt-8">
          <FaqList items={FAQ} />
        </div>
      </section>

      <Cta
        title={
          <>
            Keep <span className="text-gradient">100%</span> of every sale
          </>
        }
        body="Verify once on a single settings page and post your first listing in minutes."
        primary={{ href: "/signup", label: "Start Seller Verification" }}
        secondary={{ href: "/affiliate", label: "Learn about the affiliate program" }}
      />
    </div>
  );
}
