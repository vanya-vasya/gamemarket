import type { Metadata } from "next";
import { AuthCard } from "@/components/auth-card";
import { getSafeRedirectPath } from "@/lib/clerk";

export const metadata: Metadata = { title: "Create account" };

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  return <AuthCard mode="signup" next={getSafeRedirectPath(next)} />;
}
