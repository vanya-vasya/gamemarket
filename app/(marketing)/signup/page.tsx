import type { Metadata } from "next";
import { AuthCard, PendingNotice } from "@/components/auth-card";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = { title: "Create account" };

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ pending?: string }>;
}) {
  const { pending } = await searchParams;
  if (pending) {
    return (
      <PendingNotice
        title="Registration opens soon"
        body={`Thanks for your interest in ${BRAND.name}. Account creation is being connected; browse the markets now and come back to register when authentication goes live.`}
      />
    );
  }
  return <AuthCard mode="signup" />;
}
