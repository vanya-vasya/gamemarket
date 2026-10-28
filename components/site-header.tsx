import Link from "next/link";
import { Logo } from "@/components/logo";

const NAV = [
  { href: "/tools", label: "Tools" },
  { href: "/inspiration", label: "Inspiration" },
  { href: "/pricing", label: "Pricing" },
];

export const SiteHeader = () => {
  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden items-center gap-6 md:flex" aria-label="Main">
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
        <div className="flex items-center gap-3">
          <Link
            href="/tools"
            className="text-sm text-zinc-700 transition-colors hover:text-zinc-900 md:hidden"
          >
            Tools
          </Link>
          <Link href="/tools" className="btn-gradient px-4 py-2 text-sm">
            Open tools
          </Link>
        </div>
      </div>
    </header>
  );
};
