import type { Metadata } from "next";
import { AuthCard } from "@/components/auth-card";
import { getSafeRedirectPath } from "@/lib/clerk";

export const metadata: Metadata = { title: "Sign in" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  return <AuthCard mode="login" next={getSafeRedirectPath(next)} />;
}
