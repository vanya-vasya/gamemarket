import type { Metadata } from "next";
import { AuthShell } from "@/components/auth-shell";

export const metadata: Metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <AuthShell
      heading="Welcome back"
      subheading="Sign in to open the studio and spend your credits."
    >
      <p className="rounded-2xl border border-black/8 bg-white p-5 text-sm leading-relaxed text-zinc-600">
        Sign-in is turned off on this deployment. The public studio is open
        without an account.
      </p>
    </AuthShell>
  );
}
