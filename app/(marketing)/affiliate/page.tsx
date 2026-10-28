import {
  BadgePercent,
  Globe,
  Link2,
  Tag,
  Users,
  Wallet,
  Zap,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { ListingCard } from "@/components/listing-card";
import { Cta, FaqList, FeatureGrid, SectionHeading } from "@/components/page-blocks";
import { BRAND } from "@/lib/brand";
import { getNewestListings } from "@/lib/listings";

export const metadata: Metadata = {
  title: "Affiliate Program - Earn up to 50% Commission",
  description: `Share any ${BRAND.name} product with your link or promo code and earn up to 50% commission on every completed order. Instant payout, 100-day tracking.`,
};

const STEPS = [
  { title: "Get your link or code", body: `Tap Share on any product page, or add ?ref=yourusername to any ${BRAND.name} URL. Prefer a code? Buyers can enter @yourusername at checkout instead.` },
  { title: "Share it", body: "Post it anywhere - YouTube, TikTok, Discord, or your blog. Every visitor is tracked for 100 days, across the whole marketplace." },
  { title: "Earn commission", body: `When they buy, your commission lands straight in your ${BRAND.name} balance. Withdraw anytime via crypto or local payment.` },
];

const WHY = [
  { icon: BadgePercent, title: "Up to 50% commission", body: "Sellers share up to half of the sale price with you - for example, on a $100 product set at 50%, you earn $50 from a single sale." },
  { icon: Zap, title: "Instant payout, no approval", body: "No thresholds, no waiting. Your commission hits your available balance the second the order completes." },
  { icon: Globe, title: "100-day site-wide tracking", body: "One link covers the entire marketplace. Anything your visitor buys within 100 days counts." },
  { icon: Users, title: "Open to everyone", body: `Buyer or seller, no special affiliate account. If you have a ${BRAND.name} account, you can earn.` },
  { icon: Tag, title: "Your own promo code", body: "Give your audience a reason to buy: share part of your commission with buyers who enter @yourusername at checkout." },
  { icon: Wallet, title: "Withdraw via crypto or local payment", body: "Your earnings sit in the same balance as everything else and withdraw with the same methods." },
];

const EXCLUDED = [
  { title: "You're the buyer yourself", body: "Including through another account you own. Links and promo codes are for other people." },
  { title: "The order looks like a self-referral", body: "Every order is checked. Orders that appear to come from the affiliate themselves aren't paid." },
  { title: "The order is canceled, refunded, or disputed", body: "Commission is only paid for orders that actually complete." },
  { title: "The promotion breaks the Terms of Service", body: `Spam, misleading ads, or posing as ${BRAND.name}. Commission is revoked and the account may be closed.` },
];

const FAQ = [
  { q: `Who can join the ${BRAND.name} affiliate program?`, a: `Anyone with a ${BRAND.name} account. There is no separate affiliate account and no approval step - both buyers and sellers can earn.` },
  { q: "Do I need to fill out a form or sign up separately to become an affiliate?", a: `No. As long as you have a normal ${BRAND.name} account, you can start earning as an affiliate right away - there is no form or special registration.` },
  { q: "How much commission can I earn?", a: "Up to 50% of a product's selling price. Each seller sets the affiliate rate on their products (from 1% up to 50%), and you earn that rate on every completed order you refer. For example, on a $100 product set at 50%, you earn $50 from a single sale." },
  { q: "How do I get my affiliate link?", a: `Add ?ref=yourusername to any ${BRAND.name} link - for example, https://${BRAND.domain}?ref=john - or click the Share button shown on product and market pages, which copies your affiliate link automatically.` },
  { q: "When and how do I get paid?", a: `The moment a referred order is completed, your commission is added straight to your ${BRAND.name} balance. No approval and no minimum threshold.` },
  { q: "How do I know when a referred order is complete?", a: "You'll get an email every time one of your referred orders completes and the commission lands in your available balance." },
  { q: "How do I withdraw my earnings?", a: "Withdraw your balance using any of the payment methods available at withdraw, including crypto and local (fiat) options." },
  { q: "How long does a referral last?", a: `100 days. After someone visits through your link, anything they buy anywhere on ${BRAND.name} within 100 days is credited to you.` },
  { q: "Does it work on every product?", a: "Your link works site-wide. You earn on any product where the seller has enabled an affiliate rate." },
  { q: "How do I know if a listing has affiliate enabled, and at what rate?", a: "Open the product's detail page. If you see a Share button with a percentage at the top right, that product has affiliate enabled - and you earn that percentage of the sale price when someone buys through your link." },
  { q: "Do I need to be a seller to earn?", a: "No. Anyone can share links and earn - you do not have to list anything for sale." },
  { q: "What is my promo code?", a: "Your promo code is @yourusername. Buyers enter it in the Promo code field at checkout, and you earn the same commission as with your link." },
  { q: "Can I give my buyers something off?", a: "Yes. Set how much of your commission goes to buyers who use your promo code, up to half of it. The seller still receives the same amount." },
  { q: "Can buyers use my promo code on any order?", a: "Only on single-product checkouts, and only on products that have affiliate commission. One code per order." },
  { q: "Why didn't I get my commission?", a: "The order hasn't completed, was canceled/refunded, or falls under what doesn't count (see above). If it completed and none of those apply, contact Support with the order code." },
];

export default function AffiliatePage() {
  const listings = getNewestListings(40).filter((listing) => listing.affiliateRate).slice(0, 8);
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <section className="py-16 md:py-24">
        <div className="max-w-3xl">
          <span className="chip">{BRAND.name} Affiliate Program</span>
          <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Earn <span className="text-gradient">up to 50%</span> commission on every sale you refer
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-600">
            Share any {BRAND.name} product with your link or promo code. When
            someone buys, you get paid - instantly, no approval, no special
            account needed.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="/signup" className="btn-gradient px-6 py-3 text-sm">
              Start earning
            </Link>
            <Link
              href="#faq"
              className="rounded-full border border-zinc-300 px-6 py-3 text-sm text-zinc-700 transition-colors hover:border-zinc-400"
            >
              Read the FAQ
            </Link>
          </div>
          <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
            {[
              ["Up to 50%", "per sale"],
              ["Paid", "on every completed order"],
              ["100-day", "tracking"],
              ["Open", "to everyone"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="text-2xl font-bold text-zinc-900">{value}</dt>
                <dd className="text-sm text-zinc-500">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="py-12">
        <SectionHeading
          label="Newest affiliate listings"
          title="Real products to promote right now"
          description="Earn the commission shown on every listing with the Share badge."
        />
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {listings.map((listing) => (
            <div key={listing.id} className="relative">
              <span className="absolute right-3 top-3 z-10 flex items-center gap-1 rounded-full bg-white/95 px-2 py-0.5 text-xs font-bold text-purple-700 shadow-sm">
                <Link2 className="size-3" aria-hidden /> {listing.affiliateRate}%
              </span>
              <ListingCard listing={listing} />
            </div>
          ))}
        </div>
      </section>

      <section className="py-12">
        <SectionHeading label="How it works" title="Three steps to turn your audience into income" />
        <ol className="mt-8 grid gap-4 lg:grid-cols-3">
          {STEPS.map((step, index) => (
            <li key={step.title} className="card-panel p-6">
              <span className="text-gradient text-sm font-bold">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 font-semibold text-zinc-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="py-12">
        <SectionHeading
          label={`Why ${BRAND.name}`}
          title="Higher commission, faster payouts, and zero gatekeeping"
        />
        <div className="mt-8">
          <FeatureGrid features={WHY} columns={3} />
        </div>
      </section>

      <section className="py-12">
        <SectionHeading label="Rules" title="What doesn't count as commission" />
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {EXCLUDED.map((item, index) => (
            <li key={item.title} className="card-panel p-6">
              <span className="text-gradient text-sm font-bold">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 font-semibold text-zinc-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">{item.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="faq" className="scroll-mt-24 py-12">
        <SectionHeading
          label="FAQ"
          title="Frequently asked questions"
          description={`Everything you need to know about earning with ${BRAND.name}.`}
        />
        <div className="mt-8">
          <FaqList items={FAQ} />
        </div>
      </section>

      <Cta
        title={
          <>
            Ready to turn your audience <span className="text-gradient">into income?</span>
          </>
        }
        body="Grab your link or code and share it anywhere - start earning up to 50% on every sale you refer."
        primary={{ href: "/signup", label: "Sign up to get your link" }}
      />
    </div>
  );
}
