import type { Metadata } from "next";
import { AuthCard, PendingNotice } from "@/components/auth-card";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = { title: "Sign in" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ pending?: string; next?: string }>;
}) {
  const { pending, next } = await searchParams;
  if (pending) {
    return (
      <PendingNotice
        title="Sign-in is almost ready"
        body={`Accounts on ${BRAND.name} are being connected. Browsing every market already works, and you will be able to sign in here as soon as authentication goes live.`}
      />
    );
  }
  return <AuthCard mode="login" next={next} />;
}
