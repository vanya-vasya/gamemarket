import { CheckCircle2, Clock, Mail, MessageSquare } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Support",
  description: `Submit a request to the ${BRAND.name} support team. Order issues, disputes, seller verification and new market requests.`,
};

const TOPICS = [
  "Problem with an order",
  "Open a dispute",
  "Payment or refund",
  "Seller verification",
  "Withdrawal",
  "Request a new market section",
  "Account & security",
  "Report a listing or user",
  "Other",
];

export default async function SupportPage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string }>;
}) {
  const { sent } = await searchParams;

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="section-label">Support</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight">
            We&apos;re here <span className="text-gradient">24/7</span>
          </h1>
          <p className="mt-4 leading-relaxed text-zinc-600">
            Open a new request and our team will get back to you with a ticket
            number. For order problems, include the order code from the order
            page so we can look up the chat history right away.
          </p>
          <ul className="mt-8 space-y-4 text-sm text-zinc-600">
            <li className="flex gap-3">
              <Clock className="mt-0.5 size-4 shrink-0 text-purple-600" aria-hidden />
              Typical first reply within 1 hour, disputes resolved within 24–72 hours.
            </li>
            <li className="flex gap-3">
              <MessageSquare className="mt-0.5 size-4 shrink-0 text-purple-600" aria-hidden />
              Order chats are evidence. Keep every agreement inside the platform.
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-purple-600" aria-hidden />
              Updates arrive by email and under Notification in your account.
            </li>
          </ul>
          <p className="mt-8 text-xs text-zinc-400">
            Looking for quick answers? Read the{" "}
            <Link href="/faq" className="text-purple-600 hover:text-purple-500">
              FAQ
            </Link>
            ,{" "}
            <Link href="/terms-of-service" className="text-purple-600 hover:text-purple-500">
              Terms of Service
            </Link>{" "}
            or{" "}
            <Link href="/privacy-policy" className="text-purple-600 hover:text-purple-500">
              Privacy Policy
            </Link>
            .
          </p>
        </div>

        <div className="card-panel p-6 sm:p-8">
          {sent ? (
            <div className="text-center">
              <CheckCircle2 className="mx-auto size-12 text-emerald-500" aria-hidden />
              <h2 className="mt-4 text-xl font-semibold text-zinc-900">Request received</h2>
              <p className="mt-2 text-sm text-zinc-600">
                Thanks. A ticket number will be emailed to you shortly, and the
                conversation continues under Notification once you sign in.
              </p>
              <Link href="/support" className="btn-gradient mt-6 inline-block px-6 py-2.5 text-sm">
                + New request
              </Link>
            </div>
          ) : (
            <form action="/support" method="get" className="space-y-5">
              <input type="hidden" name="sent" value="1" />
              <h2 className="text-lg font-semibold text-zinc-900">+ New request</h2>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-sm">
                  <span className="font-medium text-zinc-700">Your name</span>
                  <input
                    required
                    name="name"
                    className="mt-1.5 h-11 w-full rounded-xl border border-zinc-200 bg-white px-4 text-sm outline-none focus:border-purple-400"
                  />
                </label>
                <label className="block text-sm">
                  <span className="font-medium text-zinc-700">Email</span>
                  <input
                    required
                    type="email"
                    name="email"
                    className="mt-1.5 h-11 w-full rounded-xl border border-zinc-200 bg-white px-4 text-sm outline-none focus:border-purple-400"
                  />
                </label>
              </div>
              <label className="block text-sm">
                <span className="font-medium text-zinc-700">Topic</span>
                <select
                  name="topic"
                  className="mt-1.5 h-11 w-full rounded-xl border border-zinc-200 bg-white px-4 text-sm outline-none focus:border-purple-400"
                >
                  {TOPICS.map((topic) => (
                    <option key={topic}>{topic}</option>
                  ))}
                </select>
              </label>
              <label className="block text-sm">
                <span className="font-medium text-zinc-700">Order code (optional)</span>
                <input
                  name="order"
                  placeholder="e.g. GI1037"
                  className="mt-1.5 h-11 w-full rounded-xl border border-zinc-200 bg-white px-4 text-sm outline-none placeholder:text-zinc-400 focus:border-purple-400"
                />
              </label>
              <label className="block text-sm">
                <span className="font-medium text-zinc-700">Message</span>
                <textarea
                  required
                  name="message"
                  rows={5}
                  className="mt-1.5 w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:border-purple-400"
                />
              </label>
              <button type="submit" className="btn-gradient w-full px-6 py-3 text-sm">
                Submit request
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
