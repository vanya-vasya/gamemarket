import {
  CreditCard,
  Globe2,
  Scale,
  ShieldCheck,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { FeatureGrid, SectionHeading } from "@/components/page-blocks";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: `About ${BRAND.name} - Trusted Digital Marketplace for Gamers`,
  description: `${BRAND.name} is a cutting-edge digital marketplace designed for gamers, by gamers. Learn about our mission, buyer protection and market-specific review system.`,
};

const WHY = [
  { icon: CreditCard, title: "Multiple Payment Methods", body: "Secure, instant, and irreversible payments." },
  { icon: ShieldCheck, title: "Buyer Protection", body: "Your funds are held safely until the transaction is complete." },
  { icon: Star, title: "Market-Specific Review System", body: "Know exactly who you're dealing with in each market category." },
  { icon: TrendingUp, title: "Seller Ranking System", body: "The more you sell, the lower your withdrawal fees." },
  { icon: Globe2, title: "Global Accessibility", body: "Trade freely without payment restrictions or bank limitations." },
  { icon: Users, title: "Global Community", body: "Backed by a fast-growing community of gamers." },
];

const FAIRNESS = [
  { title: "Fair competition for new sellers", body: "Every seller starts fresh in a new category." },
  { title: "Accurate buyer expectations", body: 'A seller with a high rating in "Boosting" may not have the same track record in "Mobile Game Top-Ups."' },
  { title: "Transparency in every category", body: "Buyers get real, market-specific reviews before making a purchase." },
];

const TRANSACTION = [
  { title: "Lock in your loot", body: "Buyer places an order & pays using various payment methods." },
  { title: "Buyer protection", body: "Funds are held securely until the order is complete." },
  { title: "Deliver the goods", body: "Seller delivers the product & provides proof of delivery." },
  { title: "Seal the deal", body: "Buyer confirms the order or, if unresponsive, the system automatically completes it after a set period." },
  { title: "Claim your reward", body: "Funds are released to the seller, ensuring a fair trade for both parties." },
];

const COMMITMENT = [
  { icon: CreditCard, title: "Multi-Payment Support", body: "Flexible and secure transactions." },
  { icon: ShieldCheck, title: "Buyer Protection", body: "Ensuring safety for both buyers and sellers." },
  { icon: Scale, title: "Strict Anti-Fraud Measures", body: "Multiple account abuse and off-platform trading attempts will result in bans." },
  { icon: Users, title: "Transparent Dispute Resolution", body: "Admins fairly resolve issues based on clear evidence." },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <section className="py-16 md:py-24">
        <div className="max-w-3xl">
          <span className="chip">About us</span>
          <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
            {BRAND.name} - Trusted Digital Marketplace for{" "}
            <span className="text-gradient">Gamers Worldwide</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-zinc-600">
            Welcome to {BRAND.name} – the ultimate digital playground where your
            game assets turn into real value. Whether you&apos;re selling a
            maxed-out MMORPG account or buying rare items with various payment
            methods, we&apos;re here to power your next trade.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div>
            <SectionHeading label="Who we are" title={`What is ${BRAND.name}?`} />
            <p className="mt-4 leading-relaxed text-zinc-600">
              {BRAND.name} is a cutting-edge digital marketplace designed for
              gamers, by gamers. We believe that trading game accounts, in-game
              currencies, items, and top-ups should be fast, secure, and
              accessible to everyone worldwide.
            </p>
            <p className="mt-4 leading-relaxed text-zinc-600">
              By leveraging various payment methods, {BRAND.name} removes
              barriers like regional payment restrictions, chargebacks, and
              excessive fees, allowing a truly global trading experience. Unlike
              traditional platforms, we prioritize decentralization, security,
              and fairness to empower gamers to buy and sell with confidence.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="card-panel p-6">
              <p className="section-label">Our Mission</p>
              <p className="mt-3 text-zinc-700">
                To create a transparent, secure, and borderless marketplace where
                gamers can freely trade their digital assets using various
                payment methods.
              </p>
            </div>
            <div className="card-panel p-6">
              <p className="section-label">Our Vision</p>
              <p className="mt-3 text-zinc-700">
                A future where gamers have complete control over their digital
                assets, with a marketplace that ensures fairness, accessibility,
                and innovation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <SectionHeading label="Why us" title={`Why ${BRAND.name}?`} />
        <div className="mt-8">
          <FeatureGrid features={WHY} columns={3} />
        </div>
        <blockquote className="card-panel mt-8 p-8 text-center text-xl font-semibold tracking-tight text-zinc-800">
          “We built {BRAND.name} not just as a marketplace but as a{" "}
          <span className="text-gradient">revolution in digital trading</span>.”
        </blockquote>
      </section>

      <section className="py-12">
        <SectionHeading
          label="Fairness"
          title={`How ${BRAND.name} Ensures Fairness for Sellers & Buyers`}
          description={`Unlike other platforms that use global seller ratings, ${BRAND.name} assigns reviews to each seller based on the specific market they operate in.`}
        />
        <h3 className="mt-8 text-lg font-semibold text-zinc-900">Why does this matter?</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {FAIRNESS.map((item) => (
            <div key={item.title} className="card-panel p-6">
              <h4 className="font-semibold text-zinc-900">{item.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12">
        <SectionHeading label="Transactions" title={`How do Transactions Work on ${BRAND.name}?`} />
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {TRANSACTION.map((step, index) => (
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
          label="Security"
          title="Our Commitment to Security & Fair Trading"
          description="We believe in creating a safe, fair, and innovative marketplace where digital goods can be traded securely."
        />
        <div className="mt-8">
          <FeatureGrid features={COMMITMENT} />
        </div>
      </section>

      <section className="py-12">
        <div className="card-panel grid items-center gap-6 p-8 md:grid-cols-2 md:p-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Want to Request a New Market Section?</h2>
            <p className="mt-4 text-zinc-600">
              {BRAND.name} is constantly evolving based on community needs. If
              you want a new market section, we encourage you to submit your
              request!
            </p>
          </div>
          <div className="md:text-right">
            <Link href="/support" className="btn-gradient inline-block px-6 py-3 text-sm">
              Submit request
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <SectionHeading label="Get started" title="Join the Future of Digital Trading" />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            { title: "Start buying", body: "Browse marketplace", href: "/market" },
            { title: "Become a seller", body: "Get verified as a seller", href: "/seller" },
            { title: "Need help?", body: "Check our FAQs", href: "/faq" },
          ].map((item) => (
            <Link key={item.title} href={item.href} className="card-panel group p-6 transition-shadow hover:shadow-md">
              <h3 className="font-semibold text-zinc-900 group-hover:text-purple-600">{item.title}</h3>
              <p className="mt-2 text-sm text-zinc-600">{item.body} →</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
