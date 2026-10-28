import type { Metadata } from "next";
import Link from "next/link";
import { FaqList, SectionHeading } from "@/components/page-blocks";
import { BRAND } from "@/lib/brand";
import { FAQ_GROUPS, MOST_ASKED, totalAnswers } from "@/lib/faq";

export const metadata: Metadata = {
  title: "Frequently Asked Questions (FAQ)",
  description: `Answers about buying, selling, payments, buyer protection and withdrawals on ${BRAND.name}.`,
};

const AUDIENCES = ["For buyers", "For sellers", "Everyone"] as const;

export default async function FaqPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const query = q.trim().toLowerCase();
  const matches = query
    ? [...MOST_ASKED, ...FAQ_GROUPS.flatMap((group) => group.items)].filter(
        (item) => item.q.toLowerCase().includes(query) || item.a.toLowerCase().includes(query),
      )
    : null;

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <p className="section-label">Frequently Asked Questions (FAQ)</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
          How can <span className="text-gradient">we help?</span>
        </h1>
        <p className="mt-4 text-zinc-600">Search {totalAnswers()} answers, or pick a topic below.</p>
        <form action="/faq" role="search" className="mx-auto mt-6 flex max-w-xl gap-2">
          <input
            type="search"
            name="q"
            defaultValue={q}
            placeholder="Search answers…"
            aria-label="Search answers"
            className="h-11 flex-1 rounded-full border border-zinc-200 bg-white px-5 text-sm text-zinc-800 outline-none placeholder:text-zinc-400 focus:border-purple-400"
          />
          <button type="submit" className="btn-gradient px-6 text-sm">
            Search
          </button>
        </form>
      </div>

      {matches ? (
        <section className="mt-12">
          <SectionHeading
            label={`${matches.length} result${matches.length === 1 ? "" : "s"}`}
            title={`Answers matching “${q}”`}
            href="/faq"
            linkLabel="Clear search"
          />
          <div className="mt-6">
            {matches.length ? (
              <FaqList items={matches} />
            ) : (
              <p className="card-panel p-8 text-center text-sm text-zinc-600">
                Nothing matched. Try a different word or submit a request to support.
              </p>
            )}
          </div>
        </section>
      ) : (
        <>
          <section className="mt-12">
            <SectionHeading label="Start here" title="Most asked" />
            <div className="mt-6">
              <FaqList items={MOST_ASKED} />
            </div>
          </section>

          {AUDIENCES.map((audience) => (
            <section key={audience} className="mt-12">
              <p className="section-label">{audience}</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {FAQ_GROUPS.filter((group) => group.audience === audience).map((group) => (
                  <a
                    key={group.slug}
                    href={`#${group.slug}`}
                    className="card-panel group p-5 transition-shadow hover:shadow-md"
                  >
                    <h3 className="font-semibold text-zinc-900 group-hover:text-purple-600">{group.title}</h3>
                    <p className="mt-1 text-xs text-zinc-500">{group.items.length} questions</p>
                  </a>
                ))}
              </div>
            </section>
          ))}

          {FAQ_GROUPS.map((group) => (
            <section key={group.slug} id={group.slug} className="mt-14 scroll-mt-24">
              <SectionHeading label={group.audience} title={group.title} />
              <div className="mt-6">
                <FaqList items={group.items} />
              </div>
            </section>
          ))}
        </>
      )}

      <section className="card-panel mt-16 p-8 text-center sm:p-12">
        <h2 className="text-2xl font-bold tracking-tight">Didn&apos;t find your answer?</h2>
        <p className="mt-2 text-zinc-600">Our support team is ready to help you as soon as possible.</p>
        <Link href="/support" className="btn-gradient mt-6 inline-block px-6 py-3 text-sm">
          Submit a request
        </Link>
      </section>
    </div>
  );
}
