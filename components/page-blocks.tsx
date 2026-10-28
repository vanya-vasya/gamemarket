import { ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import type { QA } from "@/lib/faq";

export const Breadcrumbs = ({
  items,
}: {
  items: { href?: string; label: string }[];
}) => (
  <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-xs text-zinc-500">
    <Link href="/" className="hover:text-zinc-900">
      Home
    </Link>
    {items.map((item) => (
      <span key={item.label} className="flex items-center gap-1">
        <ChevronRight className="size-3 text-zinc-300" aria-hidden />
        {item.href ? (
          <Link href={item.href} className="hover:text-zinc-900">
            {item.label}
          </Link>
        ) : (
          <span className="text-zinc-800">{item.label}</span>
        )}
      </span>
    ))}
  </nav>
);

export const SectionHeading = ({
  label,
  title,
  href,
  linkLabel,
  description,
}: {
  label?: string;
  title: React.ReactNode;
  href?: string;
  linkLabel?: string;
  description?: string;
}) => (
  <div>
    {label && <p className="section-label">{label}</p>}
    <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      {href && (
        <Link
          href={href}
          className="flex items-center gap-1 text-sm text-purple-600 hover:text-purple-500"
        >
          {linkLabel ?? "View all"} <ArrowRight className="size-4" aria-hidden />
        </Link>
      )}
    </div>
    {description && <p className="mt-2 max-w-2xl text-zinc-600">{description}</p>}
  </div>
);

export const FaqList = ({ items }: { items: QA[] }) => (
  <div className="divide-y divide-black/5 overflow-hidden rounded-2xl border border-black/8 bg-white">
    {items.map((item) => (
      <details key={item.q} className="group">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-semibold text-zinc-900 [&::-webkit-details-marker]:hidden">
          {item.q}
          <ChevronRight
            className="size-4 shrink-0 text-zinc-400 transition-transform group-open:rotate-90"
            aria-hidden
          />
        </summary>
        <p className="px-5 pb-5 text-sm leading-relaxed text-zinc-600">{item.a}</p>
      </details>
    ))}
  </div>
);

export const Steps = ({
  steps,
}: {
  steps: { title: string; body: string }[];
}) => (
  <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
    {steps.map((step, index) => (
      <li key={step.title} className="card-panel p-6">
        <span className="text-gradient text-sm font-bold">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="mt-3 font-semibold text-zinc-900">{step.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600">{step.body}</p>
      </li>
    ))}
  </ol>
);

export const FeatureGrid = ({
  features,
  columns = 4,
}: {
  features: { icon: React.ComponentType<{ className?: string }>; title: string; body: string }[];
  columns?: 2 | 3 | 4;
}) => (
  <div
    className={`grid gap-4 sm:grid-cols-2 ${columns === 4 ? "lg:grid-cols-4" : columns === 3 ? "lg:grid-cols-3" : ""}`}
  >
    {features.map((feature) => (
      <div key={feature.title} className="card-panel p-6">
        <span className="inline-flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500 via-purple-500 to-indigo-500 text-white">
          <feature.icon className="size-5" />
        </span>
        <h3 className="mt-4 font-semibold text-zinc-900">{feature.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600">{feature.body}</p>
      </div>
    ))}
  </div>
);

export const Cta = ({
  title,
  body,
  primary,
  secondary,
}: {
  title: React.ReactNode;
  body: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
}) => (
  <section className="py-20 text-center">
    <h2 className="text-4xl font-bold tracking-tight">{title}</h2>
    <p className="mx-auto mt-4 max-w-md text-zinc-600">{body}</p>
    <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
      <Link href={primary.href} className="btn-gradient inline-block px-8 py-3.5 text-sm">
        {primary.label}
      </Link>
      {secondary && (
        <Link
          href={secondary.href}
          className="rounded-full border border-zinc-300 px-8 py-3.5 text-sm text-zinc-700 transition-colors hover:border-zinc-400"
        >
          {secondary.label}
        </Link>
      )}
    </div>
  </section>
);
