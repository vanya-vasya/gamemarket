import Link from "next/link";
import { Logo } from "@/components/logo";
import { BRAND } from "@/lib/brand";

const COLUMNS: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Info",
    links: [
      { href: "/about", label: "About" },
      { href: "/seller", label: "Become a Seller" },
      { href: "/terms-of-service", label: "Terms of Service" },
      { href: "/privacy-policy", label: "Privacy Policy" },
    ],
  },
  {
    title: "Quick Links",
    links: [
      { href: "/affiliate", label: "Affiliate" },
      { href: "/faq", label: "FAQ" },
      { href: "/support", label: "Support" },
      { href: "/coins-merchants", label: `${BRAND.coins} Merchants` },
    ],
  },
  {
    title: "Follow us",
    links: [
      { href: "https://x.com", label: "X / Twitter" },
      { href: "https://discord.com", label: "Discord" },
      { href: "https://youtube.com", label: "YouTube" },
      { href: "https://tiktok.com", label: "TikTok" },
    ],
  },
];

export const SiteFooter = () => (
  <footer className="mt-24 border-t border-black/5 pb-16 md:pb-0">
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-zinc-500">
            <span className="font-semibold text-zinc-700">{BRAND.name}</span> is
            a trusted digital marketplace for everything gaming-related. We
            serve the gaming community by providing secure access that enhances
            every gaming journey.
          </p>
          <p className="max-w-xs text-sm leading-relaxed text-zinc-500">
            Accounts, boosting, top ups, items and hourly services across{" "}
            {BRAND.stats.games.toLocaleString("en-US")}+ games, all covered by{" "}
            {BRAND.protection}.
          </p>
        </div>
        {COLUMNS.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <h3 className="section-label mb-4">{column.title}</h3>
            <ul className="space-y-2.5">
              {column.links.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-600 transition-colors hover:text-zinc-900"
                    {...(link.href.startsWith("http")
                      ? { target: "_blank", rel: "noreferrer" }
                      : {})}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <p className="mt-12 border-t border-black/5 pt-6 text-xs text-zinc-400">
        © {BRAND.year} {BRAND.name}. All rights reserved.
      </p>
    </div>
  </footer>
);
