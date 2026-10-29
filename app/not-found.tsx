import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteImage } from "@/lib/assets";

export default function NotFound() {
  const art = siteImage("not-found");
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex flex-1 items-center justify-center px-4 py-24 text-center">
        <div>
          {art && (
            <Image
              src={art}
              alt=""
              width={480}
              height={270}
              priority
              className="mx-auto mb-8 w-full max-w-md rounded-2xl"
            />
          )}
          <p className="section-label">404</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight">
            This page <span className="text-gradient">left the lobby</span>
          </h1>
          <p className="mt-4 text-zinc-600">
            The listing may have sold out or the link is wrong.
          </p>
          <Link href="/market" className="btn-gradient mt-8 inline-block px-6 py-3 text-sm">
            Browse all markets
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
