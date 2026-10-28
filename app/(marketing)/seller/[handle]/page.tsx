import { BadgeCheck, Clock, Star } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ListingCard } from "@/components/listing-card";
import { Breadcrumbs, SectionHeading } from "@/components/page-blocks";
import { ReviewCard } from "@/components/review-card";
import { BRAND } from "@/lib/brand";
import { REVIEWS, SELLERS, getSeller, getSellerListings } from "@/lib/listings";

type Params = Promise<{ handle: string }>;

export const generateStaticParams = () => SELLERS.map((seller) => ({ handle: seller.handle }));

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const seller = getSeller((await params).handle);
  if (!seller) return {};
  return {
    title: `${seller.handle} — ${seller.level} Seller`,
    description: `${seller.handle} on ${BRAND.name}: ${seller.rating.toFixed(1)} rating from ${seller.reviews} reviews and ${seller.sales} completed sales.`,
  };
}

export default async function SellerProfilePage({ params }: { params: Params }) {
  const seller = getSeller((await params).handle);
  if (!seller) notFound();
  const listings = getSellerListings(seller.handle, 12);
  const reviews = REVIEWS.filter((review) => review.seller === seller.handle);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ href: "/market", label: "All Markets" }, { label: seller.handle }]} />
      <section className="card-panel mt-6 flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:p-8">
        <span className="flex size-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 via-purple-500 to-indigo-500 text-3xl font-bold text-white">
          {seller.handle[0]}
        </span>
        <div className="min-w-0 flex-1">
          <h1 className="flex items-center gap-2 text-3xl font-bold tracking-tight">
            {seller.handle}
            {seller.verified && <BadgeCheck className="size-6 text-sky-500" aria-label="Verified seller" />}
          </h1>
          <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-zinc-600">
            <span className="flex items-center gap-1">
              <Star className="size-4 fill-amber-400 text-amber-400" aria-hidden />
              {seller.rating.toFixed(1)} overall · {seller.reviews.toLocaleString("en-US")} reviews
            </span>
            <span className="chip">{seller.level} Seller</span>
            <span className={`flex items-center gap-1.5 ${seller.online ? "text-emerald-600" : "text-zinc-500"}`}>
              <span className={`size-2 rounded-full ${seller.online ? "bg-emerald-500" : "bg-zinc-300"}`} aria-hidden />
              {seller.online ? "Online now" : "Offline"}
            </span>
          </p>
          <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-sm">
            <div>
              <dt className="text-zinc-500">Completed sales</dt>
              <dd className="font-semibold text-zinc-900">{seller.sales.toLocaleString("en-US")}</dd>
            </div>
            <div>
              <dt className="text-zinc-500">Response time</dt>
              <dd className="font-semibold text-zinc-900">{seller.responseTime}</dd>
            </div>
            <div>
              <dt className="flex items-center gap-1 text-zinc-500">
                <Clock className="size-3.5" aria-hidden /> Member since
              </dt>
              <dd className="font-semibold text-zinc-900">{seller.joined}</dd>
            </div>
          </dl>
        </div>
        <Link href="/chat" className="btn-gradient px-6 py-3 text-center text-sm">
          Message seller
        </Link>
      </section>

      <section className="py-12">
        <SectionHeading label="Store" title={`Listings by ${seller.handle}`} />
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>

      {reviews.length > 0 && (
        <section className="py-12">
          <SectionHeading label="Market-specific feedback" title="Recent reviews" />
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
