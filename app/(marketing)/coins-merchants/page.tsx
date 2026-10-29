import { BadgeCheck, Coins, Gift, Zap } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaqList, FeatureGrid, SectionHeading } from "@/components/page-blocks";
import { merchantLogo } from "@/lib/assets";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: `${BRAND.coins} Merchants`,
  description: `Official ${BRAND.coins} merchants. Buy ${BRAND.coins} with local payment methods and pay for any order on ${BRAND.name} without fees.`,
};

const MERCHANTS = [
  { slug: "coinhub-asia", name: "CoinHub Asia", region: "Indonesia · Philippines · Vietnam", methods: "Bank transfer, e-wallets, convenience stores", rate: "1 USD = 100 GSC", verified: true },
  { slug: "eurotopup", name: "EuroTopUp", region: "European Union · UK", methods: "SEPA, cards, PayPal", rate: "1 USD = 100 GSC", verified: true },
  { slug: "latampay-coins", name: "LatamPay Coins", region: "Brazil · Mexico · Argentina", methods: "PIX, OXXO, Mercado Pago", rate: "1 USD = 100 GSC", verified: true },
  { slug: "desert-coins", name: "Desert Coins", region: "MENA · Turkey", methods: "Local cards, Papara, STC Pay", rate: "1 USD = 100 GSC", verified: true },
  { slug: "cryptobridge", name: "CryptoBridge", region: "Worldwide", methods: "USDT, USDC, BTC, ETH", rate: "1 USD = 100 GSC", verified: true },
  { slug: "sea-wallet", name: "SEA Wallet", region: "Thailand · Malaysia · Singapore", methods: "PromptPay, DuitNow, PayNow", rate: "1 USD = 100 GSC", verified: false },
];

const FEATURES = [
  { icon: Zap, title: "Zero fees at checkout", body: `Pay any order with ${BRAND.coins} and skip processing fees entirely.` },
  { icon: Coins, title: "Local payment methods", body: "Merchants accept the payment methods popular in your country, even where cards are not." },
  { icon: BadgeCheck, title: "Verified merchants only", body: `Every merchant listed here is verified by ${BRAND.name} and bound by the merchant agreement.` },
  { icon: Gift, title: "Bonus coins on bulk", body: "Many merchants add bonus coins on larger purchases. Check the rate before you buy." },
];

const FAQ = [
  { q: `What is ${BRAND.coins}?`, a: `${BRAND.coins} is a special currency used for instant transactions within ${BRAND.name} without any fees. It cannot be withdrawn or converted into real money and is exclusively valid for purchases on ${BRAND.name}.` },
  { q: `How do I buy ${BRAND.coins}?`, a: "Pick a merchant for your region, pay with a local method and the coins are credited to your balance by the merchant within minutes." },
  { q: "How do I become a merchant?", a: "Submit a request through Support with the topic “Other” and describe your region and payment methods. Merchants must pass extended verification and keep a deposit." },
  { q: "What if a merchant does not deliver?", a: `Merchant purchases are orders like any other and are covered by ${BRAND.protection}. Open a dispute from the order page.` },
];

const MerchantMark = ({ slug, name }: { slug: string; name: string }) => {
  const src = merchantLogo(slug);
  return src ? (
    <Image src={src} alt={`${name} logo`} width={32} height={32} className="size-8 rounded-lg object-cover" />
  ) : (
    <span
      aria-hidden
      className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-fuchsia-500 via-purple-500 to-indigo-500 text-xs font-bold text-white"
    >
      {name[0]}
    </span>
  );
};

export default function CoinsMerchantsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <section className="py-16 md:py-24">
        <div className="max-w-3xl">
          <span className="chip">{BRAND.coins}</span>
          <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
            Official <span className="text-gradient">{BRAND.coins}</span> Merchants
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-600">
            Buy {BRAND.coins} from a verified merchant in your region with local
            payment methods, then pay for any order on {BRAND.name} without
            fees.
          </p>
        </div>
      </section>

      <section className="py-8">
        <FeatureGrid features={FEATURES} />
      </section>

      <section className="py-12">
        <SectionHeading label="Merchants" title="Pick a merchant for your region" />
        <div className="card-panel mt-8 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-zinc-50 text-xs uppercase tracking-wider text-zinc-500">
              <tr>
                <th className="px-5 py-3 font-semibold">Merchant</th>
                <th className="px-5 py-3 font-semibold">Region</th>
                <th className="px-5 py-3 font-semibold">Payment methods</th>
                <th className="px-5 py-3 font-semibold">Rate</th>
                <th className="px-5 py-3 font-semibold"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {MERCHANTS.map((merchant) => (
                <tr key={merchant.name}>
                  <td className="px-5 py-3 font-medium text-zinc-900">
                    <span className="flex items-center gap-2.5">
                      <MerchantMark slug={merchant.slug} name={merchant.name} />
                      {merchant.name}
                      {merchant.verified && <BadgeCheck className="size-4 text-sky-500" aria-label="Verified merchant" />}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-zinc-600">{merchant.region}</td>
                  <td className="px-5 py-3 text-zinc-600">{merchant.methods}</td>
                  <td className="px-5 py-3 text-zinc-600">{merchant.rate}</td>
                  <td className="px-5 py-3 text-right">
                    <Link href="/login" className="btn-gradient px-4 py-1.5 text-xs">
                      Buy coins
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="py-12">
        <SectionHeading label="FAQ" title={`${BRAND.coins} questions`} />
        <div className="mt-8">
          <FaqList items={FAQ} />
        </div>
      </section>
    </div>
  );
}
