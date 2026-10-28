import type { Metadata } from "next";
import { AuthShell } from "@/components/auth-shell";

export const metadata: Metadata = { title: "Create your studio" };

export default function SignupPage() {
  return (
    <AuthShell
      heading="Create your studio"
      subheading="Accounts are turned off on this deployment."
    >
      <p className="rounded-2xl border border-black/8 bg-white p-5 text-sm leading-relaxed text-zinc-600">
        Sign-up is turned off for now. Browse the tools and the inspiration
        gallery without an account.
      </p>
    </AuthShell>
  );
}
