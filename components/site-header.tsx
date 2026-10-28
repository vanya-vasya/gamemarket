import {
  Bell,
  CircleUserRound,
  Home,
  MessageSquare,
  Package,
  Search,
} from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/logo";

const NAV = [
  { href: "/market", label: "Markets" },
  { href: "/news", label: "News" },
  { href: "/seller", label: "Sell" },
  { href: "/affiliate", label: "Affiliate" },
  { href: "/faq", label: "FAQ" },
];

const ACCOUNT_NAV = [
  { href: "/", label: "Home", icon: Home },
  { href: "/orders", label: "Orders", icon: Package },
  { href: "/notifications", label: "Notification", icon: Bell },
  { href: "/chat", label: "Chat", icon: MessageSquare },
  { href: "/account", label: "Account", icon: CircleUserRound },
];

export const SearchForm = ({ className = "" }: { className?: string }) => (
  <form action="/market" role="search" className={`relative ${className}`}>
    <Search
      className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-zinc-400"
      aria-hidden
    />
    <input
      type="search"
      name="q"
      placeholder="Search games, accounts, boosting…"
      aria-label="Search markets"
      className="h-10 w-full rounded-full border border-zinc-200 bg-white pl-10 pr-4 text-sm text-zinc-800 outline-none transition-colors placeholder:text-zinc-400 focus:border-purple-400"
    />
  </form>
);

export const SiteHeader = () => {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-black/5 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-8">
            <Logo />
            <nav className="hidden items-center gap-6 lg:flex" aria-label="Main">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-zinc-600 transition-colors hover:text-zinc-900"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <SearchForm className="hidden w-full max-w-xs md:block lg:max-w-sm" />
          <div className="flex items-center gap-2 sm:gap-3">
            <nav
              className="hidden items-center gap-1 md:flex"
              aria-label="Account"
            >
              {ACCOUNT_NAV.slice(1).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  title={item.label}
                  className="rounded-full p-2 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
                >
                  <item.icon className="size-5" aria-hidden />
                  <span className="sr-only">{item.label}</span>
                </Link>
              ))}
            </nav>
            <Link
              href="/login"
              className="text-sm text-zinc-700 transition-colors hover:text-zinc-900"
            >
              Sign in
            </Link>
            <Link href="/seller" className="btn-gradient px-4 py-2 text-sm">
              Sell now
            </Link>
          </div>
        </div>
        <div className="border-t border-black/5 px-4 py-2 md:hidden">
          <SearchForm />
        </div>
      </header>

      <nav
        aria-label="Mobile"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-black/5 bg-white/95 backdrop-blur-xl md:hidden"
      >
        <ul className="grid grid-cols-5">
          {ACCOUNT_NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex flex-col items-center gap-1 py-2.5 text-[11px] text-zinc-500 transition-colors hover:text-purple-600"
              >
                <item.icon className="size-5" aria-hidden />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};
